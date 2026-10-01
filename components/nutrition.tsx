'use client';
import { useMemo } from 'react';
import { useFitness } from './fitness-provider';
import { Icon } from './icons';
import { calculateDailyMacros, calculateMealMacros, formatFa, pct } from '../lib/utils';

export function NutritionSummary(){
  const {program}=useFitness();
  const actual=useMemo(()=>calculateDailyMacros(program.meals),[program.meals]);
  const p=program.profile;
  return <div className="card" style={{display:'grid',gridTemplateColumns:'auto 1fr',gap:18,alignItems:'center'}}>
    <div className="macro-ring"><div className="macro-ring-content"><b>{formatFa(actual.calories)}</b><span>kcal</span></div></div>
    <div><div className="macro-strip"><span className="macro-pill"><b>{formatFa(actual.protein,1)}g</b> پروتئین</span><span className="macro-pill"><b>{formatFa(actual.carbs,1)}g</b> کربوهیدرات</span><span className="macro-pill"><b>{formatFa(actual.fat,1)}g</b> چربی</span></div><div style={{marginTop:12}} className="progress-track"><div className="progress-fill" style={{width:`${pct(actual.calories,p.calorieTarget)}%`}}/></div><small style={{color:'var(--muted)'}}>هدف روزانه: {formatFa(p.calorieTarget)} kcal · محاسبه زنده بر اساس مقادیر فعلی</small></div>
  </div>
}

export function OliveOilMode(){
  const {program,setOliveOilMode}=useFitness();
  return <div className="card soft" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:14,flexWrap:'wrap'}}><div><b>روغن زیتون ↔ کربوهیدرات</b><div style={{fontSize:11,color:'var(--muted)'}}>حالت اصلی: یک قاشق چای‌خوری در ناهار. حالت دوم: یک قاشق دیگر در شام و کاهش برنج ناهار به ۱۰۵ گرم.</div></div><div className="segmented"><button className={program.oliveOilMode===1?'active':''} onClick={()=>setOliveOilMode(1)}>۱ قاشق</button><button className={program.oliveOilMode===2?'active':''} onClick={()=>setOliveOilMode(2)}>۲ قاشق</button></div></div>
}

export function MealsEditor(){
  const {program,daily,editMode,updateFood,updateFoodGrams,addFood,removeFood,duplicateFood,toggleMealDone}=useFitness();
  return <div className="meal-list">{program.meals.map(meal=>{
    const macros=calculateMealMacros(meal); const done=!!daily.mealDone[meal.id];
    return <article className="card meal-card" key={meal.id}>
      <img className="meal-photo" src={meal.image} alt={meal.title}/>
      <div className="meal-body"><div className="meal-title"><button className={done?'set-done done':'set-done'} onClick={()=>toggleMealDone(meal.id)} title="ثبت وعده"><Icon name="check" size={17}/></button><div><h3>{meal.title}</h3><small>{meal.time}</small></div></div>
        {meal.foods.map(food=><div className="food-row" key={food.id}>
          <div>{editMode?<input className="input-mini" value={food.name} onChange={e=>updateFood(meal.id,food.id,{name:e.target.value})}/>:<strong>{food.name}</strong>}</div>
          <div className="household">{editMode?<input className="input-mini" value={food.household} onChange={e=>updateFood(meal.id,food.id,{household:e.target.value})}/>:<span>{food.household}</span>}</div>
          <div className="grams">{editMode?<input className="input-mini" type="number" min="0" value={food.grams} onChange={e=>updateFoodGrams(meal.id,food.id,Number(e.target.value))}/>:<span>{formatFa(food.grams,1)} گرم</span>}</div>
          {editMode?<div className="food-tools"><button className="icon-btn btn-sm" onClick={()=>duplicateFood(meal.id,food.id)}><Icon name="copy" size={14}/></button><button className="icon-btn btn-sm" onClick={()=>removeFood(meal.id,food.id)}><Icon name="trash" size={14}/></button></div>:<span>{formatFa(food.macros.calories)} kcal</span>}
        </div>)}
        {editMode&&<button className="secondary-btn btn-sm" style={{marginTop:10}} onClick={()=>addFood(meal.id)}><Icon name="plus" size={15}/> افزودن خوراکی</button>}
      </div>
      <div className="meal-kcal"><b>{formatFa(macros.calories)}</b><span>kcal</span><small>{formatFa(macros.protein,1)}g پروتئین</small></div>
    </article>
  })}</div>
}
