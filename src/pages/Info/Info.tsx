/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Book, Scale, Globe, UserCheck, Eye, PhoneCall } from 'lucide-react';

export const Info: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mentions' | 'cgv'>('mentions');

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen pt-28 pb-16" id="info-view">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="mb-12 space-y-2 border-b border-white/5 pb-10">
          <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase">// DOCUMENTS OFFICIELS & SLA DE SÉCURITÉ //</span>
          <h1 className="font-serif text-3xl md:text-5xl font-regular">Services Clients & Clarté Légale</h1>
          <p className="text-white/50 text-xs md:text-sm font-light mt-2">
            La transparence est le pilier de la confiance athlétique. Découvrez nos chartes sanitaires, cadre légal de vente et conditions générales.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap border-b border-white/5 mb-10" id="info-doc-tabs">
          <button
            onClick={() => setActiveTab('mentions')}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-4 text-[10px] sm:text-xs tracking-wider sm:tracking-widest font-bold uppercase transition-all duration-350 cursor-none relative focus:outline-none ${
              activeTab === 'mentions' ? 'text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            Mentions Légales
            {activeTab === 'mentions' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('cgv')}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-4 text-[10px] sm:text-xs tracking-wider sm:tracking-widest font-bold uppercase transition-all duration-350 cursor-none relative focus:outline-none ${
              activeTab === 'cgv' ? 'text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            Conditions Générales de Vente (CGV)
            {activeTab === 'cgv' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />
            )}
          </button>
        </div>

        {/* Tabs Content */}
        <div className="bg-white/[0.01] border border-white/5 p-5 sm:p-8 md:p-12 space-y-10" id="documents-article-vault">
          
          {activeTab === 'mentions' ? (
            /* Mentions Légales */
            <div className="space-y-8 font-light text-white/75 text-xs md:text-sm leading-relaxed tracking-wide">
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                  <Globe className="w-4 h-4 text-white/50" />
                  <span>1. ÉDITEUR DU SITE</span>
                </div>
                <p>
                  Ce site internet est édité par la marque d'exception <strong className="text-white">nutry.x</strong>, représentée légalement et cuisinée artistiquement par l'entreprise SAS ATHLETIC FOOD DESIGN, société au capital de 50 000 €, immatriculée au Registre de Commerce et des Sociétés (RCS) de Paris sous le numéro R.C.S. Paris B 983 2C9 E9.
                  <br />
                  Siège Social : 88 Avenue des Olympiades, 75008 Paris.
                  <br />
                  Directeur de la Publication : M. Kévin LOUKAL, en tant que Président Exécutif de SAS ATHLETIC FOOD DESIGN.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                  <ShieldCheck className="w-4 h-4 text-white/50" />
                  <span>2. ENREGISTREMENT & PROPRIÉTÉ INTELLECTUELLE</span>
                </div>
                <p>
                  La marque <strong className="text-white">nutry.x</strong>, ses formulations culinaires sous vide, ses textures visuelles et sa plateforme de modélisation macro-nutritionnelle en temps réel font l’objet d’un dépôt exclusif à l'Institut National de la Propriété Industrielle (INPI).
                  <br />
                  Toute copie, contrefaçon, réplication ou reproduction partielle, y compris les algorithmes calorigènes, sans accord écrit préalable de SAS ATHLETIC FOOD DESIGN donnera lieu à des poursuites judiciaires immédiates.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                  <Eye className="w-4 h-4 text-white/50" />
                  <span>3. HÉBERGEMENT ET INFRASTRUCTURES</span>
                </div>
                <p>
                  Notre plateforme de modélisation et base de données sécurisée est hébergée sur les serveurs de haute sécurité des services Cloud de Google, assurant le cryptage intégral des profils physiologiques individuels de nos athlètes d'élite, conformément aux normes RGPD.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                  <PhoneCall className="w-4 h-4 text-white/50" />
                  <span>4. DROITS SANITAIRES ET LIENS</span>
                </div>
                <p>
                  Les balances nutritionnelles et recommandations édictées par nos configurations d'assiette n'ont aucunement valeur de prescription médicale ou d'interdiction clinique. Chaque athlète de haut niveau est invité à corréler ses besoins auprès de son médecin du sport de tutelle avant l'ingestion de nos rations sportives haut de gamme.
                </p>
              </div>

            </div>
          ) : (
            /* Conditions Générales de Vente (CGV) */
            <div className="space-y-8 font-light text-white/75 text-xs md:text-sm leading-relaxed tracking-wide">
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                  <Book className="w-4 h-4 text-white/50" />
                  <span>1. OBJET DES PRESTATIONS DE LIVRAISON</span>
                </div>
                <p>
                  Les présentes Conditions Générales de Vente régissent l'ensemble des transactions effectuées sur la plate-forme de commande mobile et bureautique de <strong className="text-white">nutry.x</strong>. Elles encadrent la création, l'assemblage et la livraison d'assiettes de précision calorique sur-mesure d'élite à destination de particuliers, sportifs professionnels ou structures corporatives sportives.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                  <Scale className="w-4 h-4 text-white/50" />
                  <span>2. INTÉGRITÉ PHARMACOLOGIQUE ET CUISINE</span>
                </div>
                <p>
                  Nos approvisionnements sont garantis sans pesticides, organiques à 95% et exempts de tout additif chimique superflu. Nos équipes appliquent la méthode HACCP avec la plus haute rigueur.
                  <br />
                  Chaque ingrédient pèse précisément son poids déclaré à la mise sous vide. Cependant, une tolérance de +/- 3% relative à la perte d'eau thermique en phase de régénération d'assiette est tolérée par le client.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                  <UserCheck className="w-4 h-4 text-white/50" />
                  <span>3. LOGISTIQUE THERMIQUE SECURE</span>
                </div>
                <p>
                  Nos livraisons s'effectuent par véhicules électriques thermiquement régulés, maintenant la température constante à 3°C jusqu'à votre vestiaire, gymnase ou bureau. Le client s'engage à réceptionner son colis ou sa mallette à l'heure sélectionnée afin de ne pas rompre la chaîne du froid.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                  <ShieldCheck className="w-4 h-4 text-white/50" />
                  <span>4. DÉSISTEMENT ET ANNULATION</span>
                </div>
                <p>
                  S'agissant de denrées alimentaires périssables hautement individualisées, moulées spécifiquement selon votre poids corporel exact et cible métabolique, aucun droit de rétractation après validation de la commande imprimée ("Ticket de caisse") n'est applicable, conformément à l'article L. 221-28 du Code de la Consommation.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
