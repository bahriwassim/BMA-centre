-- Demandes de devis (ne bloquent pas le calendrier)
create table if not exists public.quote_requests (
  id uuid primary key default uuid_generate_v4(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  whatsapp text,
  room_id uuid references public.rooms(id) on delete set null,
  duration text not null,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.quote_requests enable row level security;

create policy "public can request quote"
  on public.quote_requests for insert
  with check (true);

create policy "admins manage quotes"
  on public.quote_requests for all
  using ((auth.jwt()->'app_metadata'->>'role') = 'admin');
