'use client';
import { useFitness } from './fitness-provider';
import { Icon } from './icons';

const priorityText={high:'اولویت بالا',medium:'کاربردی',low:'اختیاری / کم‌اولویت'};
export function SupplementGrid(){
  const {program,daily,editMode,updateSupplement,toggleSupplementDone}=useFitness();
  return <div className="supp-grid">{program.supplements.map(s=>{
    const done=!!daily.supplementDone[s.id];
    return <article className="card supp-card" key={s.id}><img src={s.image} alt={s.nameFa}/><div className="supp-body"><div className="supp-head"><div><h3>{s.nameFa}</h3><small>{s.nameEn}</small></div><span className={`priority ${s.priority}`}>{priorityText[s.priority]}</span></div><div className="supp-meta">
      <div><b>مقدار</b>{editMode?<input className="input-mini" value={s.amount} onChange={e=>updateSupplement(s.id,{amount:e.target.value})}/>:<span>{s.amount}</span>}</div>
      <div><b>زمان</b>{editMode?<input className="input-mini" value={s.timing} onChange={e=>updateSupplement(s.id,{timing:e.target.value})}/>:<span>{s.timing}</span>}</div>
      <div><b>هدف</b>{editMode?<input className="input-mini" value={s.purpose} onChange={e=>updateSupplement(s.id,{purpose:e.target.value})}/>:<span>{s.purpose}</span>}</div>
      {s.note&&<div><b>نکته</b><span>{s.note}</span></div>}
    </div><button className={done?'done-btn done':'done-btn'} onClick={()=>toggleSupplementDone(s.id)}><Icon name="check" size={16}/>{done?'امروز انجام شد':'ثبت مصرف امروز'}</button></div></article>
  })}</div>
}
