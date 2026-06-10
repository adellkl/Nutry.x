/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, ShieldCheck, Flame, Scale, Activity, Save, User, Clock, CheckCircle } from 'lucide-react';
import { SportsGoal } from '../../types';
import { IMAGES } from '../../data';

export const Profile: React.FC = () => {
  const { profile, updateProfile, completedOrders, isLoggedIn, loginUser, registerUser } = useApp();
  
  // Local state for editing profile safely
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [weight, setWeight] = useState(profile.weight);
  const [height, setHeight] = useState(profile.height);
  const [age, setAge] = useState(profile.age);
  const [activityLevel, setActivityLevel] = useState(profile.activityLevel);
  const [currentGoal, setCurrentGoal] = useState<SportsGoal>(profile.currentGoal);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Authentication states
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Sync inputs with profile data when logged in or connected
  useEffect(() => {
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setWeight(profile.weight);
    setHeight(profile.height);
    setAge(profile.age);
    setActivityLevel(profile.activityLevel);
    setCurrentGoal(profile.currentGoal);
  }, [profile]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    const res = loginUser(emailInput, passInput);
    if (!res.success) {
      setAuthError(res.error || "Erreur d'authentification");
    } else {
      setAuthSuccess("ACCÈS AUTORISÉ. OUVERTURE DE LA SESSION...");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    const res = registerUser(regFirstName, regLastName, regEmail, regPass);
    if (!res.success) {
      setAuthError(res.error || "Erreur d'inscription");
    } else {
      setAuthSuccess("COMPTE ATHLÈTE CRÉÉ. BIENVENUE...");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      firstName,
      lastName,
      weight: Number(weight),
      height: Number(height),
      age: Number(age),
      activityLevel,
      currentGoal
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-[#0d0d0d] text-white min-h-screen pt-28 pb-16 flex items-center justify-center relative px-4" id="auth-screen">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" style={{ backgroundImage: `url(${IMAGES.hero})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d0d0d]" />
        
        <div className="relative max-w-md w-full bg-[#121212] border border-white/10 p-5 sm:p-8 md:p-10 shadow-2xl z-10 animate-fade-in">
          <div className="text-center mb-8 space-y-2">
            <span className="text-[9px] font-mono tracking-[0.35em] text-[#9ca3af] uppercase block">★ NUTRY.X SECURITY CLIENT PORTAL</span>
            <h2 className="font-serif text-2xl md:text-3xl font-regular text-white font-semibold">Zone Athlète Privée</h2>
            <p className="text-xs text-[#9ca3af] font-light tracking-wide leading-relaxed">
              Veuillez vous authentifier pour accéder à vos cibles biométriques de force et archives de nutrition.
            </p>
          </div>

          {/* Tab selectors */}
          <div className="flex border-b border-white/5 mb-6 text-xs font-mono tracking-widest text-[#9ca3af]">
            <button
              onClick={() => { setAuthMode('login'); setAuthError(null); }}
              className={`flex-1 pb-3 text-center transition-colors focus:outline-none cursor-none ${authMode === 'login' ? 'text-white border-b-2 border-white font-bold' : 'hover:text-white'}`}
            >
              CONNEXION
            </button>
            <button
              onClick={() => { setAuthMode('register'); setAuthError(null); }}
              className={`flex-1 pb-3 text-center transition-colors focus:outline-none cursor-none ${authMode === 'register' ? 'text-white border-b-2 border-white font-bold' : 'hover:text-white'}`}
            >
              INSCRIPTION
            </button>
          </div>

          {/* Feedback alerts */}
          {authError && (
            <div className="bg-red-950/20 text-red-400 border border-red-900/30 p-3 text-xs font-mono tracking-widest text-center uppercase mb-6">
              {authError}
            </div>
          )}

          {authSuccess && (
            <div className="bg-emerald-950/20 text-emerald-400 border border-emerald-900/30 p-3 text-xs font-mono tracking-widest text-center uppercase mb-6 animate-pulse">
              {authSuccess}
            </div>
          )}

          {authMode === 'login' ? (
            /* Sign In form */
            <form onSubmit={handleLoginSubmit} className="space-y-4" id="login-form">
              <div className="space-y-2">
                <label className="text-[9px] font-mono text-zinc-400 block uppercase tracking-widest">E-mail Athlète</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="kevin.loukal@eliteathletics.fr"
                  className="w-full bg-[#121212] border border-white/15 p-3.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-white rounded-none focus:bg-[#141414] transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono text-zinc-400 block uppercase tracking-widest">Code Secret / Mot de passe</label>
                <input
                  type="password"
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#121212] border border-white/15 p-3.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-white rounded-none focus:bg-[#141414] transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white text-black font-sans text-xs tracking-[0.25em] font-bold uppercase transition-all duration-300 hover:bg-black hover:text-white hover:border-white border border-white cursor-none mt-2 focus:outline-none"
              >
                VERROUILLER L'ACCÈS
              </button>

              {/* Demo auto logins */}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest block text-center">// ACCÈS EXPRESS SIMULATION</span>
                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => { setEmailInput('kevin.loukal@eliteathletics.fr'); setPassInput('kevin123'); }}
                    className="text-[9px] font-mono text-white/40 hover:text-white underline text-center focus:outline-none cursor-none"
                  >
                    Se connecter en tant que Kévin Loukal
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEmailInput('adelloukal2@gmail.com'); setPassInput('adel123'); }}
                    className="text-[9px] font-mono text-white/40 hover:text-white underline text-center focus:outline-none cursor-none"
                  >
                    Se connecter en tant que Adel Loukal
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Sign Up form */
            <form onSubmit={handleRegisterSubmit} className="space-y-4" id="register-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-zinc-400 block uppercase tracking-widest">Prénom</label>
                  <input
                    type="text"
                    value={regFirstName}
                    onChange={(e) => setRegFirstName(e.target.value)}
                    placeholder="Adel"
                    className="w-full bg-[#121212] border border-white/15 p-3.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-white rounded-none focus:bg-[#141414] transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-zinc-400 block uppercase tracking-widest">Nom</label>
                  <input
                    type="text"
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                    placeholder="Loukal"
                    className="w-full bg-[#121212] border border-white/15 p-3.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-white rounded-none focus:bg-[#141414] transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono text-zinc-400 block uppercase tracking-widest">E-mail de Contact</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="contact@exemple.com"
                  className="w-full bg-[#121212] border border-white/15 p-3.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-white rounded-none focus:bg-[#141414] transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono text-zinc-400 block uppercase tracking-widest">Mot de passe secret</label>
                <input
                  type="password"
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#121212] border border-white/15 p-3.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-white rounded-none focus:bg-[#141414] transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white text-black font-sans text-xs tracking-[0.25em] font-bold uppercase transition-all duration-300 hover:bg-black hover:text-white hover:border-white border border-white cursor-none mt-2 focus:outline-none"
              >
                CRÉER MON ACCRÉDITATION
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen pt-28 pb-16" id="profile-view">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Profile Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-white/5 pb-10 mb-12 gap-6" id="profile-headline-panel">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 min-w-0">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-serif text-2xl font-semibold tracking-widest text-white shrink-0">
              {profile.firstName[0]}{profile.lastName[0]}
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-serif text-2xl md:text-3xl font-regular">{profile.firstName} {profile.lastName}</h1>
                <span className="text-[9px] bg-white text-black font-semibold uppercase tracking-widest px-2.5 py-1 text-center font-mono">
                  {profile.tier}
                </span>
              </div>
              <p className="text-white/40 text-xs tracking-wider break-all">{profile.email}</p>
            </div>
          </div>

          {/* Quick Metrics highlight */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6" id="overview-pills">
            <div className="bg-white/[0.02] border border-white/5 px-6 py-3 flex flex-col justify-center text-center">
              <span className="text-[8.5px] font-mono text-white/45 tracking-widest uppercase">MASS INDEX</span>
              <span className="text-sm font-bold font-mono tracking-wide mt-1">
                {(profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1)} <span className="text-[10px] text-white/40">IMC</span>
              </span>
            </div>
            <div className="bg-white/[0.02] border border-white/5 px-6 py-3 flex flex-col justify-center text-center">
              <span className="text-[8.5px] font-mono text-white/45 tracking-widest uppercase">COMMANDES REÇUES</span>
              <span className="text-sm font-bold font-mono tracking-wide mt-1 text-white">
                {profile.orderHistoryCount} <span className="text-[10px] text-white/45">PLATS</span>
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left partition: Athletic metrics config */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* The actual calculations banner */}
            <div className="bg-white/[0.01] border border-white/5 p-8 space-y-6" id="dashboard-target-metrics">
              <div className="border-b border-white/5 pb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">// TARGET BIOMETRICS</span>
                  <h3 className="font-serif text-xl font-regular">Vos Besoins Énergétiques Journaliers</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 border border-white/10 hover:border-white transition-colors text-[9.5px] font-mono tracking-widest uppercase cursor-none bg-transparent"
                >
                  {isEditing ? 'ANNULER' : 'ÉDITER MON PROFIL'}
                </button>
              </div>

              {saveSuccess && (
                <div className="bg-emerald-950/20 text-emerald-400 border border-emerald-900/30 p-4 text-xs font-mono tracking-widest flex items-center space-x-2 animate-pulse">
                  <CheckCircle className="w-4 h-4" />
                  <span>METRIQUES RECALCULÉES AVEC SUCCÈS.</span>
                </div>
              )}

              {isEditing ? (
                /* Editable form */
                <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6" id="profile-editor-form">
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-white/40 block uppercase tracking-widest">Prénom</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-zinc-900/80 border border-white/5 rounded-none p-3 text-xs text-white outline-none focus:border-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-white/40 block uppercase tracking-widest">Nom</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-zinc-900/80 border border-white/5 rounded-none p-3 text-xs text-white outline-none focus:border-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-white/40 block uppercase tracking-widest">Poids Actuel (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full bg-zinc-900/80 border border-white/5 rounded-none p-3 text-xs text-white outline-none focus:border-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-white/40 block uppercase tracking-widest">Taille (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full bg-zinc-900/80 border border-white/5 rounded-none p-3 text-xs text-white outline-none focus:border-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-white/40 block uppercase tracking-widest">Âge (années)</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full bg-zinc-900/80 border border-white/5 rounded-none p-3 text-xs text-white outline-none focus:border-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-white/40 block uppercase tracking-widest">Fréquence d'entraînement</label>
                    <select
                      value={activityLevel}
                      onChange={(e) => setActivityLevel(e.target.value as any)}
                      className="w-full bg-zinc-900/80 border border-white/5 rounded-none p-3 text-xs text-white outline-none focus:border-white appearance-none"
                    >
                      <option value="moderé">Modérée (3-4 séances / sem)</option>
                      <option value="pro">Intense (5-6 séances / sem)</option>
                      <option value="extreme">Élite / Athlète de haut niveau (7+ séances)</option>
                    </select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[9px] font-mono text-white/40 block uppercase tracking-widest">Objectif Métabolique Majeur</label>
                    <select
                      value={currentGoal}
                      onChange={(e) => setCurrentGoal(e.target.value as any)}
                      className="w-full bg-zinc-900/80 border border-white/5 rounded-none p-3 text-xs text-white outline-none focus:border-white appearance-none"
                    >
                      <option value="seche">SÈCHE EXTRÊME (Réduction adipeuse, maintien sec)</option>
                      <option value="performance">ATHLÈTE HYBRIDE (Endurance pure & énergie constante)</option>
                      <option value="masse">DEVELOPPEMENT MUSCULAIRE (Prise de force & hypertrophie propre)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 pt-4 border-t border-white/5 flex justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 bg-white text-black font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 hover:bg-zinc-200 cursor-none flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>RE-CALCULER BIOMÉTRIE</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Static visualization metrics */
                <div className="space-y-8" id="profile-static-metrics-view">
                  <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#141414] border border-white/5 p-5 text-center">
                      <Scale className="w-4 h-4 text-white/40 mx-auto mb-2" />
                      <div className="text-[8px] font-mono text-[#9ca3af] uppercase tracking-wider">Poids</div>
                      <div className="text-lg font-bold font-mono mt-1">{profile.weight} kg</div>
                    </div>
                    <div className="bg-[#141414] border border-white/5 p-5 text-center">
                      <Activity className="w-4 h-4 text-white/40 mx-auto mb-2" />
                      <div className="text-[8px] font-mono text-[#9ca3af] uppercase tracking-wider">Taille</div>
                      <div className="text-lg font-bold font-mono mt-1">{profile.height} cm</div>
                    </div>
                    <div className="bg-[#141414] border border-white/5 p-5 text-center">
                      <User className="w-4 h-4 text-white/40 mx-auto mb-2" />
                      <div className="text-[8px] font-mono text-[#9ca3af] uppercase tracking-wider">Âge</div>
                      <div className="text-lg font-bold font-mono mt-1">{profile.age} ans</div>
                    </div>
                    <div className="bg-[#141414] border border-white/5 p-5 text-center">
                      <Flame className="w-4 h-4 text-white/40 mx-auto mb-2" />
                      <div className="text-[8px] font-mono text-[#9ca3af] uppercase tracking-wider">Objectif</div>
                      <div className="text-xs font-bold uppercase tracking-wider font-sans mt-2">{profile.currentGoal === 'seche' ? 'Sèche' : profile.currentGoal === 'masse' ? 'Masse' : 'Performance'}</div>
                    </div>
                  </div>

                  {/* Core Targets summed bars */}
                  <div className="space-y-5 pt-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2">
                      <span className="text-[10px] font-mono tracking-widest text-[#9ca3af] uppercase">Ligne Budgétaire Nutritionnelle</span>
                      <span className="font-mono text-sm font-bold">{profile.dailyCaloriesTarget} KCAL / jour</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Proteins target */}
                      <div className="bg-white/[0.02] border border-white/5 p-5 space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-white/40">PROTINES</span>
                          <span className="text-white font-extrabold">{profile.dailyProteinTarget} g</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-900 border border-white/5">
                          <div className="bg-white h-full w-[85%]" />
                        </div>
                        <span className="text-[8.5px] text-zinc-500 font-mono italic block">Optimisation myofibrillaire</span>
                      </div>

                      {/* Carbs target */}
                      <div className="bg-white/[0.02] border border-white/5 p-5 space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-white/40">GLUCIDES</span>
                          <span className="text-white font-extrabold">{profile.dailyCarbsTarget} g</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-900 border border-white/5">
                          <div className="bg-white h-full w-[60%]" />
                        </div>
                        <span className="text-[8.5px] text-zinc-500 font-mono italic block">Saturation en glycogène clean</span>
                      </div>

                      {/* Lipids target */}
                      <div className="bg-white/[0.02] border border-white/5 p-5 space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-white/40">LIPIDES ACCRÉDITÉS</span>
                          <span className="text-white font-extrabold">{profile.dailyLipidsTarget} g</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-900 border border-white/5">
                          <div className="bg-white h-full w-[45%]" />
                        </div>
                        <span className="text-[8.5px] text-zinc-500 font-mono italic block">Hormones & anti-inflammation</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Historical Elite orders of are tracked here */}
            <div className="bg-white/[0.01] border border-white/5 p-8 space-y-6" id="dashboard-archives-history">
              <div className="border-b border-white/5 pb-4">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">// HISTORIQUE DE NUTRITION</span>
                <h3 className="font-serif text-xl font-regular mt-1">Vos Dernières Commandes</h3>
              </div>

              {completedOrders.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <Clock className="w-6 h-6 text-white/20 mx-auto" />
                  <p className="text-white/40 text-xs font-light tracking-wide">
                    Vous n'avez pas encore validé de commande. Passez votre commande personnalisée pour alimenter votre historique.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {completedOrders.map((order, index) => (
                    <div
                      key={order.id}
                      className="border border-white/10 bg-white/[0.02] p-6 space-y-4 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 border-b border-white/5 pb-3">
                        <div>
                          <div className="text-[10px] font-mono text-white/50 tracking-widest break-all">RÉFERENCE : {order.id}</div>
                          <div className="text-[11px] font-medium mt-0.5">{order.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-mono text-white/55">TOTAL PAYÉ</div>
                          <div className="text-sm font-bold font-sans mt-0.5">{order.total} €</div>
                        </div>
                      </div>

                      {/* Items details list */}
                      <div className="space-y-2">
                        {order.items.map((it: any, k: number) => (
                          <div key={k} className="flex flex-col sm:flex-row sm:justify-between gap-1 text-xs font-light text-white/70">
                            <span>{it.quantity} x {it.name}</span>
                            <span className="font-mono text-white/60">{it.price * it.quantity} €</span>
                          </div>
                        ))}
                      </div>

                      {/* Nutrient totals tracking */}
                      <div className="bg-black/40 border border-white/5 p-3 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center text-[10px] font-mono text-white/40">
                        <span>APPORT CONCENTRE :</span>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 font-bold text-white/90">
                          <span>{order.macros.calories} KCAL</span>
                          <span>P: {order.macros.protein}g</span>
                          <span>G: {order.macros.carbs}g</span>
                          <span>L: {order.macros.lipids}g</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right partition: Club levels details */}
          <div className="lg:col-span-4 space-y-6" id="dashboard-club-tiers">
            {/* Loyalty club */}
            <div className="bg-white/5 border border-white/10 p-6 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <span className="text-[8.5px] font-mono tracking-widest text-[#9ca3af]">// CIRCLE NUTRY.X D'ÉLITE</span>
                <h3 className="font-serif text-lg font-regular mt-2">Le Cercle Privé</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 bg-white/5 border border-white/5 p-4">
                  <Award className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase">{profile.tier}</div>
                    <span className="text-[8.5px] text-white/50 font-mono tracking-wide">GRADE ATHLÉTIQUE ACTUEL</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-light text-white/60 leading-relaxed">
                  <p>
                    Le programme d'accréditation Nutry.X récompense l'assiduité athlétique. Plus votre consommation est calibrée, plus vous débloquez d'avantages.
                  </p>
                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between items-center text-[10px] border-b border-zinc-900 pb-1">
                      <span className="font-mono text-zinc-500">PROCHAINE ÉTAPE :</span>
                      <span className="font-bold text-white/95">
                        {profile.orderHistoryCount >= 10 ? 'GRADE SUPRÊME' : profile.orderHistoryCount >= 5 ? 'VIP Master (10 plats)' : 'Black Platinum (5 plats)'}
                      </span>
                    </div>

                    <div className="h-1.5 w-full bg-zinc-900 overflow-hidden border border-white/5">
                      <div
                        className="bg-white h-full"
                        style={{ width: `${Math.min(100, (profile.orderHistoryCount / 10) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-[#9ca3af] font-mono block text-right">
                      {profile.orderHistoryCount} / 10 PLATS
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-3">
                  <div className="text-[9px] font-mono text-white/50 tracking-widest uppercase font-bold">Privilèges Actifs :</div>
                  <div className="space-y-2 text-[11px] text-zinc-400 font-light">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-white/60 shrink-0" />
                      <span>Accès aux chefs nutritionnistes en direct</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-white/60 shrink-0" />
                      <span>Assemblage prioritaire des plateaux (15m max)</span>
                    </div>
                    {profile.orderHistoryCount >= 5 && (
                      <div className="flex items-center space-x-2 text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5 steel-green shrink-0 animate-pulse" />
                        <span>Code promo perpétuel NUTRYXGOLD accessible</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Advice panel */}
            <div className="bg-white/[0.01] border border-white/5 p-6 space-y-4">
              <h4 className="font-serif text-sm font-semibold tracking-wide">Conseil du Jour du Coach</h4>
              <p className="text-white/50 text-[11px] font-light leading-relaxed">
                "Pensez à hydrater vos fibres musculaires de manière constante : 1 Litre d'eau de source pure par tranche de 25kg de poids corporel. Pour maximiser l'effet de votre commande {profile.currentGoal === 'seche' ? 'Sèche Extrême' : profile.currentGoal === 'masse' ? 'Développement Musculaire' : 'Athlète Hybride'}, ingérez votre plateau Nutry.X dans la fenêtre métabolique de 45 minutes suivant votre entraînement intensif."
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
