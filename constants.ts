
import { District, MenuItem, Review } from './types';

export const DELIVERY_TIME = "30 à 45 mn";
export const ADMIN_PASSWORD = "khadysfood";

export const LOGO_URL = "https://i.ibb.co/9kzdQR1Z/1766221770860.jpg"; 
export const LOGO_VIDEO_URL = "https://v.ft-static.com/video/469c3a3809e5b7226252994c5026210b/downloads/default.mp4";

export const BILLO_LOGO_URL = "https://i.ibb.co/YFftbm2X/1765927283591.jpg";

export const RESTAURANT_INFO = {
  name: "Khady's Food & Event",
  slogan: "Manger en un clic !",
  description: "Référence de la gastronomie africaine premium à Niamey. Tradition et modernité pour vos repas quotidiens et vos événements.",
  phones: ["+227 74 44 16 21", "+227 70 03 25 52"],
  whatsapp: "+227 74 44 16 21",
  location: "Boutique Digitale - Niamey, Niger",
  socials: {
    facebook: "https://facebook.com/khadysfood",
    instagram: "https://instagram.com/khadys_food",
    tiktok: "https://tiktok.com/@khadys.food.event"
  },
  hours: {
    week: "Lun - Sam : 08h - 22h",
    sunday: "Dimanche : 10h - 22h"
  }
};

export const TRAITEUR_CONDITIONS = [
  { title: "Réservation", detail: "Minimum 7 jours avant l'événement." },
  { title: "Acompte", detail: "75% à la commande, le solde le jour J." },
  { title: "Annulation", detail: "Acompte non remboursable à moins de 72h." },
  { title: "Transport", detail: "Frais logistiques selon la zone à Niamey." }
];

export const BILLO_INFO = {
  name: "Billo Express",
  slogan: "Rapide - Fiable - Sécurisé",
  phone: "+227 92 08 08 22",
  whatsapp: "+227 92 08 08 22",
  fridayRule: "Livraisons suspendues le vendredi de 12h00 à 14h30.",
  tarifs: {
    centre: { day: 1000, night: 1500 },
    peripherie: { day: 1500, night: 2000 }
  }
};

export const DISTRICTS: District[] = [
  { name: 'Plateau', zone: 'center' },
  { name: 'Cité Fayçal', zone: 'center' },
  { name: 'Dar-Es-Salam', zone: 'center' },
  { name: 'Poudrière', zone: 'center' },
  { name: 'Goudel', zone: 'periphery' },
  { name: 'Rive Droite', zone: 'periphery' },
  { name: 'Niamey 2000', zone: 'periphery' },
  { name: 'Airport', zone: 'periphery' }
];

