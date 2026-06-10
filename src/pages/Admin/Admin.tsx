/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IMAGES } from '../../data';
import { MenuItem, UserAthleteProfile, ContactMessage, AthleteOrder } from '../../types';
import {
  LayoutDashboard,
  Utensils,
  Users,
  MessageSquare,
  ClipboardList,
  Activity,
  Plus,
  Edit2,
  Trash2,
  Search,
  Moon,
  Sun,
  Send,
  Save,
  Check,
  X,
  Sliders,
  CheckCircle,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

export const Admin: React.FC = () => {
  const {
    dishes,
    addDish,
    updateDish,
    deleteDish,
    contactMessages,
    replyToMessage,
    adminLogs,
    clearLogs,
    athletes,
    updateAthlete,
    completedOrders,
    updateOrderStatus,
    setActiveView
  } = useApp();

  // Active admin tab state
  const [activeTab, setActiveTab] = useState<'dashboard' | 'dishes' | 'athletes' | 'contacts' | 'orders' | 'logs'>('dashboard');

  // Theme switch state specifically for the Admin hub
  const [isLightMode, setIsLightMode] = useState<boolean>(false);

  // Search filter lists
  const [athleteSearch, setAthleteSearch] = useState('');
  const [logFilter, setLogFilter] = useState<'all' | 'admin' | 'user'>('all');

  // Modal / Interactive forms states
  const [dishModalMode, setDishModalMode] = useState<'idle' | 'create' | 'edit'>('idle');
  const [activeDishId, setActiveDishId] = useState<string | null>(null);
  
  // Dish form state
  const [dishName, setDishName] = useState('');
  const [dishDesc, setDishDesc] = useState('');
  const [dishPrice, setDishPrice] = useState('30');
  const [dishCalories, setDishCalories] = useState('500');
  const [dishProtein, setDishProtein] = useState('40');
  const [dishCarbs, setDishCarbs] = useState('40');
  const [dishLipids, setDishLipids] = useState('15');
  const [dishGoal, setDishGoal] = useState<'seche' | 'performance' | 'masse'>('performance');
  const [dishIngredients, setDishIngredients] = useState('');
  const [dishImage, setDishImage] = useState(IMAGES.tofu);

  // Contact reply textbox states
  const [replyText, setReplyText] = useState<{ [messageId: string]: string }>({});

  // Athlete physical metrics override form states
  const [isEditingAthlete, setIsEditingAthlete] = useState<string | null>(null);
  const [athWeight, setAthWeight] = useState(80);
  const [athHeight, setAthHeight] = useState(180);
  const [athAge, setAthAge] = useState(26);
  const [athGoal, setAthGoal] = useState<'seche' | 'performance' | 'masse'>('performance');
  const [athActivity, setAthActivity] = useState<'moderé' | 'pro' | 'extreme'>('pro');

  // Color theme variable mappings for Light/Dark toggling
  const bgStyle = isLightMode ? 'bg-[#f4f5f6] text-zinc-900 font-sans' : 'bg-[#080808] text-white/95 font-sans';
  const textStyle = isLightMode ? 'text-zinc-950/90' : 'text-white/95';
  const headingStyle = isLightMode ? 'text-zinc-900' : 'text-white';
  const cardBgStyle = isLightMode ? 'bg-white border-zinc-200 shadow-sm' : 'bg-[#121212] border-white/5';
  const subTextStyle = isLightMode ? 'text-zinc-500' : 'text-[#a1a1aa]';
  const labelTextStyle = isLightMode ? 'text-zinc-400' : 'text-white/40';
  const borderStyle = isLightMode ? 'border-zinc-200' : 'border-white/5';
  const headerBgStyle = isLightMode ? 'bg-zinc-100/90 text-zinc-900 border-zinc-200' : 'bg-[#161616]/90 text-white border-white/5';
  const tabItemActiveStyle = isLightMode 
    ? 'bg-zinc-100 text-zinc-900 font-bold border-l-4 border-zinc-800' 
    : 'bg-white/5 text-white font-bold border-l-4 border-white';
  const tabItemHoverStyle = isLightMode 
    ? 'hover:bg-zinc-150 text-zinc-700' 
    : 'hover:bg-white/[0.02] text-white/70';
  const inputStyle = isLightMode
    ? 'bg-zinc-50 border-zinc-250 text-zinc-950 placeholder-zinc-400 focus:border-zinc-500 focus:bg-white'
    : 'bg-[#1a1a1a] border-white/10 text-white placeholder-zinc-500 focus:border-white';
  const tableHeaderStyle = isLightMode ? 'bg-zinc-100 text-zinc-700 font-mono text-[9px]' : 'bg-[#181818] text-white/50 font-mono text-[9px]';

  // Submits the dish create / edit
  const handleDishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ingredientsArr = dishIngredients.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    const dishData: Omit<MenuItem, 'id'> = {
      name: dishName,
      description: dishDesc,
      price: Number(dishPrice),
      goal: dishGoal,
      macros: {
        calories: Number(dishCalories),
        protein: Number(dishProtein),
        carbs: Number(dishCarbs),
        lipids: Number(dishLipids)
      },
      image: dishImage,
      ingredients: ingredientsArr.length ? ingredientsArr : ['Ingrédients nutritionnels premium']
    };

    if (dishModalMode === 'create') {
      addDish(dishData);
    } else if (dishModalMode === 'edit' && activeDishId) {
      updateDish(activeDishId, dishData);
    }

    // Reset dish form
    setDishModalMode('idle');
    setActiveDishId(null);
    setDishName('');
    setDishDesc('');
    setDishIngredients('');
  };

  const triggerEditDish = (dish: MenuItem) => {
    setActiveDishId(dish.id);
    setDishName(dish.name);
    setDishDesc(dish.description);
    setDishPrice(dish.price.toString());
    setDishCalories(dish.macros.calories.toString());
    setDishProtein(dish.macros.protein.toString());
    setDishCarbs(dish.macros.carbs.toString());
    setDishLipids(dish.macros.lipids.toString());
    setDishGoal(dish.goal);
    setDishIngredients(dish.ingredients.join(', '));
    setDishImage(dish.image);
    setDishModalMode('edit');
  };

  const triggerCreateDish = () => {
    setDishName('');
    setDishDesc('');
    setDishPrice('30');
    setDishCalories('550');
    setDishProtein('45');
    setDishCarbs('35');
    setDishLipids('14');
    setDishGoal('performance');
    setDishIngredients('Blanc de poulet bio, Riz noir, Crème de basilic');
    setDishImage(IMAGES.chicken);
    setDishModalMode('create');
  };

  // Reply message trigger
  const handleSendReply = (msgId: string) => {
    const text = replyText[msgId];
    if (text && text.trim().length > 0) {
      replyToMessage(msgId, text);
      setReplyText(prev => ({ ...prev, [msgId]: '' }));
    }
  };

  // Athlete physical metrics triggers
  const startEditAthlete = (athlete: UserAthleteProfile) => {
    setIsEditingAthlete(athlete.email);
    setAthWeight(athlete.weight);
    setAthHeight(athlete.height);
    setAthAge(athlete.age);
    setAthGoal(athlete.currentGoal);
    setAthActivity(athlete.activityLevel);
  };

  const saveAthleteMetrics = (email: string) => {
    updateAthlete(email, {
      weight: athWeight,
      height: athHeight,
      age: athAge,
      currentGoal: athGoal,
      activityLevel: athActivity
    });
    setIsEditingAthlete(null);
  };

  // Filter athletes and logs
  const filteredAthletes = athletes.filter(a => 
    `${a.firstName} ${a.lastName} ${a.email}`.toLowerCase().includes(athleteSearch.toLowerCase())
  );

  const filteredLogs = adminLogs.filter(l => 
    logFilter === 'all' ? true : l.type === logFilter
  );

  // Statistics calculation for Dashboard
  const pendingOrdersCount = completedOrders.filter(o => o.status === 'pending').length;
  const inDeliveryOrdersCount = completedOrders.filter(o => o.status === 'delivering' || o.status === 'prepared').length;
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.total, 0);
  const pendingMessagesCount = contactMessages.filter(m => m.status === 'pending').length;

  return (
    <div className={`min-h-screen py-12 pb-24 transition-colors duration-500 ${bgStyle}`} id="admin-hub-view">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Hub Headline with integrated Luxury Light/Dark Switcher */}
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-8 mb-10 gap-6 ${isLightMode ? 'border-zinc-200' : 'border-white/10'}`} id="admin-header-panel">
          <div>
            <button
              onClick={() => setActiveView('accueil')}
              className={`inline-flex items-center space-x-2 text-[9px] font-mono tracking-widest uppercase mb-3 px-3 py-1.5 border transition-all rounded-sm cursor-none ${
                isLightMode 
                  ? 'border-zinc-300 text-zinc-900 bg-zinc-100 hover:bg-zinc-200 hover:border-zinc-400 font-bold' 
                  : 'border-white/10 text-white bg-white/5 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <span className="text-xs">←</span>
              <span>RETOURNER AU SITE ENTIER</span>
            </button>
            <h1 className={`font-serif text-3xl md:text-5xl font-regular tracking-tight ${isLightMode ? 'text-zinc-950' : 'text-white'}`}>
              Console <span className={`font-sans font-black uppercase ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>Administrateur</span>
            </h1>
          </div>

          {/* Mode Switcher Control with pristine style */}
          <div className={`flex items-center p-1.5 rounded-sm border ${isLightMode ? 'bg-zinc-100/80 border-zinc-250' : 'bg-white/5 border-white/10'}`} id="lux-theme-switch">
            <button
              onClick={() => setIsLightMode(false)}
              className={`px-3 py-1.5 flex items-center space-x-1 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 focus:outline-none cursor-none ${
                !isLightMode ? 'bg-[#181818] border border-white/20 text-white font-bold' : 'text-[#737373] hover:text-[#222]'
              }`}
              title="Style Cyber-Sèche Sombre"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>DARK SÉCHE</span>
            </button>
            <button
              onClick={() => setIsLightMode(true)}
              className={`px-3 py-1.5 flex items-center space-x-1 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 focus:outline-none cursor-none ${
                isLightMode ? 'bg-white text-black font-semibold border border-zinc-300 shadow-md' : 'text-[#737373] hover:text-white'
              }`}
              title="Style Clinique Pur Lumineux"
            >
              <Sun className="w-3.5 h-3.5" />
              <span>LIGHT PUR</span>
            </button>
          </div>
        </div>

        {/* Outer Split layout: Left Navigation Panel & Right Data views workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start" id="admin-workspace-grid">
          
          {/* LEFT COLUMN PANEL: Beautiful navigational sidebar controls - STICKY FIXED on large views */}
          <nav className={`lg:col-span-4 lg:sticky lg:top-28 lg:self-start border p-6 flex flex-col space-y-2 h-auto ${cardBgStyle} rounded-sm`} id="admin-nav-panel">
            
            <span className={`text-[9px] font-mono tracking-widest uppercase mb-3 block ${labelTextStyle}`}>// MODULAR MANIFEST</span>
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left p-3.5 text-xs tracking-widest uppercase font-mono transition-all flex items-center space-x-3 cursor-none focus:outline-none rounded-sm ${
                activeTab === 'dashboard' ? tabItemActiveStyle : tabItemHoverStyle
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <div className="flex-grow flex justify-between items-center">
                <span>VUE GLOBALE</span>
                {pendingOrdersCount > 0 && (
                  <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold font-sans animate-pulse">
                    {pendingOrdersCount}
                  </span>
                )}
              </div>
            </button>

            <button
              onClick={() => setActiveTab('dishes')}
              className={`w-full text-left p-3.5 text-xs tracking-widest uppercase font-mono transition-all flex items-center space-x-3 cursor-none focus:outline-none rounded-sm ${
                activeTab === 'dishes' ? tabItemActiveStyle : tabItemHoverStyle
              }`}
            >
              <Utensils className="w-4 h-4 shrink-0" />
              <div className="flex-grow flex justify-between items-center">
                <span>GESTION PLATS</span>
                <span className="text-[10px] tracking-normal font-sans opacity-45">{dishes.length}</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('athletes')}
              className={`w-full text-left p-3.5 text-xs tracking-widest uppercase font-mono transition-all flex items-center space-x-3 cursor-none focus:outline-none rounded-sm ${
                activeTab === 'athletes' ? tabItemActiveStyle : tabItemHoverStyle
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <div className="flex-grow flex justify-between items-center">
                <span>SUIVI ATHLÈTES</span>
                <span className="text-[10px] tracking-normal font-sans opacity-45">{athletes.length}</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full text-left p-3.5 text-xs tracking-widest uppercase font-mono transition-all flex items-center space-x-3 cursor-none focus:outline-none rounded-sm ${
                activeTab === 'contacts' ? tabItemActiveStyle : tabItemHoverStyle
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <div className="flex-grow flex justify-between items-center">
                <span>CONCIERGERIE</span>
                {pendingMessagesCount > 0 && (
                  <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold font-sans">
                    {pendingMessagesCount}
                  </span>
                )}
              </div>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left p-3.5 text-xs tracking-widest uppercase font-mono transition-all flex items-center space-x-3 cursor-none focus:outline-none rounded-sm ${
                activeTab === 'orders' ? tabItemActiveStyle : tabItemHoverStyle
              }`}
            >
              <ClipboardList className="w-4 h-4 shrink-0" />
              <div className="flex-grow flex justify-between items-center">
                <span>SUIVI COMMANDES</span>
                <span className="text-[10px] tracking-normal font-sans opacity-45">{completedOrders.length}</span>
              </div>
            </button>
          </nav>

          {/* RIGHT COLUMN AREA: dynamic workspaces based on tab */}
          <main className="lg:col-span-8 space-y-8" id="admin-right-workspace">

            {/* TAB 1: DASHBOARD TELEMETRY VIEWER */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-fade-in" id="workspace-dashboard">
                
                {/* Telemetry Indicator Boxes */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="stats-pill-grid">
                  <div className={`p-6 border text-center relative overflow-hidden ${cardBgStyle}`}>
                    <span className={`text-[8.5px] font-mono tracking-widest block uppercase ${labelTextStyle}`}>DÉPENSES CHATS REÇUS</span>
                    <span className="text-2xl font-black font-mono tracking-tight block mt-2">{totalRevenue}€</span>
                    <span className={`text-[8.5px] font-mono block uppercase mt-1 ${subTextStyle}`}>VOLCANS FINANCIERS</span>
                  </div>

                  <div className={`p-6 border text-center relative overflow-hidden ${cardBgStyle}`}>
                    <span className={`text-[8.5px] font-mono tracking-widest block uppercase ${labelTextStyle}`}>ATHLÈTES EN PROFIL</span>
                    <span className="text-2xl font-black font-mono tracking-tight block mt-2">{athletes.length}</span>
                    <span className={`text-[8.5px] font-mono block uppercase mt-1 ${subTextStyle}`}>CIBLES RECALCULÉES</span>
                  </div>

                  <div className={`p-6 border text-center relative overflow-hidden ${cardBgStyle}`}>
                    <span className={`text-[8.5px] font-mono tracking-widest block uppercase text-red-500`}>COMMANDES EN ATTENTE</span>
                    <span className="text-2xl font-black font-mono tracking-tight block mt-2 text-yellow-500">{pendingOrdersCount}</span>
                    <span className={`text-[8.5px] font-mono block uppercase mt-1 ${subTextStyle}`}>PRÉPARATIVES EN CUISINE</span>
                  </div>

                  <div className={`p-6 border text-center relative overflow-hidden ${cardBgStyle}`}>
                    <span className={`text-[8.5px] font-mono tracking-widest block uppercase text-emerald-500`}>CONCIERGERIE PENDING</span>
                    <span className="text-2xl font-black font-mono tracking-tight block mt-2 text-emerald-500">{pendingMessagesCount}</span>
                    <span className={`text-[8.5px] font-mono block uppercase mt-1 ${subTextStyle}`}>ATTENTE DE COMMISSARIAT</span>
                  </div>
                </div>

                {/* Dashboard Highlights section split (Recent messages & Recent orders highlight) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="dashboard-recent-splits">
                  
                  {/* Latest unresolved requests queue */}
                  <div className={`border p-6 ${cardBgStyle}`}>
                    <div className={`flex justify-between items-center border-b pb-4 mb-4 ${isLightMode ? 'border-zinc-200' : 'border-white/5'}`}>
                      <h3 className={`font-serif text-lg font-regular ${isLightMode ? 'text-zinc-950' : 'text-white'}`}>Requêtes Concierge Restantes</h3>
                      <button onClick={() => setActiveTab('contacts')} className={`text-[9.5px] font-mono tracking-widest underline cursor-none ${isLightMode ? 'text-zinc-500 hover:text-black' : 'text-[#9ca3af] hover:text-white'}`}>VOIR TOUT</button>
                    </div>

                    {contactMessages.filter(m => m.status === 'pending').length === 0 ? (
                      <div className="py-10 text-center space-y-2">
                        <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
                        <p className={`text-xs ${subTextStyle}`}>Aucun dossier concierge en attente.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {contactMessages.filter(m => m.status === 'pending').slice(0, 3).map(msg => (
                          <div key={msg.id} className={`p-4 border flex flex-col justify-between space-y-2 transition-colors ${
                            isLightMode 
                              ? 'bg-zinc-50 border-zinc-200 hover:border-zinc-300' 
                              : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                          }`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <span className={`font-bold text-xs block ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>{msg.name}</span>
                                <span className={`text-[9px] font-mono block ${labelTextStyle}`}>{msg.email}</span>
                              </div>
                              <span className="text-[10px] bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-2 py-0.5 rounded-sm font-mono uppercase tracking-widest">PENDING</span>
                            </div>
                            <p className={`text-[11px] font-light italic truncate min-w-0 ${isLightMode ? 'text-zinc-700' : 'text-[#d4d4d8]'}`}>"{msg.message}"</p>
                            <span className="text-[8.5px] font-mono text-zinc-500 block">{msg.date}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Latest placed orders */}
                  <div className={`border p-6 ${cardBgStyle}`}>
                    <div className={`flex justify-between items-center border-b pb-4 mb-4 ${isLightMode ? 'border-zinc-200' : 'border-white/5'}`}>
                      <h3 className={`font-serif text-lg font-regular ${isLightMode ? 'text-zinc-950' : 'text-white'}`}>Dernières Commandes Athlètes</h3>
                      <button onClick={() => setActiveTab('orders')} className={`text-[9.5px] font-mono tracking-widest underline cursor-none ${isLightMode ? 'text-zinc-500 hover:text-black' : 'text-[#9ca3af] hover:text-white'}`}>VOIR TOUT</button>
                    </div>

                    {completedOrders.length === 0 ? (
                      <p className={`text-xs text-center py-10 ${subTextStyle}`}>Aucune commande scellée disponible.</p>
                    ) : (
                      <div className="space-y-4">
                        {completedOrders.slice(0, 3).map(o => (
                          <div key={o.id} className={`p-4 border flex items-center justify-between ${
                            isLightMode ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.02] border-white/5'
                          }`}>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className={`font-serif font-bold text-xs uppercase ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>{o.athleteName}</span>
                                <span className={`text-[9px] font-mono px-1 py-0.5 ${isLightMode ? 'bg-zinc-200 text-zinc-700' : 'bg-white/10 text-zinc-300'}`}>{o.id}</span>
                              </div>
                              <div className={`text-[10px] font-mono tracking-wide ${isLightMode ? 'text-zinc-500' : 'text-white/40'}`}>
                                Total: <span className={`font-bold ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>{o.total}€</span> | {o.items.length} assiette(s)
                              </div>
                            </div>
                            <span className={`text-[9px] font-mono border px-2 py-1 uppercase rounded-sm ${
                              o.status === 'completed' ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/10' :
                              o.status === 'delivering' ? 'border-sky-500/20 text-sky-500 bg-sky-500/10' :
                              o.status === 'prepared' ? 'border-purple-500/20 text-purple-500 bg-purple-500/10' :
                              o.status === 'cancelled' ? 'border-red-500/20 text-red-500 bg-red-500/10' :
                              'border-yellow-500/20 text-yellow-600 bg-yellow-500/10'
                            }`}>
                              {o.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

              </div>
            )}

            {/* TAB 2: GESTION DES PLATS / DISHES MANAGEMENT */}
            {activeTab === 'dishes' && (
              <div className="space-y-6 animate-fade-in" id="workspace-dishes">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h2 className="font-serif text-2xl font-regular">Menu Gastronomique d'Expression</h2>
                    <p className={`text-xs ${subTextStyle}`}>Ajoutez, modifiez ou retirez les assiettes signature proposées sur le site.</p>
                  </div>
                  <button
                    onClick={triggerCreateDish}
                    className="px-5 py-2.5 bg-white text-black font-sans text-[10px] tracking-widest font-bold uppercase transition-all duration-300 hover:bg-zinc-200 cursor-none flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>AJOUTER UN PLAT</span>
                  </button>
                </div>

                {/* Dish edit popup overlay state */}
                {dishModalMode !== 'idle' && (
                  <div className={`p-6 border space-y-6 ${isLightMode ? 'border-zinc-200 bg-zinc-50/90' : 'border-white/10 bg-white/[0.02]'}`} id="dish-form-wrapper">
                    <div className={`flex justify-between items-center border-b pb-3 ${isLightMode ? 'border-zinc-200' : 'border-white/5'}`}>
                      <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>
                        {dishModalMode === 'create' ? '// CRÉER UNE NOUVELLE ASSIETTE' : '// MODIFIER ASSIETTE EXISTANTE'}
                      </span>
                      <button onClick={() => setDishModalMode('idle')} className={`text-zinc-500 transition-colors cursor-none focus:outline-none ${isLightMode ? 'hover:text-zinc-900' : 'hover:text-white'}`}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleDishSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-5" id="dish-form">
                      <div className="md:col-span-8 space-y-2">
                        <label className={`text-[9px] font-mono block uppercase tracking-widest ${labelTextStyle}`}>Nom de la création</label>
                        <input
                          type="text"
                          value={dishName}
                          onChange={(e) => setDishName(e.target.value)}
                          placeholder="L'Angus d'Olympe Impérial"
                          className={`w-full p-3 text-xs outline-none rounded-none border ${inputStyle}`}
                          required
                        />
                      </div>

                      <div className="md:col-span-4 space-y-2">
                        <label className={`text-[9px] font-mono block uppercase tracking-widest ${labelTextStyle}`}>Tarif de Vente (€)</label>
                        <input
                          type="number"
                          value={dishPrice}
                          onChange={(e) => setDishPrice(e.target.value)}
                          placeholder="34"
                          className={`w-full p-3 text-xs outline-none rounded-none border ${inputStyle}`}
                          required
                        />
                      </div>

                      <div className="md:col-span-12 space-y-2">
                        <label className={`text-[9px] font-mono block uppercase tracking-widest ${labelTextStyle}`}>Parcours Culinaire / Description Physique</label>
                        <textarea
                          value={dishDesc}
                          onChange={(e) => setDishDesc(e.target.value)}
                          placeholder="Une pièce de bœuf à index glycémique optimal avec herbes sauvages crétines et jus de truffes..."
                          className={`w-full p-3 text-xs outline-none rounded-none h-20 resize-none border ${inputStyle}`}
                          required
                        />
                      </div>

                      {/* Macros blocks */}
                      <div className="md:col-span-3 space-y-2">
                        <label className={`text-[9px] font-mono block uppercase tracking-widest ${labelTextStyle}`}>Calories (kcal)</label>
                        <input
                          type="number"
                          value={dishCalories}
                          onChange={(e) => setDishCalories(e.target.value)}
                          className={`w-full p-3 text-xs outline-none rounded-none border ${inputStyle}`}
                          required
                        />
                      </div>

                      <div className="md:col-span-3 space-y-2">
                        <label className={`text-[9px] font-mono block uppercase tracking-widest ${labelTextStyle}`}>Protéines (g)</label>
                        <input
                          type="number"
                          value={dishProtein}
                          onChange={(e) => setDishProtein(e.target.value)}
                          className={`w-full p-3 text-xs outline-none rounded-none border ${inputStyle}`}
                          required
                        />
                      </div>

                      <div className="md:col-span-3 space-y-2">
                        <label className={`text-[9px] font-mono block uppercase tracking-widest ${labelTextStyle}`}>Glucides (g)</label>
                        <input
                          type="number"
                          value={dishCarbs}
                          onChange={(e) => setDishCarbs(e.target.value)}
                          className={`w-full p-3 text-xs outline-none rounded-none border ${inputStyle}`}
                          required
                        />
                      </div>

                      <div className="md:col-span-3 space-y-2">
                        <label className={`text-[9px] font-mono block uppercase tracking-widest ${labelTextStyle}`}>Lipides (g)</label>
                        <input
                          type="number"
                          value={dishLipids}
                          onChange={(e) => setDishLipids(e.target.value)}
                          className={`w-full p-3 text-xs outline-none rounded-none border ${inputStyle}`}
                          required
                        />
                      </div>

                      <div className="md:col-span-6 space-y-2">
                        <label className={`text-[9px] font-mono block uppercase tracking-widest ${labelTextStyle}`}>Cible / Objectif métabolique</label>
                        <select
                          value={dishGoal}
                          onChange={(e) => setDishGoal(e.target.value as any)}
                          className={`w-full p-3 text-xs outline-none rounded-none border ${inputStyle}`}
                        >
                          <option value="seche">SÈCHE EXTRÊME</option>
                          <option value="performance">ATHLÈTE HYBRIDE (Endurance/Balanced)</option>
                          <option value="masse">DÉVELOPPEMENT MUSCULAIRE (Prise de masse)</option>
                        </select>
                      </div>

                      <div className="md:col-span-6 space-y-2">
                        <label className={`text-[9px] font-mono block uppercase tracking-widest ${labelTextStyle}`}>Illustration Image URL</label>
                        <input
                          type="text"
                          value={dishImage}
                          onChange={(e) => setDishImage(e.target.value)}
                          className={`w-full p-3 text-xs outline-none rounded-none border ${inputStyle}`}
                          required
                        />
                      </div>

                      <div className="md:col-span-12 space-y-2">
                        <label className={`text-[9px] font-mono block uppercase tracking-widest ${labelTextStyle}`}>Ingrédients Clés (séparés par des virgules)</label>
                        <input
                          type="text"
                          value={dishIngredients}
                          onChange={(e) => setDishIngredients(e.target.value)}
                          placeholder="Black Angus, Riz Noir Vénéré, Fleurs de Capucine"
                          className={`w-full p-3 text-xs outline-none rounded-none border ${inputStyle}`}
                        />
                      </div>

                      <div className="md:col-span-12 pt-4 flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setDishModalMode('idle')}
                          className={`px-5 py-2.5 bg-transparent border font-sans text-[10px] tracking-widest uppercase cursor-none transition-colors ${
                            isLightMode ? 'border-zinc-300 hover:border-zinc-800 text-zinc-700' : 'border-white/10 hover:border-white text-white'
                          }`}
                        >
                          ANNULER
                        </button>
                        <button
                          type="submit"
                          className="px-7 py-2.5 bg-white text-black hover:bg-zinc-200 transition-colors font-sans text-[10px] tracking-widest font-bold uppercase cursor-none border border-zinc-300 shadow-sm"
                        >
                          {dishModalMode === 'create' ? 'AJOUTER L\'ASSIETTE' : 'APPLIQUER MODIFICATIONS'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Plates listing cards layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="dishes-edit-list flex">
                  {dishes.map(dish => (
                    <div key={dish.id} className={`border flex flex-col justify-between ${cardBgStyle}`}>
                      <div className={`relative h-44 overflow-hidden border-b ${isLightMode ? 'border-zinc-200' : 'border-white/5'}`}>
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2 py-1 border border-white/5 text-[8.5px] font-mono text-white tracking-widest uppercase rounded-sm">
                          {dish.goal === 'seche' ? 'SÈCHE EXTRÊME' : dish.goal === 'masse' ? 'MASS BULK' : 'HYBRID PERF'}
                        </div>
                      </div>

                      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-4">
                            <h4 className={`font-serif font-bold text-sm tracking-wide ${isLightMode ? 'text-zinc-950' : 'text-white'}`}>{dish.name}</h4>
                            <span className={`font-mono text-xs font-black block shrink-0 px-2 py-0.5 rounded ${
                              isLightMode ? 'text-zinc-900 bg-zinc-100 border border-zinc-200' : 'text-white bg-white/5'
                            }`}>{dish.price}€</span>
                          </div>
                          <p className={`text-[10.5px] font-light leading-relaxed line-clamp-2 ${subTextStyle}`}>{dish.description}</p>
                          
                          {/* Display metrics */}
                          <div className={`grid grid-cols-4 gap-2 p-2.5 border text-center font-mono text-[9px] mt-2 ${
                            isLightMode ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.02] border-white/5'
                          }`}>
                            <div>
                              <div className={labelTextStyle}>CAL</div>
                              <div className={`font-bold text-[10px] ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>{dish.macros.calories}</div>
                            </div>
                            <div>
                              <div className={labelTextStyle}>P</div>
                              <div className={`font-bold text-[10px] ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>{dish.macros.protein}g</div>
                            </div>
                            <div>
                              <div className={labelTextStyle}>G</div>
                              <div className={`font-bold text-[10px] ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>{dish.macros.carbs}g</div>
                            </div>
                            <div>
                              <div className={labelTextStyle}>L</div>
                              <div className={`font-bold text-[10px] ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>{dish.macros.lipids}g</div>
                            </div>
                          </div>
                        </div>

                        {/* Administration controls */}
                        <div className={`flex justify-end space-x-2 pt-2 border-t ${isLightMode ? 'border-zinc-200' : 'border-white/5'}`}>
                          <button
                            onClick={() => triggerEditDish(dish)}
                            className={`p-2 border transition-colors cursor-none text-[9px] font-mono tracking-widest uppercase flex items-center space-x-1 ${
                              isLightMode ? 'border-zinc-255 hover:border-zinc-900 text-zinc-800' : 'border-white/10 hover:border-white text-white'
                            }`}
                            title="Modifier ce plat"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>MÉTRIQUES</span>
                          </button>
                          <button
                            onClick={() => deleteDish(dish.id)}
                            className="p-2 border border-red-900/30 text-red-500 hover:border-red-500 hover:text-red-400 transition-colors cursor-none text-[9px] font-mono tracking-widest uppercase flex items-center space-x-1 bg-red-950/10"
                            title="Supprimer ce plat définitivement"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>RETIRER</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

             {/* TAB 3: ATHLETES TRACKING & BIO-TELEMETRY */}
            {activeTab === 'athletes' && (
              <div className="space-y-6 animate-fade-in" id="workspace-athletes">
                <div className="space-y-1">
                  <h2 className={`font-serif text-2xl font-regular ${isLightMode ? 'text-zinc-950' : 'text-white'}`}>Registre des Athlètes Connectés</h2>
                  <p className={`text-xs ${subTextStyle}`}>Ajustez directement les paramètres physiques et suivez le calibrage nutritionnel de chaque athlète enregistré.</p>
                </div>

                {/* Search bar inside athletes view */}
                <div className={`relative group border transition-all ${isLightMode ? 'border-zinc-250 focus-within:border-zinc-800' : 'border-white/5 focus-within:border-white'}`} id="athlete-search-section">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    value={athleteSearch}
                    onChange={(e) => setAthleteSearch(e.target.value)}
                    placeholder="Filtrer par nom, prénom ou coordonnées d'athlète (ex: Loukal)..."
                    className={`w-full pl-11 pr-4 py-3 text-xs outline-none rounded-none border-none bg-transparent ${isLightMode ? 'text-zinc-950 placeholder-zinc-400' : 'text-white placeholder-zinc-500'}`}
                  />
                </div>

                {/* Athletes list table / interactive display */}
                <div className="space-y-4">
                  {filteredAthletes.map(ath => {
                    const isEditing = isEditingAthlete === ath.email;
                    return (
                      <div key={ath.email} className={`border p-6 space-y-4 ${cardBgStyle}`}>
                        
                        {/* Header card info */}
                        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4 ${isLightMode ? 'border-zinc-200' : 'border-white/5'}`}>
                          <div className="flex items-center space-x-3.5">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-sm font-semibold uppercase tracking-wide border ${
                              isLightMode ? 'bg-zinc-100 border-zinc-250 text-zinc-900' : 'bg-white/5 border-white/10 text-white'
                            }`}>
                              {ath.firstName[0]}{ath.lastName[0]}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2.5">
                                <span className={`font-bold text-sm ${isLightMode ? 'text-zinc-950' : 'text-white'}`}>{ath.firstName} {ath.lastName}</span>
                                <span className={`text-[8px] tracking-widest font-mono font-bold uppercase px-2 py-0.5 ${
                                  isLightMode ? 'bg-zinc-900 text-zinc-50' : 'bg-white text-black'
                                }`}>
                                  {ath.tier}
                                </span>
                              </div>
                              <span className={`text-[10px] block font-mono ${labelTextStyle}`}>{ath.email}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <span className={`text-[9px] font-mono border px-2 py-1 rounded-sm uppercase ${
                              ath.currentGoal === 'seche' ? 'border-sky-500/20 text-sky-500 bg-sky-500/10' :
                              ath.currentGoal === 'masse' ? 'border-orange-500/20 text-orange-500 bg-orange-500/10' :
                              'border-emerald-500/20 text-emerald-500 bg-emerald-500/10'
                            }`}>
                              CIBLE : {ath.currentGoal.toUpperCase()}
                            </span>
                            {!isEditing ? (
                              <button
                                onClick={() => startEditAthlete(ath)}
                                className={`px-3.5 py-1.5 border transition-colors cursor-none text-[9px] font-mono tracking-widest uppercase bg-transparent ${
                                  isLightMode ? 'border-zinc-300 hover:border-zinc-900 text-zinc-800' : 'border-white/10 hover:border-white text-white'
                                }`}
                              >
                                AJUSTER BIOMÉTRIE
                              </button>
                            ) : (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => saveAthleteMetrics(ath.email)}
                                  className={`px-3.5 py-1.5 transition-colors cursor-none text-[9px] font-mono tracking-widest uppercase font-bold flex items-center space-x-1 border ${
                                    isLightMode ? 'bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-900 shadow-sm' : 'bg-white hover:bg-zinc-200 text-black border-white'
                                  }`}
                                >
                                  <Save className="w-3.5 h-3.5" />
                                  <span>SAUVER STATE</span>
                                </button>
                                <button
                                  onClick={() => setIsEditingAthlete(null)}
                                  className={`px-3.5 py-1.5 border transition-colors cursor-none text-[9px] font-mono tracking-widest uppercase ${
                                    isLightMode ? 'border-zinc-350 hover:border-zinc-600 text-zinc-700' : 'border-white/10 hover:border-white text-white'
                                  }`}
                                >
                                  ANNULER
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Editable Form metrics blocks */}
                        {isEditing ? (
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4" id="inline-biometric-editor">
                            <div className="space-y-1.5">
                              <label className={`text-[8.5px] font-mono block uppercase ${labelTextStyle}`}>POIDS ACTUEL (KG)</label>
                              <input
                                type="number"
                                value={athWeight}
                                onChange={(e) => setAthWeight(Number(e.target.value))}
                                className={`w-full p-2.5 text-xs outline-none rounded-none border ${inputStyle}`}
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className={`text-[8.5px] font-mono block uppercase ${labelTextStyle}`}>TAILLE (CM)</label>
                              <input
                                type="number"
                                value={athHeight}
                                onChange={(e) => setAthHeight(Number(e.target.value))}
                                className={`w-full p-2.5 text-xs outline-none rounded-none border ${inputStyle}`}
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className={`text-[8.5px] font-mono block uppercase ${labelTextStyle}`}>ÂGE</label>
                              <input
                                type="number"
                                value={athAge}
                                onChange={(e) => setAthAge(Number(e.target.value))}
                                className={`w-full p-2.5 text-xs outline-none rounded-none border ${inputStyle}`}
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className={`text-[8.5px] font-mono block uppercase ${labelTextStyle}`}>ACTIVITÉ physique</label>
                              <select
                                value={athActivity}
                                onChange={(e) => setAthActivity(e.target.value as any)}
                                className={`w-full p-2 text-xs outline-none rounded-none border ${inputStyle}`}
                              >
                                <option value="moderé">MODÉRÉE</option>
                                <option value="pro">INTENSE (5-6s)</option>
                                <option value="extreme">ÉLITE EXTREME (7+)</option>
                              </select>
                            </div>
                            <div className="space-y-1.5 col-span-2 md:col-span-1">
                              <label className={`text-[8.5px] font-mono block uppercase ${labelTextStyle}`}>OBJECTIF</label>
                              <select
                                value={athGoal}
                                onChange={(e) => setAthGoal(e.target.value as any)}
                                className={`w-full p-2 text-xs outline-none rounded-none border ${inputStyle}`}
                              >
                                <option value="seche">SÈCHE EXTRÊME</option>
                                <option value="performance">ATHLÈTE HYBRIDE</option>
                                <option value="masse">RAGE MASSE BULK</option>
                              </select>
                            </div>
                          </div>
                        ) : (
                          /* Static values visualization with targets display */
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4" id="biometrics-read-state">
                            <div className={`p-3 border text-center ${
                              isLightMode ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.01] border-white/5'
                            }`}>
                              <span className={`text-[8px] font-mono block ${labelTextStyle}`}>POIDS ET TAILLE</span>
                              <span className={`font-mono text-xs block font-bold mt-1 ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>{ath.weight}kg / {ath.height}cm</span>
                              <span className="text-[7.5px] font-mono text-zinc-500 block uppercase pt-0.5">IMC: {(ath.weight / Math.pow(ath.height / 100, 2)).toFixed(1)}</span>
                            </div>

                            <div className={`p-3 border text-center ${
                              isLightMode ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.01] border-white/5'
                            }`}>
                              <span className={`text-[8px] font-mono block ${labelTextStyle}`}>ÂGE & NIVEAU</span>
                              <span className={`font-mono text-xs block font-bold mt-1 ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>{ath.age} ANS</span>
                              <span className="text-[7.5px] font-mono text-zinc-500 block uppercase truncate pt-0.5">{ath.activityLevel.toUpperCase()} LEVEL</span>
                            </div>

                            <div className={`p-3 border text-center ${
                              isLightMode ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.01] border-white/5'
                            }`}>
                              <span className={`text-[8px] font-mono block ${labelTextStyle}`}>CALORIES CIBLE RAPIDE</span>
                              <span className="font-mono text-xs block font-bold mt-1 text-yellow-600">{ath.dailyCaloriesTarget} kcal</span>
                              <span className="text-[7.5px] font-mono text-zinc-500 block uppercase pt-0.5">PAR JOUR</span>
                            </div>

                            <div className={`p-3 border text-center ${
                              isLightMode ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.01] border-white/5'
                            }`}>
                              <span className={`text-[8px] font-mono block ${labelTextStyle}`}>PROTÉINES JOURNALIÈRES</span>
                              <span className="font-mono text-xs block font-bold mt-1 text-emerald-600">{ath.dailyProteinTarget} g</span>
                              <span className="text-[7.5px] font-mono text-zinc-500 block uppercase pt-0.5">CONSTRUCTION SEC</span>
                            </div>

                            <div className={`p-3 border text-center ${
                              isLightMode ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.01] border-white/5'
                            }`}>
                              <span className={`text-[8px] font-mono block ${labelTextStyle}`}>GLUCIDES EN ACTION</span>
                              <span className={`font-mono text-xs block font-bold mt-1 ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>{ath.dailyCarbsTarget}g / L:{ath.dailyLipidsTarget}g</span>
                              <span className="text-[7.5px] font-mono text-zinc-500 block uppercase pt-0.5">CRAQUAGE CARBS</span>
                            </div>
                          </div>
                        )}

                        {/* Order history summary log count */}
                        <div className={`flex justify-between items-center px-4 py-2 border-t font-mono text-[8.5px] text-zinc-500 ${
                          isLightMode ? 'bg-zinc-100/50 border-zinc-200' : 'bg-white/[0.01] border-white/5'
                        }`}>
                          <div>SOCIÉTAIRE SÉCURISÉ // ACTIVITÉ DE SYNC : OK</div>
                          <div>TOTAL LIVRAISONS COMPLÈTES : <span className={`font-bold font-sans ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>{ath.orderHistoryCount} PLAT(S)</span></div>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* TAB 4: CLIENT CONCIERGERIE / CLIENT MESSAGES */}
            {activeTab === 'contacts' && (
              <div className="space-y-6 animate-fade-in" id="workspace-contacts">
                <div className="space-y-1">
                  <h2 className={`font-serif text-2xl font-regular ${isLightMode ? 'text-zinc-950' : 'text-white'}`}>Secrétariat Concierge & Assistance</h2>
                  <p className={`text-xs ${subTextStyle}`}>Consultez les demandes des athlètes et apportez-leur des réponses de calage culinaire instantanées.</p>
                </div>

                <div className="space-y-6">
                  {contactMessages.map(msg => (
                    <div key={msg.id} className={`border p-6 space-y-4 ${cardBgStyle}`} id={`msg-item-${msg.id}`}>
                      
                      {/* Message header */}
                      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${
                        isLightMode ? 'border-zinc-200' : 'border-white/5'
                      }`}>
                        <div>
                          <div className="flex items-center space-x-2.5">
                            <span className={`font-bold text-sm ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>{msg.name}</span>
                            <span className={`text-[8px] font-mono tracking-widest px-1.5 py-0.5 rounded uppercase ${
                              msg.status === 'pending' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-emerald-500/10 text-emerald-600'
                            }`}>
                              {msg.status.toUpperCase()}
                            </span>
                          </div>
                          <span className={`text-[10px] block font-mono ${labelTextStyle}`}>{msg.email} {msg.phone ? `| Tél: ${msg.phone}` : ''}</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500">{msg.date}</span>
                      </div>

                      {/* Request content */}
                      <div className={`p-4 border ${isLightMode ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.01] border-white/5'}`}>
                        <span className={`text-[8px] font-mono uppercase tracking-[0.2em] block mb-1.5 ${labelTextStyle}`}>// CORPS DE MANDAT ATHLÈTE</span>
                        <p className={`text-xs font-light italic leading-relaxed ${isLightMode ? 'text-zinc-800' : 'text-zinc-300'}`}>
                          "{msg.message}"
                        </p>
                      </div>

                      {/* Response state */}
                      {msg.status === 'answered' ? (
                        <div className={`p-4 space-y-2 border ${
                          isLightMode ? 'bg-emerald-50 border-emerald-250 text-emerald-950' : 'bg-emerald-950/10 border-emerald-900/20 text-[#22c55e]'
                        }`}>
                          <div className="flex justify-between items-center text-[8.5px] font-mono tracking-wider font-bold uppercase">
                            <span>// RÉPONSE ENREGISTRÉE</span>
                            <span>{msg.repliedAt}</span>
                          </div>
                          <p className={`text-xs font-light font-sans leading-relaxed ${isLightMode ? 'text-zinc-900' : 'text-white/80'}`}>
                            {msg.reply}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3 pt-2">
                          <label className={`text-[8.5px] font-mono block uppercase tracking-widest ${labelTextStyle}`}>RÉPONDRE DE L'ÉQUIPE ET RECALER L'ATHLÈTE :</label>
                          <div className={`flex border p-2.5 transition-colors focus-within:ring-1 ${
                            isLightMode ? 'bg-zinc-100 border-zinc-300 focus-within:border-zinc-800' : 'bg-[#141414] border-white/10 focus-within:border-white'
                          }`}>
                            <textarea
                              value={replyText[msg.id] || ''}
                              onChange={(e) => setReplyText(prev => ({ ...prev, [msg.id]: e.target.value }))}
                              placeholder="Rédigez la réponse d'adaptation diététique (ex: Bonjour Teddy, nous avons modifié la ration culinaire...)"
                              className={`w-full bg-transparent text-xs outline-none font-sans resize-none h-16 leading-relaxed ${
                                isLightMode ? 'text-zinc-950 placeholder-zinc-400' : 'text-white placeholder-zinc-500'
                              }`}
                            />
                          </div>
                          <div className="flex justify-end pt-1">
                            <button
                              onClick={() => handleSendReply(msg.id)}
                              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-[10px] font-bold tracking-widest uppercase transition-colors flex items-center space-x-1.5 shrink-0 cursor-none"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>ENVOYER RÉPONSE</span>
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB 5: ORDERS FLOW MONITORING / COMMAND MANAGEMENT */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fade-in" id="workspace-orders">
                <div className="space-y-1">
                  <h2 className={`font-serif text-2xl font-regular ${isLightMode ? 'text-zinc-950' : 'text-white'}`}>Général des Commandes & Logistique</h2>
                  <p className={`text-xs ${subTextStyle}`}>Contrôlez les étapes d'alimentation clinique, de la préparation cuisine au transvasement final vers la livraison.</p>
                </div>

                <div className="space-y-6">
                  {completedOrders.map(o => (
                    <div key={o.id} className={`border p-6 space-y-4 ${cardBgStyle}`} id={`order-card-${o.id}`}>
                      
                      {/* Status header receipt format */}
                      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-4 ${
                        isLightMode ? 'border-zinc-200' : 'border-white/5'
                      }`}>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2.5">
                            <span className={`font-serif font-black text-sm uppercase ${isLightMode ? 'text-zinc-950' : 'text-white'}`}>{o.athleteName}</span>
                            <span className={`text-[9px] font-mono px-2 py-0.5 ${isLightMode ? 'bg-zinc-150 text-zinc-800' : 'bg-white/10 text-zinc-300'}`}>{o.id}</span>
                          </div>
                          <span className={`text-[10px] block font-mono ${labelTextStyle}`}>Coordonnées de l'athlète: {o.athleteEmail}</span>
                        </div>

                        {/* Interactive Status Changer dropdown menu */}
                        <div className="flex items-center space-x-3">
                          <label className={`text-[9px] font-mono ${labelTextStyle}`}>ÉTAPE LOGISTIQUE:</label>
                          <select
                            value={o.status || 'pending'}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                            className={`p-2 text-xs font-semibold outline-none border cursor-none w-[140px] ${
                              isLightMode 
                                ? 'bg-zinc-100 text-zinc-950 border-zinc-300 focus:border-zinc-800' 
                                : 'bg-[#1c1c1c] text-white border-white/10 focus:border-white'
                            }`}
                          >
                            <option value="pending">⏳ En attente</option>
                            <option value="prepared">🍳 Préparé (Chef)</option>
                            <option value="delivering">🚴 Expédié (Livreur)</option>
                            <option value="completed">✔ Livré & Ingéré</option>
                            <option value="cancelled">❌ Annulé / Rejeté</option>
                          </select>
                        </div>
                      </div>

                      {/* Display receipt layout and barcode for high luxury feel */}
                      <div className={`border p-5 font-mono space-y-4 ${
                        isLightMode ? 'bg-zinc-50 border-zinc-200 shadow-sm' : 'bg-white/[0.01] border-white/5'
                      }`}>
                        <div className={`border-b pb-3 border-dashed flex justify-between text-[10px] ${
                          isLightMode ? 'border-zinc-300 text-zinc-500' : 'border-white/10 text-zinc-500'
                        }`}>
                          <span>MANIFESTE ALIMENTATION TICKET</span>
                          <span>DATE: {o.date}</span>
                        </div>

                        {/* Order lines */}
                        <div className="space-y-2.5">
                          {o.items.map(item => (
                            <div key={item.id} className={`flex justify-between items-start text-xs border-b pb-2 ${
                              isLightMode ? 'border-zinc-200' : 'border-white/[0.02]'
                            }`}>
                              <div className="space-y-0.5">
                                <span className={`font-bold block ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>{item.name} <span className="text-zinc-500 block sm:inline">x{item.quantity}</span></span>
                                <span className={`text-[10px] text-zinc-500 truncate block max-w-sm sm:max-w-xl`}>{item.description}</span>
                              </div>
                              <span className={`font-bold ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>{item.price * item.quantity}€</span>
                            </div>
                          ))}
                        </div>

                        {/* Macros & Caloric Summary */}
                        <div className={`grid grid-cols-4 gap-2 text-center p-2.5 border text-[9.5px] ${
                          isLightMode ? 'bg-zinc-100 border-zinc-200' : 'bg-black/40 border-white/5'
                        }`}>
                          <div>
                            <span className="text-zinc-500 block">CALORIES</span>
                            <span className={`font-bold block mt-0.5 ${isLightMode ? 'text-yellow-600' : 'text-white'}`}>{o.macros.calories} kcal</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block">PROTIDES</span>
                            <span className="font-bold text-emerald-600 block mt-0.5">{o.macros.protein}g</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block">GLUCIDES</span>
                            <span className={`font-bold block mt-0.5 ${isLightMode ? 'text-zinc-900' : 'text-white'}`}>{o.macros.carbs}g</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block">LIPIDES</span>
                            <span className="font-bold text-zinc-500 block mt-0.5">{o.macros.lipids}g</span>
                          </div>
                        </div>

                        {/* Total receipt row */}
                        <div className={`pt-2 border-t border-dashed flex justify-between items-center text-xs ${
                          isLightMode ? 'border-zinc-300' : 'border-white/10'
                        }`}>
                          <span className="font-bold uppercase tracking-widest text-zinc-500">MONTANT TOTAL SCELLÉ:</span>
                          <span className={`text-sm font-black font-mono px-2.5 py-1 rounded ${
                            isLightMode ? 'text-zinc-950 bg-zinc-200 border border-zinc-350' : 'text-white bg-white/5'
                          }`}>{o.total}€</span>
                        </div>

                        {/* Aesthetic Receipt Barcode */}
                        <div className="pt-3 text-center space-y-1.5" id="barcode-aesthetics">
                          <div className={`h-8 w-44 mx-auto flex items-center justify-between px-1 ${isLightMode ? 'bg-zinc-200/90' : 'bg-zinc-800/50'}`} title="Code-barres dynamique logistique">
                            {[1,4,2,7,1,9,4,3,2,8,2,9,5,1,2,7,3,9,1,4,6,3,8,9,2,1].map((bar, i) => (
                              <div key={i} className={`h-full ${isLightMode ? 'bg-zinc-900' : 'bg-white'}`} style={{ width: `${bar * 1.5}px` }} />
                            ))}
                          </div>
                          <span className="text-[7.5px] text-zinc-600 block uppercase font-bold select-none tracking-widest">NTRYX-{o.id}::SECURE-ROUTING-MANIFEST</span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}



          </main>

        </div>

      </div>
    </div>
  );
};
