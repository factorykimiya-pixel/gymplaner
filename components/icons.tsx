import React from 'react';

type IconName = 'home'|'training'|'nutrition'|'progress'|'settings'|'supplements'|'edit'|'check'|'chevron'|'timer'|'download'|'upload'|'print'|'moon'|'sun'|'water'|'steps'|'weight'|'fire'|'target'|'plus'|'trash'|'copy'|'close'|'play'|'pause'|'reset'|'menu'|'activity'|'info'|'calendar'|'sparkle';

export function Icon({name,size=20,className=''}:{name:IconName,size?:number,className?:string}){
  const common={width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.9,strokeLinecap:'round' as const,strokeLinejoin:'round' as const,className,'aria-hidden':true};
  const paths:Record<IconName,React.ReactNode>={
    home:<><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-5h5v5"/></>,
    training:<><path d="M6 7v10M18 7v10M3.5 9.5v5M20.5 9.5v5M6 12h12"/></>,
    nutrition:<><path d="M7 3v8M4.5 3v5a2.5 2.5 0 0 0 5 0V3M7 11v10M15 3v18M15 3c3 1 4.5 4.5 4.5 7H15"/></>,
    progress:<><path d="M4 19V9M10 19V5M16 19v-7M22 19V3"/><path d="M2 21h20"/></>,
    settings:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.86 2.86-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21H9.6v-.1A1.7 1.7 0 0 0 8 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.86-2.86.06-.06A1.7 1.7 0 0 0 3.6 15a1.7 1.7 0 0 0-1.5-1H2v-4h.1A1.7 1.7 0 0 0 3.6 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.86-2.86.06.06A1.7 1.7 0 0 0 8 4.6a1.7 1.7 0 0 0 1-1.5V3h4v.1A1.7 1.7 0 0 0 14 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.86 2.86-.06.06A1.7 1.7 0 0 0 18.4 9a1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></>,
    supplements:<><rect x="4" y="8" width="16" height="8" rx="4"/><path d="m8 8 8 8"/></>,
    edit:<><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></>,
    check:<path d="m5 12 4 4L19 6"/>,
    chevron:<path d="m9 18 6-6-6-6"/>,
    timer:<><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/></>,
    download:<><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></>,
    upload:<><path d="M12 21V9M7 14l5-5 5 5"/><path d="M5 3h14"/></>,
    print:<><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/></>,
    moon:<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8Z"/>,
    sun:<><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>,
    water:<><path d="M12 2s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12Z"/><path d="M9 15c.7 1.3 1.7 2 3 2"/></>,
    steps:<><path d="M14 4c0 2-1 3-2 4s-2 3-1 5c1 2 4 2 6 1s4-1 5 1c1 2-1 4-3 5"/><ellipse cx="7" cy="5" rx="2.5" ry="3.5"/><ellipse cx="5" cy="13" rx="2.5" ry="3.5"/></>,
    weight:<><path d="M7 7a5 5 0 0 1 10 0"/><rect x="4" y="6" width="16" height="14" rx="3"/><path d="M9 10h6"/></>,
    fire:<path d="M12 22c4.4 0 8-3.1 8-7.3 0-2.4-1.1-4.7-3.4-6.9.2 2.4-1 3.4-2.2 3.8.3-4-1.8-7-5-9.6.2 3.7-1.6 5.8-3.2 7.8C4.9 11.5 4 13.2 4 15c0 4 3.6 7 8 7Z"/>,
    target:<><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M18 6 22 2M18 2h4v4"/></>,
    plus:<path d="M12 5v14M5 12h14"/>,
    trash:<><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"/></>,
    copy:<><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
    close:<path d="M6 6l12 12M18 6 6 18"/>,
    play:<path d="m8 5 11 7-11 7Z"/>,
    pause:<><path d="M9 5v14M15 5v14"/></>,
    reset:<><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></>,
    menu:<><path d="M4 6h16M4 12h16M4 18h16"/></>,
    activity:<path d="M3 12h4l2-6 4 12 2-6h6"/>,
    info:<><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></>,
    calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    sparkle:<><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2Z"/><path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7Z"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}
