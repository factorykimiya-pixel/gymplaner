'use client';
import React from 'react';
import { Icon } from './icons';

export function SectionTitle({title,meta,action}:{title:string;meta?:string;action?:React.ReactNode}){
  return <div className="section-title"><div><h2>{title}</h2>{meta&&<span>{meta}</span>}</div>{action}</div>
}

export function StatCard({label,value,sub,icon,progress}:{label:string;value:string;sub?:string;icon:Parameters<typeof Icon>[0]['name'];progress?:number}){
  return <div className="card stat-card"><div className="stat-head"><span>{label}</span><span className="stat-icon"><Icon name={icon}/></span></div><div><div className="stat-value">{value}</div>{sub&&<div className="stat-sub">{sub}</div>}</div>{typeof progress==='number'&&<div className="progress-track"><div className="progress-fill" style={{width:`${Math.max(0,Math.min(100,progress))}%`}}/></div>}</div>
}

export function ProgressRing({value,label,sub}:{value:number;label:string;sub?:string}){
  return <div className="ring" style={{'--p':Math.max(0,Math.min(100,value))} as React.CSSProperties}><div><b>{Math.round(value)}٪</b><small>{label}</small>{sub&&<small>{sub}</small>}</div></div>
}

export function Field({label,children}:{label:string;children:React.ReactNode}){return <div className="field"><label>{label}</label>{children}</div>}

export function Modal({title,onClose,children}:{title:string;onClose:()=>void;children:React.ReactNode}){
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.currentTarget===e.target)onClose()}}><div className="modal"><div className="modal-head"><h3>{title}</h3><button className="icon-btn" onClick={onClose}><Icon name="close"/></button></div>{children}</div></div>
}
