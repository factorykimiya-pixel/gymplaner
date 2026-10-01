'use client';
import { ChangeEvent, useRef, useState } from 'react';
import { useFitness } from './fitness-provider';
import { Icon } from './icons';
import { Field, Modal } from './ui';
import { InstallAppButton } from './install-app';
import type { ThemeMode } from '../lib/types';

export function SettingsView(){
  const {program,theme,setTheme,editMode,setEditMode,updateProfile,exportBackup,importBackup,resetProgram}=useFitness();
  const p=program.profile; const fileRef=useRef<HTMLInputElement>(null); const [confirmReset,setConfirmReset]=useState(false); const [toast,setToast]=useState('');
  const importFile=async(e:ChangeEvent<HTMLInputElement>)=>{const f=e.target.files?.[0];if(!f)return;const r=await importBackup(f);setToast(r.message);setTimeout(()=>setToast(''),2500);e.target.value=''};
  const num=(k:keyof typeof p,v:string)=>updateProfile({[k]:Number(v)} as any);
  return <>
    <div className="settings-grid">
      <article className="card settings-card"><h3>پروفایل و هدف</h3><div className="settings-list">
        <div className="setting-row"><label>وزن فعلی<strong>کیلوگرم</strong></label><input className="field-input" type="number" step="0.1" value={p.currentWeightKg} onChange={e=>num('currentWeightKg',e.target.value)}/></div>
        <div className="setting-row"><label>وزن هدف<strong>کیلوگرم</strong></label><input className="field-input" type="number" step="0.1" value={p.targetWeightKg} onChange={e=>num('targetWeightKg',e.target.value)}/></div>
        <div className="setting-row"><label>سن<strong>سال</strong></label><input className="field-input" type="number" value={p.age} onChange={e=>num('age',e.target.value)}/></div>
        <div className="setting-row"><label>قد<strong>سانتی‌متر</strong></label><input className="field-input" type="number" value={p.heightCm} onChange={e=>num('heightCm',e.target.value)}/></div>
        <div className="setting-row"><label>فعالیت روزانه<strong>شغل کم‌تحرک</strong></label><select className="field-select" value={p.activityLevel} onChange={e=>updateProfile({activityLevel:e.target.value as any})}><option value="low">کم</option><option value="moderate">متوسط</option><option value="high">زیاد</option></select></div>
      </div></article>
      <article className="card settings-card"><h3>اهداف روزانه</h3><div className="settings-list">
        <div className="setting-row"><label>کالری<strong>kcal</strong></label><input className="field-input" type="number" value={p.calorieTarget} onChange={e=>num('calorieTarget',e.target.value)}/></div>
        <div className="setting-row"><label>پروتئین<strong>گرم</strong></label><input className="field-input" type="number" value={p.proteinTarget} onChange={e=>num('proteinTarget',e.target.value)}/></div>
        <div className="setting-row"><label>کربوهیدرات<strong>گرم</strong></label><input className="field-input" type="number" value={p.carbTarget} onChange={e=>num('carbTarget',e.target.value)}/></div>
        <div className="setting-row"><label>چربی<strong>گرم</strong></label><input className="field-input" type="number" value={p.fatTarget} onChange={e=>num('fatTarget',e.target.value)}/></div>
        <div className="setting-row"><label>قدم روزانه<strong>قدم</strong></label><input className="field-input" type="number" value={p.stepTarget} onChange={e=>num('stepTarget',e.target.value)}/></div>
        <div className="setting-row"><label>آب روزانه<strong>میلی‌لیتر</strong></label><input className="field-input" type="number" value={p.waterTargetMl} onChange={e=>num('waterTargetMl',e.target.value)}/></div>
      </div></article>
      <article className="card settings-card"><h3>ظاهر و ویرایش</h3><div className="settings-list">
        <div className="setting-row"><label>تم برنامه<strong>روشن / تاریک / سیستم</strong></label><select className="field-select" value={theme} onChange={e=>setTheme(e.target.value as ThemeMode)}><option value="system">سیستم</option><option value="light">روشن</option><option value="dark">تاریک</option></select></div>
        <div className="setting-row"><label>حالت ویرایش<strong>تغییر برنامه از داخل رابط</strong></label><button className={editMode?'primary-btn':'secondary-btn'} onClick={()=>setEditMode(!editMode)}><Icon name="edit"/>{editMode?'فعال':'غیرفعال'}</button></div>
      </div></article>
      <article className="card settings-card"><h3>پشتیبان، چاپ و PWA</h3><div className="settings-list"><button className="secondary-btn" onClick={exportBackup}><Icon name="download"/> خروجی پشتیبان JSON</button><button className="secondary-btn" onClick={()=>fileRef.current?.click()}><Icon name="upload"/> بازیابی پشتیبان</button><input ref={fileRef} type="file" accept="application/json" hidden onChange={importFile}/><InstallAppButton/><button className="secondary-btn" onClick={()=>window.print()}><Icon name="print"/> چاپ برنامه A4</button><button className="danger-btn" onClick={()=>setConfirmReset(true)}><Icon name="reset"/> بازگشت به برنامه اصلی</button></div></article>
    </div>
    <div className="section-title"><div><h2>بررسی داده برنامه</h2><span>هشدارهای منبع به‌جای تغییر خاموش اعداد</span></div></div><div style={{display:'grid',gap:8}}>{program.validationNotes.map((n,i)=><div className="validation-note" key={i}><Icon name="info" size={16}/><span>{n}</span></div>)}</div>
    {confirmReset&&<Modal title="بازگشت به برنامه اصلی" onClose={()=>setConfirmReset(false)}><p>تمام تغییرات محلی، لاگ تمرین و تنظیمات بازنشانی می‌شوند. قبل از ادامه می‌توانی پشتیبان JSON بگیری.</p><div className="page-actions"><button className="danger-btn" onClick={()=>{resetProgram();setConfirmReset(false)}}>بله، بازنشانی کن</button><button className="secondary-btn" onClick={()=>setConfirmReset(false)}>انصراف</button></div></Modal>}
    {toast&&<div className="toast">{toast}</div>}
  </>
}
