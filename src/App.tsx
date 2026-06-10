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

import { Instagram, Twitter } from 'lucide-react';

const ViewRenderer: React.FC = () => {
  const { activeView } = useApp();

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
        return <Admin />;
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
  const { activeView, setActiveView } = useApp();

  if (activeView === 'admin') {
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

      {/* Simple footer */}
      {(
        <footer className="border-t border-white/10 bg-black py-10 text-xs text-white/50" id="main-footer">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-3 max-w-md">
              <div className="text-white font-sans tracking-[0.25em] text-lg font-extrabold">
                NUTRY<span className="font-light text-xs bg-white/10 px-2 py-0.5 rounded ml-1 tracking-normal">.X</span>
              </div>
              <p className="font-light text-[12px] leading-relaxed text-white/40">
                Nutrition sportive premium, assiettes signature et suivi athlète.
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-mono uppercase tracking-widest text-white/45">
              <button onClick={() => setActiveView('accueil')} className="hover:text-white transition-colors focus:outline-none cursor-none">
                Accueil
              </button>
              <button onClick={() => setActiveView('contact')} className="hover:text-white transition-colors focus:outline-none cursor-none">
                Contact
              </button>
              <button onClick={() => setActiveView('information')} className="hover:text-white transition-colors focus:outline-none cursor-none">
                Infos
              </button>
            </nav>

            <div className="flex items-center gap-5 text-white/35">
                <a href="#" className="hover:text-white transition-colors cursor-none">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-white transition-colors cursor-none">
                  <Twitter className="w-4 h-4" />
                </a>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-white/10 text-[10px] text-white/25 tracking-widest font-mono">
            NUTRY.X PARIS © 2026
          </div>
        </footer>
      )}
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
