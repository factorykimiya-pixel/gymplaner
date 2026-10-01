export type ThemeMode = 'light' | 'dark' | 'system';
export type Priority = 'high' | 'medium' | 'low';
export type WorkoutId = 'push' | 'pull' | 'legs';

export interface MacroSet {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface UserProfile {
  name: string;
  gender: 'male' | 'female';
  age: number;
  heightCm: number;
  startWeightKg: number;
  currentWeightKg: number;
  targetWeightKg: number;
  experienceYears: number;
  trainingDaysPerWeek: number;
  activityLevel: 'low' | 'moderate' | 'high';
  calorieTarget: number;
  proteinTarget: number;
  carbTarget: number;
  fatTarget: number;
  stepTarget: number;
  waterTargetMl: number;
}

export interface FoodItem {
  id: string;
  name: string;
  grams: number;
  household: string;
  macros: MacroSet;
  optional?: boolean;
}

export interface Meal {
  id: string;
  title: string;
  time: string;
  image: string;
  foods: FoodItem[];
}

export interface Supplement {
  id: string;
  nameFa: string;
  nameEn: string;
  image: string;
  priority: Priority;
  amount: string;
  timing: string;
  purpose: string;
  note?: string;
}

export interface Exercise {
  id: string;
  nameFa: string;
  nameEn: string;
  muscleGroup: string;
  equipment: string;
  image?: string;
  sets: number;
  repMin: number;
  repMax: number;
  restSec: number;
  rirMin: number;
  rirMax: number;
  instructions: string;
  optional?: boolean;
  replacementNote?: string;
}

export interface CoreExercise {
  id: string;
  region: 'بالا شکم' | 'وسط شکم' | 'زیر شکم' | 'پهلو';
  name: string;
  sets: number;
  reps: string;
  instructions: string;
}

export interface CardioPlan {
  type: string;
  durationMin: number;
  durationMax: number;
  intensity: string;
  description: string;
  stepTargetMin: number;
  stepTargetMax: number;
}

export interface WorkoutDay {
  id: WorkoutId;
  title: string;
  subtitle: string;
  duration: string;
  focus: string[];
  exercises: Exercise[];
  accessory: Exercise[];
  core: CoreExercise[];
  cardio: CardioPlan;
}

export interface WeightEntry {
  id: string;
  date: string;
  weightKg: number;
  waistCm?: number;
  note?: string;
}

export interface SetLog {
  weightKg: number | null;
  reps: number | null;
  done: boolean;
}

export interface WorkoutLog {
  [exerciseId: string]: SetLog[];
}

export interface DailyState {
  date: string;
  steps: number;
  waterMl: number;
  mealDone: Record<string, boolean>;
  supplementDone: Record<string, boolean>;
  workoutLogs: Partial<Record<WorkoutId, WorkoutLog>>;
}

export interface ProgramData {
  version: number;
  profile: UserProfile;
  meals: Meal[];
  supplements: Supplement[];
  workouts: Record<WorkoutId, WorkoutDay>;
  oliveOilMode: 1 | 2;
  validationNotes: string[];
}

export interface AppState {
  program: ProgramData;
  daily: DailyState;
  weights: WeightEntry[];
  theme: ThemeMode;
  editMode: boolean;
}
