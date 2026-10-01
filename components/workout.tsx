'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useFitness } from './fitness-provider';
import { Icon } from './icons';
import { RestTimer } from './rest-timer';
import type { Exercise, WorkoutId } from '../lib/types';
import { formatFa } from '../lib/utils';

export function TrainingTabs({active}:{active?:WorkoutId}){
  const {program}=useFitness();
  return <div className="training-tabs">{(['push','pull','legs'] as WorkoutId[]).map(id=>{
    const w=program.workouts[id];
    return <Link href={`/training/${id}/`} key={id} className={active===id?'training-tab active':'training-tab'}><b>{w.title}</b><small>{w.focus.slice(0,3).join(' · ')}</small></Link>
  })}</div>
}

function ProgressiveHint({exercise,logs}:{exercise:Exercise;logs:any[]}){
  if(!logs?.length || logs.length<exercise.sets) return null;
  const completed=logs.slice(0,exercise.sets).every(x=>x?.done && (x.reps||0)>=exercise.repMax);
  if(!completed) return null;
  return <div className="validation-note" style={{marginTop:8,background:'var(--mint)',borderColor:'var(--line)',color:'var(--deep)'}}><Icon name="sparkle" size={16}/><span><b>پیشنهاد جلسه بعد:</b> اگر RIR هدف نیز حفظ شده، افزایش ۲ تا ۵٪ وزنه را در نظر بگیر.</span></div>
}

function ExerciseCard({day,exercise,onStartTimer}:{day:WorkoutId;exercise:Exercise;onStartTimer:(sec:number)=>void}){
  const {daily,editMode,updateExercise,removeExercise,updateSetLog}=useFitness();
  const logs=daily.workoutLogs[day]?.[exercise.id]||[];
  return <article className="card exercise-card"><div className="exercise-main">
    {exercise.image?<img className="exercise-image" src={exercise.image} alt={exercise.nameFa}/>:<div className="exercise-image" style={{display:'grid',placeItems:'center',color:'var(--emerald)'}}><Icon name="training" size={34}/></div>}
    <div className="exercise-copy">
      {editMode?<input className="field-input" value={exercise.nameFa} onChange={e=>updateExercise(day,exercise.id,{nameFa:e.target.value})}/>:<h3>{exercise.nameFa}</h3>}
      <span className="en">{exercise.nameEn}</span>
      <div className="chip-row">{editMode?<><input className="input-mini" style={{maxWidth:130}} value={exercise.muscleGroup} onChange={e=>updateExercise(day,exercise.id,{muscleGroup:e.target.value})}/><input className="input-mini" style={{maxWidth:130}} value={exercise.equipment} onChange={e=>updateExercise(day,exercise.id,{equipment:e.target.value})}/></>:<><span className="chip">{exercise.muscleGroup}</span><span className="chip">{exercise.equipment}</span></>}{exercise.optional&&<span className="chip">اختیاری</span>}</div>
      {editMode&&<div className="page-actions" style={{marginTop:8}}><button className="danger-btn btn-sm" onClick={()=>removeExercise(day,exercise.id)}><Icon name="trash" size={14}/> حذف حرکت</button></div>}
      {editMode?<textarea className="field-input" rows={2} value={exercise.instructions} onChange={e=>updateExercise(day,exercise.id,{instructions:e.target.value})}/>:<p>{exercise.instructions}</p>}
      {exercise.replacementNote&&<p><b>{exercise.replacementNote}</b></p>}
    </div>
    <div className="exercise-stats">
      <div className="exercise-stat"><span>ست</span>{editMode?<input className="input-mini" type="number" value={exercise.sets} onChange={e=>updateExercise(day,exercise.id,{sets:Number(e.target.value)})}/>:<b>{formatFa(exercise.sets)}</b>}</div>
      <div className="exercise-stat"><span>تکرار</span>{editMode?<div style={{display:'flex',gap:3}}><input className="input-mini" type="number" value={exercise.repMin} onChange={e=>updateExercise(day,exercise.id,{repMin:Number(e.target.value)})}/><input className="input-mini" type="number" value={exercise.repMax} onChange={e=>updateExercise(day,exercise.id,{repMax:Number(e.target.value)})}/></div>:<b>{formatFa(exercise.repMin)}–{formatFa(exercise.repMax)}</b>}</div>
      <div className="exercise-stat"><span>استراحت</span>{editMode?<input className="input-mini" type="number" value={exercise.restSec} onChange={e=>updateExercise(day,exercise.id,{restSec:Number(e.target.value)})}/>:<b>{formatFa(exercise.restSec)} ث</b>}</div>
    </div>
  </div><div className="exercise-set-area"><div className="set-header"><span>ست</span><span>قبلی</span><span>کیلو</span><span>تکرار</span><span>ثبت</span></div>{Array.from({length:exercise.sets}).map((_,i)=>{
    const log=logs[i]||{weightKg:null,reps:null,done:false};
    return <div className="set-row" key={i}><span className="set-index">{formatFa(i+1)}</span><span style={{fontSize:10,color:'var(--muted)',textAlign:'center'}}>—</span><input className="set-input" inputMode="decimal" type="number" step="0.5" placeholder="kg" value={log.weightKg??''} onChange={e=>updateSetLog(day,exercise.id,i,{weightKg:e.target.value===''?null:Number(e.target.value)})}/><input className="set-input" inputMode="numeric" type="number" placeholder="reps" value={log.reps??''} onChange={e=>updateSetLog(day,exercise.id,i,{reps:e.target.value===''?null:Number(e.target.value)})}/><button className={log.done?'set-done done':'set-done'} onClick={()=>{const next=!log.done;updateSetLog(day,exercise.id,i,{done:next});if(next)onStartTimer(exercise.restSec)}}><Icon name="check" size={17}/></button></div>
  })}<ProgressiveHint exercise={exercise} logs={logs}/></div></article>
}

