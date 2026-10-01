'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { defaultProgram } from '../data/default-program';
import type { AppState, DailyState, FoodItem, ProgramData, SetLog, Supplement, ThemeMode, WeightEntry, WorkoutId } from '../lib/types';
import { STORAGE_KEY, todayKey, downloadJson, scaleFood } from '../lib/utils';

interface FitnessContextValue extends AppState {
  hydrated: boolean;
  updateProfile: (patch: Partial<ProgramData['profile']>) => void;
  updateFood: (mealId:string, foodId:string, patch:Partial<FoodItem>) => void;
  updateFoodGrams: (mealId:string, foodId:string, grams:number) => void;
  addFood: (mealId:string) => void;
  removeFood: (mealId:string, foodId:string) => void;
  duplicateFood: (mealId:string, foodId:string) => void;
  setOliveOilMode: (mode:1|2) => void;
  updateSupplement: (id:string, patch:Partial<Supplement>) => void;
  toggleSupplementDone: (id:string) => void;
  toggleMealDone: (id:string) => void;
  updateExercise: (day:WorkoutId, exerciseId:string, patch:Record<string,unknown>) => void;
  addExercise: (day:WorkoutId) => void;
  removeExercise: (day:WorkoutId, exerciseId:string) => void;
  updateCore: (day:WorkoutId, coreId:string, patch:Record<string,unknown>) => void;
  updateCardio: (day:WorkoutId, patch:Record<string,unknown>) => void;
  updateSetLog: (day:WorkoutId, exerciseId:string, setIndex:number, patch:Partial<SetLog>) => void;
  setSteps: (steps:number) => void;
  setWater: (ml:number) => void;
  addWeight: (entry: Omit<WeightEntry,'id'>) => void;
  removeWeight: (id:string) => void;
  setTheme: (theme:ThemeMode) => void;
  setEditMode: (v:boolean) => void;
  exportBackup: () => void;
  importBackup: (file:File) => Promise<{ok:boolean; message:string}>;
  resetProgram: () => void;
}

const FitnessContext = createContext<FitnessContextValue | null>(null);

function freshDaily(): DailyState {
  return { date:todayKey(), steps:0, waterMl:0, mealDone:{}, supplementDone:{}, workoutLogs:{} };
}
function initialState(): AppState {
  return {
    program: structuredClone(defaultProgram),
    daily: freshDaily(),
    weights:[{ id:'start', date:todayKey(), weightKg:defaultProgram.profile.currentWeightKg, note:'شروع برنامه' }],
    theme:'system',
    editMode:false,
  };
}

function migrate(raw:any): AppState {
  const base = initialState();
  if (!raw || typeof raw !== 'object') return base;
  const state: AppState = {
    ...base,
    ...raw,
    program: { ...base.program, ...(raw.program || {}), profile:{...base.program.profile, ...(raw.program?.profile||{})}, workouts:{...base.program.workouts, ...(raw.program?.workouts||{})} },
  };
  if (state.daily?.date !== todayKey()) state.daily = freshDaily();
  return state;
}

