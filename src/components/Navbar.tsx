/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Menu, X, User, ShieldAlert, Award } from 'lucide-react';
import gsap from 'gsap';

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, cart, profile, isLoggedIn, logoutUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Animate navbar entry
  useEffect(() => {
    gsap.fromTo(
      navbarRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
    );
  }, []);

  // Animate mobile menu transition
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.6, ease: 'power3.out' }
      );
      // Stagger items inside mobile menu
      gsap.fromTo(
        '.mobile-nav-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, [mobileMenuOpen]);

  const handleNavLink = (view: any) => {
    setMobileMenuOpen(false);
    setActiveView(view);
  };

  return (
    <>
      <header
        ref={navbarRef}
        className="fixed top-0 left-0 w-full z-40 bg-[#0d0d0d]/85 backdrop-blur-md border-b border-white/5"
        id="main-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center gap-3">
          {/* Logo */}
          <button
            onClick={() => handleNavLink('accueil')}
            className="flex items-center space-x-2 text-white font-sans tracking-[0.18em] sm:tracking-[0.25em] text-lg sm:text-xl font-extrabold focus:outline-none hover:opacity-80 transition-opacity shrink-0"
            id="brand-logo"
          >
            <span>NUTRY</span>
            <span className="text-white font-light text-sm bg-white/10 px-2 py-0.5 rounded-sm tracking-normal">.X</span>
          </button>

          {/* Desktop Nav Items (Dynamic menu depending on login status) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-10 text-[10px] xl:text-xs tracking-[0.14em] xl:tracking-[0.2em] font-medium text-white/60 min-w-0">
            {(isLoggedIn 
              ? [
                  { id: 'accueil', name: 'ACCUEIL' },
                  { id: 'profil', name: 'PROFIL' },
                  { id: 'panier', name: 'PANIER' },
                  { id: 'contact', name: 'CONTACT' }
                ]
              : [
                  { id: 'accueil', name: 'ACCUEIL' },
                  { id: 'information', name: 'INFOS' },
                  { id: 'contact', name: 'CONTACT' }
                ]
            ).map(link => (
              <button
                key={link.id}
                onClick={() => handleNavLink(link.id as any)}
                className={`relative py-2 focus:outline-none transition-colors hover:text-white uppercase ${
                  activeView === link.id ? 'text-white font-semibold' : ''
                }`}
                id={`nav-${link.id}`}
              >
                {link.name}
                {activeView === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Icons & Actions */}
          <div className="flex items-center gap-2 sm:gap-4 xl:gap-6 shrink-0">
            {/* Quick Profile Goal Widget */}
            {isLoggedIn && (
              <div className="hidden lg:flex items-center space-x-2 text-[10px] tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm">
                <Award className="w-3.5 h-3.5 text-white/80" />
                <span className="text-white/40">GOAL:</span>
                <span className="text-white font-bold uppercase">{profile.currentGoal === 'seche' ? 'Sèche' : profile.currentGoal === 'masse' ? 'Masse' : 'Performance'}</span>
              </div>
            )}

            {/* Profile Button with Live Connection Indicator */}
            <div className="relative group py-2 flex items-center">
              <button
                onClick={() => handleNavLink('profil')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full border transition-all duration-300 focus:outline-none cursor-none ${
                  activeView === 'profil' 
                    ? 'bg-white text-black border-white' 
                    : isLoggedIn
                    ? 'bg-emerald-950/20 text-emerald-300 border-emerald-900/40 hover:bg-emerald-900/30'
                    : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
                }`}
                title={isLoggedIn ? "Zone Athlète Privée" : "Zone Accès Privée"}
                id="profile-action"
              >
                <User className="w-3.5 h-3.5" />
                <span className="text-[9.5px] font-mono tracking-widest font-bold uppercase hidden sm:inline-block">
                  {isLoggedIn ? `${profile.firstName}` : "CONNEXION"}
                </span>
                {isLoggedIn && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block" />
                )}
              </button>
              
              {/* Dropdown Menu on hover for both logged in and logged out with elegant options */}
              <div className="absolute top-[100%] right-0 mt-1 bg-[#121212] border border-white/10 p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px] shadow-2xl z-50 space-y-1 rounded-sm">
                {isLoggedIn ? (
                  <>
                    <div className="px-2.5 py-1.5 border-b border-white/5 mb-1.5">
                      <span className="text-[7.5px] font-mono tracking-widest text-[#9ca3af] block">STATUT ATHLÈTE</span>
                      <span className="text-[9.5px] font-sans font-bold text-white uppercase block truncate">{profile.firstName} {profile.lastName}</span>
                    </div>
                    <button
                      onClick={() => handleNavLink('profil')}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-white/5 text-zinc-400 hover:text-white font-mono text-[9px] tracking-widest uppercase transition-colors focus:outline-none cursor-none flex items-center space-x-2 rounded-sm"
                    >
                      <span>MON PORTAIL</span>
                    </button>
                    <button
                      onClick={() => handleNavLink('panier')}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-white/5 text-zinc-400 hover:text-white font-mono text-[9px] tracking-widest uppercase transition-colors focus:outline-none cursor-none flex items-center space-x-2 rounded-sm"
                    >
                      <span>MON PANIER</span>
                    </button>
                    <button
                      onClick={() => handleNavLink('admin')}
                      className="w-full text-left px-2.5 py-2.5 hover:bg-white/5 text-white/90 hover:text-white font-mono text-[9px] tracking-widest uppercase transition-colors focus:outline-none cursor-none flex items-center justify-between border-t border-b border-white/5 my-1.5"
                    >
                      <span>CONSOLE ADMIN</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </button>
                    <button
                      onClick={() => {
                        logoutUser();
                        handleNavLink('accueil');
                      }}
                      className="w-full text-left px-2.5 py-2 hover:bg-red-500/10 text-red-500 hover:text-red-400 font-mono text-[9px] tracking-widest uppercase transition-all focus:outline-none cursor-none block rounded-sm"
                    >
                      DÉCONNEXION
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-2.5 py-1.5 border-b border-white/5 mb-1.5">
                      <span className="text-[7.5px] font-mono tracking-widest text-[#9ca3af] block">ACCÈS PRIVÉ</span>
                      <span className="text-[9.5px] font-sans font-bold text-white uppercase block">PORTAIL ATHLÈTE</span>
                    </div>
                    <button
                      onClick={() => handleNavLink('profil')}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-white/5 text-zinc-400 hover:text-white font-mono text-[9px] tracking-widest uppercase transition-colors focus:outline-none cursor-none block rounded-sm"
                    >
                      S'AUTHENTIFIER
                    </button>
                    <button
                      onClick={() => handleNavLink('profil')}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-white/5 text-zinc-400 hover:text-white font-mono text-[9px] tracking-widest uppercase transition-colors focus:outline-none cursor-none block rounded-sm"
                    >
                      REJOINDRE L'ÉLITE
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => handleNavLink('panier')}
              className={`p-2 rounded-full border border-white/5 hover:bg-white/5 transition-colors focus:outline-none relative ${
                activeView === 'panier' ? 'bg-white/10 text-white border-white/20' : 'text-white/60 hover:text-white'
              }`}
              title="Mon Panier Gourmet"
              id="cart-action"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Burger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/65 hover:text-white focus:outline-none"
              id="hamburger-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 animate-pulse" />}
            </button>
          </div>
        </div>
      </header>

      {/* Side Mobile Slider Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          {/* Overlay background */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div
            ref={mobileMenuRef}
            className="absolute top-0 right-0 max-w-full w-80 h-full bg-[#0d0d0d] border-l border-white/10 flex flex-col p-8 justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-12">
                <div className="text-white font-sans tracking-[0.2em] font-extrabold text-sm">
                  NUTRY<span className="bg-white/10 px-1.5 py-0.5 rounded ml-1 font-light">.X</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-white/50 hover:text-white focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links (Dynamic for logged in vs logged out) */}
              <nav className="flex flex-col space-y-6 text-xs tracking-[0.25em]">
                {(isLoggedIn
                  ? [
                      { id: 'accueil', name: 'ACCUEIL' },
                      { id: 'panier', name: 'PANIER' },
                      { id: 'profil', name: 'PROFIL' },
                      { id: 'contact', name: 'CONTACT' }
                    ]
                  : [
                      { id: 'accueil', name: 'ACCUEIL' },
                      { id: 'profil', name: 'PROFIL' },
                      { id: 'information', name: 'INFOS' },
                      { id: 'contact', name: 'CONTACT' }
                    ]
                ).map(link => (
                  <button
                    key={link.id}
                    onClick={() => handleNavLink(link.id as any)}
                    className={`mobile-nav-item text-left py-2 font-medium focus:outline-none transition-colors uppercase ${
                      activeView === link.id ? 'text-white font-bold border-l-2 border-white pl-4' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Bottom Athletic Status / Trigger */}
            <div className="border-t border-white/10 pt-6">
              <button
                onClick={() => handleNavLink('profil')}
                className="w-full text-left flex items-center justify-between group/mob-prof pr-2 cursor-none focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 font-mono text-[10px] text-white">
                    {isLoggedIn && profile.firstName ? profile.firstName[0] : '?'}
                  </div>
                  <div>
                    <div className="text-[10px] tracking-wider text-white font-bold uppercase col-span-2">
                      {isLoggedIn ? `${profile.firstName} ${profile.lastName}` : 'PORTAIL ANONYME'}
                    </div>
                    <div className="text-[8px] text-white/40 tracking-widest uppercase">
                      {isLoggedIn ? `Vérifié: ${profile.tier}` : 'MODE VISITEUR'}
                    </div>
                  </div>
                </div>
                <div className="text-[9px] font-mono tracking-widest text-[#9ca3af] group-hover/mob-prof:text-white transition-colors">
                  {isLoggedIn ? 'VOIR //' : 'CONNEXION //'}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
