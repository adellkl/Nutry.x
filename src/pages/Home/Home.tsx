/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IMAGES } from '../../data';
import { ArrowRight, Check, Clock, Scale, ShieldCheck, ShoppingBag, Utensils } from 'lucide-react';

export const Home: React.FC = () => {
  const { setActiveView, addToCart, dishes } = useApp();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddSignature = (dish: any) => {
    addToCart({
      name: dish.name,
      isCustom: false,
      macros: { ...dish.macros },
      price: dish.price,
      quantity: 1,
      description: `Création signature Nutry.X adaptée à l'objectif ${dish.goal}.`
    });
    setActiveView('panier');
  };

  const bentoOffset = (speed: number) => `translate3d(0, ${Math.round(scrollY * speed)}px, 0)`;

  const metrics = [
    { value: '4', label: 'protéines premium' },
    { value: '4', label: 'macros visibles' },
    { value: '12 min', label: 'préparation estimée' },
  ];

  const pillars = [
    {
      title: 'Macros claires',
      text: 'Calories, protéines, glucides et lipides visibles avant validation.',
      icon: Scale,
    },
    {
      title: 'Cuisine propre',
      text: 'Ingrédients lisibles, cuisson précise, sauces et garnitures modulables.',
      icon: Utensils,
    },
    {
      title: 'Commande rapide',
      text: 'Une signature claire, des macros visibles, un panier prêt à confirmer.',
      icon: Clock,
    },
    {
      title: 'Profil athlète',
      text: 'Objectifs sèche, masse ou performance intégrés dans la composition.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen pt-20 overflow-hidden" id="home-view">
      <section
        className="relative min-h-[calc(100svh-80px)] flex items-center border-b border-white/10 overflow-hidden"
        id="hero-parallax-section"
      >
        <div
          className="absolute inset-0 h-[112%] -top-[6%] bg-cover bg-center opacity-55"
          style={{
            backgroundImage: `url(${IMAGES.hero})`,
            transform: `translate3d(0, ${Math.round(scrollY * 0.18)}px, 0)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/75 to-[#0d0d0d]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-[#0d0d0d]/35" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 lg:py-24">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 border border-white/15 bg-black/25 px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-white/65">
              <span className="h-1.5 w-1.5 bg-emerald-400" />
              Nutrition sportive sur-mesure
            </div>

            <div className="space-y-5">
              <h1
                className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight"
                id="hero-title"
              >
                Des assiettes nettes pour performer.
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-white/65 leading-relaxed">
                Nutry.X compose des plats premium adaptés à ton objectif, avec des macros visibles et une expérience simple.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const element = document.getElementById('bento-signatures');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-4 bg-white text-black border border-white text-xs font-bold uppercase tracking-widest hover:bg-transparent hover:text-white transition-colors inline-flex items-center justify-center gap-3 cursor-none"
                id="cta-create"
              >
                Voir les plats
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveView('contact')}
                className="px-6 py-4 bg-black/20 text-white border border-white/15 text-xs font-bold uppercase tracking-widest hover:border-white/45 transition-colors cursor-none"
              >
                Contact
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-xl pt-4">
              {metrics.map(item => (
                <div key={item.label} className="border border-white/10 bg-black/25 p-4">
                  <div className="font-mono text-lg sm:text-2xl font-black">{item.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-white/10" id="bento-system">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/35">
                Système Nutry.X
              </span>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Simple à commander, précis dans l’assiette.
              </h2>
            </div>
            <p className="max-w-md text-sm text-white/50 leading-relaxed">
              Une sélection directe. Tu choisis une signature, tu consultes les macros, puis tu ajoutes au panier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 lg:gap-5">
            <div
              className="md:col-span-4 md:row-span-2 min-h-[360px] border border-white/10 bg-cover bg-center relative overflow-hidden"
              style={{
                backgroundImage: `url(${IMAGES.salmon})`,
                transform: bentoOffset(-0.015),
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/45 mb-3">Bento parallax</div>
                <h3 className="font-serif text-3xl sm:text-4xl max-w-xl leading-tight">
                  Des plats lisibles, pas des promesses floues.
                </h3>
              </div>
            </div>

            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="md:col-span-2 border border-white/10 bg-[#121212] p-6 min-h-[170px] flex flex-col justify-between"
                  style={{ transform: bentoOffset(index % 2 === 0 ? 0.01 : -0.01) }}
                >
                  <Icon className="w-5 h-5 text-white/55" />
                  <div className="space-y-2 mt-8">
                    <h3 className="text-sm font-bold uppercase tracking-wide">{pillar.title}</h3>
                    <p className="text-sm text-white/48 leading-relaxed">{pillar.text}</p>
                  </div>
                </div>
              );
            })}

            <div
              className="md:col-span-3 border border-white/10 bg-white text-black p-6 sm:p-8 min-h-[220px] flex flex-col justify-between"
              style={{ transform: bentoOffset(0.012) }}
            >
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/45">
                <Check className="w-4 h-4" />
                Process clair
              </div>
              <div className="space-y-3">
                <h3 className="font-serif text-3xl leading-tight">Un choix clair, sans détour.</h3>
                <button
                  onClick={() => {
                    const element = document.getElementById('bento-signatures');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-black pb-1 cursor-none"
                >
                  Voir les plats
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className="md:col-span-3 border border-white/10 bg-cover bg-center min-h-[220px] relative overflow-hidden"
              style={{
                backgroundImage: `url(${IMAGES.beef})`,
                transform: bentoOffset(-0.008),
              }}
            >
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-serif text-3xl leading-tight">Signature ou sur-mesure.</h3>
                <p className="text-sm text-white/55 mt-2">Tu pars d’un plat existant ou tu composes le tien.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" id="bento-signatures">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/35">
                Signatures
              </span>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Trois bases pour aller vite.
              </h2>
            </div>
            <button
              onClick={() => setActiveView('contact')}
              className="w-full sm:w-auto px-5 py-3 bg-white text-black border border-white text-xs font-bold uppercase tracking-widest hover:bg-transparent hover:text-white transition-colors inline-flex items-center justify-center gap-2 cursor-none"
            >
              Nous contacter
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch gap-4 lg:gap-5" id="signature-dishes-grid">
            {dishes.slice(0, 3).map(dish => (
              <article
                key={dish.id}
                className="h-full border border-white/10 bg-[#111111] overflow-hidden flex flex-col"
              >
                <div className="relative h-64 sm:h-72 lg:h-64 xl:h-72 overflow-hidden shrink-0">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 bg-black/70 border border-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white/65">
                    {dish.goal === 'seche' ? 'Sèche' : dish.goal === 'masse' ? 'Masse' : 'Performance'}
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 grid grid-rows-[1fr_auto] gap-6">
                  <div className="grid content-start grid-rows-[auto_1fr] gap-3">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 min-h-[3.5rem]">
                      <h3 className="font-serif text-2xl leading-tight">{dish.name}</h3>
                      <span className="font-mono text-sm text-white/70 whitespace-nowrap pt-1">{dish.price} EUR</span>
                    </div>
                    <p className="text-sm text-white/48 leading-relaxed line-clamp-3 min-h-[4.5rem]">
                      {dish.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="border border-white/10 p-2">
                        <div className="text-xs font-mono font-bold">{dish.macros.calories}</div>
                        <div className="text-[9px] text-white/35 uppercase">kcal</div>
                      </div>
                      <div className="border border-white/10 p-2">
                        <div className="text-xs font-mono font-bold">{dish.macros.protein}g</div>
                        <div className="text-[9px] text-white/35 uppercase">prot</div>
                      </div>
                      <div className="border border-white/10 p-2">
                        <div className="text-xs font-mono font-bold">{dish.macros.carbs}g</div>
                        <div className="text-[9px] text-white/35 uppercase">gluc</div>
                      </div>
                      <div className="border border-white/10 p-2">
                        <div className="text-xs font-mono font-bold">{dish.macros.lipids}g</div>
                        <div className="text-[9px] text-white/35 uppercase">lip</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddSignature(dish)}
                      className="w-full py-3 border border-white bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-transparent hover:text-white transition-colors inline-flex items-center justify-center gap-2 cursor-none"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Ajouter
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
