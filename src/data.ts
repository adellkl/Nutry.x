/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoalOption, BaseOption, ProteinOption, SauceOption, GarnishOption, MenuItem } from './types';

// Let's reference the generated high-quality assets
export const IMAGES = {
  hero: '/src/assets/images/nutryx_hero_1780352133640.png',
  salmon: '/src/assets/images/nutryx_dish_salmon_1780352151791.png',
  beef: '/src/assets/images/nutryx_dish_beef_1780352170375.png',
  chicken: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800', // high-end clean back
  tofu: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
};

export const GOAL_OPTIONS: GoalOption[] = [
  {
    id: 'seche',
    name: 'SÈCHE EXTRÊME',
    description: 'Baisse lipidique et glucidique maximale pour révéler la définition musculaire tout en préservant le muscle maigre.',
    badge: 'HIGH-PROTEIN / LOW-CARB',
    macroRatio: { protein: 50, carbs: 20, lipids: 30 },
    caloriesMultiplier: 0.8
  },
  {
    id: 'performance',
    name: 'ATHLÈTE HYBRIDE',
    description: 'Énergie constante, endurance maximale et lucidité mentale élevée. Ratio parfait de nutriments pour la performance pure.',
    badge: 'BALANCED MACROS',
    macroRatio: { protein: 35, carbs: 45, lipids: 20 },
    caloriesMultiplier: 1.0
  },
  {
    id: 'masse',
    name: 'DEVELOPPEMENT MUSCULAIRE',
    description: 'Surplus calorique propre et contrôlé, concentré en protéines de haute valeur biologique et glucides à index glycémique bas.',
    badge: 'CLEAN BULK / HIGH-ENERGY',
    macroRatio: { protein: 30, carbs: 55, lipids: 15 },
    caloriesMultiplier: 1.2
  }
];

export const BASE_OPTIONS: BaseOption[] = [
  {
    id: 'rice',
    name: 'Riz Sauvage de Camargue & Noir Vénéré',
    description: 'Riche en anthocyanes antioxydantes, magnésium et index glycémique bas pour une libération d\'énergie prolongée.',
    calories: 180,
    protein: 5,
    carbs: 38,
    lipids: 1,
    price: 6
  },
  {
    id: 'quinoa',
    name: 'Méli-mélo de Quinoa Rouge des Andes',
    description: 'Une des rares protéines végétales complètes, riche en acides aminés essentiels de chaîne ramifiée.',
    calories: 165,
    protein: 6,
    carbs: 30,
    lipids: 2.5,
    price: 7
  },
  {
    id: 'sweet_potato',
    name: 'Palets de Patate Douce Rôtis au Romarin',
    description: 'Source ultime d\'amidon complexe, de bêta-carotène et de potassium pour optimiser la contraction musculaire.',
    calories: 145,
    protein: 3,
    carbs: 33,
    lipids: 0.5,
    price: 6.5
  },
  {
    id: 'lentils',
    name: 'Lentilles Corail Bio Infusées au Ginkgo Biloba',
    description: 'Acides aminés de qualité supérieure, fer et oligo-éléments favorisant la synthèse d\'oxygène dans le sang.',
    calories: 150,
    protein: 11,
    carbs: 26,
    lipids: 0.8,
    price: 6
  }
];

export const PROTEIN_OPTIONS: ProteinOption[] = [
  {
    id: 'salmon',
    name: 'Pavé de Saumon Sauvage de l\'Atlantique Nord',
    description: 'Riche en acides gras essentiels Oméga-3 (EPA/DHA) pour combattre l\'inflammation musculaire post-effort.',
    calories: 220,
    protein: 26,
    carbs: 0,
    lipids: 13,
    price: 18,
    image: IMAGES.salmon
  },
  {
    id: 'beef',
    name: 'Pavé de Filet de Bœuf Black Angus d\'Exception',
    description: 'Source hautement assimilable de fer héminique, de créatine naturelle et de zinc pour stimuler la puissance musculaire.',
    calories: 190,
    protein: 28,
    carbs: 0,
    lipids: 8,
    price: 21,
    image: IMAGES.beef
  },
  {
    id: 'chicken',
    name: 'Suprême de Volaille Fermière Bio du Gers',
    description: 'Le summum de la protéine pure et ultra-maigre, idéale pour la reconstruction des fibres sans surcharge adipeuse.',
    calories: 140,
    protein: 30,
    carbs: 0,
    lipids: 2,
    price: 14,
    image: IMAGES.chicken
  },
  {
    id: 'tofu',
    name: 'Tofu Fumé de Montagne Artisanal aux Amandes',
    description: 'Protéine végétale premium pressée à l\'eau de source alpine, naturellement enrichie en calcium et acides aminés.',
    calories: 160,
    protein: 19,
    carbs: 2,
    lipids: 9,
    price: 11,
    image: IMAGES.tofu
  }
];

export const SAUCE_OPTIONS: SauceOption[] = [
  {
    id: 'truffle',
    name: 'Jus Réduit Chic à la Truffe Noire du Périgord',
    description: 'Un jus de viande mijoté 48 heures infusé à la truffe, apportant profondeur et acides glutamiques naturels.',
    calories: 45,
    protein: 1.5,
    carbs: 2,
    lipids: 3.5,
    price: 3.5
  },
  {
    id: 'ginger_lemongrass',
    name: 'Ventrèche Liquide au Gingembre & Citronnelle Sauvage',
    description: 'Émulsion thermale thermogénique riche en gingerol pour booster le métabolisme et optimiser la digestion rapide.',
    calories: 25,
    protein: 0.5,
    carbs: 3,
    lipids: 1.2,
    price: 3
  },
  {
    id: 'wild_herb',
    name: 'Nectar Cru d\'Huile d\'Olive de Crète & Coriandre Sauvage',
    description: 'Antioxydants puissants liposolubles, acides gras mono-insaturés purs pressés à froid.',
    calories: 70,
    protein: 0,
    carbs: 0.5,
    lipids: 8,
    price: 3
  }
];

