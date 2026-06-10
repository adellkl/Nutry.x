/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Sparkles, Building2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Contact: React.FC = () => {
  const { addContactMessage } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [athleteGoal, setAthleteGoal] = useState('performance');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      addContactMessage({
        name,
        email,
        phone,
        athleteGoal,
        message
      });
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen pt-28 pb-16" id="contact-view">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="mb-12 space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase">// SECRÉTARIAT CYNÉTIQUE //</span>
          <h1 className="font-serif text-3xl md:text-5xl font-regular">Contacter Concierge Nutry.x</h1>
          <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed">
            Un besoin particulier pour vos compétitions, un séminaire d'athlètes ou un accompagnement diététique d'élite personnalisé ? Nos conseillers d'exception vous répondent sous 2 heures.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-md mx-auto border border-white/10 bg-white/[0.01] p-8 text-center space-y-6" id="contact-success-state">
            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto hover:scale-105 transition-transform">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-white">Requête Enregistrée</h3>
              <p className="text-white/50 text-xs font-light leading-relaxed">
                Votre manifeste a été transmis à notre concierge nutritionnel de garde. Un appel ou courriel de calage sera effectué sous un créneau de 2 heures maximum.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setMessage('');
                }}
                className="px-6 py-2.5 bg-white text-black font-sans text-xs tracking-widest font-bold uppercase transition-transform hover:scale-102 cursor-none"
              >
                NOUVEAU MESSAGE
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-form-grid">
            
            {/* Left Box: Elegant contacts credentials */}
            <div className="lg:col-span-5 space-y-8 bg-white/[0.01] border border-white/5 p-5 sm:p-8" id="contacts-details-panel">
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase">// COORDINATES</span>
                <h3 className="font-serif text-xl font-regular text-white">Le Laboratoire Central</h3>
                <p className="text-white/40 text-xs font-light leading-relaxed">
                  Basés au cœur du quartier de l'innovation sportive et culinaire, nous livrons nos plateaux gastronomiques dans toute l'Île-de-France sous chaîne du froid contrôlée.
                </p>
              </div>

              <div className="space-y-6 text-xs tracking-wider font-light text-white/70">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-white/50 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold text-white uppercase">Siège & Cuisine d'Expression :</div>
                    <div>88 Avenue des Olympiades, 75008 Paris</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 text-white/50 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold text-white uppercase">Courriel Officiel :</div>
                    <div className="break-all">concierge@nutryx.athletic.fr</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 text-white/50 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold text-white uppercase">Ligne Téléphonique Dédiée :</div>
                    <div>+33 (0)1 98 32 C9 E9</div>
                  </div>
                </div>
              </div>

              {/* Specific athletes catering card banner */}
              <div className="border-t border-white/5 pt-6 space-y-4">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                  <Building2 className="w-4 h-4 text-white/65" />
                  <span>CATERING SPORTIF D'AFFAIRES</span>
                </div>
                <p className="text-[11px] text-white/40 font-light leading-relaxed">
                  Salles de fitness premium, clubs d'athlétisme d'élite ou évènements de préparation olympique, contactez notre équipe B2B pour des abonnements hebdomadaires de prestige.
                </p>
              </div>
            </div>

            {/* Right Box: The Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white/[0.01] border border-white/5 p-5 sm:p-8 space-y-6" id="contact-registry-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Votre Identité (Nom Complet)</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="NOM COMPLET DE L'ATHLÈTE"
                    className="w-full bg-[#121212] border border-white/10 rounded-none p-3.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-white transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Courriel de Liaison</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="COURRIEL@EXEMPLE.COM"
                    className="w-full bg-[#121212] border border-white/10 rounded-none p-3.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-white transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Téléphone Portable (Optionnel)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 (0)6 00 00 00 00"
                    className="w-full bg-[#121212] border border-white/10 rounded-none p-3.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Votre Programme d'Entraînement</label>
                  <select
                    value={athleteGoal}
                    onChange={(e) => setAthleteGoal(e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 rounded-none p-3.5 text-xs text-white outline-none focus:border-white transition-colors appearance-none"
                  >
                    <option value="seche">Sèche & Découpe Musculaire</option>
                    <option value="performance">Force Athlétique & Endurance</option>
                    <option value="masse">Prise de Masse Propre</option>
                    <option value="catering">Évènementiel / Catering de Salle</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Expression du besoin</label>
                <div className="flex bg-[#121212] border border-white/10 p-4 rounded-none focus-within:border-white transition-colors">
                  <MessageSquare className="w-5 h-5 text-white/20 shrink-0 mt-0.5 mr-3" />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Détaillez le volume d'assiettes de performance souhaité hebdomadairement, vos allergies ou vos objectifs physiques cliniques..."
                    className="bg-transparent w-full text-xs text-white placeholder-zinc-500 outline-none resize-none h-32 font-sans leading-relaxed"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 hover:bg-zinc-200 cursor-none flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMETTRE LA REQUÊTE</span>
                </button>
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
