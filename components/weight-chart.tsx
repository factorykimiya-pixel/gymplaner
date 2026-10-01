'use client';
import type { WeightEntry } from '../lib/types';

export function WeightChart({entries,target=68}:{entries:WeightEntry[];target?:number}){
  const data=[...entries].sort((a,b)=>a.date.localeCompare(b.date)).slice(-14);
  if(!data.length) return <div className="empty">هنوز داده‌ای ثبت نشده است.</div>;
  const vals=data.map(x=>x.weightKg); const max=Math.max(...vals,target)+1; const min=Math.min(...vals,target)-1;
  const W=720,H=180,pad=18; const span=Math.max(1,max-min);
  const pts=data.map((d,i)=>({x:pad+(i*(W-pad*2))/Math.max(1,data.length-1),y:pad+((max-d.weightKg)/span)*(H-pad*2)}));
  const path=pts.map((p,i)=>`${i?'L':'M'}${p.x},${p.y}`).join(' ');
  const area=`${path} L${pts[pts.length-1].x},${H-pad} L${pts[0].x},${H-pad} Z`;
  const targetY=pad+((max-target)/span)*(H-pad*2);
  return <div className="weight-mini-chart"><svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label="نمودار روند وزن">
    <defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#26b98b"/><stop offset="1" stopColor="#26b98b" stopOpacity="0"/></linearGradient></defs>
    <g className="chart-grid"><line x1={pad} y1={H*.35} x2={W-pad} y2={H*.35}/><line x1={pad} y1={H*.67} x2={W-pad} y2={H*.67}/><line x1={pad} y1={targetY} x2={W-pad} y2={targetY} strokeDasharray="5 5"/></g>
    <path className="chart-area" d={area}/><path className="chart-line" d={path}/>
    {pts.map((p,i)=><circle className="chart-dot" cx={p.x} cy={p.y} r="4" key={i}/>)}
  </svg></div>
}