export function WorkoutView({day}:{day:WorkoutId}){
  const {program,editMode,addExercise,updateExercise,updateCore,updateCardio}=useFitness(); const w=program.workouts[day];
  const [timer,setTimer]=useState<number|null>(null);
  const all=[...w.exercises,...w.accessory];
  const totalSets=useMemo(()=>all.reduce((s,x)=>s+x.sets,0),[all]);
  return <>
    <div className="workout-header"><div><span className="kicker">STRENGTH / {w.title}</span><h1 style={{margin:0,fontSize:'clamp(30px,4vw,50px)'}}>تمرین {w.title}</h1><p style={{margin:'6px 0',color:'var(--muted)'}}>{w.subtitle}</p><div className="workout-summary"><span className="summary-pill">{w.duration}</span><span className="summary-pill">RIR ۱ تا ۳</span><span className="summary-pill">{formatFa(totalSets)} ست</span><span className="summary-pill">{w.focus.join(' · ')}</span></div></div><TrainingTabs active={day}/></div>
    <div className="section-title"><div><h2>حرکات اصلی</h2><span>فرم صحیح، دامنه کنترل‌شده و ثبت عملکرد هر ست</span></div>{editMode&&<button className="secondary-btn btn-sm" onClick={()=>addExercise(day)}><Icon name="plus" size={15}/> حرکت جدید</button>}</div>
    <div className="exercise-list">{w.exercises.map(ex=><ExerciseCard key={ex.id} day={day} exercise={ex} onStartTimer={setTimer}/>)}</div>
    {w.accessory.length>0&&<><div className="section-title"><div><h2>{day==='pull'?'کول و ساعد':'ساعد'}</h2><span>{day==='pull'?'کول بالایی و پایینی + ساعد بدون حجم تکراری':'حرکات مکمل پایان جلسه'}</span></div></div><div className="accessory-grid">{w.accessory.map(ex=><article className="accessory-card" key={ex.id}><span className="micro">{ex.nameEn}</span>{editMode?<input className="field-input" value={ex.nameFa} onChange={e=>updateExercise(day,ex.id,{nameFa:e.target.value})}/>:<h3>{ex.nameFa}</h3>}<div className="chip-row" style={{marginTop:7}}><span className="chip">{formatFa(ex.sets)} ست</span><span className="chip">{formatFa(ex.repMin)}–{formatFa(ex.repMax)}</span><span className="chip">{formatFa(ex.restSec)} ث</span></div>{editMode?<textarea className="field-input" rows={2} value={ex.instructions} onChange={e=>updateExercise(day,ex.id,{instructions:e.target.value})}/>:<p>{ex.instructions}</p>}</article>)}</div></>}
    <div className="section-title"><div><h2>فینشر شکم و پهلو</h2><span>ناحیه تأکید تمرین؛ نه چربی‌سوزی موضعی</span></div></div><div className="core-grid">{w.core.map(core=><article className="core-card" key={core.id}><span className="core-region">{core.region}</span>{editMode?<input className="field-input" value={core.name} onChange={e=>updateCore(day,core.id,{name:e.target.value})}/>:<h3>{core.name}</h3>}<span className="micro">{formatFa(core.sets)} ست × {core.reps}</span>{editMode?<textarea className="field-input" rows={2} value={core.instructions} onChange={e=>updateCore(day,core.id,{instructions:e.target.value})}/>:<p>{core.instructions}</p>}</article>)}</div>
    <div className="section-title"><div><h2>هوازی و فعالیت روزانه</h2><span>داخل همان روز تمرینی؛ صفحه جداگانه ندارد</span></div></div><article className="cardio-card"><div><span className="kicker">CARDIO / DAILY ACTIVITY</span>{editMode?<input className="field-input" value={w.cardio.type} onChange={e=>updateCardio(day,{type:e.target.value})}/>:<h3>{w.cardio.type}</h3>}{editMode?<textarea className="field-input" rows={2} value={w.cardio.description} onChange={e=>updateCardio(day,{description:e.target.value})}/>:<p style={{color:'var(--muted)',margin:'6px 0'}}>{w.cardio.description}</p>}<div className="cardio-meta">{editMode?<><input className="input-mini" type="number" value={w.cardio.durationMin} onChange={e=>updateCardio(day,{durationMin:Number(e.target.value)})}/><input className="input-mini" type="number" value={w.cardio.durationMax} onChange={e=>updateCardio(day,{durationMax:Number(e.target.value)})}/></>:<span className="chip">{formatFa(w.cardio.durationMin)} تا {formatFa(w.cardio.durationMax)} دقیقه</span>}<span className="chip">{w.cardio.intensity}</span><span className="chip">{formatFa(w.cardio.stepTargetMin)} تا {formatFa(w.cardio.stepTargetMax)} قدم</span></div></div><div className="cardio-visual"><Icon name="activity" size={32}/><b>{formatFa(w.cardio.durationMin)}–{formatFa(w.cardio.durationMax)}</b><small>دقیقه</small></div></article>
    {timer!==null&&<RestTimer initial={timer} onClose={()=>setTimer(null)}/>} 
  </>
}