export function FitnessProvider({children}:{children:React.ReactNode}){
  const [state,setState] = useState<AppState>(initialState);
  const [hydrated,setHydrated] = useState(false);

  useEffect(()=>{
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(migrate(JSON.parse(raw)));
    } catch {}
    setHydrated(true);
  },[]);

  useEffect(()=>{
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },[state, hydrated]);

  useEffect(()=>{
    if (!hydrated) return;
    const root = document.documentElement;
    const dark = state.theme === 'dark' || (state.theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    root.dataset.theme = dark ? 'dark' : 'light';
  },[state.theme, hydrated]);

  const updateProfile = useCallback((patch:Partial<ProgramData['profile']>)=>setState(s=>({ ...s, program:{...s.program, profile:{...s.program.profile,...patch}}})),[]);

  const updateFood = useCallback((mealId:string, foodId:string, patch:Partial<FoodItem>)=>setState(s=>({
    ...s, program:{...s.program, meals:s.program.meals.map(meal=>meal.id!==mealId?meal:{...meal,foods:meal.foods.map(f=>f.id===foodId?{...f,...patch}:f)})}
  })),[]);

  const updateFoodGrams = useCallback((mealId:string, foodId:string, grams:number)=>setState(s=>({
    ...s, program:{...s.program, meals:s.program.meals.map(meal=>meal.id!==mealId?meal:{...meal,foods:meal.foods.map(f=>f.id===foodId?scaleFood(f, Math.max(0, grams)):f)})}
  })),[]);

  const addFood = useCallback((mealId:string)=>setState(s=>({
    ...s, program:{...s.program, meals:s.program.meals.map(meal=>meal.id!==mealId?meal:{...meal,foods:[...meal.foods,{id:`custom-${Date.now()}`,name:'خوراکی جدید',grams:100,household:'۱ واحد',macros:{calories:100,protein:0,carbs:0,fat:0}}]})}
  })),[]);

  const removeFood = useCallback((mealId:string, foodId:string)=>setState(s=>({
    ...s, program:{...s.program, meals:s.program.meals.map(meal=>meal.id!==mealId?meal:{...meal,foods:meal.foods.filter(f=>f.id!==foodId)})}
  })),[]);

  const duplicateFood = useCallback((mealId:string, foodId:string)=>setState(s=>({
    ...s, program:{...s.program, meals:s.program.meals.map(meal=>{
      if(meal.id!==mealId) return meal;
      const f=meal.foods.find(x=>x.id===foodId); if(!f) return meal;
      return {...meal,foods:[...meal.foods,{...f,id:`${f.id}-copy-${Date.now()}`,name:`${f.name} (کپی)`}]};
    })}
  })),[]);

  const setOliveOilMode = useCallback((mode:1|2)=>setState(s=>{
    const meals=s.program.meals.map(meal=>({ ...meal, foods:meal.foods.map(f=>({...f,macros:{...f.macros}})) }));
    const lunch=meals.find(m=>m.id==='lunch'); const dinner=meals.find(m=>m.id==='dinner');
    if(lunch && dinner){
      const rice=lunch.foods.find(f=>f.id==='rice'); const oliveDinner=dinner.foods.find(f=>f.id==='olive-dinner');
      if(rice){
        const basePerGram={calories:176/135,protein:3.6/135,carbs:38/135,fat:.4/135};
        const grams=mode===1?135:105;
        rice.grams=grams; rice.household=mode===1?'۹ قاشق غذاخوری سرپُر':'حدود ۷ قاشق غذاخوری';
        rice.macros={calories:basePerGram.calories*grams,protein:basePerGram.protein*grams,carbs:basePerGram.carbs*grams,fat:basePerGram.fat*grams};
      }
      if(oliveDinner){
        oliveDinner.grams=mode===2?4.5:0; oliveDinner.household=mode===2?'۱ قاشق چای‌خوری':'در حالت پایه بدون روغن';
        oliveDinner.macros=mode===2?{calories:40,protein:0,carbs:0,fat:4.5}:{calories:0,protein:0,carbs:0,fat:0};
      }
    }
    return {...s,program:{...s.program,oliveOilMode:mode,meals}};
  }),[]);

  const updateSupplement=useCallback((id:string, patch:Partial<Supplement>)=>setState(s=>({...s,program:{...s.program,supplements:s.program.supplements.map(x=>x.id===id?{...x,...patch}:x)}})),[]);
  const toggleSupplementDone=useCallback((id:string)=>setState(s=>({...s,daily:{...s.daily,supplementDone:{...s.daily.supplementDone,[id]:!s.daily.supplementDone[id]}}})),[]);
  const toggleMealDone=useCallback((id:string)=>setState(s=>({...s,daily:{...s.daily,mealDone:{...s.daily.mealDone,[id]:!s.daily.mealDone[id]}}})),[]);

  const updateExercise=useCallback((day:WorkoutId, exerciseId:string, patch:Record<string,unknown>)=>setState(s=>{
    const w=s.program.workouts[day];
    const patchList=(arr:any[])=>arr.map(ex=>ex.id===exerciseId?{...ex,...patch}:ex);
    return {...s,program:{...s.program,workouts:{...s.program.workouts,[day]:{...w,exercises:patchList(w.exercises),accessory:patchList(w.accessory)}}}};
  }),[]);

  const addExercise=useCallback((day:WorkoutId)=>setState(s=>{
    const w=s.program.workouts[day];
    const ex:any={id:`custom-${Date.now()}`,nameFa:'حرکت جدید',nameEn:'Custom Exercise',muscleGroup:'عضله هدف',equipment:'تجهیزات',sets:3,repMin:8,repMax:12,restSec:90,rirMin:1,rirMax:3,instructions:'توضیح اجرای حرکت را وارد کن.'};
    return {...s,program:{...s.program,workouts:{...s.program.workouts,[day]:{...w,exercises:[...w.exercises,ex]}}}};
  }),[]);
  const removeExercise=useCallback((day:WorkoutId,exerciseId:string)=>setState(s=>{
    const w=s.program.workouts[day];
    return {...s,program:{...s.program,workouts:{...s.program.workouts,[day]:{...w,exercises:w.exercises.filter(x=>x.id!==exerciseId),accessory:w.accessory.filter(x=>x.id!==exerciseId)}}}};
  }),[]);
  const updateCore=useCallback((day:WorkoutId,coreId:string,patch:Record<string,unknown>)=>setState(s=>{
    const w=s.program.workouts[day];
    return {...s,program:{...s.program,workouts:{...s.program.workouts,[day]:{...w,core:w.core.map(c=>c.id===coreId?{...c,...patch}:c)}}}};
  }),[]);
  const updateCardio=useCallback((day:WorkoutId,patch:Record<string,unknown>)=>setState(s=>{
    const w=s.program.workouts[day];
    return {...s,program:{...s.program,workouts:{...s.program.workouts,[day]:{...w,cardio:{...w.cardio,...patch}}}}};
  }),[]);

  const updateSetLog=useCallback((day:WorkoutId, exerciseId:string, setIndex:number, patch:Partial<SetLog>)=>setState(s=>{
    const dayLog={...(s.daily.workoutLogs[day]||{})};
    const ex=[...(dayLog[exerciseId]||[])];
    while(ex.length<=setIndex) ex.push({weightKg:null,reps:null,done:false});
    ex[setIndex]={...ex[setIndex],...patch}; dayLog[exerciseId]=ex;
    return {...s,daily:{...s.daily,workoutLogs:{...s.daily.workoutLogs,[day]:dayLog}}};
  }),[]);

  const setSteps=useCallback((steps:number)=>setState(s=>({...s,daily:{...s.daily,steps:Math.max(0,steps)}})),[]);
  const setWater=useCallback((ml:number)=>setState(s=>({...s,daily:{...s.daily,waterMl:Math.max(0,ml)}})),[]);
  const addWeight=useCallback((entry:Omit<WeightEntry,'id'>)=>setState(s=>({...s,weights:[...s.weights,{...entry,id:`w-${Date.now()}`}],program:{...s.program,profile:{...s.program.profile,currentWeightKg:entry.weightKg}}})),[]);
  const removeWeight=useCallback((id:string)=>setState(s=>({...s,weights:s.weights.filter(w=>w.id!==id)})),[]);
  const setTheme=useCallback((theme:ThemeMode)=>setState(s=>({...s,theme})),[]);
  const setEditMode=useCallback((v:boolean)=>setState(s=>({...s,editMode:v})),[]);

  const exportBackup=useCallback(()=>downloadJson(`fitnesscut-backup-${todayKey()}.json`, state),[state]);
  const importBackup=useCallback(async(file:File)=>{
    try{ const parsed=JSON.parse(await file.text()); setState(migrate(parsed)); return {ok:true,message:'پشتیبان با موفقیت بازیابی شد.'}; }
    catch{ return {ok:false,message:'فایل پشتیبان معتبر نیست.'}; }
  },[]);
  const resetProgram=useCallback(()=>setState(initialState()),[]);

  const value=useMemo<FitnessContextValue>(()=>({ ...state, hydrated, updateProfile,updateFood,updateFoodGrams,addFood,removeFood,duplicateFood,setOliveOilMode,updateSupplement,toggleSupplementDone,toggleMealDone,updateExercise,addExercise,removeExercise,updateCore,updateCardio,updateSetLog,setSteps,setWater,addWeight,removeWeight,setTheme,setEditMode,exportBackup,importBackup,resetProgram }),[state,hydrated,updateProfile,updateFood,updateFoodGrams,addFood,removeFood,duplicateFood,setOliveOilMode,updateSupplement,toggleSupplementDone,toggleMealDone,updateExercise,addExercise,removeExercise,updateCore,updateCardio,updateSetLog,setSteps,setWater,addWeight,removeWeight,setTheme,setEditMode,exportBackup,importBackup,resetProgram]);

  return <FitnessContext.Provider value={value}>{children}</FitnessContext.Provider>;
}

export function useFitness(){
  const ctx=useContext(FitnessContext); if(!ctx) throw new Error('useFitness must be used inside FitnessProvider'); return ctx;
}
