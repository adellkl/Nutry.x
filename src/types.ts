/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SportsGoal = 'seche' | 'masse' | 'performance';

export interface GoalOption {
  id: SportsGoal;
  name: string;
  description: string;
  badge: string;
  macroRatio: {
    protein: number; // percentage
    carbs: number;
    lipids: number;
  };
  caloriesMultiplier: number;
}

export interface BaseOption {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  lipids: number;
  price: number;
}

export interface ProteinOption {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  lipids: number;
  price: number;
  image?: string;
}

export interface SauceOption {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  lipids: number;
  price: number;
}

export interface GarnishOption {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  lipids: number;
  price: number;
}

export interface CustomDishCombination {
  goal: SportsGoal;
  base: string; // ID
  protein: string; // ID
  sauce: string; // ID
  garnish: string; // ID
  notes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  athleteGoal: string;
  message: string;
  date: string;
  status: 'pending' | 'answered';
  reply?: string;
  repliedAt?: string;
}

export interface AdminLog {
  id: string;
  timestamp: string;
  type: 'admin' | 'user';
  action: string;
  email: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  goal: SportsGoal;
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    lipids: number;
  };
  image: string;
  ingredients: string[];
}

export interface AthleteOrder {
  id: string;
  athleteEmail: string;
  athleteName: string;
  date: string;
  items: CartItem[];
  total: number;
  macros: { calories: number; protein: number; carbs: number; lipids: number };
  status: 'pending' | 'prepared' | 'delivering' | 'completed' | 'cancelled';
}

export interface CartItem {
  id: string;
  name: string;
  isCustom: boolean;
  customDetails?: CustomDishCombination;
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    lipids: number;
  };
  price: number;
  quantity: number;
  description: string;
}

export interface UserAthleteProfile {
  firstName: string;
  lastName: string;
  email: string;
  weight: number; // in kg
  height: number; // in cm
  age: number;
  activityLevel: 'moderé' | 'pro' | 'extreme';
  currentGoal: SportsGoal;
  dailyCaloriesTarget: number;
  dailyProteinTarget: number; // in g
  dailyCarbsTarget: number; // in g
  dailyLipidsTarget: number; // in g
  tier: 'Gold Elite' | 'Black Platinum' | 'VIP Master';
  orderHistoryCount: number;
}
