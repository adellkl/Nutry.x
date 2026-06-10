/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, UserAthleteProfile, SportsGoal, CustomDishCombination, MenuItem, ContactMessage, AdminLog, AthleteOrder } from '../types';
import { BASE_OPTIONS, PROTEIN_OPTIONS, SAUCE_OPTIONS, GARNISH_OPTIONS, SIGNATURE_DISHES } from '../data';

export type ViewType = 'accueil' | 'panier' | 'profil' | 'contact' | 'information' | 'admin';

interface AppContextType {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => string;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  profile: UserAthleteProfile;
  updateProfile: (updated: Partial<UserAthleteProfile>) => void;
  completedOrders: AthleteOrder[];
  placeOrder: () => { success: boolean; orderId: string };
  isLoggedIn: boolean;
  loginUser: (email: string, pass: string) => { success: boolean; error?: string };
  registerUser: (firstName: string, lastName: string, email: string, pass: string) => { success: boolean; error?: string };
  logoutUser: () => void;

  // Admin capabilities
  dishes: MenuItem[];
  addDish: (dish: Omit<MenuItem, 'id'>) => void;
  updateDish: (id: string, dish: Partial<MenuItem>) => void;
  deleteDish: (id: string) => void;

  contactMessages: ContactMessage[];
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => void;
  replyToMessage: (id: string, replyText: string) => void;

  adminLogs: AdminLog[];
  addAdminLog: (type: 'admin' | 'user', action: string, email: string) => void;
  clearLogs: () => void;

