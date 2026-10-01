'use client';
import { DesktopSidebar, MobileBottomNav } from './nav';
import { Icon } from './icons';
import { useFitness } from './fitness-provider';

export function AppShell({children}:{children:React.ReactNode}){
  const {editMode,setEditMode,theme,setTheme}=useFitness();
  return <div className="app-shell">
    <DesktopSidebar/>
    <main className="main-shell">
      <header className="topbar no-print">
        <div className="topbar-title"><span className="eyebrow">FITNESS / CUT · 2026</span><b>FitnessCut</b></div>
        <div className="topbar-actions">
          <button className={editMode?'icon-btn active':'icon-btn'} onClick={()=>setEditMode(!editMode)} title="ویرایش برنامه"><Icon name="edit"/></button>
          <button className="icon-btn" onClick={()=>setTheme(theme==='dark'?'light':'dark')} title="تغییر تم"><Icon name={theme==='dark'?'sun':'moon'}/></button>
        </div>
      </header>
      <div className="content-wrap">{children}</div>
      <MobileBottomNav/>
    </main>
  </div>
}