export const GARNISH_OPTIONS: GarnishOption[] = [
  {
    id: 'microgreens',
    name: 'Pousses de Moutarde Fine & Fleurs de Cresson',
    description: 'Concentration record de vitamines C, K et phytonutriments détoxifiants pour la régulation cellulaire.',
    calories: 10,
    protein: 1,
    carbs: 1,
    lipids: 0.1,
    price: 2.5
  },
  {
    id: 'pomegranate',
    name: 'Perles Rouges de Grenade d\'Arménie',
    description: 'Nitrates naturels favorisant la vasodilatation (effet pump), rechargeant les muscles de nutriments essentiels.',
    calories: 30,
    protein: 0.5,
    carbs: 7,
    lipids: 0.2,
    price: 2.5
  },
  {
    id: 'pecans',
    name: 'Éclats d\'Amandes Bio Torréfiées & Noix de Pécan',
    description: 'Acides gras protecteurs des articulations, magnésium et cuivre anti-crampes.',
    calories: 85,
    protein: 2,
    carbs: 3,
    lipids: 8,
    price: 3
  }
];

export const SIGNATURE_DISHES: MenuItem[] = [
  {
    id: 'sig_angus_olympe',
    name: 'L\'Angus de l\'Olympe',
    description: 'Notre pièce maîtresse pour l\'hypertrophie. Un pavé de Bœuf Angus d\'exception saisie au chalumeau culinaire, posé sur un lit de riz noir vénéré et escorté de pousses sauvages, nappé d\'un jus corsé à la truffe noire du Périgord.',
    price: 34,
    goal: 'masse',
    macros: {
      calories: 615,
      protein: 43,
      carbs: 45,
      lipids: 18
    },
    image: IMAGES.beef,
    ingredients: ['Black Angus', 'Riz noir vénéré', 'Jus corsé de truffe', 'Graines de grenade bio']
  },
  {
    id: 'sig_satori_salmon',
    name: 'Le Saumon Satori',
    description: 'Précise, lumineuse et anti-inflammatoire. Un pavé de saumon croustillant-fondant sur une base de quinoa rouge aux andes, agrémenté de graines de grenade pour la vasodilatation et d\'une émulsion thermogénique citronnelle-gingembre.',
    price: 31,
    goal: 'performance',
    macros: {
      calories: 495,
      protein: 36,
      carbs: 35,
      lipids: 15
    },
    image: IMAGES.salmon,
    ingredients: ['Saumon sauvage de l\'Atlantique', 'Quinoa rouge des Andes', 'Gingembre & Citronnelle', 'Noix de pécan éclats']
  },
  {
    id: 'sig_pure_anabolism',
    name: 'L\'Anabolisme Cellulaire',
    description: 'Une découpe millimétrée de poitrine de poulet bio basse température, sublimée par de doux palets de patate douce confite. Nappage léger d\'huile d\'olive sauvage au basilic cressonné et pousses d\'herbes précieuses.',
    price: 29,
    goal: 'seche',
    macros: {
      calories: 380,
      protein: 42,
      carbs: 23,
      lipids: 5
    },
    image: IMAGES.chicken,
    ingredients: ['Blanc de volaille Gers', 'Palets de patate douce', 'Huile de coriandre pure', 'Fleurs de Cresson']
  },
  {
    id: 'sig_kobe_tofu',
    name: 'Le Tofu Kobé Impérial',
    description: 'Une source végétale noble d\'acides aminés. Tofu fumé artisanal croustillant aux éclats de noix de pécan rôties, lit de lentilles corail au gingembre et émulsion thermale au nectar de coriandre sauvage.',
    price: 27,
    goal: 'performance',
    macros: {
      calories: 450,
      protein: 32,
      carbs: 34,
      lipids: 13
    },
    image: IMAGES.tofu,
    ingredients: ['Tofu fumé de montagne', 'Lentilles corail bio', 'Amandes torréfiées', 'Coriandre sauvage']
  },
  {
    id: 'sig_volcanic_beef',
    name: 'Le Tartare Volcanique',
    description: 'Pour un stockage glycogénique maximal. Fines lamelles d\'Angus poivrées combinées avec des patates douces au romarin sauvage, sésame grillé et fine touche de jus réduit de truffe noire du Périgord.',
    price: 35,
    goal: 'masse',
    macros: {
      calories: 680,
      protein: 45,
      carbs: 58,
      lipids: 19
    },
    image: IMAGES.beef,
    ingredients: ['Black Angus d\'Exception', 'Patate douce rôtie', 'Jus corsé de truffe', 'Perles de grenade']
  },
  {
    id: 'sig_supreme_trout',
    name: 'La Truite Bleue d\'Alps',
    description: 'Spécifique pour la sèche de compétition de niveau élite. Truite rôtie sans matière grasse super flue, quinoa des Andes royal infusé à la citronnelle sauvage, persil frisé et jus citronné purifiant.',
    price: 32,
    goal: 'seche',
    macros: {
      calories: 395,
      protein: 44,
      carbs: 21,
      lipids: 6
    },
    image: IMAGES.salmon,
    ingredients: ['Truite de torrent', 'Quinoa rouge royal', 'Citronnelle', 'Fleurs de Cresson sauvage']
  }
];
