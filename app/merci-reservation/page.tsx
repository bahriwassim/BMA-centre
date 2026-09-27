import type {Metadata} from 'next';
import Link from 'next/link';
import {ConversionTracker} from '@/components/analytics';

export const metadata: Metadata = {
  title: 'Merci pour votre réservation',
  description: 'Votre demande de réservation a bien été reçue.',
  robots: {index: false, follow: false},
};

export default function MerciReservationPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <ConversionTracker event="reservation" />
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Confirmation</p>
        <h1 className="mt-5 text-4xl font-light md:text-5xl">
          Merci pour votre <em className="font-serif text-gold">réservation.</em>
        </h1>
        <p className="mt-6 text-mist leading-7">
          Votre demande est bien reçue. Notre équipe vous confirme votre créneau très rapidement.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-gold">
            Retour à l&apos;accueil
          </Link>
          <Link href="/#localisation" className="btn-ghost">
            Nous contacter
          </Link>
        </div>
      </div>
    </main>
  );
}
