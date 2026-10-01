import type { FoodItem, MacroSet, Meal, WeightEntry, WorkoutId } from './types';

export const STORAGE_KEY = 'fitnesscut:v3';

export function round1(n:number){ return Math.round(n * 10) / 10; }

export function sumMacros(items: FoodItem[]): MacroSet {
  return items.reduce((acc, item) => ({
    calories: acc.calories + item.macros.calories,
    protein: acc.protein + item.macros.protein,
    carbs: acc.carbs + item.macros.carbs,
    fat: acc.fat + item.macros.fat,
  }), { calories:0, protein:0, carbs:0, fat:0 });
}

export function calculateMealMacros(meal: Meal): MacroSet {
  return sumMacros(meal.foods);
}

export function calculateDailyMacros(meals: Meal[]): MacroSet {
  return meals.reduce((acc, meal) => {
    const mm = calculateMealMacros(meal);
    return {
      calories: acc.calories + mm.calories,
      protein: acc.protein + mm.protein,
      carbs: acc.carbs + mm.carbs,
      fat: acc.fat + mm.fat,
    };
  }, { calories:0, protein:0, carbs:0, fat:0 });
}

export function calculateRemaining(target: MacroSet, consumed: MacroSet): MacroSet {
  return {
    calories: Math.max(0, target.calories - consumed.calories),
    protein: Math.max(0, target.protein - consumed.protein),
    carbs: Math.max(0, target.carbs - consumed.carbs),
    fat: Math.max(0, target.fat - consumed.fat),
  };
}

export function scaleFood(food: FoodItem, newGrams: number): FoodItem {
  const ratio = food.grams > 0 ? newGrams / food.grams : 1;
  return {
    ...food,
    grams: newGrams,
    macros: {
      calories: round1(food.macros.calories * ratio),
      protein: round1(food.macros.protein * ratio),
      carbs: round1(food.macros.carbs * ratio),
      fat: round1(food.macros.fat * ratio),
    }
  };
}

export function clamp(n:number, min:number, max:number){ return Math.min(max, Math.max(min, n)); }
export function pct(value:number, target:number){ return target <= 0 ? 0 : clamp((value / target) * 100, 0, 100); }

export function formatFa(n:number, maximumFractionDigits=0){
  return new Intl.NumberFormat('fa-IR', { maximumFractionDigits }).format(n);
}

export function todayKey(){
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

export function suggestedWorkout(): WorkoutId {
  const d = new Date().getDay();
  if (d === 6) return 'push';
  if (d === 1) return 'pull';
  if (d === 3) return 'legs';
  // choose nearest next workout in Saturday/Monday/Wednesday pattern
  const order: { day:number; id:WorkoutId }[] = [{day:6,id:'push'},{day:1,id:'pull'},{day:3,id:'legs'}];
  const delta = order.map(x => ({...x, delta:(x.day - d + 7) % 7 || 7})).sort((a,b)=>a.delta-b.delta);
  return delta[0].id;
}

export function movingAverage7(entries: WeightEntry[]) {
  if (!entries.length) return 0;
  const sorted = [...entries].sort((a,b)=>a.date.localeCompare(b.date));
  const last = sorted.slice(-7);
  return round1(last.reduce((s,x)=>s+x.weightKg,0)/last.length);
}

export function weightProgress(start:number, current:number, target:number){
  const total = Math.max(0.1, start - target);
  const lost = Math.max(0, start - current);
  return clamp((lost / total) * 100, 0, 100);
}

export function downloadJson(filename:string, data:unknown){
  const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
