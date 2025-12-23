import { District, MenuItem, Review } from './types';

export const DELIVERY_TIME = "30 à 45 mn";
export const ADMIN_PASSWORD = "khadysfood";

export const LOGO_URL = "https://i.ibb.co/9kzdQR1Z/1766221770860.jpg"; 
export const LOGO_VIDEO_URL = "https://v.ft-static.com/video/469c3a3809e5b7226252994c5026210b/downloads/default.mp4";

export const BILLO_LOGO_URL = "https://i.ibb.co/YFftbm2X/1765927283591.jpg";

export const BILLO_INFO = {
  name: "Billo Express",
  slogan: "Livraison éclair à Niamey",
  tarifs: {
    centre: { day: 1000, night: 1500 },
    peripherie: { day: 2000, night: 2500 }
  },
  fridayRule: "Le vendredi : Livraison gratuite pour toute commande de Tiep Bou Dien !"
};

export const RESTAURANT_INFO = {
  name: "Khady's Food & Event",
  slogan: "Manger en un clic !",
  description: "Référence de la gastronomie africaine premium à Niamey.",
  phones: ["+227 74 44 16 21", "+227 70 03 25 52"],
  whatsapp: "+227 74 44 16 21",
  location: "Niamey, Niger",
  socials: {
    facebook: "https://facebook.com/khadysfood",
    instagram: "https://instagram.com/khadys_food",
    tiktok: "https://tiktok.com/@khadys.food.event"
  }
};

export const REVIEWS: Review[] = [
  { id: '1', name: 'Ousmane M.', comment: 'Le meilleur doukounou de Niamey !', rating: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', date: 'Aujourd\'hui' },
  { id: '2', name: 'Hadiza S.', comment: 'Livraison Billo super rapide !', rating: 5, image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200', date: 'Hier' }
];

export const MENU_ITEMS: MenuItem[] = [
  { id: 'af1', name: 'Tiep Bou Dien Rouge', description: 'Riz au poisson sénégalais premium.', price: 3500, image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800', category: 'Plat Africain', rating: 5, isAvailable: true, isPlatDuJour: true },
  { id: 'af2', name: 'Doukounou & Poisson', description: 'Bouillie de maïs et poisson frit.', price: 3000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Plat Africain', rating: 5, isAvailable: true, isSpécialitéMaison: true },
  { id: 'bo1', name: 'Bissap Rouge', description: 'Infusion hibiscus.', price: 500, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=800', category: 'Boisson', rating: 5, isAvailable: true }
];

export const DISTRICTS: District[] = [
  { name: 'Plateau', zone: 'center' },
  { name: 'Cité Fayçal', zone: 'center' },
  { name: 'Goudel', zone: 'periphery' }
];

export const TRAITEUR_CONDITIONS = [
  { title: "Réservation", detail: "Minimum 7 jours à l'avance pour garantir la fraîcheur." },
  { title: "Qualité Premium", detail: "Produits locaux rigoureusement sélectionnés." },
  { title: "Service Express", detail: "Ponctualité garantie pour tous vos événements." },
  { title: "Flexibilité", detail: "Adaptation à tous les lieux de Niamey." }
];