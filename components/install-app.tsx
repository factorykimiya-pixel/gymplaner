'use client';
import { useEffect, useState } from 'react';
import { Icon } from './icons';

type PromptEvent = Event & { prompt:()=>Promise<void>; userChoice:Promise<{outcome:'accepted'|'dismissed'}> };
export function InstallAppButton(){
  const [prompt,setPrompt]=useState<PromptEvent|null>(null);
  const [ios,setIos]=useState(false);
  useEffect(()=>{
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
    const h=(e:Event)=>{e.preventDefault();setPrompt(e as PromptEvent)};
    window.addEventListener('beforeinstallprompt',h);
    return()=>window.removeEventListener('beforeinstallprompt',h);
  },[]);
  const install=async()=>{
    if(prompt){await prompt.prompt(); await prompt.userChoice; setPrompt(null); return;}
    if(ios){alert('در Safari روی Share بزن و سپس Add to Home Screen را انتخاب کن.');return;}
    alert('اگر مرورگر گزینه نصب را نمایش نمی‌دهد، از منوی مرورگر Install app / Add to Home Screen را انتخاب کن.');
  };
  return <button className="secondary-btn" onClick={install}><Icon name="download"/> نصب برنامه</button>
}
