/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { ScrollToTop } from './components/ScrollToTop';

// Import distinct pages
import { Home } from './pages/Home/Home';
import { Cart } from './pages/Cart/Cart';
import { Profile } from './pages/Profile/Profile';
import { Contact } from './pages/Contact/Contact';
import { Info } from './pages/Info/Info';
import { Admin } from './pages/Admin/Admin';

import { ArrowRight, Clock3, Instagram, Mail, MapPin, Twitter } from 'lucide-react';

const ViewRenderer: React.FC = () => {
  const { activeView, isAdmin } = useApp();

  const renderContent = () => {
    switch (activeView) {
      case 'accueil':
        return <Home />;
      case 'panier':
        return <Cart />;
      case 'profil':
        return <Profile />;
      case 'contact':
        return <Contact />;
      case 'information':
        return <Info />;
      case 'admin':
        return isAdmin ? <Admin /> : <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div key={activeView} className="animate-reveal-up">
      {renderContent()}
    </div>
  );
};

const MainLayout: React.FC = () => {
  const { activeView, setActiveView, isAdmin } = useApp();

  if (activeView === 'admin' && isAdmin) {
    return (
      <div className="selection:bg-black selection:text-white">
        <CustomCursor />
        <main className="min-h-screen">
          <ViewRenderer />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col justify-between selection:bg-white selection:text-black font-sans">
      {/* Custom luxurious cursor */}
      <CustomCursor />

      {/* Interactive premium ScrollToTop utility */}
      <ScrollToTop />

      {/* Primary header bar */}
      <Navbar />

      {/* Main viewport */}
      <main className="flex-grow">
        <ViewRenderer />
      </main>

      <footer className="border-t border-white/10 bg-[#080808] text-xs text-white/50" id="main-footer">
        <div className="border-b border-white/10">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_0.7fr_0.8fr_1fr] lg:py-16">
            <div className="max-w-sm">
              <button
                onClick={() => setActiveView('accueil')}
                className="text-left text-xl font-extrabold tracking-[0.24em] text-white"
              >
                NUTRY<span className="ml-1 bg-white/10 px-2 py-1 text-xs font-light tracking-normal">.X</span>
              </button>
              <p className="mt-5 text-sm font-light leading-7 text-white/42">
                Des assiettes premium, des macros claires et une nutrition pensée pour accompagner chaque objectif sportif.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/45 transition-colors hover:border-white/35 hover:text-white">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Twitter" className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/45 transition-colors hover:border-white/35 hover:text-white">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/32">Navigation</h3>
              <nav className="mt-5 flex flex-col items-start gap-3 text-sm text-white/62">
                <button onClick={() => setActiveView('accueil')} className="transition-colors hover:text-white">Accueil</button>
                <button onClick={() => setActiveView('profil')} className="transition-colors hover:text-white">Espace athlète</button>
                <button onClick={() => setActiveView('panier')} className="transition-colors hover:text-white">Panier</button>
                <button onClick={() => setActiveView('contact')} className="transition-colors hover:text-white">Contact</button>
              </nav>
            </div>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/32">Informations</h3>
              <nav className="mt-5 flex flex-col items-start gap-3 text-sm text-white/62">
                <button onClick={() => setActiveView('information')} className="transition-colors hover:text-white">Conditions générales</button>
                <button onClick={() => setActiveView('information')} className="transition-colors hover:text-white">Confidentialité</button>
                <button onClick={() => setActiveView('information')} className="transition-colors hover:text-white">Nutrition & santé</button>
              </nav>
            </div>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/32">Nous joindre</h3>
              <div className="mt-5 space-y-4 text-sm leading-6 text-white/58">
                <a href="mailto:concierge@nutryx.athletic.fr" className="flex gap-3 transition-colors hover:text-white">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-emerald-300/70" />
                  <span className="break-all">concierge@nutryx.athletic.fr</span>
                </a>
                <div className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-emerald-300/70" />
                  <span>88 avenue des Olympiades<br />75008 Paris</span>
                </div>
                <div className="flex gap-3">
                  <Clock3 className="mt-1 h-4 w-4 shrink-0 text-emerald-300/70" />
                  <span>Lun–Sam · 8h–20h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white text-black" data-cursor-theme="dark">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-serif text-xl">Un projet nutrition ou catering ?</div>
              <div className="mt-1 text-xs text-black/55">Notre équipe répond sous deux heures.</div>
            </div>
            <button
              onClick={() => setActiveView('contact')}
              className="group inline-flex items-center justify-center gap-3 border border-black bg-black px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
            >
              Parler à l’équipe
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 font-mono text-[9px] uppercase tracking-widest text-white/25 sm:px-6 md:flex-row md:items-center md:justify-between">
          <span>NUTRY.X Paris © 2026</span>
          <span>Nutrition sportive · Cuisine premium · Suivi athlète</span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