export const REVIEWS: Review[] = [
  { id: '1', name: 'Ousmane M.', comment: 'Le meilleur doukounou de Niamey, une explosion de saveurs authentiques ! Jamais déçue.', rating: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', date: 'Aujourd\'hui' },
  { id: '2', name: 'Hadiza S.', comment: 'Les pastels sont croustillants, livraison rapide avec Billo Express.', rating: 5, image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200', date: 'Hier' },
  { id: '3', name: 'Abdoul R.', comment: 'Tiep rouge incroyable, le goût du Sénégal à Niamey ! Bravo Khady.', rating: 5, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200', date: 'Il y a 3 jours' },
  { id: '4', name: 'Mariam K.', comment: 'Le service traiteur pour mon mariage était exceptionnel. Merci !', rating: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', date: 'Il y a 1 semaine' }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- ENTRÉES (8) ---
  { id: 'en1', name: 'Pastels Poisson (6pcs)', description: 'Beignets croustillants farcis au poisson épicé.', price: 1500, image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce99?w=800', category: 'Entree', rating: 5, isAvailable: true, isSpicy: true },
  { id: 'en2', name: 'Aloko Solo', description: 'Bananes plantains frites dorées.', price: 1000, image: 'https://images.unsplash.com/photo-1614091214975-d368e5971430?w=800', category: 'Entree', rating: 5, isAvailable: true, isVegetarian: true },
  { id: 'en3', name: 'Nems Poulet (4pcs)', description: 'Nems croustillants faits maison.', price: 2000, image: 'https://images.unsplash.com/photo-1544333346-64e4fe1820af?w=800', category: 'Entree', rating: 4, isAvailable: true },
  { id: 'en4', name: 'Accras de Morue', description: 'Beignets savoureux à la morue.', price: 2000, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800', category: 'Entree', rating: 5, isAvailable: true, isSpicy: true },
  { id: 'en5', name: 'Samoussas Viande', description: 'Triangles de pâte croustillante farcis au bœuf.', price: 1500, image: 'https://images.unsplash.com/photo-1601050690011-098e945532d0?w=800', category: 'Entree', rating: 4, isAvailable: true },
  { id: 'en6', name: 'Salade Khady', description: 'Mélange de crudités fraîches et herbes.', price: 1500, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Entree', rating: 5, isAvailable: true, isVegetarian: true },
  { id: 'en7', name: 'Brochettes Gésiers', description: 'Gésiers grillés façon street food.', price: 2500, image: 'https://images.unsplash.com/photo-1529692236671-f1f6e9460272?w=800', category: 'Entree', rating: 5, isAvailable: true, isSpicy: true },
  { id: 'en8', name: 'Boudin Noir', description: 'Spécialité maison épicée.', price: 3000, image: 'https://images.unsplash.com/photo-1593001872095-7d5b4696144e?w=800', category: 'Entree', rating: 4, isAvailable: true, isSpicy: true },

  // --- PLATS AFRICAINS (12) ---
  { id: 'af1', name: 'Tiep Bou Dien Rouge', description: 'Le classique riz au poisson sénégalais.', price: 3500, image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800', category: 'Plat Africain', rating: 5, isAvailable: true, isPlatDuJour: true },
  { id: 'af2', name: 'Doukounou & Poisson', description: 'Bouillie de maïs fermenté avec poisson frit.', price: 3000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Plat Africain', rating: 5, isAvailable: true, isSpécialitéMaison: true },
  { id: 'af3', name: 'Attiéké Poisson Grillé', description: 'Semoule de manioc avec tilapia grillé.', price: 3500, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Plat Africain', rating: 5, isAvailable: true },
  { id: 'af4', name: 'Mafé Bœuf', description: 'Riz à la sauce arachide onctueuse.', price: 3000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Plat Africain', rating: 5, isAvailable: true, isSpicy: true },
  { id: 'af5', name: 'Yassa Poulet', description: 'Poulet mariné au citron et oignons.', price: 3000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Plat Africain', rating: 5, isAvailable: true },
  { id: 'af6', name: 'Garba (Moyenne)', description: 'Attiéké, thon frit, piment et huile.', price: 1500, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Plat Africain', rating: 4, isAvailable: true, isSpicy: true },
  { id: 'af7', name: 'Saka Saka', description: 'Feuilles de manioc pilées au poisson fumé.', price: 3000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Plat Africain', rating: 5, isAvailable: true },
  { id: 'af8', name: 'Tchep Blanc', description: 'Riz au poisson blanc et légumes.', price: 3500, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Plat Africain', rating: 5, isAvailable: true },
  { id: 'af9', name: 'Dibi Mouton', description: 'Viande de mouton grillée au feu de bois.', price: 5000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Plat Africain', rating: 5, isAvailable: true },
  { id: 'af10', name: 'Okra Soup (Gombo)', description: 'Sauce gombo avec viande et crevettes.', price: 4000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Plat Africain', rating: 5, isAvailable: true, isSpicy: true },
  { id: 'af11', name: 'Kedjenou de Poulet', description: 'Ragoût de poulet cuit à l\'étouffée.', price: 4500, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Plat Africain', rating: 5, isAvailable: true },
  { id: 'af12', name: 'Alloco & Œufs', description: 'Bananes frites servies avec œufs durs.', price: 1500, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Plat Africain', rating: 4, isAvailable: true, isVegetarian: true },

  // --- PLATS EUROPÉENS (8) ---
  { id: 'eu1', name: 'Steak Frites Maison', description: 'Bœuf grillé avec frites fraîches.', price: 5500, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', category: 'Plat Européen', rating: 5, isAvailable: true },
  { id: 'eu2', name: 'Burger Khady', description: 'Burger gourmet au bœuf et sauce maison.', price: 4500, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800', category: 'Plat Européen', rating: 5, isAvailable: true },
  { id: 'eu3', name: 'Pâtes Carbonara', description: 'Pâtes crémeuses au lardon de bœuf.', price: 4000, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800', category: 'Plat Européen', rating: 4, isAvailable: true },
  { id: 'eu4', name: 'Escalope de Poulet', description: 'Poulet pané servi avec purée.', price: 4500, image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800', category: 'Plat Européen', rating: 5, isAvailable: true },
  { id: 'eu5', name: 'Lasagnes Maison', description: 'Bolognaise fondante et béchamel.', price: 5000, image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800', category: 'Plat Européen', rating: 5, isAvailable: true },
  { id: 'eu6', name: 'Salade César Africaine', description: 'Poulet grillé, croûtons et sauce épicée.', price: 3500, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800', category: 'Plat Européen', rating: 4, isAvailable: true },
  { id: 'eu7', name: 'Poisson Meunière', description: 'Filet de capitaine au citron et frites.', price: 6000, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800', category: 'Plat Européen', rating: 5, isAvailable: true },
  { id: 'eu8', name: 'Omelette Garnie', description: 'Aux légumes et fromage, frites.', price: 2500, image: 'https://images.unsplash.com/photo-1510703815042-4f3317789420?w=800', category: 'Plat Européen', rating: 4, isAvailable: true, isVegetarian: true },

  // --- BOISSONS (8) ---
  { id: 'bo1', name: 'Bissap Rouge Maison', description: 'Infusion d\'hibiscus bio.', price: 500, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=800', category: 'Boisson', rating: 5, isAvailable: true },
  { id: 'bo2', name: 'Jus de Gingembre', description: 'Rafraîchissant et piquant.', price: 500, image: 'https://images.unsplash.com/photo-1622484210820-c41935967000?w=800', category: 'Boisson', rating: 5, isAvailable: true, isSpicy: true },
  { id: 'bo3', name: 'Jus de Baobab', description: 'Onctueux et riche en vitamines.', price: 500, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800', category: 'Boisson', rating: 5, isAvailable: true },
  { id: 'bo4', name: 'Coca-Cola (33cl)', description: 'Soda classique.', price: 700, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800', category: 'Boisson', rating: 4, isAvailable: true },
  { id: 'bo5', name: 'Eau Minérale (1.5L)', description: 'Eau de source fraîche.', price: 500, image: 'https://images.unsplash.com/photo-1523362628742-0c26015ebbc2?w=800', category: 'Boisson', rating: 5, isAvailable: true },
  { id: 'bo6', name: 'Fanta Orange', description: 'Soda à l\'orange.', price: 700, image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=800', category: 'Boisson', rating: 4, isAvailable: true },
  { id: 'bo7', name: 'Citronnade Maison', description: 'Citrons frais et menthe.', price: 1000, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800', category: 'Boisson', rating: 5, isAvailable: true },
  { id: 'bo8', name: 'Jus de Tamarin', description: 'Goût acidulé authentique.', price: 500, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=800', category: 'Boisson', rating: 5, isAvailable: true },

  // --- DESSERTS (6) ---
  { id: 'de1', name: 'Dèguè au Yaourt', description: 'Couscous de mil au yaourt frais.', price: 1000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Dessert', rating: 5, isAvailable: true },
  { id: 'de2', name: 'Thiakry Premium', description: 'Mil et crème onctueuse à la vanille.', price: 1200, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Dessert', rating: 5, isAvailable: true },
  { id: 'de3', name: 'Salade de Fruits Exotiques', description: 'Mangue, papaye et ananas frais.', price: 1500, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Dessert', rating: 5, isAvailable: true, isVegetarian: true },
  { id: 'de4', name: 'Crêpe au Chocolat', description: 'Faites maison, chocolat fondant.', price: 1500, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Dessert', rating: 4, isAvailable: true },
  { id: 'de5', name: 'Mousse au Chocolat', description: 'Légère et aérienne.', price: 2000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Dessert', rating: 5, isAvailable: true },
  { id: 'de6', name: 'Gâteau Banane', description: 'Moelleux à la banane mûre.', price: 1500, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Dessert', rating: 4, isAvailable: true },

  // --- BOX & PACKS (8) ---
  { id: 'bx1', name: 'Box Solo (Déjeuner)', description: 'Entrée + Plat + Boisson.', price: 5000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Box', rating: 5, isAvailable: true },
  { id: 'bx2', name: 'Box Duo (Dîner)', description: '2 Plats + 2 Desserts + 2 Boissons.', price: 9000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Box', rating: 5, isAvailable: true },
  { id: 'bx3', name: 'Pack Famille (5 pers)', description: 'Grand plateau varié.', price: 20000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Pack', rating: 5, isAvailable: true, includes: ['Riz Sénégallais', 'Poulet Entier', 'Aloko', 'Bissap 1.5L'], minPeople: 5 },
  { id: 'pk1', name: 'Pack Office (10 pers)', description: 'Idéal réunion.', price: 45000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Pack', rating: 5, isAvailable: true, includes: ['Mini-Pastels (30)', 'Plateau Tiep', 'Pack de sodas'], minPeople: 10 },
  { id: 'pk2', name: 'Pack Festif (20 pers)', description: 'Pour vos petits événements.', price: 85000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Pack', rating: 5, isAvailable: true, includes: ['Buffet Africain', 'Service Soft Drink', 'Desserts Variés'], minPeople: 20 },
  { id: 'bx4', name: 'Box Pastel Mix (20pcs)', description: 'Poisson & Viande.', price: 5000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Box', rating: 5, isAvailable: true, isPromo: true },
  { id: 'bx5', name: 'Box Végé', description: 'Riz légumes, aloko, jus frais.', price: 4000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Box', rating: 5, isAvailable: true, isVegetarian: true },
  { id: 'bx6', name: 'Pack Etudiant', description: 'Plat simple + eau.', price: 2500, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', category: 'Box', rating: 4, isAvailable: true }
];
