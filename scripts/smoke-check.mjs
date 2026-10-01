import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const must=[
  'package.json','next.config.ts','tsconfig.json','app/layout.tsx','app/page.tsx','app/globals.css',
  'components/fitness-provider.tsx','components/workout.tsx','components/nutrition.tsx','data/default-program.ts',
  'public/manifest.webmanifest','public/sw.js','public/icons/icon-192.png','public/icons/icon-512.png'
];
let ok=true;
for(const rel of must){ const p=path.join(root,rel); if(!fs.existsSync(p)){console.error('MISSING',rel);ok=false} }
const assets=fs.readdirSync(path.join(root,'public/assets'));
if(assets.length<20){console.error('Too few assets',assets.length);ok=false}
const data=fs.readFileSync(path.join(root,'data/default-program.ts'),'utf8');
for(const token of ['1815','پرس بالا سینه دمبل','شراگ دمبل','هک اسکوات','روغن زیتون','BCAA']){
  if(!data.includes(token)){console.error('Missing program token:',token);ok=false}
}
console.log(`Assets: ${assets.length}`);
console.log(ok?'Smoke check passed.':'Smoke check failed.');
process.exit(ok?0:1);
