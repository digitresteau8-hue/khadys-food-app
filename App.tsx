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
import { Page, MenuItem, CartItem, Review, Order, OrderStatus } from './types';
import { MENU_ITEMS, REVIEWS as INITIAL_REVIEWS, LOGO_VIDEO_URL } from './constants';
import { 
  User, ShoppingBag, Trophy, Package, Calendar, SkipForward, ArrowLeft, Camera, Star, ChevronRight, Settings, UtensilsCrossed
} from 'lucide-react';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [splashFade, setSplashFade] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [toast, setToast] = useState<{message: string, type: ToastType} | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>(() => JSON.parse(localStorage.getItem('khadys_cart') || '[]'));
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('khadys_profile');
    return saved ? JSON.parse(saved) : { name: 'Gourmet Niamey', phone: '', photo: null };
  });

  const [selectedItemForDetails, setSelectedItemForDetails] = useState<MenuItem | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const heroTimer = setInterval(() => setHeroIdx(prev => (prev + 1) % MENU_ITEMS.length), 5000);
    return () => clearInterval(heroTimer);
  }, []);

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
            <div className="flex justify-between items-center py-6 px-6 bg-brand-cream/80 backdrop-blur-md sticky top-0 z-40 border-b border-brand-brown/5">
              <KhadyLogo />
              <div className="flex items-center gap-3">
                 <div className="text-right flex flex-col items-end">
                    <div className="bg-brand-orange/10 px-3 py-1 rounded-full mb-1">
                      <p className="text-[9px] font-black uppercase text-brand-orange tracking-widest leading-none">
                        Salam <span className="inline-block animate-wave text-[11px]">👋🏾</span>
                      </p>
                    </div>
                    <p className="text-[8px] font-black uppercase text-brand-brown tracking-tighter opacity-40">Bonjour, Niamey