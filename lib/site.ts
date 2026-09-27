export const WHATSAPP_URL = 'https://wa.me/330695697778';
export const WHATSAPP_DISPLAY = '+33 06 95 69 77 78';
export const PHONE_TN = '+21658168903';
export const SCHOOL_URL = 'https://beautymondialacademy.com/';

export const socialLinks = [
  {label: 'Instagram', href: 'https://www.instagram.com/beauty.mondial.academy/'},
  {label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61569098990227'},
  {label: 'Pinterest', href: 'https://www.pinterest.com/beautymondialacademy/'},
  {label: 'TikTok', href: 'https://www.tiktok.com/@beauty_mondial_academy'},
] as const;

export type RoomSlug = 'petite-salle' | 'grande-salle';

export const rooms = [
  {
    id: 'petite-salle' as RoomSlug,
    name: 'Petite Salle',
    eyebrow: 'Formation & ateliers',
    desc: 'L’espace idéal pour les formations en petit comité.',
    cover: 'fauteuils-professionnels.jpeg',
    photos: [
      'fauteuils-professionnels.jpeg',
      'tables-de-massage.jpeg',
      'salle-attente-lampe-eclairage.jpeg',
      'hydrafacial.jpeg',
      'vapozone-visage.jpeg',
      'radiofrequence.jpeg',
      'tv-retroprojecteur.jpeg',
      'mobilier-esthetique.jpeg',
    ],
    highlights: [
      '2 tables de massage',
      'Éclairage professionnel',
      'Hydrafacial & Vapozone',
      'Radio fréquence',
      'TV & Mobilier',
    ],
    equipment: [
      'Lampe d’éclairage professionnelle',
      'Vapozone visage',
      'Hydrafacial',
      'Radiofréquence',
      'Tables de massage',
      'Mobilier esthétique',
      'Fauteuils professionnels',
      'TV & rétroprojecteur',
      'Connexion WiFi',
      'Climatisation',
    ],
  },
  {
    id: 'grande-salle' as RoomSlug,
    name: 'Grande Salle',
    eyebrow: 'Formations & masterclass',
    desc: 'L’espace généreux pour les sessions en groupe.',
    cover: 'tables-de-massage.jpeg',
    photos: [
      'tables-de-massage.jpeg',
      'tv-retroprojecteur.jpeg',
      'baffles-bluetooth.jpeg',
      'cuisine-equipee.jpeg',
      'machine-cafe-the.jpeg',
      'equipement-coiffure.jpeg',
      'lipoactivation.jpeg',
      'madero-therapy.webp',
      'bloc-sanitaire.jpeg',
      'climatisation.jpeg',
    ],
    highlights: [
      '3 tables de massage',
      'Équipements complets',
      'Rétroprojecteur & TV',
      'Baffles Bluetooth',
      'Cuisine à proximité',
    ],
    equipment: [
      'Tables de massage',
      'Équipement coiffure',
      'Lipoactivation',
      'Madero Therapy',
      'TV & rétroprojecteur',
      'Baffles Bluetooth',
      'Cuisine équipée',
      'Machine à café & thé',
      'Bloc sanitaire',
      'Connexion WiFi',
      'Climatisation',
      'Salle d’attente',
    ],
  },
] as const;
