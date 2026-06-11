/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  Activity,
  Award,
  CheckCircle,
  CheckCheck,
  ClipboardList,
  Flame,
  LayoutDashboard,
  LockKeyhole,
  MessageSquare,
  Save,
  Scale,
  Send,
  ShieldCheck,
  UserRound
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SportsGoal } from '../../types';
import { IMAGES } from '../../data';

type ProfileSection = 'overview' | 'biometrics' | 'orders' | 'club' | 'chat';
type LoginPortal = 'athlete' | 'admin';

const sectionItems = [
  { id: 'overview', label: 'Vue d’ensemble', icon: LayoutDashboard },
  { id: 'biometrics', label: 'Biométrie', icon: Activity },
  { id: 'orders', label: 'Commandes', icon: ClipboardList },
  { id: 'club', label: 'Cercle privé', icon: Award },
  { id: 'chat', label: 'Chat admin', icon: MessageSquare }
] as const;

export const Profile: React.FC = () => {
  const {
    profile,
    updateProfile,
    completedOrders,
    isLoggedIn,
    loginUser,
    registerUser,
    contactMessages,
    addContactMessage,
    logoutUser
  } = useApp();

  const [activeSection, setActiveSection] = useState<ProfileSection>('overview');
  const [portal, setPortal] = useState<LoginPortal>('athlete');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [saved, setSaved] = useState(false);

  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [weight, setWeight] = useState(profile.weight);
  const [height, setHeight] = useState(profile.height);
  const [age, setAge] = useState(profile.age);
  const [activityLevel, setActivityLevel] = useState(profile.activityLevel);
  const [currentGoal, setCurrentGoal] = useState<SportsGoal>(profile.currentGoal);

  const athleteOrders = useMemo(
    () => completedOrders.filter(order => order.athleteEmail === profile.email),
    [completedOrders, profile.email]
  );

  const athleteMessages = useMemo(
    () => contactMessages.filter(message => message.email === profile.email).reverse(),
    [contactMessages, profile.email]
  );

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError(null);
    const result = loginUser(emailInput, passInput, portal);
    if (!result.success) setAuthError(result.error || 'Connexion impossible.');
  };

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError(null);
    const result = registerUser(regFirstName, regLastName, regEmail, regPass);
    if (!result.success) setAuthError(result.error || 'Inscription impossible.');
  };

  const handleProfileSave = (event: React.FormEvent) => {
    event.preventDefault();
    updateProfile({ firstName, lastName, weight, height, age, activityLevel, currentGoal });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const sendChatMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (!chatMessage.trim()) return;
    addContactMessage({
      name: `${profile.firstName} ${profile.lastName}`,
      email: profile.email,
      athleteGoal: profile.currentGoal,
      message: chatMessage.trim()
    });
    setChatMessage('');
  };

  if (!isLoggedIn) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#0d0d0d] px-4 pb-16 pt-28 text-white" id="auth-screen">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${IMAGES.hero})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#0d0d0d]" />

        <div className="relative z-10 w-full max-w-lg border border-white/10 bg-[#111111]/95 p-5 shadow-2xl sm:p-8">
          <div className="mb-7 text-center">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-300/70">Accès sécurisé Nutry.X</span>
            <h1 className="mt-3 font-serif text-3xl">Votre espace privé</h1>
            <p className="mt-2 text-xs leading-6 text-white/45">Choisissez le portail correspondant à votre compte.</p>
          </div>

          <div className="mb-6 grid grid-cols-2 border border-white/10 bg-black/30 p-1" id="login-role-switch">
            <button
              type="button"
              onClick={() => { setPortal('athlete'); setAuthError(null); }}
              className={`flex items-center justify-center gap-2 px-3 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${portal === 'athlete' ? 'bg-white text-black' : 'text-white/45 hover:text-white'}`}
            >
              <UserRound className="h-4 w-4" />
              Athlète
            </button>
            <button
              type="button"
              onClick={() => { setPortal('admin'); setAuthMode('login'); setAuthError(null); }}
              className={`flex items-center justify-center gap-2 px-3 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${portal === 'admin' ? 'bg-emerald-300 text-black' : 'text-white/45 hover:text-white'}`}
            >
              <LockKeyhole className="h-4 w-4" />
              Admin
            </button>
          </div>

          {portal === 'athlete' && (
            <div className="mb-6 grid grid-cols-2 border-b border-white/10 text-[10px] font-mono uppercase tracking-widest">
              <button onClick={() => setAuthMode('login')} className={`pb-3 ${authMode === 'login' ? 'border-b-2 border-white text-white' : 'text-white/35'}`}>Connexion</button>
              <button onClick={() => setAuthMode('register')} className={`pb-3 ${authMode === 'register' ? 'border-b-2 border-white text-white' : 'text-white/35'}`}>Inscription</button>
            </div>
          )}

          {authError && <div className="mb-5 border border-red-500/25 bg-red-500/8 p-3 text-center text-xs text-red-300">{authError}</div>}

          {authMode === 'register' && portal === 'athlete' ? (
            <form onSubmit={handleRegister} className="space-y-4" id="register-form">
              <div className="grid gap-4 sm:grid-cols-2">
                <input value={regFirstName} onChange={e => setRegFirstName(e.target.value)} placeholder="Prénom" className="border border-white/10 bg-black/30 p-3.5 text-sm outline-none focus:border-white/35" required />
                <input value={regLastName} onChange={e => setRegLastName(e.target.value)} placeholder="Nom" className="border border-white/10 bg-black/30 p-3.5 text-sm outline-none focus:border-white/35" required />
              </div>
              <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="Adresse mail" className="w-full border border-white/10 bg-black/30 p-3.5 text-sm outline-none focus:border-white/35" required />
              <input type="password" value={regPass} onChange={e => setRegPass(e.target.value)} placeholder="Mot de passe" className="w-full border border-white/10 bg-black/30 p-3.5 text-sm outline-none focus:border-white/35" required />
              <button className="w-full bg-white py-4 text-xs font-bold uppercase tracking-widest text-black">Créer mon compte</button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4" id="login-form">
              <input
                type="email"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                placeholder={portal === 'admin' ? 'E-mail administrateur' : 'Adresse mail athlète'}
                className="w-full border border-white/10 bg-black/30 p-3.5 text-sm outline-none focus:border-white/35"
                required
              />
              <input type="password" value={passInput} onChange={e => setPassInput(e.target.value)} placeholder="Mot de passe" className="w-full border border-white/10 bg-black/30 p-3.5 text-sm outline-none focus:border-white/35" required />
              <button className={`w-full py-4 text-xs font-bold uppercase tracking-widest text-black ${portal === 'admin' ? 'bg-emerald-300' : 'bg-white'}`}>
                {portal === 'admin' ? 'Ouvrir la console admin' : 'Ouvrir mon espace'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmailInput(portal === 'admin' ? 'kevin.loukal@eliteathletics.fr' : 'adelloukal2@gmail.com');
                  setPassInput(portal === 'admin' ? 'kevin123' : 'adel123');
                }}
                className="w-full text-center text-[10px] text-white/35 underline hover:text-white"
              >
                Remplir l’accès de démonstration
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  const bmi = (profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1);

  return (
    <div className="min-h-screen bg-[#0d0d0d] pb-16 pt-24 text-white" id="profile-view">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="border border-white/10 bg-[#111111] p-4 lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]" id="athlete-sidebar">
            <div className="border-b border-white/10 p-3 pb-6">
              <div className="flex h-12 w-12 items-center justify-center bg-white text-lg font-bold text-black">
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
              <h1 className="mt-4 font-serif text-xl">{profile.firstName} {profile.lastName}</h1>
              <p className="mt-1 break-all text-[10px] text-white/35">{profile.email}</p>
              <span className="mt-3 inline-block bg-emerald-400/10 px-2 py-1 text-[9px] uppercase tracking-widest text-emerald-300">{profile.tier}</span>
            </div>

            <nav className="mt-4 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              {sectionItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex shrink-0 items-center gap-3 px-3 py-3 text-left text-[10px] font-bold uppercase tracking-widest transition-colors lg:w-full ${activeSection === item.id ? 'bg-white text-black' : 'text-white/42 hover:bg-white/5 hover:text-white'}`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <button onClick={logoutUser} className="mt-6 hidden w-full border border-red-500/20 px-3 py-3 text-[10px] uppercase tracking-widest text-red-400 hover:bg-red-500/10 lg:block">
              Déconnexion
            </button>
          </aside>

          <main className="min-w-0 border border-white/10 bg-[#0f0f0f] p-5 sm:p-8" id="athlete-workspace">
            {activeSection === 'overview' && (
              <section>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/32">Tableau de bord</span>
                <h2 className="mt-2 font-serif text-3xl">Bonjour {profile.firstName}.</h2>
                <p className="mt-2 text-sm text-white/45">Voici votre synthèse nutritionnelle du moment.</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ['Calories', `${profile.dailyCaloriesTarget} kcal`, Flame],
                    ['Protéines', `${profile.dailyProteinTarget} g`, Activity],
                    ['IMC', bmi, Scale],
                    ['Commandes', athleteOrders.length.toString(), ClipboardList]
                  ].map(([label, value, Icon]) => (
                    <div key={label as string} className="border border-white/10 bg-[#141414] p-5">
                      <Icon className="h-4 w-4 text-emerald-300/70" />
                      <div className="mt-5 text-[9px] uppercase tracking-widest text-white/35">{label as string}</div>
                      <div className="mt-1 font-mono text-xl font-bold">{value as string}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
                  <div className="border border-white/10 p-6">
                    <h3 className="font-serif text-xl">Objectif actif</h3>
                    <div className="mt-5 flex items-center gap-4 border border-white/8 bg-white/[0.02] p-5">
                      <Flame className="h-8 w-8 text-emerald-300" />
                      <div>
                        <div className="text-sm font-bold uppercase">{profile.currentGoal === 'seche' ? 'Sèche & définition' : profile.currentGoal === 'masse' ? 'Prise de masse' : 'Performance & endurance'}</div>
                        <p className="mt-1 text-xs leading-5 text-white/40">Vos objectifs journaliers sont recalculés depuis vos données biométriques.</p>
                      </div>
                    </div>
                  </div>
                  <div className="border border-white/10 p-6">
                    <h3 className="font-serif text-xl">Conciergerie</h3>
                    <p className="mt-3 text-xs leading-6 text-white/42">Une question sur vos repas ou vos objectifs ? Échangez directement avec Kevin depuis le chat.</p>
                    <button onClick={() => setActiveSection('chat')} className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
                      Ouvrir le chat <MessageSquare className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'biometrics' && (
              <section>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/32">Profil athlète</span>
                <h2 className="mt-2 font-serif text-3xl">Données biométriques</h2>
                {saved && <div className="mt-5 flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/8 p-3 text-xs text-emerald-300"><CheckCircle className="h-4 w-4" /> Profil recalculé.</div>}
                <form onSubmit={handleProfileSave} className="mt-8 grid gap-4 sm:grid-cols-2" id="profile-editor-form">
                  <label className="space-y-2 text-[10px] uppercase tracking-widest text-white/40">Prénom<input value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full border border-white/10 bg-[#141414] p-3.5 text-sm normal-case text-white outline-none focus:border-white/35" /></label>
                  <label className="space-y-2 text-[10px] uppercase tracking-widest text-white/40">Nom<input value={lastName} onChange={e => setLastName(e.target.value)} className="w-full border border-white/10 bg-[#141414] p-3.5 text-sm normal-case text-white outline-none focus:border-white/35" /></label>
                  <label className="space-y-2 text-[10px] uppercase tracking-widest text-white/40">Poids<input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full border border-white/10 bg-[#141414] p-3.5 text-sm text-white outline-none focus:border-white/35" /></label>
                  <label className="space-y-2 text-[10px] uppercase tracking-widest text-white/40">Taille<input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full border border-white/10 bg-[#141414] p-3.5 text-sm text-white outline-none focus:border-white/35" /></label>
                  <label className="space-y-2 text-[10px] uppercase tracking-widest text-white/40">Âge<input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full border border-white/10 bg-[#141414] p-3.5 text-sm text-white outline-none focus:border-white/35" /></label>
                  <label className="space-y-2 text-[10px] uppercase tracking-widest text-white/40">Activité<select value={activityLevel} onChange={e => setActivityLevel(e.target.value as typeof activityLevel)} className="w-full border border-white/10 bg-[#141414] p-3.5 text-sm normal-case text-white outline-none focus:border-white/35"><option value="moderé">Modérée</option><option value="pro">Intense</option><option value="extreme">Élite</option></select></label>
                  <label className="space-y-2 text-[10px] uppercase tracking-widest text-white/40 sm:col-span-2">Objectif<select value={currentGoal} onChange={e => setCurrentGoal(e.target.value as SportsGoal)} className="w-full border border-white/10 bg-[#141414] p-3.5 text-sm normal-case text-white outline-none focus:border-white/35"><option value="seche">Sèche & définition</option><option value="performance">Performance & endurance</option><option value="masse">Prise de masse</option></select></label>
                  <button className="mt-2 inline-flex items-center justify-center gap-2 bg-white px-6 py-4 text-xs font-bold uppercase tracking-widest text-black sm:col-span-2 sm:justify-self-end"><Save className="h-4 w-4" /> Enregistrer</button>
                </form>
              </section>
            )}

            {activeSection === 'orders' && (
              <section>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/32">Historique</span>
                <h2 className="mt-2 font-serif text-3xl">Mes commandes</h2>
                <div className="mt-8 space-y-4">
                  {athleteOrders.length === 0 ? (
                    <div className="border border-dashed border-white/15 p-10 text-center text-sm text-white/40">Aucune commande pour le moment.</div>
                  ) : athleteOrders.map(order => (
                    <article key={order.id} className="border border-white/10 bg-[#141414] p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div><div className="font-mono text-xs font-bold">{order.id}</div><div className="mt-1 text-[10px] text-white/35">{order.date}</div></div>
                        <span className="bg-white/5 px-2 py-1 text-[9px] uppercase tracking-widest text-emerald-300">{order.status}</span>
                      </div>
                      <div className="mt-4 border-t border-white/8 pt-4 text-sm text-white/60">{order.items.map(item => `${item.quantity}× ${item.name}`).join(' · ')}</div>
                      <div className="mt-3 font-mono text-sm font-bold">{order.total} EUR</div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {activeSection === 'club' && (
              <section>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/32">Fidélité</span>
                <h2 className="mt-2 font-serif text-3xl">Le Cercle Nutry.X</h2>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <div className="border border-white/10 bg-[#141414] p-6">
                    <Award className="h-8 w-8 text-emerald-300" />
                    <div className="mt-5 text-[10px] uppercase tracking-widest text-white/35">Grade actuel</div>
                    <div className="mt-2 font-serif text-2xl">{profile.tier}</div>
                    <div className="mt-6 h-2 bg-black"><div className="h-full bg-emerald-400" style={{ width: `${Math.min(100, profile.orderHistoryCount * 10)}%` }} /></div>
                    <div className="mt-2 text-right text-[9px] text-white/35">{profile.orderHistoryCount} / 10 plats</div>
                  </div>
                  <div className="border border-white/10 p-6">
                    <h3 className="font-serif text-xl">Avantages actifs</h3>
                    <div className="mt-5 space-y-4 text-sm text-white/55">
                      {['Chat direct avec l’administration', 'Priorité de préparation', 'Suivi des objectifs biométriques'].map(item => <div key={item} className="flex gap-3"><ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" />{item}</div>)}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'chat' && (
              <section className="overflow-hidden border border-white/10 bg-[#101010]" id="athlete-chat-interface">
                <header className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#151515] px-4 py-4 sm:px-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center bg-emerald-300 font-bold text-black">
                      NX
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#151515] bg-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-bold text-white">Administration Nutry.X</h2>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-white/40">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        En ligne · réponse généralement rapide
                      </div>
                    </div>
                  </div>
                  <div className="hidden items-center gap-2 border border-white/10 px-3 py-2 text-[9px] uppercase tracking-widest text-white/45 sm:flex">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                    Conversation privée
                  </div>
                </header>

                <div
                  className="flex h-[470px] flex-col gap-5 overflow-y-auto bg-[#0c0c0c] p-4 sm:h-[520px] sm:p-6"
                  id="athlete-chat-thread"
                >
                  <div className="mx-auto border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[8px] uppercase tracking-widest text-white/30">
                    Discussion avec votre équipe nutrition
                  </div>

                  {athleteMessages.length === 0 && (
                    <div className="m-auto max-w-sm text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center border border-white/10 bg-white/[0.03]">
                        <MessageSquare className="h-5 w-5 text-white/35" />
                      </div>
                      <h3 className="mt-4 text-sm font-semibold text-white/80">Aucun message pour le moment</h3>
                      <p className="mt-2 text-xs leading-6 text-white/35">Posez une question sur vos repas, vos objectifs ou votre prochaine commande.</p>
                    </div>
                  )}

                  {athleteMessages.map(message => (
                    <div key={message.id} className="space-y-4">
                      <div className="ml-auto flex max-w-[92%] items-end justify-end gap-2 sm:max-w-[76%]">
                        <div>
                          <div className="rounded-[18px_18px_4px_18px] bg-white px-4 py-3 text-[13px] leading-6 text-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                            {message.message}
                          </div>
                          <div className="mt-1.5 flex items-center justify-end gap-1.5 pr-1 text-[8px] text-white/30">
                            {message.date}
                            <CheckCheck className="h-3 w-3 text-emerald-300" />
                          </div>
                        </div>
                      </div>

                      {(message.replies || (
                        message.reply
                          ? [{ id: `${message.id}_legacy`, message: message.reply, date: message.repliedAt || message.date }]
                          : []
                      )).map(reply => (
                        <div key={reply.id} className="flex max-w-[92%] items-end gap-2 sm:max-w-[76%]">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-emerald-300 text-[8px] font-black text-black">
                            NX
                          </div>
                          <div>
                            <div className="rounded-[18px_18px_18px_4px] border border-white/10 bg-[#1b1b1b] px-4 py-3 text-[13px] leading-6 text-white/78 shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
                              {reply.message}
                            </div>
                            <div className="mt-1.5 pl-1 text-[8px] text-white/30">Administration · {reply.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <form onSubmit={sendChatMessage} className="border-t border-white/10 bg-[#151515] p-3 sm:p-4">
                  <div className="flex items-end gap-2 border border-white/10 bg-[#0e0e0e] p-2 focus-within:border-white/35">
                    <textarea
                      value={chatMessage}
                      onChange={e => setChatMessage(e.target.value)}
                      placeholder="Votre message..."
                      maxLength={500}
                      className="max-h-32 min-h-12 flex-1 resize-none bg-transparent px-2 py-3 text-sm text-white outline-none placeholder:text-white/25"
                    />
                    <button
                      disabled={!chatMessage.trim()}
                      className="flex h-12 w-12 shrink-0 items-center justify-center bg-emerald-300 text-black transition-colors hover:bg-emerald-200 disabled:cursor-not-allowed disabled:bg-white/8 disabled:text-white/25"
                      aria-label="Envoyer le message"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between px-1 text-[8px] uppercase tracking-widest text-white/25">
                    <span>Canal sécurisé Nutry.X</span>
                    <span>{chatMessage.length}/500</span>
                  </div>
                </form>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
