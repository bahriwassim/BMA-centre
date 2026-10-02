'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {Check, Loader2} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {supabase} from '@/lib/supabase';

const schema = z.object({
  full_name: z.string().trim().min(2, 'Nom & prénom requis'),
  whatsapp: z.string().trim().min(6, 'WhatsApp requis'),
  reservation_date: z.string().min(1, 'Date requise'),
  room_id: z.string().min(1, 'Choisissez une salle'),
  request_type: z.enum(['reservation', 'devis']),
});
type Values = z.infer<typeof schema>;
type Room = {id: string; name: string};

export function BookingForm({defaultRoomName, defaultRequestType = 'reservation'}: {defaultRoomName?: string; defaultRequestType?: 'reservation' | 'devis'}) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const {register, handleSubmit, formState: {errors}, setError, setValue} = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {request_type: defaultRequestType},
  });

  useEffect(() => {
    supabase().from('rooms').select('id,name').order('name').then(({data}) => {
      const list = data ?? [];
      setRooms(list);
      const match = defaultRoomName && list.find((room) => room.name.toLowerCase() === defaultRoomName.toLowerCase());
      if (match) setValue('room_id', match.id);
    });
  }, [defaultRoomName, setValue]);

  const submit = async (values: Values) => {
    setBusy(true);
    const {error} = await supabase().from('reservations').insert({
      first_name: values.full_name.trim(),
      last_name: '',
      email: null,
      phone: values.whatsapp.trim(),
      whatsapp: values.whatsapp.trim(),
      room_id: values.room_id,
      reservation_date: values.reservation_date,
      request_type: values.request_type,
      status: 'pending',
    });
    setBusy(false);
    if (error) {
      setError('reservation_date', {message: 'Impossible d’envoyer la demande. Réessayez.'});
      return;
    }
    setSent(true);
  };

  if (sent) return <div className="mt-8 rounded-2xl border border-gold/40 bg-gold/10 p-6 text-cream"><Check className="mb-3 text-gold" />Votre demande a bien été envoyée.</div>;
  const err = (field: keyof Values) => errors[field]?.message && <span className="mt-1 block text-xs text-red-300">{errors[field]?.message}</span>;

  return <form onSubmit={handleSubmit(submit)} className="mt-8 grid gap-4 sm:grid-cols-2">
    <label className="sm:col-span-2">Nom &amp; Prénom *<input {...register('full_name')} required autoComplete="name" className="input mt-2" placeholder="Votre nom et prénom" />{err('full_name')}</label>
    <label>WhatsApp *<input {...register('whatsapp')} required type="tel" autoComplete="tel" className="input mt-2" placeholder="+216 20 000 000" />{err('whatsapp')}</label>
    <label>Date *<input {...register('reservation_date')} required type="date" min={new Date().toISOString().split('T')[0]} className="input mt-2" />{err('reservation_date')}</label>
    <label className="sm:col-span-2">Salle *<select {...register('room_id')} required className="input mt-2" defaultValue=""><option value="" disabled>Choisir une salle</option>{rooms.map((room) => <option value={room.id} key={room.id}>{room.name}</option>)}</select>{err('room_id')}</label>
    <fieldset className="sm:col-span-2">
      <legend>Type de demande *</legend>
      <div className="mt-2 grid grid-cols-2 gap-3">
        {(['reservation', 'devis'] as const).map((type) => <label key={type} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/15 bg-white/[.03] px-4 py-3 has-[:checked]:border-gold has-[:checked]:bg-gold/10">
          <input {...register('request_type')} type="radio" value={type} className="accent-[#d4af37]" />{type === 'reservation' ? 'Réservation' : 'Devis'}
        </label>)}
      </div>{err('request_type')}
    </fieldset>
    <button disabled={busy} className="btn-gold mt-3 disabled:opacity-60 sm:col-span-2" type="submit">{busy ? <><Loader2 className="animate-spin" size={16} /> Envoi en cours</> : 'Envoyer ma demande'}</button>
  </form>;
}
