'use client';

import Image from 'next/image';
import {motion, AnimatePresence} from 'framer-motion';
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Facebook,
  Instagram,
  Music2,
  Phone,
  MapPin,
  X,
} from 'lucide-react';
import {useState} from 'react';
import {BookingForm} from '@/components/booking-form';
import {
  PHONE_TN,
  SCHOOL_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
  rooms,
  socialLinks,
} from '@/lib/site';

const equipmentImages: Record<string, string> = {
  'Lampe d’éclairage professionnelle': 'salle-attente-lampe-eclairage.jpeg',
  'Vapozone visage': 'vapozone-visage.jpeg',
  Hydrafacial: 'hydrafacial.jpeg',
  Radiofréquence: 'radiofrequence.jpeg',
  Lipoactivation: 'lipoactivation.jpeg',
  'Madero Therapy': 'madero-therapy.webp',
  'Mobilier esthétique': 'mobilier-esthetique.jpeg',
  'Fauteuils professionnels': 'fauteuils-professionnels.jpeg',
  'Équipement coiffure': 'equipement-coiffure.jpeg',
  'Tables de massage': 'tables-de-massage.jpeg',
  'Machine à café & thé': 'machine-cafe-the.jpeg',
  'Cuisine équipée': 'cuisine-equipee.jpeg',
  'Bloc sanitaire': 'bloc-sanitaire.jpeg',
  'TV & rétroprojecteur': 'tv-retroprojecteur.jpeg',
  'Baffles Bluetooth': 'baffles-bluetooth.jpeg',
  'Connexion WiFi': 'connexion-wifi-salle-formation.jpeg',
  Climatisation: 'climatisation.jpeg',
  'Salle d’attente': 'salle-attente-lampe-eclairage.jpeg',
};

const equipment = Object.keys(equipmentImages);

const reveal = {
  initial: {opacity: 0, y: 22},
  whileInView: {opacity: 1, y: 0},
  viewport: {once: true, amount: 0.2},
  transition: {duration: 0.7},
};