  athletes: UserAthleteProfile[];
  updateAthlete: (email: string, updated: Partial<UserAthleteProfile>) => void;
  updateOrderStatus: (orderId: string, status: AthleteOrder['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultProfile: UserAthleteProfile = {
  firstName: 'Kévin',
  lastName: 'Loukal',
  email: 'kevin.loukal@eliteathletics.fr',
  weight: 78,
  height: 182,
  age: 26,
  activityLevel: 'pro',
  currentGoal: 'performance',
  dailyCaloriesTarget: 2800,
  dailyProteinTarget: 175,
  dailyCarbsTarget: 320,
  dailyLipidsTarget: 80,
  tier: 'Gold Elite',
  orderHistoryCount: 0
};

// Seed simulated initial athletes database
const defaultAthletes: UserAthleteProfile[] = [
  {
    firstName: 'Kévin',
    lastName: 'Loukal',
    email: 'kevin.loukal@eliteathletics.fr',
    weight: 78,
    height: 182,
    age: 26,
    activityLevel: 'pro',
    currentGoal: 'performance',
    dailyCaloriesTarget: 2800,
    dailyProteinTarget: 175,
    dailyCarbsTarget: 320,
    dailyLipidsTarget: 80,
    tier: 'Gold Elite',
    orderHistoryCount: 1
  },
  {
    firstName: 'Adel',
    lastName: 'Loukal',
    email: 'adelloukal2@gmail.com',
    weight: 84,
    height: 185,
    age: 28,
    activityLevel: 'extreme',
    currentGoal: 'masse',
    dailyCaloriesTarget: 3500,
    dailyProteinTarget: 210,
    dailyCarbsTarget: 440,
    dailyLipidsTarget: 100,
    tier: 'VIP Master',
    orderHistoryCount: 12
  },
  {
    firstName: 'Teddy',
    lastName: 'Riner',
    email: 'teddy.riner@olympic.fr',
    weight: 135,
    height: 204,
    age: 36,
    activityLevel: 'extreme',
    currentGoal: 'masse',
    dailyCaloriesTarget: 4500,
    dailyProteinTarget: 280,
    dailyCarbsTarget: 550,
    dailyLipidsTarget: 120,
    tier: 'VIP Master',
    orderHistoryCount: 22
  },
  {
    firstName: 'Chloé',
    lastName: 'Lavergne',
    email: 'chloe.lavergne@sprint.org',
    weight: 60,
    height: 170,
    age: 24,
    activityLevel: 'pro',
    currentGoal: 'seche',
    dailyCaloriesTarget: 1950,
    dailyProteinTarget: 135,
    dailyCarbsTarget: 170,
    dailyLipidsTarget: 58,
    tier: 'Black Platinum',
    orderHistoryCount: 6
  },
  {
    firstName: 'Marie-José',
    lastName: 'Pérec',
    email: 'mariejose@perec.fr',
    weight: 67,
    height: 180,
    age: 30,
    activityLevel: 'pro',
    currentGoal: 'performance',
    dailyCaloriesTarget: 2400,
    dailyProteinTarget: 155,
    dailyCarbsTarget: 310,
    dailyLipidsTarget: 70,
    tier: 'VIP Master',
    orderHistoryCount: 15
  }
];

// Seed simulated contact messages
const defaultMessages: ContactMessage[] = [
  {
    id: 'msg_1',
    name: 'Teddy Riner',
    email: 'teddy.riner@olympic.fr',
    phone: '06 01 02 03 04',
    athleteGoal: 'masse',
    message: 'Bonjour la conciergerie de force. J\'aimerais augmenter les acides aminés de mon menu de mardi midi pour mes séances intensives de judo au Dojo National.',
    date: '01 Juin 2026, 14:32',
    status: 'pending'
  },
  {
    id: 'msg_2',
    name: 'Chloé Lavergne',
    email: 'chloe.lavergne@sprint.org',
    phone: '06 18 19 20 21',
    athleteGoal: 'seche',
    message: 'Est-il possible d\'obtenir les sauces séparées du poulet dans toutes mes commandes de la semaine prochaine ? Cible de sèche extrêmement stricte pour la sélection nationale.',
    date: '31 Mai 2026, 09:12',
    status: 'answered',
    reply: 'Bonjour Chloé, aucun problème. Vos directives culinaires ont été scellées en cuisine dans votre station nutritionnelle. Toutes vos sauces seront conditionnées à part dans des fioles stériles.',
    repliedAt: '31 Mai 2026, 10:45'
  }
];

// Seed log history
const defaultLogs: AdminLog[] = [
  { id: 'log_1', timestamp: '01/06/2026, 23:05', type: 'admin', action: 'Désaccouplement et sécurisation de la station biométrique #09 OK', email: 'concierge@nutryx.athletic.fr' },
  { id: 'log_2', timestamp: '01/06/2026, 22:50', type: 'user', action: 'Authentification réussie de l\'athlète Adel Loukal', email: 'adelloukal2@gmail.com' },
  { id: 'log_3', timestamp: '01/06/2026, 19:40', type: 'admin', action: 'Recalibrage des valeurs caloriques de l\'Angus de l\'Olympe (Protides +15%)', email: 'concierge@nutryx.athletic.fr' },
  { id: 'log_4', timestamp: '01/06/2026, 14:32', type: 'user', action: 'Création d\'un ticket d\'assistance conciergerie', email: 'teddy.riner@olympic.fr' }
];

// Seed old completed orders
const defaultOrders: AthleteOrder[] = [
  {
    id: 'LX-872134',
    athleteEmail: 'teddy.riner@olympic.fr',
    athleteName: 'Teddy Riner',
    date: '28 Mai 2026, 13:12',
    items: [
      {
        id: 'item_pre_1',
        name: 'L\'Angus de l\'Olympe',
        isCustom: false,
        price: 34,
        quantity: 2,
        macros: { calories: 615, protein: 43, carbs: 45, lipids: 18 },
        description: 'Notre pièce maîtresse pour l\'hypertrophie.'
      }
    ],
    total: 68,
    macros: { calories: 1230, protein: 86, carbs: 90, lipids: 36 },
    status: 'completed'
  },
  {
    id: 'LX-234901',
    athleteEmail: 'chloe.lavergne@sprint.org',
    athleteName: 'Chloé Lavergne',
    date: '30 Mai 2026, 19:45',
    items: [
      {
        id: 'item_pre_2',
        name: 'L\'Anabolisme Cellulaire',
        isCustom: false,
        price: 29,
        quantity: 1,
        macros: { calories: 380, protein: 42, carbs: 23, lipids: 5 },
        description: 'Une découpe millimétrée de poitrine de poulet bio basse température.'
      }
    ],
    total: 29,
    macros: { calories: 380, protein: 42, carbs: 23, lipids: 5 },
    status: 'delivering'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveViewState] = useState<ViewType>('accueil');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [profile, setProfile] = useState<UserAthleteProfile>(defaultProfile);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('nutryx_is_logged_in') === 'true';
  });

