'use client';

import {MessageCircle} from 'lucide-react';
import {WHATSAPP_URL} from '@/lib/site';

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Contacter Beauty Mondial Academy sur WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink shadow-2xl transition hover:scale-110"
    >
      <MessageCircle size={25} />
    </a>
  );
}
