'use client';
import { MealsEditor, NutritionSummary, OliveOilMode } from '../../components/nutrition';
import { useFitness } from '../../components/fitness-provider';
import { Icon } from '../../components/icons';
export default function NutritionPage(){
  const {editMode,setEditMode}=useFitness();
  return <><div className="page-headline"><div><span className="kicker">NUTRITION / LIVE MACROS</span><h1>تغذیه</h1><p>پنج وعده با مرغ به‌عنوان منبع گوشتی اصلی، دو اسکوپ وی، معادل خانگی و محاسبه زنده کالری و درشت‌مغذی‌ها.</p></div><div className="page-actions"><button className={editMode?'primary-btn':'secondary-btn'} onClick={()=>setEditMode(!editMode)}><Icon name="edit"/> {editMode?'پایان ویرایش':'ویرایش برنامه'}</button></div></div><NutritionSummary/><div className="section-gap"><OliveOilMode/></div><div className="section-title"><div><h2>وعده‌های امروز</h2><span>برای ثبت مصرف، تیک کنار هر وعده را بزن</span></div></div><MealsEditor/></>
}
