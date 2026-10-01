'use client';
import { SupplementGrid } from '../../components/supplements';
import { useFitness } from '../../components/fitness-provider';
import { Icon } from '../../components/icons';
export default function SupplementsPage(){
  const {editMode,setEditMode}=useFitness();
  return <><div className="page-headline"><div><span className="kicker">SUPPLEMENTS / EVIDENCE PRIORITY</span><h1>مکمل‌ها</h1><p>کراتین منظم، وی برای تکمیل پروتئین و BCAA/گلوتامین در اولویت پایین‌تر. مکمل جای برنامه غذایی را نمی‌گیرد.</p></div><div className="page-actions"><button className={editMode?'primary-btn':'secondary-btn'} onClick={()=>setEditMode(!editMode)}><Icon name="edit"/> {editMode?'پایان ویرایش':'ویرایش'}</button></div></div><div className="grid-3"><div className="card soft"><b>کراتین</b><div className="stat-value" style={{marginTop:8}}>۳–۵ g</div><span className="stat-sub">هر روز، حتی روز استراحت</span></div><div className="card soft"><b>وی داخل منو</b><div className="stat-value" style={{marginTop:8}}>۶۰ g</div><span className="stat-sub">۲ اسکوپ پودر در روز</span></div><div className="card soft"><b>پایه نتیجه</b><div className="stat-value" style={{marginTop:8,fontSize:20}}>غذا + تمرین + خواب</div><span className="stat-sub">مکمل ابزار کمکی است</span></div></div><div className="section-title"><div><h2>ردیاب روزانه</h2><span>اولویت‌ها به‌صورت بصری تفکیک شده‌اند</span></div></div><SupplementGrid/></>
}