  // Dynamic state loaded or saved on local storage
  const [dishes, setDishes] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('nutryx_dishes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= SIGNATURE_DISHES.length) {
          const signatureImages = new Map(
            SIGNATURE_DISHES.map(dish => [dish.id, dish.image])
          );

          return parsed.map(dish => ({
            ...dish,
            image: signatureImages.get(dish.id) ?? dish.image
          }));
        }
      } catch (e) {
        console.error(e);
      }
    }
    return SIGNATURE_DISHES;
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('nutryx_contacts');
    return saved ? JSON.parse(saved) : defaultMessages;
  });

  const [adminLogs, setAdminLogs] = useState<AdminLog[]>(() => {
    const saved = localStorage.getItem('nutryx_logs');
    return saved ? JSON.parse(saved) : defaultLogs;
  });

  const [athletes, setAthletes] = useState<UserAthleteProfile[]>(() => {
    const saved = localStorage.getItem('nutryx_athletes');
    return saved ? JSON.parse(saved) : defaultAthletes;
  });

  const [completedOrders, setCompletedOrders] = useState<AthleteOrder[]>(() => {
    const saved = localStorage.getItem('nutryx_orders');
    return saved ? JSON.parse(saved) : defaultOrders;
  });

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('nutryx_dishes', JSON.stringify(dishes));
  }, [dishes]);

  useEffect(() => {
    localStorage.setItem('nutryx_contacts', JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem('nutryx_logs', JSON.stringify(adminLogs));
  }, [adminLogs]);

  useEffect(() => {
    localStorage.setItem('nutryx_athletes', JSON.stringify(athletes));
  }, [athletes]);

  useEffect(() => {
    localStorage.setItem('nutryx_orders', JSON.stringify(completedOrders));
  }, [completedOrders]);

  // Load profile / cart on Mount
  useEffect(() => {
    const savedCart = localStorage.getItem('nutryx_cart');
    const savedProfile = localStorage.getItem('nutryx_profile');

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const setActiveView = (view: ViewType) => {
    setActiveViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to re-calculate targets based on physical metrics
  const recalculateProfileTargets = (prof: UserAthleteProfile) => {
    const bmr = 88.362 + (13.397 * prof.weight) + (4.799 * prof.height) - (5.677 * prof.age);
    let activityMultiplier = 1.375; 
    if (prof.activityLevel === 'pro') activityMultiplier = 1.55;
    if (prof.activityLevel === 'extreme') activityMultiplier = 1.9;

    let calBase = bmr * activityMultiplier;

    if (prof.currentGoal === 'seche') {
      calBase -= 500;
    } else if (prof.currentGoal === 'masse') {
      calBase += 450;
    }

    const finalCalories = Math.round(calBase);

    let pRatio = 0.35, cRatio = 0.45, lRatio = 0.20; 
    if (prof.currentGoal === 'seche') {
      pRatio = 0.45;
      cRatio = 0.25;
      lRatio = 0.30;
    } else if (prof.currentGoal === 'masse') {
      pRatio = 0.30;
      cRatio = 0.55;
      lRatio = 0.15;
    }

    const proteinTarget = Math.round((finalCalories * pRatio) / 4);
    const carbsTarget = Math.round((finalCalories * cRatio) / 4);
    const lipidsTarget = Math.round((finalCalories * lRatio) / 9);

    return {
      ...prof,
      dailyCaloriesTarget: finalCalories,
      dailyProteinTarget: proteinTarget,
      dailyCarbsTarget: carbsTarget,
      dailyLipidsTarget: lipidsTarget
    };
  };

  const updateProfile = (updated: Partial<UserAthleteProfile>) => {
    setProfile(prev => {
      let combined = { ...prev, ...updated };
      if (updated.weight || updated.height || updated.age || updated.activityLevel || updated.currentGoal) {
        combined = recalculateProfileTargets(combined);
      }
      
      if (combined.orderHistoryCount >= 10) {
        combined.tier = 'VIP Master';
      } else if (combined.orderHistoryCount >= 5) {
        combined.tier = 'Black Platinum';
      } else {
        combined.tier = 'Gold Elite';
      }

      // Sync into our athletes state array too
      setAthletes(prevAthletes => 
        prevAthletes.map(ath => ath.email === combined.email ? combined : ath)
      );

      localStorage.setItem('nutryx_profile', JSON.stringify(combined));
      return combined;
    });
  };

  // Login action with logs
  const loginUser = (email: string, pass: string) => {
    const usersStr = localStorage.getItem('nutryx_users');
    const users = usersStr ? JSON.parse(usersStr) : {};
    
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check local hardcoded or seed accounts
    if (normalizedEmail === 'kevin.loukal@eliteathletics.fr' || normalizedEmail === 'adelloukal2@gmail.com') {
      setIsLoggedIn(true);
      localStorage.setItem('nutryx_is_logged_in', 'true');
      
      let customProfile = athletes.find(a => a.email === normalizedEmail);
      if (!customProfile) {
        customProfile = {
          ...defaultProfile,
          firstName: normalizedEmail === 'adelloukal2@gmail.com' ? 'Adel' : 'Kévin',
          lastName: 'Loukal',
          email: normalizedEmail
        };
        setAthletes(prev => [...prev, customProfile as UserAthleteProfile]);
      }
      
      setProfile(customProfile);
      localStorage.setItem('nutryx_profile', JSON.stringify(customProfile));

      addAdminLog('user', `Authentification réussie de l'athlète ${customProfile.firstName} ${customProfile.lastName}`, normalizedEmail);
      return { success: true };
    }

    if (users[normalizedEmail]) {
      if (users[normalizedEmail].password === pass) {
        setIsLoggedIn(true);
        localStorage.setItem('nutryx_is_logged_in', 'true');
        
        const userProfile = users[normalizedEmail].profile;
        setProfile(userProfile);
        localStorage.setItem('nutryx_profile', JSON.stringify(userProfile));

        addAdminLog('user', `Authentification complétée de l'athlète ${userProfile.firstName} ${userProfile.lastName}`, normalizedEmail);
        return { success: true };
      } else {
        addAdminLog('user', `Échec d'authentification (mot de passe invalide)`, normalizedEmail);
        return { success: false, error: 'Mot de passe incorrect.' };
      }
    }
    
    return { success: false, error: 'Aucun compte athlète trouvé avec cet e-mail. Veuillez créer un compte.' };
  };

  // Register action with logs and profile lists
  const registerUser = (firstName: string, lastName: string, email: string, pass: string) => {
    const usersStr = localStorage.getItem('nutryx_users');
    const users = usersStr ? JSON.parse(usersStr) : {};
    const normalizedEmail = email.toLowerCase().trim();

    if (users[normalizedEmail] || normalizedEmail === 'kevin.loukal@eliteathletics.fr' || normalizedEmail === 'adelloukal2@gmail.com') {
      return { success: false, error: 'Cet e-mail est déjà associé à un compte athlète actif.' };
    }

    const newProfile: UserAthleteProfile = {
      firstName,
      lastName,
      email: normalizedEmail,
      weight: 75,
      height: 180,
      age: 25,
      activityLevel: 'pro',
      currentGoal: 'performance',
      dailyCaloriesTarget: 2700,
      dailyProteinTarget: 165,
      dailyCarbsTarget: 310,
      dailyLipidsTarget: 75,
      tier: 'Gold Elite',
      orderHistoryCount: 0
    };

    const recalculatedProfile = recalculateProfileTargets(newProfile);

    users[normalizedEmail] = {
      password: pass,
      profile: recalculatedProfile
    };

    localStorage.setItem('nutryx_users', JSON.stringify(users));
    
    setIsLoggedIn(true);
    localStorage.setItem('nutryx_is_logged_in', 'true');
    setProfile(recalculatedProfile);
    localStorage.setItem('nutryx_profile', JSON.stringify(recalculatedProfile));

    // Append to dynamic list
    setAthletes(prev => [...prev, recalculatedProfile]);

    addAdminLog('user', `Création de compte complétée & calibrage biométrique initial pour l'athlète ${firstName} ${lastName}`, normalizedEmail);

    return { success: true };
  };

  const logoutUser = () => {
    addAdminLog('user', `Fermeture de session de l'athlète : ${profile.firstName}`, profile.email);
    setIsLoggedIn(false);
    localStorage.removeItem('nutryx_is_logged_in');
    setProfile(defaultProfile);
    localStorage.removeItem('nutryx_profile');
    setActiveViewState('accueil');
  };

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const id = `item_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const completeItem: CartItem = { ...newItem, id };

    setCart(prev => {
      const updated = [...prev, completeItem];
      localStorage.setItem('nutryx_cart', JSON.stringify(updated));
      return updated;
    });
    return id;
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('nutryx_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, quantity } : item);
      localStorage.setItem('nutryx_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('nutryx_cart');
  };

  // Place Order Action into our high performance completed orders
  const placeOrder = () => {
    if (cart.length === 0) return { success: false, orderId: '' };

    const orderId = `LX-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date();
    const formattedDate = today.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const total = cart.reduce((sums, i) => sums + (i.price * i.quantity), 0);
    const totalMacros = cart.reduce((m, item) => {
      m.calories += item.macros.calories * item.quantity;
      m.protein += item.macros.protein * item.quantity;
      m.carbs += item.macros.carbs * item.quantity;
      m.lipids += item.macros.lipids * item.quantity;
      return m;
    }, { calories: 0, protein: 0, carbs: 0, lipids: 0 });

    const newOrder: AthleteOrder = {
      id: orderId,
      athleteEmail: profile.email,
      athleteName: `${profile.firstName} ${profile.lastName}`,
      date: formattedDate,
      items: [...cart],
      total,
      macros: totalMacros,
      status: 'pending'
    };

    setCompletedOrders(prev => {
      const updated = [newOrder, ...prev];
      localStorage.setItem('nutryx_orders', JSON.stringify(updated));
      return updated;
    });

    // Clear cart and update profile count
    clearCart();
    
    const newCount = profile.orderHistoryCount + 1;
    updateProfile({ orderHistoryCount: newCount });

    addAdminLog('user', `Commande scellée et transvasée au labo : ID ${orderId} pour un total de ${total}€`, profile.email);

    return { success: true, orderId };
  };

  // Admin Actions logger
  const addAdminLog = (type: 'admin' | 'user', action: string, email: string) => {
    const newLog: AdminLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      type,
      action,
      email
    };
    setAdminLogs(prev => [newLog, ...prev]);
  };

  const clearLogs = () => {
    setAdminLogs([]);
    addAdminLog('admin', 'Journal d\'audits administratifs réinitialisé par le superviseur', 'concierge@nutryx.athletic.fr');
  };

  // Dishes administration (Add, Edit, Delete)
  const addDish = (dish: Omit<MenuItem, 'id'>) => {
    const id = `sig_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const newDish: MenuItem = { ...dish, id };
    setDishes(prev => [...prev, newDish]);
    addAdminLog('admin', `Insertion d'une nouvelle création gastronomique : ${dish.name}`, 'concierge@nutryx.athletic.fr');
  };

  const updateDish = (id: string, updatedDish: Partial<MenuItem>) => {
    setDishes(prev => prev.map(d => d.id === id ? { ...d, ...updatedDish } : d));
    addAdminLog('admin', `Modification des paramètres cinétiques du plat : ${updatedDish.name || id}`, 'concierge@nutryx.athletic.fr');
  };

  const deleteDish = (id: string) => {
    const dishToDelete = dishes.find(d => d.id === id);
    setDishes(prev => prev.filter(d => d.id !== id));
    addAdminLog('admin', `Suppression définitive du menu d'expression : ${dishToDelete?.name || id}`, 'concierge@nutryx.athletic.fr');
  };

  // Contact administration (Add, Answer replies)
  const addContactMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      date: new Date().toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'pending'
    };
    setContactMessages(prev => [newMsg, ...prev]);
    addAdminLog('user', `Transfèrement d'une requête d'assistance physique : ${msg.name}`, msg.email);
  };

  const replyToMessage = (id: string, replyText: string) => {
    setContactMessages(prev => prev.map(m => {
      if (m.id === id) {
        return {
          ...m,
          status: 'answered',
          reply: replyText,
          repliedAt: new Date().toLocaleString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };
      }
      return m;
    }));
    const message = contactMessages.find(m => m.id === id);
    addAdminLog('admin', `Transmission de la réponse concierge à l'attention de : ${message?.name}`, 'concierge@nutryx.athletic.fr');
  };

  // Athlete physical values edit override (dynamic from Admin)
  const updateAthlete = (email: string, updated: Partial<UserAthleteProfile>) => {
    setAthletes(prev => prev.map(ath => {
      if (ath.email === email) {
        const result = recalculateProfileTargets({ ...ath, ...updated } as UserAthleteProfile);
        if (email === profile.email) {
          setProfile(result);
          localStorage.setItem('nutryx_profile', JSON.stringify(result));
        }
        return result;
      }
      return ath;
    }));
    addAdminLog('admin', `Ajustement biométrique forcé de l'athlète : ${email}`, 'concierge@nutryx.athletic.fr');
  };

  // Order status live updater
  const updateOrderStatus = (orderId: string, status: AthleteOrder['status']) => {
    setCompletedOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status };
      }
      return o;
    }));
    addAdminLog('admin', `Passage de la commande ${orderId} au statut : ${status.toUpperCase()}`, 'concierge@nutryx.athletic.fr');
  };

  return (
    <AppContext.Provider value={{
      activeView,
      setActiveView,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      profile,
      updateProfile,
      completedOrders,
      placeOrder,
      isLoggedIn,
      loginUser,
      registerUser,
      logoutUser,

      // Admin exports
      dishes,
      addDish,
      updateDish,
      deleteDish,
      contactMessages,
      addContactMessage,
      replyToMessage,
      adminLogs,
      addAdminLog,
      clearLogs,
      athletes,
      updateAthlete,
      updateOrderStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
