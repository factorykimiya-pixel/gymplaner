'use client';
import { useFitness } from './fitness-provider';
import { calculateMealMacros, formatFa } from '../lib/utils';
import type { WorkoutId } from '../lib/types';

export function PrintProgram(){
  const {program}=useFitness();
  const workoutIds:WorkoutId[]=['push','pull','legs'];
  return <div className="print-only">
    <section className="print-sheet"><div className="print-title"><h1>برنامه غذایی کات · FitnessCut</h1><p>۸۰ → ۶۸ کیلوگرم · هدف روزانه حدود {program.profile.calorieTarget} کیلوکالری</p></div><div className="print-meals">{program.meals.map(meal=>{const mm=calculateMealMacros(meal);return <div className="print-meal" key={meal.id}><h3>{meal.title} · {formatFa(mm.calories)} kcal</h3><ul>{meal.foods.map(f=><li key={f.id}>{f.name}: {f.household} · {formatFa(f.grams,1)} گرم</li>)}</ul></div>})}</div><div className="print-footer">روغن زیتون: حالت {program.oliveOilMode} قاشق چای‌خوری · مقادیر تقریبی و قابل ویرایش‌اند.</div></section>
    <section className="print-sheet"><div className="print-title"><h1>برنامه مکمل‌ها</h1><p>کراتین منظم؛ وی در منوی غذایی محاسبه شده و BCAA/گلوتامین اختیاری‌اند.</p></div><div className="print-grid">{program.supplements.map(s=><div className="print-card" key={s.id}><h3>{s.nameFa}</h3><p><b>مقدار:</b> {s.amount}</p><p><b>زمان:</b> {s.timing}</p><p><b>هدف:</b> {s.purpose}</p></div>)}</div></section>
    {workoutIds.map(id=>{const w=program.workouts[id];return <section className="print-sheet" key={id}><div className="print-title"><h1>برنامه تمرین {w.title}</h1><p>{w.subtitle} · {w.duration}</p></div><div className="print-grid">{w.exercises.map(ex=><div className="print-card" key={ex.id}><h3>{ex.nameFa}</h3><p>{ex.sets} ست · {ex.repMin} تا {ex.repMax} تکرار · {ex.restSec} ثانیه</p><p>{ex.instructions}</p></div>)}{w.accessory.map(ex=><div className="print-card" key={ex.id}><h3>{ex.nameFa}</h3><p>{ex.sets} ست · {ex.repMin} تا {ex.repMax} · {ex.restSec} ثانیه</p></div>)}</div><h3>شکم و پهلو</h3><div className="print-grid">{w.core.map(c=><div className="print-card" key={c.id}><b>{c.region} · {c.name}</b><p>{c.sets} ست × {c.reps}</p></div>)}</div><h3>هوازی</h3><div className="print-card"><b>{w.cardio.type}</b><p>{w.cardio.durationMin} تا {w.cardio.durationMax} دقیقه · {w.cardio.intensity}</p><p>{w.cardio.description}</p></div></section>})}
  </div>
}
