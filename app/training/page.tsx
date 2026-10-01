'use client';
import Link from 'next/link';
import { useFitness } from '../../components/fitness-provider';
import { Icon } from '../../components/icons';
import type { WorkoutId } from '../../lib/types';
export default function TrainingPage(){
  const {program}=useFitness();
  const ids:WorkoutId[]=['push','pull','legs'];
  return <><div className="page-headline"><div><span className="kicker">TRAINING / PPL</span><h1>تمرین</h1><p>سه جلسه در هفته؛ ساعد و کول داخل PUSH/PULL و هوازی داخل هر روز تمرینی ادغام شده‌اند.</p></div></div><div className="grid-3">{ids.map(id=>{const w=program.workouts[id];return <Link href={`/training/${id}/`} key={id} className="card" style={{minHeight:250,display:'flex',flexDirection:'column',justifyContent:'space-between',overflow:'hidden',position:'relative'}}><div><span className="kicker">{w.title}</span><h2 style={{fontSize:32,margin:'4px 0'}}>{w.title}</h2><p style={{color:'var(--muted)'}}>{w.subtitle}</p><div className="chip-row"><span className="chip">{w.exercises.length} حرکت اصلی</span><span className="chip">{w.duration}</span><span className="chip">{w.cardio.durationMin}–{w.cardio.durationMax} دقیقه هوازی</span></div></div><span className="primary-btn" style={{width:'fit-content'}}><Icon name="play"/> باز کردن تمرین</span></Link>})}</div></>
}
