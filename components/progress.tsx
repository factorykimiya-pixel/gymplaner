'use client';
import { FormEvent, useState } from 'react';
import { useFitness } from './fitness-provider';
import { Icon } from './icons';
import { Field, StatCard } from './ui';
import { WeightChart } from './weight-chart';
import { formatFa, movingAverage7, weightProgress } from '../lib/utils';

export function ProgressView(){
  const {program,weights,addWeight,removeWeight}=useFitness(); const p=program.profile;
  const [weight,setWeight]=useState(String(p.currentWeightKg)); const [waist,setWaist]=useState(''); const [note,setNote]=useState('');
  const submit=(e:FormEvent)=>{e.preventDefault(); const w=Number(weight); if(!w)return; addWeight({date:new Date().toISOString().slice(0,10),weightKg:w,waistCm:waist?Number(waist):undefined,note:note||undefined});setWaist('');setNote('')};
  return <>
    <div className="grid-4"><StatCard label="وزن فعلی" value={`${formatFa(p.currentWeightKg,1)} kg`} icon="weight"/><StatCard label="وزن هدف" value={`${formatFa(p.targetWeightKg)} kg`} icon="target"/><StatCard label="میانگین ۷ روزه" value={`${formatFa(movingAverage7(weights)||p.currentWeightKg,1)} kg`} icon="activity"/><StatCard label="پیشرفت مسیر" value={`${formatFa(weightProgress(p.startWeightKg,p.currentWeightKg,p.targetWeightKg))}٪`} icon="progress" progress={weightProgress(p.startWeightKg,p.currentWeightKg,p.targetWeightKg)}/></div>
    <div className="progress-layout section-gap"><article className="card"><span className="kicker">WEIGHT / 14 ENTRIES</span><h2 style={{margin:'2px 0'}}>روند وزن</h2><WeightChart entries={weights} target={p.targetWeightKg}/><div className="macro-strip"><span className="macro-pill"><b>{formatFa(Math.max(0,p.startWeightKg-p.currentWeightKg),1)} kg</b> کاهش کل</span><span className="macro-pill"><b>{formatFa(Math.max(0,p.currentWeightKg-p.targetWeightKg),1)} kg</b> باقی‌مانده</span></div></article><form className="card weight-form" onSubmit={submit}><h3 style={{margin:0}}>ثبت اندازه‌گیری</h3><div className="form-row"><Field label="وزن (kg)"><input className="field-input" type="number" step="0.1" value={weight} onChange={e=>setWeight(e.target.value)}/></Field><Field label="دور کمر (cm)"><input className="field-input" type="number" step="0.1" value={waist} onChange={e=>setWaist(e.target.value)}/></Field></div><Field label="یادداشت"><textarea className="field-input" rows={3} value={note} onChange={e=>setNote(e.target.value)} placeholder="اختیاری"/></Field><button className="primary-btn" type="submit"><Icon name="plus"/> ثبت</button></form></div>
    <div className="section-title"><div><h2>تاریخچه</h2><span>آخرین اندازه‌گیری‌ها</span></div></div><article className="card" style={{overflowX:'auto'}}><table className="weight-table"><thead><tr><th>تاریخ</th><th>وزن</th><th>کمر</th><th>یادداشت</th><th/></tr></thead><tbody>{[...weights].reverse().map(w=><tr key={w.id}><td>{w.date}</td><td>{formatFa(w.weightKg,1)} kg</td><td>{w.waistCm?`${formatFa(w.waistCm,1)} cm`:'—'}</td><td>{w.note||'—'}</td><td>{w.id!=='start'&&<button className="icon-btn btn-sm" onClick={()=>removeWeight(w.id)}><Icon name="trash" size={14}/></button>}</td></tr>)}</tbody></table></article>
  </>
}
