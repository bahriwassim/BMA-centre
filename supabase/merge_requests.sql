-- BMA request form merge migration. Apply to the existing Supabase project.
-- Existing reservation and quote rows are retained; quote_requests is kept as
-- the historical archive because old quotes have no requested date.
begin;

-- The existing reservations table already owns room/date and is used by the
-- admin calendar. Email is optional in the merged public form.
alter table public.reservations alter column email drop not null;

alter table public.reservations
  add column if not exists request_type text not null default 'reservation';

-- Allow the same room/date for quotes; reservations still block dates through
-- availability's status filtering below.
alter table public.reservations
  drop constraint if exists reservations_room_id_reservation_date_key;

-- whatsapp remains nullable for legacy rows; the public INSERT policy below
-- requires a non-empty value for every new public request.

alter table public.reservations
  drop constraint if exists reservations_request_type_check;
alter table public.reservations add constraint reservations_request_type_check
  check (request_type in ('reservation', 'devis'));

create unique index if not exists reservations_active_booking_room_date_key
  on public.reservations (room_id, reservation_date)
  where request_type = 'reservation' and status in ('pending', 'confirmed');

-- Check new submissions without making historical rows fail status updates as
-- time passes (a table CHECK on current_date would do that).
alter table public.reservations
  drop constraint if exists reservations_reservation_date_check;

create or replace function public.reject_past_request_date()
returns trigger
language plpgsql
as $$
begin
  if new.reservation_date < current_date then
    raise exception 'reservation_date must be today or later';
  end if;
  return new;
end;
$$;

drop trigger if exists reservations_reject_past_request_date on public.reservations;
create trigger reservations_reject_past_request_date
  before insert on public.reservations
  for each row execute function public.reject_past_request_date();

-- Public inserts may only create pending requests with valid required fields.
drop policy if exists "public can request" on public.reservations;
create policy "public can request" on public.reservations
  for insert with check (
    status = 'pending'
    and request_type in ('reservation', 'devis')
    and length(trim(first_name)) >= 2
    and length(trim(whatsapp)) >= 6
    and room_id is not null
    and reservation_date >= current_date
  );

-- Ensure clients cannot read request rows. Admin access remains controlled by
-- the existing admins manage reservations policy.
drop policy if exists "public read reservations" on public.reservations;

-- Devis should not make a date unavailable; only reservation requests do.
create or replace view public.availability as
select r.id as room_id, d.day as reservation_date,
  not exists (
    select 1 from public.reservations x
    where x.room_id = r.id and x.reservation_date = d.day
      and x.status in ('pending', 'confirmed') and x.request_type = 'reservation'
  ) and not exists (
    select 1 from public.blocked_dates b
    where b.room_id = r.id and b.reservation_date = d.day
  ) as available
from public.rooms r
cross join lateral generate_series(current_date, current_date + 365, interval '1 day') d(day);

commit;
