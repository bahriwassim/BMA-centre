'use client';
import {zodResolver} from '@hookform/resolvers/zod';
import {Check,Loader2} from 'lucide-react';
import {useEffect,useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {supabase} from '@/lib/supabase';

const schema=z.object({first_name:z.string().min(2,'Prénom requis'),last_name:z.string().min(2,'Nom requis'),phone:z.string().min(6,'Téléphone requis'),whatsapp:z.string().optional(),email:z.string().email('Email invalide'),reservation_date:z.string().min(1,'Date requise'),room_id:z.string().min(1,'Choisissez une salle'),notes:z.string().optional()});
type Values=z.infer<typeof schema>;
type Room={id:string;name:string};
const countryCodes=['+216 — Tunisie','+33 — France','+32 — Belgique','+213 — Algérie','+212 — Maroc','+41 — Suisse','+1 — Canada / États-Unis','+39 — Italie','+49 — Allemagne','+971 — Émirats arabes unis'];

export function BookingForm(){
 const [rooms,setRooms]=useState<Room[]>([]),[busy,setBusy]=useState(false),[sent,setSent]=useState(false),[countryCode,setCountryCode]=useState('+216');
 const {register,handleSubmit,formState:{errors},setError}=useForm<Values>({resolver:zodResolver(schema),defaultValues:{phone:'+216'}});
 useEffect(()=>{supabase().from('rooms').select('id,name').order('name').then(({data})=>setRooms(data??[]))},[]);
 const submit=async(values:Values)=>{
  setBusy(true); setError('reservation_date',{message:''});
  const client=supabase(); const selectedRooms=values.room_id==='both'?rooms:rooms.filter(room=>room.id===values.room_id);
  if(!selectedRooms.length){setError('room_id',{message:'Choisissez une salle.'});setBusy(false);return}
  const {data:unavailable,error:availabilityError}=await client.from('blocked_dates').select('room_id').in('room_id',selectedRooms.map(room=>room.id)).eq('reservation_date',values.reservation_date);
  if(availabilityError||unavailable?.length){setError('reservation_date',{message:'Cette date est indisponible pour une des salles sélectionnées.'});setBusy(false);return}
  const records=selectedRooms.map(room=>({...values,room_id:room.id,phone:values.phone.startsWith('+')?values.phone:`${countryCode} ${values.phone}`}));
  const {error}=await client.from('reservations').insert(records);
  setBusy(false);
  if(error){setError('reservation_date',{message:error.code==='23505'?'Une des salles est déjà réservée à cette date.':'Impossible d’envoyer la demande. Réessayez.'});return}
  setSent(true);
 };
 if(sent)return <div className="mt-8 rounded-2xl border border-gold/40 bg-gold/10 p-6 text-cream"><Check className="mb-3 text-gold"/>Votre demande est bien reçue. Nous vous confirmons votre créneau très vite.</div>;
 const err=(x:keyof Values)=>errors[x]?.message&&<span className="mt-1 block text-xs text-red-300">{errors[x]?.message}</span>;
 return <form onSubmit={handleSubmit(submit)} className="mt-8 grid gap-4 sm:grid-cols-2"><label>Nom<input {...register('last_name')} className="input mt-2" placeholder="Votre nom"/>{err('last_name')}</label><label>Prénom<input {...register('first_name')} className="input mt-2" placeholder="Votre prénom"/>{err('first_name')}</label><label>Indicatif pays<input className="input mt-2" list="country-codes" value={countryCode} onChange={e=>setCountryCode(e.target.value.split(' ')[0]||'+216')} placeholder="+216"/><datalist id="country-codes">{countryCodes.map(code=><option key={code} value={code}/>)}</datalist></label><label>Téléphone<input {...register('phone')} type="tel" className="input mt-2" placeholder="+216 20 000 000" onFocus={e=>{if(!e.target.value)e.target.value=countryCode}}/>{err('phone')}</label><label>WhatsApp<input {...register('whatsapp')} type="tel" className="input mt-2" placeholder={`${countryCode} 20 000 000`}/></label><label>Email<input {...register('email')} type="email" className="input mt-2" placeholder="vous@email.com"/>{err('email')}</label><label>Date<input {...register('reservation_date')} type="date" min={new Date().toISOString().split('T')[0]} className="input mt-2"/>{err('reservation_date')}</label><label>Salle<select {...register('room_id')} className="input mt-2" defaultValue=""><option value="" disabled>Choisir une salle</option>{rooms.map(r=><option value={r.id} key={r.id}>{r.name}</option>)}{rooms.length>=2&&<option value="both">Les deux salles</option>}</select>{err('room_id')}</label><label className="sm:col-span-2">Commentaires<textarea {...register('notes')} className="input mt-2 min-h-24" placeholder="Parlez-nous de votre besoin…"/></label><button disabled={busy} className="btn-gold mt-3 disabled:opacity-60 sm:col-span-2" type="submit">{busy?<><Loader2 className="animate-spin" size={16}/> Envoi en cours</>:'Envoyer ma demande'}</button></form>;
}
