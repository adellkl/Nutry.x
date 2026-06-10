/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trash2, ShoppingBag, Plus, Minus, CreditCard, Sparkles, AlertCircle, Printer, Trophy } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, placeOrder, profile, setActiveView } = useApp();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState('');
  const [promoError, setPromoError] = useState('');
  const [orderCompleteState, setOrderCompleteState] = useState<{ completed: boolean; orderId: string } | null>(null);

  // Audio syntonizer systems for interactive design agency feedback
  const playSuccess = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      osc1.frequency.exponentialRampToValueAtTime(1046.50, now + 0.35);
      gain1.gain.setValueAtTime(0.04, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(659.25, now + 0.08);
      osc2.frequency.exponentialRampToValueAtTime(1318.51, now + 0.45);
      gain2.gain.setValueAtTime(0.02, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.5);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.55);
    } catch (e) {
      // AudioContext blocked
    }
  };

  const playError = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(115, now);
      osc.frequency.setValueAtTime(85, now + 0.1);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      // AudioContext blocked
    }
  };

  // Totals calculations
  const totalRaw = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const discountAmount = Math.round(totalRaw * promoDiscount);
  const totalWithDiscount = Math.max(0, totalRaw - discountAmount);

  const totalMacros = cart.reduce((m, item) => {
    m.calories += item.macros.calories * item.quantity;
    m.protein += item.macros.protein * item.quantity;
    m.carbs += item.macros.carbs * item.quantity;
    m.lipids += item.macros.lipids * item.quantity;
    return m;
  }, { calories: 0, protein: 0, carbs: 0, lipids: 0 });

  const applyPromoCodeValue = (codeToApply: string) => {
    const code = codeToApply.trim().toUpperCase();
    setPromoError('');
    if (code === 'OLYMPIQUE10') {
      setPromoDiscount(0.10);
      setPromoApplied('OLYMPIQUE10 (-10%)');
      setPromoCode('');
      playSuccess();
    } else if (code === 'NUTRYXGOLD') {
      setPromoDiscount(0.15);
      setPromoApplied('NUTRYXGOLD (-15%)');
      setPromoCode('');
      playSuccess();
    } else if (code === '') {
      setPromoError('VEUILLEZ INTRODUIRE UNE CHAÎNE DE CARACTÈRES VALIDE.');
      playError();
    } else {
      setPromoError('SIGNAL INCONNU // INTÉGRITÉ MACRONUTRIELLE DU PANIER INCHANGÉE.');
      playError();
    }
  };

  const handleCheckout = () => {
    const res = placeOrder();
    if (res.success) {
      setOrderCompleteState({ completed: true, orderId: res.orderId });
    }
  };

  if (orderCompleteState?.completed) {
    return (
      <div className="bg-[#0d0d0d] text-white min-h-screen pt-28 pb-16 flex flex-col items-center justify-center" id="cart-order-success">
        <div className="max-w-md w-full px-6 text-center space-y-8">
          
          <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <div className="text-white/40 text-[10px] font-mono tracking-widest uppercase">// COMMANDE EXPÉDIÉE EN CUISINE</div>
            <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight">C'est Validé, Champion.</h1>
            <p className="text-white/50 text-xs font-light leading-relaxed">
              Le chef double-vérifie vos métriques cibles. Votre plateau gastronomique de performance est entré en phase d'assemblage millimétré.
            </p>
          </div>

          {/* Quick ticket box representation with ID */}
          <div className="bg-white/5 border border-white/10 p-6 text-left space-y-4 rounded-sm">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-white/40">RÉFÉRENCE UNIQUE :</span>
              <span className="text-white font-bold">{orderCompleteState.orderId}</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-white/40">TEMPS D'ESTIMATION :</span>
              <span className="text-white font-bold">12 MINUTES CHRONO</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-white/40">TIER MAÎTRE :</span>
              <span className="text-white font-bold uppercase">{profile.tier}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3.5 bg-white text-black font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 hover:bg-zinc-200 cursor-none"
            >
              RETOURNER À L'ACCUEIL
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen pt-28 pb-16" id="cart-view">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="mb-12 space-y-2">
          <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase">// PANIER NUTRITIONNEL GOURMET //</span>
          <h1 className="font-serif text-3xl md:text-5xl font-regular">Votre Sélection</h1>
        </div>

        {cart.length === 0 ? (
          <div className="border border-white/5 bg-white/[0.01] py-20 px-6 flex flex-col items-center justify-center text-center space-y-6" id="empty-cart-plate">
            <div className="p-4 bg-white/5 rounded-full">
              <ShoppingBag className="w-8 h-8 text-white/40" />
            </div>
            <div className="space-y-2">
              <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-white">Le panier est vierge</h3>
              <p className="text-white/40 text-xs font-light max-w-sm">
                Aucune assiette de précision n'a encore été ajoutée. Explorez les créations signature Nutry.X.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setActiveView('accueil')}
                className="px-6 py-3 bg-white text-black font-sans text-xs tracking-widest font-bold uppercase hover:bg-zinc-200 cursor-none"
              >
                VOIR LES PLATS SIGNATURE
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Cart items modifiers list */}
            <div className="lg:col-span-7 space-y-6" id="cart-items-deck">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="bg-white/[0.01] border border-white/5 p-6 flex flex-col md:flex-row justify-between md:items-center gap-6 hover:border-white/10 transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-serif text-lg font-bold text-white leading-tight">{item.name}</h3>
                      {item.isCustom && (
                        <span className="text-[8px] bg-white/10 font-mono text-white/80 px-2 py-0.5 rounded-none font-bold uppercase tracking-wider">
                          Bespoke
                        </span>
                      )}
                    </div>

                    <p className="text-white/40 text-[11px] font-light leading-relaxed max-w-md">
                      {item.description}
                    </p>

                    {/* Quick macros of card items */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] font-mono text-white/50 pt-2">
                      <span className="bg-white/5 px-2 py-0.5 font-bold text-white/70 font-mono">{item.macros.calories} KCAL</span>
                      <span>P: {item.macros.protein}g</span>
                      <span>G: {item.macros.carbs}g</span>
                      <span>L: {item.macros.lipids}g</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 md:gap-8 border-t border-white/5 md:border-none pt-4 md:pt-0">
                    {/* Quantity selectors */}
                    <div className="flex items-center space-x-3 bg-zinc-900 border border-white/5 px-3 py-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-white/50 hover:text-white transition-colors focus:outline-none cursor-none"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-extrabold px-1.5">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-white/50 hover:text-white transition-colors focus:outline-none cursor-none"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Pricing */}
                    <div className="text-right">
                      <div className="font-mono text-xs text-white/50">{item.price} € / unité</div>
                      <div className="font-sans font-bold text-sm text-white mt-0.5">{item.price * item.quantity} €</div>
                    </div>

                    {/* Trash remove button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-white/30 hover:text-red-400 transition-colors focus:outline-none cursor-none"
                      title="Retirer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Promo input code widget - Design Agency Redesign */}
              <div className="relative overflow-hidden border border-white/5 bg-zinc-950/40 p-6 sm:p-8 hover:border-white/10 transition-all duration-500 rounded-none group" id="saisonnier-benefit-module">
                {/* Neon-flare top border representing physical strength & prestige precision */}
                <span className="absolute top-0 left-0 w-32 h-[1px] bg-gradient-to-r from-emerald-400 via-emerald-500 to-transparent block" />
                <span className="absolute bottom-0 right-0 w-32 h-[1px] bg-gradient-to-l from-white/20 via-zinc-800 to-transparent block" />
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/[0.01] blur-3xl rounded-full pointer-events-none group-hover:bg-emerald-500/[0.04] transition-all duration-700" />

                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
                  <div className="space-y-2 text-left max-w-sm sm:max-w-md">
                    <div className="inline-flex items-center space-x-2 text-[8px] font-mono tracking-[0.3em] text-[#10b981] uppercase">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping shrink-0" />
                      <span>MODULE BIOTIQUE DE FORCE</span>
                    </div>
                    <h4 className="font-serif text-lg sm:text-xl font-light tracking-tight text-white">
                      Avantage Exclusive <span className="font-sans font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">Saisonnier</span>
                    </h4>
                    <p className="text-[10.5px] text-zinc-400 font-light leading-relaxed">
                      Saisissez votre laissez-passer ou sélectionnez un raccourci biosynthétique ci-dessous pour recalibrer vos macros financières.
                    </p>
                  </div>

                  <div className="w-full lg:w-auto space-y-3.5">
                    <div className="flex flex-col min-[420px]:flex-row bg-black border border-white/10 hover:border-white/20 focus-within:border-emerald-500/55 transition-all duration-300 rounded-none overflow-hidden max-w-sm w-full lg:min-w-[320px]">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value);
                          if (promoError) setPromoError('');
                        }}
                        placeholder="LAISSEZ-PASSER ?"
                        className="p-3.5 bg-transparent text-xs text-white placeholder-white/25 uppercase tracking-[0.12em] sm:tracking-[0.2em] outline-none font-mono flex-1 min-w-0 focus:ring-0"
                      />
                      <button
                        onClick={() => applyPromoCodeValue(promoCode)}
                        className="px-5 py-3.5 bg-white text-black font-sans text-[9px] tracking-[0.16em] sm:tracking-[0.25em] font-black uppercase transition-all duration-300 hover:bg-zinc-200 cursor-none shrink-0"
                      >
                        APPLIQUER
                      </button>
                    </div>

                    {/* Quick suggestion tabs - Interactive biological shortcuts */}
                    <div className="flex flex-wrap items-center gap-2 text-[8.5px] font-mono tracking-widest text-zinc-500">
                      <span className="text-zinc-600">// SYNTAX :</span>
                      <button 
                        onClick={() => {
                          setPromoCode('OLYMPIQUE10');
                          applyPromoCodeValue('OLYMPIQUE10');
                        }}
                        className="text-[8px] border border-white/5 hover:border-emerald-400 hover:text-emerald-400 px-2.5 py-1 hover:bg-emerald-950/20 transition-all cursor-none uppercase bg-[#090909]"
                      >
                        [ OLYMPIQUE10 // -10% ]
                      </button>
                      <button 
                        onClick={() => {
                          setPromoCode('NUTRYXGOLD');
                          applyPromoCodeValue('NUTRYXGOLD');
                        }}
                        className="text-[8px] border border-white/5 hover:border-emerald-400 hover:text-emerald-400 px-2.5 py-1 hover:bg-emerald-950/20 transition-all cursor-none uppercase bg-[#090909]"
                      >
                        [ NUTRYXGOLD // -15% ]
                      </button>
                    </div>
                  </div>
                </div>

                {/* Inline error feedback */}
                {promoError && (
                  <div className="mt-4 flex items-center space-x-2 border border-red-500/20 bg-red-950/15 p-3.5 text-[9px] font-mono tracking-[0.15em] text-red-400 uppercase rounded-none animate-pulse">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping shrink-0" />
                    <span>{promoError}</span>
                  </div>
                )}
              </div>

              {promoApplied && (
                <div className="bg-emerald-950/20 text-emerald-400 border border-emerald-900/40 p-5 text-xs font-mono tracking-[0.12em] sm:tracking-[0.2em] flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between uppercase relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping mr-1" />
                    <span>CODE PRIVILÈGE ATHLÈTE SYNTONISÉ :</span>
                  </div>
                  <span className="font-extrabold underline decoration-emerald-400 decoration-2 tracking-widest">{promoApplied}</span>
                </div>
              )}
            </div>

            {/* Right Column: Custom Thermal Cash Receipt Summary ("ticket de caisse") */}
            <div className="lg:col-span-5" id="ticket-de-caisse-panel">
              
              <div className="receipt-paper px-6 py-8 relative shadow-2xl rounded-none text-black selection:bg-black selection:text-white" id="checkout-receipt">
                
                {/* Decorative cut elements */}
                <div className="receipt-zig-zag" />

                {/* Receipt Header */}
                <div className="text-center space-y-2 border-b border-black border-dashed pb-6">
                  <h2 className="font-mono text-xl font-black uppercase tracking-[0.2em] leading-none mb-1">NUTRY.X</h2>
                  <div className="text-[9px] font-mono leading-relaxed space-y-0.5">
                    <div>PARIS, FR // SECTOR ATHLETIC NO. 01</div>
                    <div>GASTRONOMIE CLINIQUE SUR-MESURE</div>
                    <div>TEL : +33 (0)1 98 32 C9 E9</div>
                    <div>DATE : {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })} - {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                </div>

                {/* Receipt Customer information block */}
                <div className="py-4 border-b border-black border-dashed text-[10px] font-mono leading-relaxed">
                  <div className="font-bold uppercase mb-1">COMPTE ATHLÈTE //</div>
                  <div>CLIENT : {profile.firstName.toUpperCase()} {profile.lastName.toUpperCase()}</div>
                  <div>EMAIL  : {profile.email.toUpperCase()}</div>
                  <div className="flex justify-between">
                    <span>NIVEAU : {profile.tier.toUpperCase()}</span>
                    <span>RESTRICTIONS : AUCUNE</span>
                  </div>
                </div>

                {/* Items list with columns */}
                <div className="py-4 border-b border-black border-dashed font-mono">
                  <div className="text-[10px] font-bold flex justify-between uppercase mb-2">
                    <span>INTITULÉ PLAT</span>
                    <span>TTC</span>
                  </div>

                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="text-[10px] leading-snug">
                        <div className="flex justify-between items-baseline font-bold">
                          <span className="uppercase">{item.quantity} X {item.name.slice(0, 24)}</span>
                          <span>{(item.price * item.quantity).toFixed(2)} €</span>
                        </div>
                        {item.isCustom ? (
                          <div className="text-[9px] text-zinc-700 mt-0.5 leading-normal">
                            *PLATEAU SUR-MESURE ATHLÈTE (MACROS INDIVIDUALISÉES)
                          </div>
                        ) : (
                          <div className="text-[9px] text-zinc-700 mt-0.5 leading-normal">
                            *CRÉATION MAJEURE DU CHEF
                          </div>
                        )}
                        <div className="text-[9px] font-medium text-zinc-800 tracking-wide">
                          - KCAL: {item.macros.calories * item.quantity} | P: {item.macros.protein * item.quantity}g | G: {item.macros.carbs * item.quantity}g
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Macrometric Sum Report */}
                <div className="py-4 border-b border-black border-dashed leading-relaxed text-[10px] font-mono">
                  <div className="font-bold uppercase mb-2 text-center text-zinc-800">TELEMETRIE MICRO-NUTRITIONNELLE TOTALE</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                    <div className="flex justify-between">
                      <span>VALEUR ENERGÉTIQUE :</span>
                      <span className="font-bold">{totalMacros.calories} KCAL</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PROTÉINES TOTALES :</span>
                      <span className="font-bold">{totalMacros.protein} g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GLUCIDES ASSIMILÉS :</span>
                      <span className="font-bold">{totalMacros.carbs} g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>LIPIDES SÉLECTIONNÉS :</span>
                      <span className="font-bold">{totalMacros.lipids} g</span>
                    </div>
                  </div>
                </div>

                {/* Receipt math calculations */}
                <div className="py-4 border-b border-black border-dashed space-y-1.5 font-mono text-[10.5px]">
                  <div className="flex justify-between">
                    <span>SOUS-TOTAL BRUT :</span>
                    <span>{totalRaw.toFixed(2)} €</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-zinc-700">
                      <span>ACCORD SPORT PROMO :</span>
                      <span>-{discountAmount.toFixed(2)} €</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>TVA APPLICABLE NUTRITION (5.5%) :</span>
                    <span>{((totalWithDiscount * 5.5) / 105.5).toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between font-black text-[13px] pt-2 border-t border-black border-dotted">
                    <span>TOTAL À PAYER :</span>
                    <span>{totalWithDiscount.toFixed(2)} €</span>
                  </div>
                </div>

                {/* Barcode representation */}
                <div className="pt-6 font-mono text-center flex flex-col items-center">
                  <div className="text-xs sm:text-[18px] tracking-[0.08em] sm:tracking-[0.14em] font-light text-zinc-900 leading-none break-all">
                    ||||| | |||| | || | |||| |||||| | ||| | |||
                  </div>
                  <div className="text-[8px] tracking-[0.25em] text-zinc-600 mt-1 uppercase">
                    *SECURE-X-NUTRITION-{orderCompleteState?.orderId || 'PENDING'}*
                  </div>
                  <div className="text-[7.5px] text-zinc-500 font-light max-w-[280px] leading-relaxed mt-4">
                    La haute performance commande des actions concrètes. Mangez noble. Entraînez-vous dur.
                  </div>
                </div>

              </div>

              {/* Secure payment checkout button */}
              <div className="mt-8 space-y-4">
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-white hover:bg-black hover:text-white hover:border-white border border-white text-black text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center space-x-2 cursor-none shadow-2xl"
                  id="checkout-trigger"
                >
                  <CreditCard className="w-4 h-4" />
                    <span className="min-w-0">PAYER ET ASSIGNER EN CUISINE ({totalWithDiscount.toFixed(2)} €)</span>
                </button>

                <div className="flex items-center space-x-2 text-[10px] text-zinc-500 tracking-wide font-light max-w-sm mx-auto justify-center">
                  <AlertCircle className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  <span>Passerelle bancaire sécurisée HTTPS - VISA, MASTERCARD, APPLE PAY.</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
