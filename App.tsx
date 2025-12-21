
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import AIChat from './components/AIChat';
import AdminDashboard from './components/AdminDashboard';
import DeliveryEstimator from './components/DeliveryEstimator';
import ItemDetailsModal from './components/ItemDetailsModal'; 
import TraiteurView from './components/TraiteurView';
import UpsellModal from './components/UpsellModal';
import Toast, { ToastType } from './components/Toast';
import { KhadyLogo } from './components/KhadyLogo';
import { playSound } from './utils/audio';
import { supabase } from './lib/supabase';
import { Page, MenuItem, CartItem, Review, Order, OrderStatus, PaymentMethod, MenuCategory } from './types';
import { MENU_ITEMS, REVIEWS as INITIAL_REVIEWS, RESTAURANT_INFO, DISTRICTS, LOGO_VIDEO_URL, BILLO_INFO } from './constants';
import { 
  Plus, Star, User, ShoppingBag, Save, Trash2, Trophy, MapPin, Phone, MessageSquare, Package, UserCircle, X, Sparkles, Camera, ClipboardList, SkipForward, Calendar, Gift, Users, Heart, ArrowLeft, ChevronRight, ShoppingCart, CreditCard, Search, Filter, Info
} from 'lucide-react';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [splashFade, setSplashFade] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [toast, setToast] = useState<{message: string, type: ToastType} | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('khadys_logged') === 'true');

  const [cart, setCart] = useState<CartItem[]>(() => JSON.parse(localStorage.getItem('khadys_cart') || '[]'));
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem('khadys_profile') || JSON.stringify({ name: '', phone: '', email: '', address: '', district: '', photo: null })));

  const [selectedItemForDetails, setSelectedItemForDetails] = useState<MenuItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'Tout'>('Tout');
  const [showUpsell, setShowUpsell] = useState(false);

  useEffect(() => {
    localStorage.setItem('khadys_cart', JSON.stringify(cart));
  }, [cart]);

  const closeSplash = () => {
    setSplashFade(true);
    setTimeout(() => setShowSplash(false), 800);
  };

  const showNotification = (message: string, type: ToastType = 'success') => setToast({ message, type });

  const categories: (MenuCategory | 'Tout')[] = ['Tout', 'Entree', 'Plat Africain', 'Plat Européen', 'Spécialité Maison', 'Dessert', 'Boisson'];

  const filteredItems = useMemo(() => {
    let result = items;
    if (currentPage === Page.BOX) return items.filter(i => i.category === 'Box');
    if (currentPage === Page.PACKS) return items.filter(i => i.category === 'Pack');
    if (activeCategory !== 'Tout') return items.filter(i => i.category === activeCategory);
    return result.filter(i => i.category !== 'Box' && i.category !== 'Pack');
  }, [items, activeCategory, currentPage]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const handleAddToCart = (item: MenuItem, quantity: number, instructions: string) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + quantity, instructions } : c));
    } else {
      setCart([...cart, { ...item, quantity, instructions }]);
    }
    playSound('pop');
    showNotification(`${item.name} ajouté !`);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
    playSound('pop');
  };

  const renderContent = () => {
    switch(currentPage) {
      case Page.HOME:
        return (
          <div className="pb-32 animate-fade-in w-full">
            <div className="flex justify-between items-center py-6 px-6 bg-brand-cream/80 backdrop-blur-md sticky top-0 z-40">
              <KhadyLogo />
              <div className="flex items-center gap-3">
                 <div className="text-right">
                    <p className="text-[10px] font-black text-brand-brown/40 uppercase tracking-widest mb-1">Salam!</p>
                    <p className="text-xs font-black text-brand-brown uppercase italic">Bienvenue 👋🏾</p>
                 </div>
                 <button onClick={() => setCurrentPage(Page.COMPTE)} className="w-12 h-12 rounded-2xl border-2 border-brand-brown/10 overflow-hidden shadow-lg bg-white p-0.5">
                    {profile.photo ? <img src={profile.photo} className="w-full h-full object-cover rounded-[0.8rem]" /> : <div className="w-full h-full flex items-center justify-center bg-brand-brown/5"><User size={20} className="text-brand-brown" /></div>}
                 </button>
              </div>
            </div>

            <div className="mt-8 px-6">
                <div className="relative w-full aspect-[16/10] rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white group" onClick={() => setSelectedItemForDetails(items.find(i => i.isPlatDuJour) || items[0])}>
                   <img src={items.find(i => i.isPlatDuJour)?.image || items[0].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                   <div className="absolute bottom-8 left-8 text-white">
                      <span className="bg-brand-orange text-[9px] font-black uppercase px-3 py-1 rounded-full mb-3 inline-block animate-bounce shadow-lg">Plat du Jour 🥘</span>
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-1">{items.find(i => i.isPlatDuJour)?.name || "Menu Spécial"}</h3>
                      <p className="text-brand-gold font-black text-lg">{items.find(i => i.isPlatDuJour)?.price || 3500} F</p>
                   </div>
                </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 px-6">
                <button onClick={() => setCurrentPage(Page.TRAITEUR)} className="col-span-2 bg-[#1A0F0D] h-32 rounded-[3rem] text-brand-gold flex items-center justify-between px-10 shadow-2xl group relative overflow-hidden active:scale-95 transition-all">
                   <div className="relative z-10">
                      <h4 className="font-black text-xl italic uppercase tracking-tighter leading-none mb-1">Traiteur</h4>
                      <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.2em]">Événements Prestige</p>
                   </div>
                   <div className="p-4 bg-brand-gold text-brand-brown rounded-2xl relative z-10 shadow-xl group-hover:rotate-12 transition-transform"><Calendar size={28} /></div>
                   <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full -mr-16 -mt-16 blur-xl"></div>
                </button>
                <button onClick={() => setCurrentPage(Page.MENU)} className="bg-brand-brown h-44 rounded-[4rem] text-brand-gold flex flex-col items-center justify-center gap-4 shadow-2xl transition-all active:scale-95 border-b-8 border-black/20 group">
                   <div className="p-4 bg-white/10 rounded-3xl"><ShoppingBag size={34} /></div>
                   <span className="font-black text-[11px] uppercase tracking-widest italic">La Carte</span>
                </button>
                <div className="grid grid-rows-2 gap-4">
                    <button onClick={() => setCurrentPage(Page.BOX)} className="bg-brand-orange rounded-[3rem] text-white flex items-center justify-center gap-4 font-black text-[10px] uppercase tracking-widest italic shadow-xl active:scale-95 transition-all">
                      <Package size={20} /> Box
                    </button>
                    <button onClick={() => setCurrentPage(Page.PACKS)} className="bg-brand-gold rounded-[3rem] text-brand-brown flex items-center justify-center gap-4 font-black text-[10px] uppercase tracking-widest italic shadow-xl active:scale-95 transition-all">
                      <Trophy size={20} /> Packs
                    </button>
                </div>
            </div>

            <div className="px-6 mt-12 mb-12"><DeliveryEstimator /></div>
            
            <div className="px-6 mb-24">
               <h3 className="text-3xl font-black text-brand-brown uppercase italic tracking-tighter mb-10">Avis Khady's ❤️</h3>
               <div className="relative h-[250px] flex justify-center">
                  {reviews.slice(0, 3).map((rev, idx) => (
                    <div key={rev.id} className="absolute w-full bg-white p-6 rounded-[3rem] shadow-2xl border border-gray-100 transition-all duration-500" style={{ zIndex: 3 - idx, transform: `scale(${1 - idx * 0.05}) translateY(${idx * 40}px)`, opacity: 1 - idx * 0.2 }}>
                        <div className="flex items-center gap-4 mb-4">
                          <img src={rev.image} className="w-12 h-12 rounded-2xl object-cover shadow-md" />
                          <div className="flex-1">
                            <h4 className="font-black text-[10px] text-brand-brown uppercase italic mb-1">{rev.name}</h4>
                            <div className="flex text-brand-gold">
                              {[...Array(5)].map((_, i) => <Star key={i} size={8} fill={i < rev.rating ? "currentColor" : "none"} stroke="currentColor" />)}
                            </div>
                          </div>
                        </div>
                        <p className="text-[12px] text-gray-600 italic font-bold">"{rev.comment}"</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        );

      case Page.MENU:
      case Page.BOX:
      case Page.PACKS:
        return (
          <div className="pb-32 animate-fade-in px-6">
            <div className="flex items-center justify-between py-10">
               <button onClick={() => setCurrentPage(Page.HOME)} className="p-4 bg-white rounded-2xl shadow-xl text-brand-brown active:scale-90 transition-transform"><ArrowLeft size={20}/></button>
               <h2 className="text-2xl font-black uppercase italic tracking-tighter text-brand-brown">
                  {currentPage === Page.MENU ? "La Carte" : currentPage === Page.BOX ? "Les Box" : "Les Packs"}
               </h2>
               <div className="w-12 h-12"></div>
            </div>

            {currentPage === Page.MENU && (
              <div className="flex gap-4 overflow-x-auto no-scrollbar mb-8 pb-4">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={`flex-shrink-0 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-brand-orange text-white shadow-lg scale-105' : 'bg-white text-brand-brown border border-brand-brown/5 shadow-md'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-5">
               {filteredItems.map(item => (
                 <div key={item.id} onClick={() => setSelectedItemForDetails(item)} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-brand-brown/5 active:scale-95 transition-all group">
                    <div className="relative aspect-square">
                       <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       {item.isPromo && <span className="absolute top-3 left-3 bg-red-500 text-white text-[8px] font-black uppercase px-2 py-1 rounded-lg animate-pulse">Promo</span>}
                    </div>
                    <div className="p-5">
                       <h4 className="font-black text-[10px] uppercase text-brand-brown truncate mb-1">{item.name}</h4>
                       <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-brand-orange italic">{item.price} F</span>
                          <button className="bg-brand-brown text-white p-2 rounded-xl"><Plus size={14}/></button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        );

      case Page.CART:
        return (
          <div className="pb-32 animate-fade-in px-6 flex flex-col min-h-[80vh]">
             <div className="flex items-center justify-between py-10">
               <h2 className="text-4xl font-black uppercase italic tracking-tighter text-brand-brown">Mon Panier</h2>
               <div className="bg-brand-orange/10 px-4 py-2 rounded-2xl text-brand-orange font-black text-[10px] uppercase tracking-widest">{cart.length} Articles</div>
             </div>

             {cart.length === 0 ? (
               <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                  <div className="p-10 bg-gray-100 rounded-full mb-6"><ShoppingCart size={64}/></div>
                  <p className="font-black uppercase italic tracking-widest text-sm">Votre panier est vide</p>
                  <button onClick={() => setCurrentPage(Page.MENU)} className="mt-8 text-brand-orange font-black uppercase text-[10px] tracking-[0.3em] underline">Découvrir le menu</button>
               </div>
             ) : (
               <>
                 <div className="space-y-4 mb-10">
                    {cart.map(item => (
                      <div key={item.id} className="bg-white p-5 rounded-[2.5rem] shadow-xl border border-brand-brown/5 flex items-center gap-4">
                         <img src={item.image} className="w-20 h-20 rounded-2xl object-cover" />
                         <div className="flex-1">
                            <h4 className="font-black text-xs uppercase text-brand-brown leading-none mb-1">{item.name}</h4>
                            <p className="text-[10px] font-bold text-gray-400 mb-2 italic">x{item.quantity} • {item.price * item.quantity} F</p>
                            <div className="flex gap-2">
                               <button onClick={() => removeFromCart(item.id)} className="text-[9px] font-black uppercase text-red-500 bg-red-50 px-3 py-1 rounded-lg">Retirer</button>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="bg-white rounded-[3.5rem] p-8 shadow-2xl border-4 border-white space-y-4 mb-20">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                       <span>Sous-total</span>
                       <span>{cartTotal} F</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                       <span>Livraison (Billo)</span>
                       <span>1.000 F</span>
                    </div>
                    <div className="h-px bg-gray-100 my-4"></div>
                    <div className="flex justify-between items-center">
                       <span className="font-black text-sm uppercase italic text-brand-brown">Total à payer</span>
                       <span className="text-3xl font-black italic text-brand-orange">{cartTotal + 1000} F</span>
                    </div>
                    <button 
                      onClick={() => setShowUpsell(true)}
                      className="w-full bg-brand-brown text-brand-gold py-6 rounded-[2.5rem] font-black uppercase shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 italic mt-6"
                    >
                       Confirmer la commande <ChevronRight size={20}/>
                    </button>
                 </div>
               </>
             )}
          </div>
        );

      case Page.COMPTE:
        return (
          <div className="pb-32 animate-fade-in px-6">
             <div className="py-12 flex flex-col items-center">
                <div className="relative mb-6">
                   <div className="w-32 h-32 rounded-[3.5rem] bg-brand-brown p-1 shadow-2xl border-4 border-white overflow-hidden">
                      {profile.photo ? <img src={profile.photo} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-white/5"><User size={48} className="text-white/20" /></div>}
                   </div>
                   <button className="absolute -bottom-2 -right-2 bg-brand-orange text-white p-3 rounded-2xl shadow-xl border-4 border-white active:scale-90"><Camera size={18}/></button>
                </div>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-brand-brown">{profile.name || "Gourmet Khady's"}</h2>
                <p className="text-[10px] font-black text-brand-orange uppercase tracking-[0.3em] mt-1">{profile.phone || "+227 -- -- -- --"}</p>
             </div>

             <div className="bg-[#1A0F0D] rounded-[3.5rem] p-8 shadow-2xl border-4 border-white mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
                <div className="flex justify-between items-start mb-8">
                   <div>
                      <h3 className="text-xl font-black text-brand-gold uppercase italic">Club Khady</h3>
                      <p className="text-[9px] text-white/40 uppercase tracking-widest mt-1">Programme de Fidélité</p>
                   </div>
                   <div className="bg-brand-gold text-brand-brown px-4 py-1.5 rounded-full text-[10px] font-black italic">1.250 pts</div>
                </div>
                <div className="bg-white/5 h-2 rounded-full overflow-hidden mb-3">
                   <div className="bg-brand-gold h-full w-[65%]"></div>
                </div>
                <p className="text-[9px] text-white/50 font-bold italic">Plus que 750 pts pour un repas gratuit ! 🥘</p>
             </div>

             <div className="space-y-4">
                {[
                  { icon: ClipboardList, label: "Mes Commandes", action: () => {} },
                  { icon: MapPin, label: "Mes Adresses", action: () => {} },
                  { icon: Gift, label: "Parrainer un ami", action: () => {} },
                  { icon: Info, label: "À propos de nous", action: () => {} },
                  { icon: Trash2, label: "Se déconnecter", action: () => { setIsLoggedIn(false); localStorage.removeItem('khadys_logged'); setCurrentPage(Page.HOME); }, color: 'text-red-500' }
                ].map((item, idx) => (
                  <button key={idx} onClick={item.action} className="w-full bg-white p-6 rounded-[2.5rem] shadow-lg border border-brand-brown/5 flex items-center justify-between group active:scale-[0.98] transition-all">
                     <div className="flex items-center gap-5">
                        <div className={`p-4 bg-gray-50 rounded-2xl ${item.color || 'text-brand-brown'} group-hover:bg-brand-orange group-hover:text-white transition-all`}><item.icon size={20}/></div>
                        <span className={`font-black uppercase text-[11px] tracking-widest italic ${item.color || 'text-brand-brown'}`}>{item.label}</span>
                     </div>
                     <ChevronRight size={18} className="text-gray-300" />
                  </button>
                ))}
             </div>
          </div>
        );

      case Page.TRAITEUR:
        return <TraiteurView />;
      default:
        return <div className="p-20 text-center font-black uppercase text-brand-brown italic">À venir...</div>;
    }
  };

  if (showSplash) {
    return (
      <div className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000 ${splashFade ? 'opacity-0' : 'opacity-100'}`}>
        <video autoPlay muted playsInline className="w-full h-full object-cover" onEnded={closeSplash} onError={closeSplash}>
          <source src={LOGO_VIDEO_URL} type="video/mp4" />
        </video>
        <button onClick={closeSplash} className="absolute bottom-10 right-6 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border border-white/20 active:scale-95 transition-all">
          Passer <SkipForward size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream/10 shadow-2xl overflow-hidden relative font-sans flex flex-col items-center">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth flex flex-col items-center w-full">
        <div className="w-full max-w-lg mx-auto bg-brand-cream/10 min-h-screen relative">{renderContent()}</div>
      </div>
      <Navbar currentPage={currentPage} setPage={setCurrentPage} cartCount={cart.length} />
      <AIChat />
      <ItemDetailsModal item={selectedItemForDetails} isOpen={!!selectedItemForDetails} onClose={() => setSelectedItemForDetails(null)} onAddToCart={handleAddToCart} />
      <UpsellModal isOpen={showUpsell} onClose={() => setShowUpsell(false)} suggestions={items.filter(i => i.category === 'Boisson' || i.category === 'Dessert').slice(0, 3)} onAdd={(it) => { handleAddToCart(it, 1, ''); setShowUpsell(false); }} onProceed={() => { setShowUpsell(false); alert("Commande validée ! (Simulation)"); setCart([]); setCurrentPage(Page.HOME); playSound('cash'); }} />
    </div>
  );
};

export default App;
