'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {Check, Loader2} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {supabase} from '@/lib/supabase';
import {WHATSAPP_URL} from '@/lib/site';

const schema = z.object({
  first_name: z.string().min(2, 'Prénom requis'),
  last_name: z.string().min(2, 'Nom requis'),
  phone: z.string().min(6, 'Téléphone requis'),
  whatsapp: z.string().optional(),
  email: z.string().email('Email invalide'),
  room_id: z.string().min(1, 'Choisissez une salle'),
  duration: z.string().min(1, 'Choisissez une durée'),
  notes: z.string().optional(),
});

type Values = z.infer<typeof schema>;
type Room = {id: string; name: string};

const countryCodes = [
  '+216 — Tunisie',
  '+33 — France',
  '+32 — Belgique',
  '+213 — Algérie',
  '+212 — Maroc',
  '+41 — Suisse',
  '+1 — Canada / États-Unis',
  '+39 — Italie',
  '+49 — Allemagne',
  '+971 — Émirats arabes unis',
];

export function QuoteForm({defaultRoomName}: {defaultRoomName?: string}) {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [countryCode, setCountryCode] = useState('+216');
  const {register, handleSubmit, formState: {errors}, setError, setValue} = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {phone: '+216'},
  });

  useEffect(() => {
    supabase()
      .from('rooms')
      .select('id,name')
      .order('name')
      .then(({data}) => {
        const list = data ?? [];
        setRooms(list);
        if (defaultRoomName) {
          const match = list.find((room) => room.name.toLowerCase() === defaultRoomName.toLowerCase());
          if (match) setValue('room_id', match.id);
        }
      });
  }, [defaultRoomName, setValue]);

  const submit = async (values: Values) => {
    setBusy(true);
    setError('notes', {message: ''});
    const phone = values.phone.startsWith('+') ? values.phone : `${countryCode} ${values.phone}`;
    const roomIds =
      values.room_id === 'both' ? rooms.map((r) => r.id) : [values.room_id];

    const records = roomIds.map((room_id) => ({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone,
      whatsapp: values.whatsapp || null,
      room_id,
      duration: values.duration,
      notes: values.notes || null,
    }));

    const {error} = await supabase().from('quote_requests').insert(records);
    setBusy(false);

    if (error) {
      setError('notes', {
        message: `Envoi impossible pour le moment. Contactez-nous sur WhatsApp : ${WHATSAPP_URL}`,
      });
      return;
    }

    setSent(true);
    router.push('/merci-devis');
  };

  if (sent) {
    return (
      <div className="mt-8 rounded-2xl border border-gold/40 bg-gold/10 p-6 text-cream">
        <Check className="mb-3 text-gold" />
        Redirection en cours…
      </div>
    );
  }

  const err = (x: keyof Values) =>
    errors[x]?.message && <span className="mt-1 block text-xs text-red-300">{errors[x]?.message}</span>;

  return (
    <form onSubmit={handleSubmit(submit)} className="mt-8 grid gap-4 sm:grid-cols-2">
      <label>
        Nom
        <input {...register('last_name')} className="input mt-2" placeholder="Votre nom" />
        {err('last_name')}
      </label>
      <label>
        Prénom
        <input {...register('first_name')} className="input mt-2" placeholder="Votre prénom" />
        {err('first_name')}
      </label>
      <label>
        Indicatif pays
        <input
          className="input mt-2"
          list="quote-country-codes"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value.split(' ')[0] || '+216')}
          placeholder="+216"
        />
        <datalist id="quote-country-codes">
          {countryCodes.map((code) => (
            <option key={code} value={code} />
          ))}
        </datalist>
      </label>
      <label>
        Téléphone
        <input
          {...register('phone')}
          type="tel"
          className="input mt-2"
          placeholder="+216 20 000 000"
          onFocus={(e) => {
            if (!e.target.value) e.target.value = countryCode;
          }}
        />
        {err('phone')}
      </label>
      <label>
        WhatsApp
        <input {...register('whatsapp')} type="tel" className="input mt-2" placeholder={`${countryCode} 20 000 000`} />
      </label>
      <label>
        Email
        <input {...register('email')} type="email" className="input mt-2" placeholder="vous@email.com" />
        {err('email')}
      </label>
      <label>
        Salle
        <select {...register('room_id')} className="input mt-2" defaultValue="">
          <option value="" disabled>
            Choisir une salle
          </option>
          {rooms.map((r) => (
            <option value={r.id} key={r.id}>
              {r.name}
            </option>
          ))}
          {rooms.length >= 2 && <option value="both">Les deux salles</option>}
        </select>
        {err('room_id')}
      </label>
      <label>
        Durée souhaitée
        <select {...register('duration')} className="input mt-2" defaultValue="">
          <option value="" disabled>
            Choisir une durée
          </option>
          <option value="Journée">Journée</option>
          <option value="Semaine">Semaine</option>
          <option value="Mois">Mois</option>
          <option value="Longue durée">Longue durée / sur mesure</option>
        </select>
        {err('duration')}
      </label>
      <label className="sm:col-span-2">
        Votre projet
        <textarea
          {...register('notes')}
          className="input mt-2 min-h-24"
          placeholder="Décrivez votre formation, le nombre de participantes, les dates envisagées…"
        />
        {err('notes')}
      </label>
      <button disabled={busy} className="btn-gold mt-3 disabled:opacity-60 sm:col-span-2" type="submit">
        {busy ? (
          <>
            <Loader2 className="animate-spin" size={16} /> Envoi en cours
          </>
        ) : (
          'Demander mon devis'
        )}
      </button>
    </form>
  );
}
