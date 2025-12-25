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
    center: { day: 1000, night: 1500 },
    periphery: { day: 2000, night: 2500 }
  },
  fridayRule: "Jummua'h Mubarak : les livraisons s'arrêtent à 12h et reprennent à 15h pour la prière."
};

export const RESTAURANT_INFO = {
  name: "Khady's Food & Event",
  slogan: "Le goût de Niamey en un clic !",
  description: "Référence de la gastronomie africaine premium à Niamey.",
  phones: ["+227 74 44 16 21", "+227 70 03 25 52"],
  whatsapp: "+227 74 44 16 21",
  location: "Plateau, Niamey, Niger",
  socials: {
    facebook: "https://facebook.com/khadysfood",
    instagram: "https://instagram.com/khadys_food",
    tiktok: "https://tiktok.com/@khadys.food.event"
  }
};

export const REVIEWS: Review[] = [
  { 
    id: '1', 
    name: 'Ousmane M.', 
    comment: 'Le meilleur Tiep de tout Niamey ! Le service Billo est impeccable.', 
    rating: 5, 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', 
    date: 'Aujourd\'hui' 
  },
  { 
    id: '2', 
    name: 'Hadiza S.', 
    comment: 'Les Box Sauces ont sauvé mon dîner de famille. Merci Khady !', 
    rating: 5, 
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200', 
    date: 'Hier' 
  },
  {
    id: '3',
    name: 'Moussa B.',
    comment: 'Une expérience premium au cœur du Plateau. Je recommande à 100%.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    date: 'Il y a 2 jours'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  { id: 'af1', name: 'Tiep Bou Dien Rouge', description: 'Riz au poisson sénégalais premium, le vrai goût du pays.', price: 3500, image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800', category: 'Plat Africain', rating: 5, isAvailable: true, isPlatDuJour: true },
  { id: 'af2', name: 'Doukounou & Poisson', description: 'Bouillie de maïs fermenté et poisson frit croustillant.', price: 3000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Plat Africain', rating: 5, isAvailable: true, isSpécialitéMaison: true },
  { id: 'bx1', name: 'Box Sauce Gombo', description: 'Format familial riche en saveurs. Prête à réchauffer.', price: 5000, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800', category: 'Box Sauce', rating: 5, isAvailable: true },
  { id: 'bx2', name: 'Box Sauce Arachide', description: 'Sauce onctueuse avec viande tendre, format 4 personnes.', price: 4500, image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800', category: 'Box Sauce', rating: 5, isAvailable: true },
  { id: 'pk1', name: 'Pack Mariage Gold', description: 'Buffet complet premium pour vos grands événements.', price: 250000, image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800', category: 'Pack', rating: 5, isAvailable: true, minPeople: 50, includes: ['3 Plats au choix', 'Boissons locales', 'Service'] },
  { id: 'bo1', name: 'Bissap Rouge Glacé', description: 'Infusion hibiscus maison, rafraîchissante.', price: 500, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=800', category: 'Boisson', rating: 5, isAvailable: true }
];

export const DISTRICTS: District[] = [
  { name: 'Plateau', zone: 'center' },
  { name: 'Cité Fayçal', zone: 'center' },
  { name: 'Goudel', zone: 'periphery' },
  { name: 'Yantala', zone: 'center' },
  { name: 'Niamey 2000', zone: 'periphery' }
];

export const TRAITEUR_CONDITIONS = [
  { title: "Réservation", detail: "Minimum 7 jours à l'avance pour garantir la fraîcheur." },
  { title: "Qualité Premium", detail: "Produits locaux rigoureusement sélectionnés." },
  { title: "Service Express", detail: "Ponctualité garantie pour tous vos événements." },
  { title: "Flexibilité", detail: "Adaptation à tous les lieux de Niamey." }
];