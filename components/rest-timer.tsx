'use client';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './icons';

export function RestTimer({initial=90,onClose}:{initial?:number;onClose:()=>void}){
  const [seconds,setSeconds]=useState(initial); const [running,setRunning]=useState(true); const ref=useRef<number|undefined>(undefined);
  useEffect(()=>{if(running){ref.current=window.setInterval(()=>setSeconds(s=>Math.max(0,s-1)),1000)}return()=>clearInterval(ref.current)},[running]);
  useEffect(()=>{if(seconds===0)setRunning(false)},[seconds]);
  const mm=String(Math.floor(seconds/60)).padStart(2,'0'), ss=String(seconds%60).padStart(2,'0');
  return <div className="timer-float"><Icon name="timer"/><b>{mm}:{ss}</b><div className="timer-actions"><button onClick={()=>setRunning(!running)}><Icon name={running?'pause':'play'} size={17}/></button><button className="plus30" onClick={()=>setSeconds(s=>s+30)}>+۳۰ ث</button><button onClick={onClose}><Icon name="close" size={17}/></button></div></div>
}
