import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import AIChat from './components/AIChat';
import AdminDashboard from './components/AdminDashboard';
import DeliveryEstimator from './components/DeliveryEstimator';
import ItemDetailsModal from './components/ItemDetailsModal'; 
import TraiteurView from './components/TraiteurView';
import UpsellModal from './components/UpsellModal';
import OrderTracking from './components/OrderTracking';
import Receipt from './components/Receipt';
import Toast, { ToastType } from './components/Toast';
import { KhadyLogo } from './components/KhadyLogo';
import { playSound } from './utils/audio';
import { Page, MenuItem, CartItem, Review, Order } from './types';
import { MENU_ITEMS, REVIEWS, LOGO_VIDEO_URL, RESTAURANT_INFO } from './constants';
import { 
  User, Trophy, Package, Calendar, SkipForward, ArrowLeft, Camera, Star, ChevronRight, Settings, UtensilsCrossed, Sparkles, Heart
} from 'lucide-react';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [splashFade, setSplashFade] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [toast, setToast] = useState<{message: string, type: ToastType} | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('khadys_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('khadys_profile');
    return saved ? JSON.parse(saved) : { name: 'Gourmet Niamey', phone: '', photo: null };
  });

  const [selectedItemForDetails, setSelectedItemForDetails] = useState<MenuItem | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const heroTimer = setInterval(() => setHeroIdx(prev => (prev + 1) % 3), 6000);
    return () => clearInterval(heroTimer);
  }, []);

  useEffect(() => {
    localStorage.setItem('khadys_cart', JSON.stringify(cart));
  }, [cart]);

  const closeSplash = () => {
    setSplashFade(true);
    setTimeout(() => setShowSplash(false), 800);
  };

  const showNotification = (message: string, type: ToastType = 'success') => setToast({ message, type });

  const filteredItems = useMemo(() => {
    if (currentPage === Page.BOX) return items.filter(i => i.category === 'Box Sauce' || i.category === 'Box Repas');
    if (currentPage === Page.PACKS) return items.filter(i => i.category === 'Pack' || i.category === 'Buffet');
    return items;
  }, [items, currentPage]);

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

  const handleCheckout = () => {
    const newOrder: Order = {
      id: `KH-${Math.floor(Math.random() * 9000) + 1000}`,
      customerName: profile.name,
      phone: profile.phone || 'Non renseigné',
      address: 'Niamey, Plateau',
      district: 'Plateau',
      items: [...cart],
      total: cart.reduce((acc, i) => acc + (i.price * i.quantity), 0),
      deliveryFee: 1000,
      status: 'RECEIVED',
      paymentMethod: 'CASH',
      timestamp: new Date().toISOString()
    };
    
    setOrders([newOrder, ...orders]);
    setActiveOrder(newOrder);
    setCart([]);
    setShowUpsell(false);
    playSound('cash');
    setCurrentPage(Page.COMMANDES);
    showNotification("Commande reçue ! Suivez votre livreur.", "info");
  };

  const renderContent = () => {
    if (currentPage === Page.ADMIN) {
      return <AdminDashboard items={items} setItems={setItems} orders={orders} setOrders={setOrders} reviews={reviews} setReviews={setReviews} onExit={() => setCurrentPage(Page.HOME)} />;
    }

    switch(currentPage) {
      case Page.HOME:
        return (
          <div className="pb-32 animate-fade-in w-full">
            {/* Header avec main animée restaurée */}
            <div className="flex justify-between items-center py-6 px-6 bg-brand-light/80 backdrop-blur-md sticky top-0 z-40 border-b border-brand-brown/5">
              <KhadyLogo />
              <div className="flex items-center gap-4">
                 <div className="text-right flex flex-col items-end">
                    <div className="bg-brand-orange/10 px-3 py-1 rounded-full mb-1">
                      <p className="text-[9px] font-black uppercase text-brand-orange tracking-widest leading-none">
                        Salam <span className="inline-block animate-wave text-[11px]">👋🏾</span>
                      </p>
                    </div>
                    <p className="text-[8px] font-black uppercase text-brand-brown tracking-tighter opacity-40">Bonjour, Niamey !</p>
                 </div>
                 <button onClick={() => setCurrentPage(Page.COMPTE)} className="w-12 h-12 rounded-2xl border-2 border-brand-brown/10 overflow-hidden shadow-lg bg-white p-0.5 active:scale-90 transition-transform">
                   {profile.photo ? <img src={profile.photo} className="w-full h-full object-cover rounded-xl" /> : <User className="w-full h-full p-2 text-brand-brown/30" />}
                 </button>
              </div>
            </div>

            {/* Hero Section */}
            <div className="mt-6 px-6">
               <div className="relative w-full aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                  <img src={items[heroIdx]?.image} className="w-full h-full object-cover transition-all duration-1000" alt="Hero" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                     <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-1 leading-none">{items[heroIdx]?.name}</h3>
                     <p className="text-brand-gold text-[9px] font-black uppercase tracking-widest">Le goût authentique du Niger</p>
                  </div>
               </div>
            </div>

            {/* SECTION MARQUEE (LES PLATS QUI DÉFILENT) */}
            <div className="mt-8 overflow-hidden bg-brand-brown py-5 relative marquee-container">
               <div className="flex animate-marquee whitespace-nowrap gap-8">
                  {[...items, ...items].map((item, idx) => (
                    <div key={idx} className="inline-flex items-center gap-4 bg-white/5 rounded-full pl-2 pr-8 py-2 border border-white/5 backdrop-blur-sm">
                       <img src={item.image} className="w-12 h-12 rounded-full object-cover border-2 border-brand-gold shadow-lg" alt={item.name} />
                       <div className="flex flex-col">
                          <span className="text-white font-black text-[11px] uppercase italic tracking-tight">{item.name}</span>
                          <span className="text-brand-gold font-black text-[10px]">{item.price} F</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Actions Rapides */}
            <div className="mt-10 grid grid-cols-2 gap-4 px-6">
                <button onClick={() => setCurrentPage(Page.MENU)} className="bg-brand-brown h-44 rounded-[3.5rem] text-brand-gold flex flex-col items-center justify-center gap-4 shadow-2xl active:scale-95 transition-all border-b-8 border-black/20">
                   <div className="p-5 bg-white/10 rounded-3xl"><UtensilsCrossed size={36} /></div>
                   <span className="font-black text-[11px] uppercase tracking-widest italic">La Carte</span>
                </button>
                <div className="grid grid-rows-2 gap-4">
                    <button onClick={() => setCurrentPage(Page.BOX)} className="bg-brand-orange text-white rounded-[2.5rem] flex items-center justify-center gap-4 font-black text-[10px] uppercase tracking-widest italic shadow-xl active:scale-95 transition-all">
                      <Package size={22} /> Box Sauce
                    </button>
                    <button onClick={() => setCurrentPage(Page.TRAITEUR)} className="bg-brand-gold text-brand-brown rounded-[2.5rem] flex items-center justify-center gap-4 font-black text-[10px] uppercase tracking-widest italic shadow-xl active:scale-95 transition-all">
                      <Calendar size={22} /> Traiteur
                    </button>
                </div>
            </div>

            {/* SECTION AVIS CLIENTS : POSITION 1, 2, 3 */}
            <div className="mt-16 px-6">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="font-black text-xl uppercase italic tracking-tighter text-brand-brown flex items-center gap-3">
                    <Heart className="text-brand-orange fill-brand-orange" size={20} />
                    Top Avis Clients
                  </h3>
                  <div className="flex gap-1 text-brand-gold">
                    <Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/>
                  </div>
               </div>
               
               <div className="space-y-6">
                  {reviews.slice(0, 3).map((rev, idx) => (
                    <div key={rev.id} className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-brand-brown/5 relative group overflow-hidden animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                       <div className={`absolute top-0 right-0 w-16 h-16 flex items-center justify-center rounded-bl-[2.5rem] font-black italic text-xl shadow-inner ${idx === 0 ? 'bg-brand-gold text-brand-brown' : idx === 1 ? 'bg-brand-orange text-white' : 'bg-brand-brown text-white'}`}>
                          #{idx + 1}
                       </div>
                       
                       <div className="flex items-center gap-5 mb-4">
                          <img src={rev.image} className="w-14 h-14 rounded-full object-cover border-4 border-brand-cream shadow-md" alt={rev.name} />
                          <div>
                             <p className="text-xs font-black uppercase text-brand-brown tracking-tight">{rev.name}</p>
                             <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{rev.date}</p>
                          </div>
                       </div>
                       <p className="text-xs font-bold text-gray-500 italic leading-relaxed pr-10">"{rev.comment}"</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* IA Khady Promo */}
            <div className="mt-12 px-6">
               <div className="bg-gradient-to-r from-brand-brown to-black p-8 rounded-[3rem] shadow-2xl flex items-center justify-between group relative overflow-hidden">
                  <div className="relative z-10 text-left">
                     <h4 className="text-white font-black text-lg italic uppercase leading-none mb-1 tracking-tighter">Pas d'idée ?</h4>
                     <p className="text-brand-gold text-[9px] font-black uppercase tracking-widest">Demandez à l'IA Khady ✨</p>
                  </div>
                  <div className="w-14 h-14 bg-brand-orange text-white rounded-2xl flex items-center justify-center relative z-10 shadow-lg animate-bounce-slow">
                     <Sparkles size={24} />
                  </div>
               </div>
            </div>

            <div className="px-6 mt-12 mb-12"><DeliveryEstimator /></div>
          </div>
        );

      case Page.MENU:
      case Page.BOX:
      case Page.PACKS:
        return (
          <div className="pb-32 animate-fade-in px-6">
            <div className="flex items-center justify-between py-10 sticky top-0 bg-brand-light/80 backdrop-blur-md z-40">
               <button onClick={() => setCurrentPage(Page.HOME)} className="p-4 bg-white rounded-2xl shadow-xl text-brand-brown active:scale-90 transition-transform"><ArrowLeft size={20}/></button>
               <h2 className="text-2xl font-black uppercase italic tracking-tighter text-brand-brown">
                  {currentPage === Page.MENU ? 'La Carte' : currentPage === Page.BOX ? 'Box Sauces' : 'Packs Club'}
               </h2>
               <div className="w-12 h-12"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-5 mt-4">
                {filteredItems.map(item => (
                    <div key={item.id} onClick={() => setSelectedItemForDetails(item)} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-brand-brown/5 active:scale-95 transition-all group cursor-pointer relative">
                        <div className="relative aspect-square overflow-hidden">
                           <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                           <div className="absolute top-3 right-3 bg-brand-brown/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-brand-gold shadow-sm">{item.price} F</div>
                        </div>
                        <div className="p-5 text-center">
                           <h4 className="font-black text-[11px] uppercase text-brand-brown truncate">{item.name}</h4>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        );

      case Page.CART:
        return (
          <div className="pb-32 animate-fade-in px-6">
             <div className="py-10 text-brand-brown font-black uppercase italic text-3xl tracking-tighter">Mon Panier</div>
             {cart.length === 0 ? (
               <div className="text-center py-24">
                  <p className="opacity-40 italic font-black uppercase text-xl">Panier Vide 🛒</p>
                  <button onClick={() => setCurrentPage(Page.MENU)} className="mt-8 text-brand-orange font-black uppercase text-xs border-b-2 border-brand-orange">Découvrir le menu</button>
               </div>
             ) : (
               <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-white p-5 rounded-[2.5rem] shadow-xl flex items-center gap-4 border border-brand-brown/5">
                       <img src={item.image} className="w-20 h-20 rounded-2xl object-cover shadow-md" alt={item.name} />
                       <div className="flex-1">
                          <h4 className="font-black text-[11px] uppercase text-brand-brown">{item.name}</h4>
                          <p className="text-[10px] font-bold text-gray-400">x{item.quantity} • {item.price * item.quantity} F</p>
                       </div>
                    </div>
                  ))}
                  <div className="p-10 bg-brand-brown rounded-[3.5rem] text-brand-gold mt-10 shadow-2xl border-b-8 border-black/30">
                     <div className="flex justify-between items-center mb-6">
                        <span className="text-xs font-black uppercase opacity-60">Total</span>
                        <span className="text-3xl font-black italic">{cart.reduce((a, b) => a + (b.price * b.quantity), 0)} F</span>
                     </div>
                     <button onClick={() => setShowUpsell(true)} className="w-full bg-brand-orange text-white py-6 rounded-[2.5rem] font-black uppercase shadow-2xl italic tracking-widest active:scale-95 transition-all text-sm">Passer la commande</button>
                  </div>
               </div>
             )}
          </div>
        );

      case Page.COMMANDES:
        return (
          <div className="pb-32 animate-fade-in px-6">
             <div className="py-10 text-brand-brown font-black uppercase italic text-3xl tracking-tighter">Mon Suivi</div>
             {activeOrder ? (
               <div className="space-y-6">
                  <OrderTracking order={activeOrder} onComplete={() => setShowReceipt(true)} />
               </div>
             ) : (
               <div className="text-center py-24 opacity-20 italic font-black uppercase text-xl">Aucun colis en route 📦</div>
             )}
          </div>
        );

      case Page.COMPTE:
        return (
          <div className="pb-32 animate-fade-in px-6 py-12 flex flex-col items-center">
             <div className="w-44 h-44 rounded-[4.5rem] bg-brand-brown p-1 border-4 border-white shadow-2xl overflow-hidden relative mb-10 group">
                {profile.photo ? <img src={profile.photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full flex items-center justify-center"><User size={64} className="text-white/10" /></div>}
                <button onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white"><Camera size={32}/></button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if(file) {
                    const r = new FileReader();
                    r.onloadend = () => setProfile({...profile, photo: r.result as string});
                    r.readAsDataURL(file);
                  }
                }} />
             </div>
             <h2 className="text-3xl font-black text-brand-brown italic uppercase mb-2 tracking-tighter">{profile.name}</h2>
             <p className="text-[10px] font-black text-brand-orange uppercase tracking-[0.3em] mb-12">Membre Khady Gold ✨</p>
             
             <div className="w-full space-y-5">
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex items-center justify-between shadow-md">
                   <div className="flex items-center gap-5">
                      <div className="p-4 bg-brand-orange/10 text-brand-orange rounded-2xl"><Trophy size={22}/></div>
                      <span className="text-sm font-black uppercase tracking-tight">Points Fidélité</span>
                   </div>
                   <span className="text-lg font-black text-brand-brown italic">1,250 PTS</span>
                </div>
                <button onClick={() => {
                  const p = prompt("Code Admin :");
                  if(p === 'khadysfood') setCurrentPage(Page.ADMIN);
                }} className="w-full p-8 text-gray-300 flex items-center justify-between opacity-30 hover:opacity-100 transition-opacity">
                   <Settings size={18} />
                   <span className="font-black uppercase text-[10px] tracking-widest">Administration</span>
                </button>
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showSplash) {
    return (
      <div className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000 ${splashFade ? 'opacity-0' : 'opacity-100'}`}>
        <video autoPlay muted playsInline className="w-full h-full object-cover" onEnded={closeSplash} onError={closeSplash}>
          <source src={LOGO_VIDEO_URL} type="video/mp4" />
        </video>
        <button onClick={closeSplash} className="absolute bottom-10 right-6 bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 border border-white/20">Passer <SkipForward size={16} /></button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light shadow-2xl overflow-hidden relative font-sans flex flex-col items-center">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="flex-1 overflow-y-auto no-scrollbar w-full max-w-lg bg-brand-light min-h-screen relative">{renderContent()}</div>
      <Navbar currentPage={currentPage} setPage={setCurrentPage} cartCount={cart.length} />
      <AIChat />
      <ItemDetailsModal item={selectedItemForDetails} isOpen={!!selectedItemForDetails} onClose={() => setSelectedItemForDetails(null)} onAddToCart={handleAddToCart} />
      <UpsellModal isOpen={showUpsell} onClose={() => setShowUpsell(false)} suggestions={items.filter(i => i.category === 'Boisson').slice(0, 3)} onAdd={(item) => handleAddToCart(item, 1, '')} onProceed={handleCheckout} />
      {showReceipt && activeOrder && <Receipt order={activeOrder} onClose={() => setShowReceipt(false)} />}
    </div>
  );
};

export default App;