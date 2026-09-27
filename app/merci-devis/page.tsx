import type {Metadata} from 'next';
import Link from 'next/link';
import {ConversionTracker} from '@/components/analytics';

export const metadata: Metadata = {
  title: 'Merci pour votre demande de devis',
  description: 'Votre demande de devis a bien été reçue.',
  robots: {index: false, follow: false},
};

export default function MerciDevisPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <ConversionTracker event="devis" />
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Confirmation</p>
        <h1 className="mt-5 text-4xl font-light md:text-5xl">
          Merci pour votre <em className="font-serif text-gold">demande.</em>
        </h1>
        <p className="mt-6 text-mist leading-7">
          Votre demande de devis est bien reçue. Nous vous envoyons une proposition personnalisée sous peu.
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
