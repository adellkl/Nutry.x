/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  UserRound
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const fieldClass =
  'contact-field relative border border-white/10 bg-[#111111] transition-[border-color,background-color,transform,box-shadow] duration-300 focus-within:-translate-y-0.5 focus-within:border-white/35 focus-within:bg-[#151515] focus-within:shadow-[0_14px_40px_rgba(0,0,0,0.28)]';

const inputClass =
  'peer w-full bg-transparent px-4 pb-3.5 pt-7 text-sm text-white outline-none placeholder:text-white/28';

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
      addContactMessage({ name, email, phone, athleteGoal, message });
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] pb-20 pt-28 text-white" id="contact-view">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-300/75">
              <span className="h-1.5 w-1.5 bg-emerald-400" />
              Concierge Nutry.X
            </div>
            <h1 className="max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Parlons de votre nutrition.
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/52 lg:justify-self-end">
            Une question, un objectif sportif ou un besoin pour votre structure ? Décrivez-nous votre projet, notre équipe vous répond rapidement.
          </p>
        </header>

        {submitted ? (
          <section className="mx-auto my-20 max-w-xl border border-emerald-400/25 bg-[#111611] p-8 text-center sm:p-12" id="contact-success-state">
            <div className="mx-auto flex h-12 w-12 items-center justify-center bg-emerald-400 text-black">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h2 className="mt-7 font-serif text-3xl">Message bien reçu.</h2>
            <p className="mt-3 text-sm leading-7 text-white/52">
              Notre équipe revient vers vous sous deux heures pendant les horaires d’ouverture.
            </p>
            <button
              onClick={resetForm}
              className="mt-8 inline-flex items-center justify-center gap-2 border border-white bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-transparent hover:text-white"
            >
              Nouveau message
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        ) : (
          <div className="grid gap-5 py-10 lg:grid-cols-12" id="contact-form-grid">
            <aside className="relative overflow-hidden border border-white/10 bg-[#121212] p-6 sm:p-8 lg:col-span-4" id="contacts-details-panel">
              <div className="absolute right-0 top-0 h-28 w-28 border-b border-l border-white/5 bg-white/[0.02]" />
              <div className="relative flex h-full flex-col justify-between gap-12">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">Contact direct</span>
                  <h2 className="mt-3 max-w-xs font-serif text-3xl leading-tight">Une équipe proche de vos objectifs.</h2>

                  <div className="mt-9 divide-y divide-white/8 border-y border-white/8">
                    <a href="mailto:concierge@nutryx.athletic.fr" className="group flex gap-4 py-5">
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300/75 transition-transform group-hover:scale-110" />
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/35">E-mail</div>
                        <div className="mt-1 break-all text-sm text-white/78">concierge@nutryx.athletic.fr</div>
                      </div>
                    </a>
                    <a href="tel:+33198329999" className="group flex gap-4 py-5">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300/75 transition-transform group-hover:scale-110" />
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/35">Téléphone</div>
                        <div className="mt-1 text-sm text-white/78">+33 (0)1 98 32 99 99</div>
                      </div>
                    </a>
                    <div className="flex gap-4 py-5">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300/75" />
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/35">Adresse</div>
                        <div className="mt-1 text-sm leading-6 text-white/78">88 avenue des Olympiades, 75008 Paris</div>
                      </div>
                    </div>
                    <div className="flex gap-4 py-5">
                      <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300/75" />
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/35">Disponibilité</div>
                        <div className="mt-1 text-sm text-white/78">Lun–Sam · 8h–20h</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-white/10 bg-black/25 p-5">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/55">
                    <Building2 className="h-4 w-4" />
                    Clubs & entreprises
                  </div>
                  <p className="mt-3 text-xs leading-6 text-white/42">
                    Programmes hebdomadaires, événements sportifs et solutions de catering sur demande.
                  </p>
                </div>
              </div>
            </aside>

            <form onSubmit={handleSubmit} className="border border-white/10 bg-[#0f0f0f] p-5 sm:p-8 lg:col-span-8" id="contact-registry-form">
              <div className="mb-8 flex items-start justify-between gap-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">Votre demande</span>
                  <h2 className="mt-2 font-serif text-2xl sm:text-3xl">Écrivez-nous simplement.</h2>
                </div>
                <Sparkles className="hidden h-5 w-5 text-emerald-300/70 sm:block" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className={fieldClass}>
                  <UserRound className="absolute right-4 top-4 h-4 w-4 text-white/20 transition-colors peer-focus:text-white/65" />
                  <label htmlFor="contact-name" className="absolute left-4 top-3 text-[9px] font-mono uppercase tracking-widest text-white/38 transition-colors">
                    Nom et prénom
                  </label>
                  <input id="contact-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom Prénom" className={inputClass} autoComplete="name" required />
                </div>

                <div className={fieldClass}>
                  <Mail className="absolute right-4 top-4 h-4 w-4 text-white/20" />
                  <label htmlFor="contact-email" className="absolute left-4 top-3 text-[9px] font-mono uppercase tracking-widest text-white/38">
                    Adresse mail
                  </label>
                  <input id="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nom@exemple.fr" className={inputClass} autoComplete="email" required />
                </div>

                <div className={fieldClass}>
                  <Phone className="absolute right-4 top-4 h-4 w-4 text-white/20" />
                  <label htmlFor="contact-phone" className="absolute left-4 top-3 text-[9px] font-mono uppercase tracking-widest text-white/38">
                    Téléphone
                  </label>
                  <input id="contact-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="06 00 00 00 00" className={inputClass} autoComplete="tel" />
                </div>

                <div className={fieldClass}>
                  <label htmlFor="contact-goal" className="absolute left-4 top-3 z-10 text-[9px] font-mono uppercase tracking-widest text-white/38">
                    Votre objectif
                  </label>
                  <select
                    id="contact-goal"
                    value={athleteGoal}
                    onChange={(e) => setAthleteGoal(e.target.value)}
                    className="w-full appearance-none bg-transparent px-4 pb-3.5 pt-7 text-sm text-white outline-none"
                  >
                    <option value="seche">Sèche & définition</option>
                    <option value="performance">Performance & endurance</option>
                    <option value="masse">Prise de masse</option>
                    <option value="catering">Club, entreprise ou événement</option>
                  </select>
                </div>
              </div>

              <div className={`${fieldClass} mt-4`}>
                <MessageSquare className="absolute right-4 top-4 h-4 w-4 text-white/20" />
                <label htmlFor="contact-message" className="absolute left-4 top-3 text-[9px] font-mono uppercase tracking-widest text-white/38">
                  Votre message
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre demande, vos objectifs ou vos contraintes alimentaires..."
                  className="min-h-40 w-full resize-none bg-transparent px-4 pb-4 pt-8 text-sm leading-7 text-white outline-none placeholder:text-white/28"
                  required
                />
              </div>

              <div className="mt-6 flex flex-col gap-5 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-[11px] leading-5 text-white/32">
                  En envoyant ce formulaire, vous acceptez d’être contacté uniquement au sujet de votre demande.
                </p>
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-3 bg-white px-7 py-4 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-emerald-300 sm:w-auto"
                >
                  Envoyer
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