function PinterestIcon({size=17}: {size?: number}) { return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 0a12 12 0 0 0-4.37 23.18c-.1-.94-.19-2.39.04-3.42l1.4-5.94s-.36-.72-.36-1.78c0-1.67.97-2.91 2.18-2.91 1.03 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-1 4-.28 1.2.6 2.18 1.78 2.18 2.14 0 3.79-2.26 3.79-5.52 0-2.89-2.08-4.91-5.05-4.91-3.44 0-5.46 2.58-5.46 5.25 0 1.04.4 2.16.9 2.77.1.12.11.23.08.35l-.34 1.36c-.06.22-.18.27-.41.16-1.51-.7-2.45-2.91-2.45-4.68 0-3.81 2.77-7.31 7.99-7.31 4.2 0 7.47 2.99 7.47 6.99 0 4.17-2.63 7.53-6.28 7.53-1.23 0-2.39-.64-2.79-1.4l-.76 2.9c-.27 1.06-1.01 2.38-1.5 3.19A12 12 0 1 0 12 0Z"/></svg> }
function WhatsAppIcon({size=24}: {size?: number}) { return <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true"><path fill="#25D366" d="M16 .5A15.4 15.4 0 0 0 2.7 23.7L.6 31.4l7.9-2.1A15.5 15.5 0 1 0 16 .5Z"/><path fill="#fff" d="M23.4 18.8c-.4-.2-2.3-1.1-2.7-1.2-.4-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.4-.2.3-.5.3-.9.1-.4-.2-1.6-.6-3.1-2-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.6.1-.3 0-.5 0-.7-.1-.2-.9-2.1-1.3-2.9-.3-.7-.6-.6-.9-.6h-.8c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.2s1.4 3.7 1.6 4c.2.3 2.7 4.1 6.5 5.7.9.4 1.7.6 2.3.8 1 .3 1.8.2 2.5.1.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5Z"/></svg> }

const socialIcons = {
  Instagram,
  Facebook,
  Pinterest: PinterestIcon,
  TikTok: Music2,
} as const;

type SelectedRoom = (typeof rooms)[number];

export function Landing() {
  const [selectedRoom, setSelectedRoom] = useState<SelectedRoom | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [prefillRoom, setPrefillRoom] = useState<string | undefined>();
  const [requestType, setRequestType] = useState<'reservation' | 'devis'>('reservation');

  const goToForm = (form: 'reservation' | 'devis', roomName: string) => {
    setPrefillRoom(roomName);
    setRequestType(form);
    setSelectedRoom(null);
    requestAnimationFrame(() => {
      document.getElementById('reservation')?.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
  };

  return (
    <main className="overflow-hidden">
      <nav className="fixed left-3 right-3 top-3 z-40 flex h-20 items-center justify-between gap-3 rounded-full border border-white/10 bg-[#111]/75 px-5 shadow-[0_12px_40px_rgba(0,0,0,.32)] backdrop-blur-2xl transition-all duration-500 hover:border-gold/40 md:left-6 md:right-6 md:px-10">
        <a href="#top" aria-label="Beauty Mondial Academy">
          <Image
            src="/gallery/logo-beauty-mondial-academy.png"
            alt="Beauty Mondial Academy"
            width={96}
            height={96}
            className="h-28 w-28 object-contain drop-shadow-[0_0_18px_rgba(212,175,55,.18)] md:h-36 md:w-36"
          />
        </a>
        <div className="hidden gap-7 text-[10px] font-bold tracking-[.15em] text-mist lg:flex">
          <a href="#concept">CONCEPT</a>
          <a href="#salles">LES SALLES</a>
          <a href="#equipements">L&apos;ÉQUIPEMENT</a>
          <a href="#localisation">LOCALISATION</a>
          <a href={SCHOOL_URL} target="_blank" rel="noreferrer">
            NOTRE ÉCOLE
          </a>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-1.5 lg:flex">
            {socialLinks.map(({label, href}) => {
              const Icon = socialIcons[label];
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="rounded-full border border-white/15 p-2 text-mist transition hover:border-gold hover:text-gold"
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>
          <a
            href={SCHOOL_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[9px] font-bold tracking-[.12em] text-mist transition hover:text-gold sm:text-[10px] lg:hidden"
          >
            NOTRE ÉCOLE
          </a>
          <a href="#reservation" className="btn-gold shrink-0 whitespace-nowrap !px-3 !py-2.5 !text-[10px] sm:!px-4">
            Réserver <ArrowUpRight size={14} />
          </a>
        </div>
      </nav>

      <section id="top" className="relative min-h-[800px] px-6 pt-32 md:min-h-[720px] md:px-12">
        <Image
          priority
          fill
          src="/gallery/connexion-wifi-salle-formation.jpeg"
          alt="Espace Beauty Mondial Academy"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#111_10%,rgba(17,17,17,.48)_65%,#111),linear-gradient(0deg,#111,transparent_45%)]" />
        <div className="relative mx-auto flex min-h-[610px] max-w-7xl flex-col justify-start pt-24 md:pt-20">
          <motion.h1
            {...reveal}
            transition={{duration: 0.8, delay: 0.1}}
            className="max-w-4xl text-5xl font-light leading-[.93] tracking-[-.055em] sm:text-7xl lg:text-[5.25rem]"
          >
            Salles de
            <br />
            <em className="font-serif text-gold">Formation.</em>
          </motion.h1>
          <motion.p {...reveal} transition={{delay: 0.2}} className="mt-6 max-w-xl text-base leading-7 text-mist">
            Organisez vos formations beauté à Sousse dans un espace professionnel entièrement équipé, disponible à la
            demande pour vos sessions et formations.
          </motion.p>
          <motion.div {...reveal} transition={{delay: 0.3}} className="mt-8 flex flex-wrap gap-3">
            <a className="btn-gold" href="#reservation">
              Réserver une salle <CalendarDays size={16} />
            </a>
            <a className="btn-ghost" href="#reservation" onClick={() => setRequestType('devis')}>
              Demander un devis
            </a>
          </motion.div>
        </div>
        <div className="absolute bottom-8 right-6 hidden items-center gap-3 text-[10px] tracking-[.2em] text-mist md:flex">
          DÉCOUVRIR <span className="h-8 w-px bg-gold" />
        </div>
      </section>

      <section id="salles" className="section pt-0">
        <p className="eyebrow mb-8">01 — Choisir sa salle</p>
        <div className="grid gap-5 lg:grid-cols-2">
          {rooms.map((r) => (
            <motion.article
              {...reveal}
              id={r.id}
              key={r.id}
              className="group relative min-h-[520px] overflow-hidden rounded-3xl border border-white/10"
            >
              <button
                type="button"
                onClick={() => setSelectedRoom(r)}
                className="absolute inset-0 z-0"
                aria-label={`Voir les photos et équipements de ${r.name}`}
              >
                <Image
                  fill
                  src={`/gallery/${r.cover}`}
                  alt={r.name}
                  className="object-cover opacity-65 transition duration-700 group-hover:scale-105"
                />
              </button>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-7 md:p-10">
                <p className="eyebrow">{r.eyebrow}</p>
                <h3 className="mt-3 text-4xl font-light">{r.name}</h3>
                <p className="mt-3 text-mist">{r.desc}</p>
                <ul className="mt-7 grid grid-cols-2 gap-y-3 text-sm text-cream">
                  {r.highlights.map((l) => (
                    <li key={l} className="flex items-center gap-2">
                      <Check size={14} className="text-gold" />
                      {l}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => goToForm('reservation', r.name)}
                    className="btn-gold !px-4 !py-3 !text-[10px]"
                  >
                    Réserver cette salle <ArrowUpRight size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToForm('devis', r.name)}
                    className="btn-ghost !px-4 !py-3 !text-[10px]"
                  >
                    Demander un devis
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRoom(r)}
                  className="mt-4 text-[10px] font-bold tracking-[.14em] text-gold transition hover:text-cream"
                >
                  Voir photos & équipements →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="equipements" className="section relative">
        <motion.div {...reveal} className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">02 — Tout est déjà là</p>
            <h2 className="mt-4 text-4xl font-light md:text-6xl">
              L&apos;équipement de vos <em className="text-gold">formations.</em>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              aria-label="Équipement précédent"
              onClick={() => {
                const el = document.getElementById('equip-carousel');
                if (el) el.scrollBy({left: -el.clientWidth * 0.85, behavior: 'smooth'});
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-cream transition hover:border-gold hover:text-gold"
            >
              <ChevronRight size={18} className="rotate-180" />
            </button>
            <button
              aria-label="Équipement suivant"
              onClick={() => {
                const el = document.getElementById('equip-carousel');
                if (el) el.scrollBy({left: el.clientWidth * 0.85, behavior: 'smooth'});
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold transition hover:bg-gold hover:text-ink"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
        <div
          id="equip-carousel"
          className="carousel flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-5 pl-2 pr-2 md:pl-4 md:pr-4"
        >
          {equipment.map((x, i) => (
            <motion.div
              {...reveal}
              transition={{delay: (i % 6) * 0.04}}
              key={x}
              className="carousel-item glass group relative w-[86%] snap-start shrink-0 overflow-hidden rounded-3xl border border-white/10 transition hover:border-gold/60 sm:w-[70%] md:w-[48%] lg:w-[32%] xl:w-[28%]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={`/gallery/${equipmentImages[x]}`}
                  fill
                  sizes="(max-width: 640px) 86vw, (max-width: 768px) 70vw, (max-width: 1024px) 48vw, 32vw"
                  alt={x}
                  className="object-cover opacity-80 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/25 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <span className="text-[10px] tracking-[.2em] text-gold">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-xl font-normal leading-tight text-cream md:text-2xl">{x}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="concept" className="section grid gap-12 md:grid-cols-[.75fr_1.25fr] md:items-end">
        <motion.div {...reveal}>
          <p className="eyebrow">Concept BMA</p>
          <h2 className="mt-5 text-4xl font-light tracking-tight md:text-5xl">
            Le lieu qui donne
            <br />
            de l&apos;ampleur à votre <em className="text-gold">formation.</em>
          </h2>
        </motion.div>
        <motion.p {...reveal} transition={{delay: 0.15}} className="max-w-xl text-lg font-light leading-8 text-mist">
          Beauty Mondial Academy propose des salles de formation entièrement équipées, pour organiser vos sessions dans
          un cadre premium sans investissement immobilier.
        </motion.p>
      </section>

      <section className="relative border-y border-white/10 py-8">
        <div className="absolute inset-0 noise opacity-20" />
        <div className="section relative py-0 text-center">
          <p className="eyebrow">Formez en toute sérénité</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-light tracking-tight md:text-6xl">
            Des formations de qualité
            <br />à <em className="text-gold">moindre coût.</em>
          </h2>
          <p className="mt-7 text-mist">La solution idéale pour les formateurs et centres de formation.</p>
          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
            {[
              'Formations esthétique',
              'Soins du visage',
              'Massage & bien-être',
              'Coiffure',
              'Lash & Brow Art',
              'Nail Art',
              'Maquillage professionnel',
              'Radiofréquence',
              'Hydrafacial',
              'Madero Therapy',
            ].map((x) => (
              <span key={x} className="rounded-full border border-white/15 px-5 py-3 text-xs tracking-wide text-cream">
                {x}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="reservation" className="section">
        <div className="mx-auto max-w-4xl rounded-3xl border border-gold/25 bg-gradient-to-br from-[#201d14] to-[#161616] p-6 md:p-12">
          <p className="eyebrow">03 — Votre créneau</p>
          <h2 className="mt-4 text-4xl font-light">
            Réserver une <em className="text-gold">salle.</em>
          </h2>
          <p className="mt-4 text-mist">Les journées indisponibles ne peuvent pas être sélectionnées.</p>
          <BookingForm key={`${prefillRoom || 'any'}-${requestType}`} defaultRoomName={prefillRoom} defaultRequestType={requestType} />
        </div>
      </section>

      <section id="localisation" className="section pt-0">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#171717] p-8 md:p-14">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,.14),transparent_65%)]" />
          <div className="relative grid gap-10 md:grid-cols-2">
            <div>
              <p className="eyebrow">Nous trouver</p>
              <h2 className="mt-4 text-4xl font-light">
                Échangeons sur votre <em className="text-gold">projet.</em>
              </h2>
              <div className="mt-8 space-y-4 text-mist">
                <a href={WHATSAPP_URL} className="flex items-center gap-3 hover:text-gold">
                  <WhatsAppIcon size={17} /> WhatsApp · {WHATSAPP_DISPLAY}
                </a>
                <a href={`tel:${PHONE_TN}`} className="flex items-center gap-3 hover:text-gold">
                  <Phone size={17} className="text-gold" /> Téléphone Tunisie · +216 58 168 903
                </a>
                <a
                  href="https://maps.app.goo.gl/CRKrE6Cuo28iSxt3A"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 hover:text-gold"
                >
                  <MapPin size={17} className="text-gold" /> Kantaoui, Sousse · Tunisie
                </a>
                <div className="flex items-center gap-3 pt-2">
                  {socialLinks.map(({label, href}) => {
                    const Icon = socialIcons[label];
                    return (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="rounded-full border border-white/15 p-2 transition hover:border-gold hover:text-gold"
                      >
                        <Icon size={17} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gold/20">
              <Image
                fill
                src="/gallery/plan-beauty-mondial-academy.png"
                alt="Beauty Mondial Academy — localisation"
                className="object-contain object-center"
              />
              <a
                href={WHATSAPP_URL}
                aria-label="Écrire sur WhatsApp"
                className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink shadow-xl transition hover:scale-110"
              >
                <WhatsAppIcon size={22} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-9 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <Image
            src="/gallery/logo-beauty-mondial-academy.png"
            alt="Beauty Mondial Academy"
            width={70}
            height={70}
            className="h-24 w-24 object-contain md:h-28 md:w-28"
          />
          <span className="text-xs text-mist">
            © {new Date().getFullYear()} · Mentions légales · Politique de confidentialité
          </span>
        </div>
      </footer>

      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/90 p-0 sm:items-center sm:p-5"
            onClick={() => setSelectedRoom(null)}
          >
            <motion.div
              initial={{y: 40, opacity: 0}}
              animate={{y: 0, opacity: 1}}
              exit={{y: 40, opacity: 0}}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#141414] sm:rounded-3xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#141414]/95 px-5 py-4 backdrop-blur md:px-8">
                <div>
                  <p className="eyebrow">{selectedRoom.eyebrow}</p>
                  <h3 className="mt-1 text-2xl font-light">{selectedRoom.name}</h3>
                </div>
                <button type="button" onClick={() => setSelectedRoom(null)} className="text-white" aria-label="Fermer">
                  <X />
                </button>
              </div>
              <div className="space-y-8 p-5 md:p-8">
                <p className="text-mist">{selectedRoom.desc}</p>
                <div>
                  <p className="eyebrow mb-4">Photos</p>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {selectedRoom.photos.map((photo) => (
                      <button
                        key={photo}
                        type="button"
                        onClick={() => setLightbox(photo)}
                        className="relative aspect-[4/3] overflow-hidden rounded-xl"
                      >
                        <Image
                          fill
                          src={`/gallery/${photo}`}
                          alt={`${selectedRoom.name} — ${photo}`}
                          className="object-cover transition hover:scale-105 hover:opacity-80"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="eyebrow mb-4">Équipements de cette salle</p>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {selectedRoom.equipment.map((item) => (
                      <li key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.03] p-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            fill
                            src={`/gallery/${equipmentImages[item] || selectedRoom.cover}`}
                            alt={item}
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm text-cream">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
                  <button
                    type="button"
                    onClick={() => goToForm('reservation', selectedRoom.name)}
                    className="btn-gold !px-4 !py-3 !text-[10px]"
                  >
                    Réserver cette salle <ArrowUpRight size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToForm('devis', selectedRoom.name)}
                    className="btn-ghost !px-4 !py-3 !text-[10px]"
                  >
                    Demander un devis
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-5"
          >
            <button type="button" className="absolute right-6 top-6 text-white" aria-label="Fermer">
              <X />
            </button>
            <Image
              src={`/gallery/${lightbox}`}
              alt="Agrandissement"
              width={1400}
              height={1000}
              className="max-h-[88vh] w-auto rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
