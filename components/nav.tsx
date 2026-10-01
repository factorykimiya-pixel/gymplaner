'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from './icons';

const main=[
  {href:'/',label:'خانه',icon:'home' as const},
  {href:'/training/',label:'تمرین',icon:'training' as const},
  {href:'/nutrition/',label:'تغذیه',icon:'nutrition' as const},
  {href:'/progress/',label:'پیشرفت',icon:'progress' as const},
  {href:'/settings/',label:'تنظیمات',icon:'settings' as const},
];
const desktop=[
  ...main.slice(0,1),
  {href:'/training/push/',label:'PUSH',icon:'training' as const},
  {href:'/training/pull/',label:'PULL',icon:'training' as const},
  {href:'/training/legs/',label:'LEGS',icon:'training' as const},
  {href:'/nutrition/',label:'تغذیه',icon:'nutrition' as const},
  {href:'/supplements/',label:'مکمل‌ها',icon:'supplements' as const},
  {href:'/progress/',label:'پیشرفت',icon:'progress' as const},
  {href:'/settings/',label:'تنظیمات',icon:'settings' as const},
];
export function DesktopSidebar(){
  const path=usePathname();
  return <aside className="sidebar">
    <Link href="/" className="brand"><span className="brand-mark">FC</span><div><b>FitnessCut</b><small>80 → 68 kg</small></div></Link>
    <nav className="side-nav">{desktop.map(item=>{
      const active=item.href==='/'?path==='/':path.startsWith(item.href);
      return <Link className={active?'nav-item active':'nav-item'} key={item.href} href={item.href}><Icon name={item.icon}/><span>{item.label}</span></Link>
    })}</nav>
    <div className="side-note"><span>برنامه شخصی کات</span><b>۳ روز PPL</b><small>فعالیت روزانه کم</small></div>
  </aside>
}
export function MobileBottomNav(){
  const path=usePathname();
  return <nav className="mobile-nav">{main.map(item=>{
    const active=item.href==='/'?path==='/':path.startsWith(item.href);
    return <Link className={active?'mobile-nav-item active':'mobile-nav-item'} key={item.href} href={item.href}><Icon name={item.icon} size={21}/><span>{item.label}</span></Link>
  })}</nav>
}
