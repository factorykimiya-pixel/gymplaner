'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import { useFitness } from './fitness-provider';
import { Icon } from './icons';
import { StatCard, ProgressRing, SectionTitle } from './ui';
import { WeightChart } from './weight-chart';
import { calculateDailyMacros, formatFa, movingAverage7, pct, suggestedWorkout, weightProgress } from '../lib/utils';

export function Dashboard(){
  const {program,daily,weights,setSteps,setWater}=useFitness();
  const p=program.profile; const macros=useMemo(()=>calculateDailyMacros(program.meals),[program.meals]);
  const current=p.currentWeightKg; const progress=weightProgress(p.startWeightKg,current,p.targetWeightKg); const workoutId=suggestedWorkout(); const workout=program.workouts[workoutId];
  const completedMeals=program.meals.filter(m=>daily.mealDone[m.id]);
  const consumed=completedMeals.reduce((acc,meal)=>{
    const mm=meal.foods.reduce((a,f)=>({calories:a.calories+f.macros.calories,protein:a.protein+f.macros.protein,carbs:a.carbs+f.macros.carbs,fat:a.fat+f.macros.fat}),{calories:0,protein:0,carbs:0,fat:0});
    return {calories:acc.calories+mm.calories,protein:acc.protein+mm.protein,carbs:acc.carbs+mm.carbs,fat:acc.fat+mm.fat};
  },{calories:0,protein:0,carbs:0,fat:0});
  const avg=movingAverage7(weights);
  return <>
    <section className="hero-card"><img src="/assets/hero-athlete.jpg" className="hero-athlete" alt=""/><div className="hero-copy"><span className="kicker">PERSONAL CUT PROGRAM</span><h1>۸۰ → ۶۸ KG</h1><p>کاهش چربی با حفظ قدرت، عضله و کیفیت تمرین. همه داده‌ها قابل ویرایش‌اند و روی همین دستگاه ذخیره می‌شوند.</p><div className="hero-route"><strong>80</strong><div className="arrow"/><strong>68</strong><ProgressRing value={progress} label="پیشرفت"/></div></div></section>
    <div className="grid-4 section-gap">
      <StatCard label="کالری امروز" value={`${formatFa(consumed.calories)} / ${formatFa(p.calorieTarget)}`} sub="بر اساس وعده‌های ثبت‌شده" icon="fire" progress={pct(consumed.calories,p.calorieTarget)}/>
      <StatCard label="پروتئین" value={`${formatFa(consumed.protein,1)} / ${formatFa(p.proteinTarget)} g`} sub={`برنامه کامل امروز ≈ ${formatFa(macros.protein,1)}g`} icon="target" progress={pct(consumed.protein,p.proteinTarget)}/>
      <StatCard label="قدم‌ها" value={`${formatFa(daily.steps)} / ${formatFa(p.stepTarget)}`} sub="هدف برای جبران فعالیت شغلی پایین" icon="steps" progress={pct(daily.steps,p.stepTarget)}/>
      <StatCard label="آب" value={`${formatFa(daily.waterMl/1000,1)} / ${formatFa(p.waterTargetMl/1000,1)} L`} sub="هدف روزانه" icon="water" progress={pct(daily.waterMl,p.waterTargetMl)}/>
    </div>
    <div className="dashboard-grid">
      <article className="card today-card"><div><span className="kicker">WORKOUT OF THE DAY</span><h2>امروز · {workout.title}</h2><p style={{color:'var(--muted)'}}>{workout.subtitle}</p><div className="chip-row"><span className="chip">{workout.exercises.length} حرکت اصلی</span><span className="chip">Core</span><span className="chip">{workout.cardio.durationMin}–{workout.cardio.durationMax} دقیقه هوازی</span></div><Link href={`/training/${workoutId}/`} className="primary-btn" style={{marginTop:16,width:'fit-content'}}><Icon name="play"/> شروع تمرین</Link></div><div className="today-visual"><img src={workout.exercises[0]?.image||'/assets/hero-athlete.jpg'} alt=""/></div></article>
      <article className="card"><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><span className="kicker">WEIGHT TREND</span><h3 style={{margin:'3px 0'}}>روند وزن</h3></div><b style={{fontSize:24}}>{formatFa(current,1)} kg</b></div><WeightChart entries={weights}/><div className="macro-strip"><span className="macro-pill"><b>{formatFa(avg||current,1)}</b> میانگین ۷ روزه</span><span className="macro-pill"><b>{formatFa(Math.max(0,p.startWeightKg-current),1)}</b> کاهش کل</span><span className="macro-pill"><b>{formatFa(Math.max(0,current-p.targetWeightKg),1)}</b> باقی‌مانده</span></div></article>
    </div>
    <SectionTitle title="ثبت سریع امروز" meta="قدم و آب بدون باز کردن صفحه دیگر"/>
    <div className="grid-2"><article className="card"><div className="stat-head"><span>قدم‌های امروز</span><span className="stat-icon"><Icon name="steps"/></span></div><input className="field-input" type="number" inputMode="numeric" value={daily.steps} onChange={e=>setSteps(Number(e.target.value))}/><div className="progress-track" style={{marginTop:10}}><div className="progress-fill" style={{width:`${pct(daily.steps,p.stepTarget)}%`}}/></div></article><article className="card"><div className="stat-head"><span>آب امروز</span><span className="stat-icon"><Icon name="water"/></span></div><div className="chip-row" style={{marginTop:10}}>{[250,500,750].map(n=><button key={n} className="secondary-btn btn-sm" onClick={()=>setWater(daily.waterMl+n)}>+{formatFa(n)} ml</button>)}<button className="ghost-btn btn-sm" onClick={()=>setWater(Math.max(0,daily.waterMl-250))}>−۲۵۰</button></div><div style={{fontSize:24,fontWeight:900,marginTop:10}}>{formatFa(daily.waterMl)} ml</div></article></div>
  </>
}
