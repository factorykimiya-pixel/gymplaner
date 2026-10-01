(function(){
  const U=window.FCU;
  const STORAGE='fitnesscut:vanilla:v4';
  const listeners=new Set();
  const freshDaily=()=>({date:U.today(),steps:0,waterMl:0,mealDone:{},supplementDone:{},workoutLogs:{},workoutCompleted:{}});
  const baseState=()=>({program:U.clone(window.FC_DEFAULT_PROGRAM),daily:freshDaily(),weights:[{id:'start',date:U.today(),weightKg:window.FC_DEFAULT_PROGRAM.profile.currentWeightKg,note:'شروع برنامه'}],history:{workouts:[]},theme:'system',editMode:false});
  let state=baseState();
  function migrate(raw){
    const b=baseState();
    if(!raw||typeof raw!=='object')return b;
    const s={...b,...raw,program:{...b.program,...(raw.program||{}),profile:{...b.program.profile,...(raw.program?.profile||{})},workouts:{...b.program.workouts,...(raw.program?.workouts||{})}},history:{...b.history,...(raw.history||{})}};
    if(s.daily?.date!==U.today()){
      const old=s.daily;
      if(old?.workoutLogs){
        Object.entries(old.workoutLogs).forEach(([day,logs])=>{
          if(logs&&Object.keys(logs).length)s.history.workouts.push({date:old.date,day,logs:U.clone(logs)});
        });
      }
      s.daily=freshDaily();
    }
    return s;
  }
  try{const raw=localStorage.getItem(STORAGE);if(raw)state=migrate(JSON.parse(raw));}catch(e){}
  function save(){try{localStorage.setItem(STORAGE,JSON.stringify(state));}catch(e){} listeners.forEach(fn=>fn(state)); applyTheme();}
  function applyTheme(){const t=state.theme;const dark=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=dark?'dark':'light';document.documentElement.style.colorScheme=dark?'dark':'light';}
  function set(mut){state=mut(state)||state;save();}
  const A={
    get:()=>state,subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},
    setEdit(v){set(s=>({...s,editMode:!!v}))},setTheme(v){set(s=>({...s,theme:v}))},
    updateProfile(patch){set(s=>({...s,program:{...s.program,profile:{...s.program.profile,...patch}}}))},
    toggleMeal(id){set(s=>({...s,daily:{...s.daily,mealDone:{...s.daily.mealDone,[id]:!s.daily.mealDone[id]}}}))},
    toggleSupplement(id){set(s=>({...s,daily:{...s.daily,supplementDone:{...s.daily.supplementDone,[id]:!s.daily.supplementDone[id]}}}))},
    setSteps(n){set(s=>({...s,daily:{...s.daily,steps:Math.max(0,Number(n)||0)}}))},setWater(n){set(s=>({...s,daily:{...s.daily,waterMl:Math.max(0,Number(n)||0)}}))},
    updateFood(mealId,foodId,patch){set(s=>({...s,program:{...s.program,meals:s.program.meals.map(m=>m.id!==mealId?m:{...m,foods:m.foods.map(f=>f.id===foodId?{...f,...patch}:f)})}}))},
    updateFoodGrams(mealId,foodId,grams){set(s=>({...s,program:{...s.program,meals:s.program.meals.map(m=>m.id!==mealId?m:{...m,foods:m.foods.map(f=>f.id===foodId?U.scaleFood(f,grams):f)})}}))},
    addFood(mealId){set(s=>({...s,program:{...s.program,meals:s.program.meals.map(m=>m.id!==mealId?m:{...m,foods:[...m.foods,{id:U.id('food'),name:'خوراکی جدید',grams:100,household:'۱ واحد',macros:{calories:100,protein:0,carbs:0,fat:0}}]})}}))},
    duplicateFood(mealId,foodId){set(s=>({...s,program:{...s.program,meals:s.program.meals.map(m=>{if(m.id!==mealId)return m;const f=m.foods.find(x=>x.id===foodId);return f?{...m,foods:[...m.foods,{...U.clone(f),id:U.id('food'),name:`${f.name} (کپی)`}]}:m})}}))},
    removeFood(mealId,foodId){set(s=>({...s,program:{...s.program,meals:s.program.meals.map(m=>m.id!==mealId?m:{...m,foods:m.foods.filter(f=>f.id!==foodId)})}}))},
    setOliveOilMode(mode){mode=Number(mode)===2?2:1;set(s=>{const meals=U.clone(s.program.meals),l=meals.find(m=>m.id==='lunch'),d=meals.find(m=>m.id==='dinner');if(l&&d){const rice=l.foods.find(f=>f.id==='rice'),od=d.foods.find(f=>f.id==='olive-dinner');if(rice){const g=mode===1?135:105;rice.grams=g;rice.household=mode===1?'۹ قاشق غذاخوری سرپُر':'حدود ۷ قاشق غذاخوری';rice.macros={calories:U.round1((176/135)*g),protein:U.round1((3.6/135)*g),carbs:U.round1((38/135)*g),fat:U.round1((.4/135)*g)}}if(od){od.grams=mode===2?4.5:0;od.household=mode===2?'۱ قاشق چای‌خوری':'در حالت پایه بدون روغن';od.macros=mode===2?{calories:40,protein:0,carbs:0,fat:4.5}:{calories:0,protein:0,carbs:0,fat:0}}}return {...s,program:{...s.program,oliveOilMode:mode,meals}}})},
    updateSupplement(id,patch){set(s=>({...s,program:{...s.program,supplements:s.program.supplements.map(x=>x.id===id?{...x,...patch}:x)}}))},
    updateExercise(day,id,patch){set(s=>{const w=U.clone(s.program.workouts[day]);const upd=arr=>arr.map(x=>x.id===id?{...x,...patch}:x);w.exercises=upd(w.exercises);w.accessory=upd(w.accessory);return {...s,program:{...s.program,workouts:{...s.program.workouts,[day]:w}}}})},
    addExercise(day){set(s=>{const w=U.clone(s.program.workouts[day]);w.exercises.push({id:U.id('exercise'),nameFa:'حرکت جدید',nameEn:'Custom Exercise',muscleGroup:'سفارشی',equipment:'',sets:3,repMin:8,repMax:12,restSec:90,rirMin:1,rirMax:3,instructions:'توضیحات اجرای حرکت را وارد کنید.'});return {...s,program:{...s.program,workouts:{...s.program.workouts,[day]:w}}}})},
    removeExercise(day,id){set(s=>{const w=U.clone(s.program.workouts[day]);w.exercises=w.exercises.filter(x=>x.id!==id);w.accessory=w.accessory.filter(x=>x.id!==id);return {...s,program:{...s.program,workouts:{...s.program.workouts,[day]:w}}}})},
    updateCardio(day,patch){set(s=>{const w=U.clone(s.program.workouts[day]);w.cardio={...w.cardio,...patch};return {...s,program:{...s.program,workouts:{...s.program.workouts,[day]:w}}}})},
    updateSetLog(day,exerciseId,index,patch){set(s=>{const workoutLogs=U.clone(s.daily.workoutLogs||{}),dayLog=workoutLogs[day]||{},arr=dayLog[exerciseId]||[];while(arr.length<=index)arr.push({weightKg:null,reps:null,done:false});arr[index]={...arr[index],...patch};dayLog[exerciseId]=arr;workoutLogs[day]=dayLog;return {...s,daily:{...s.daily,workoutLogs}}})},
    finishWorkout(day){set(s=>{const logs=U.clone(s.daily.workoutLogs?.[day]||{}),history=U.clone(s.history);if(Object.keys(logs).length)history.workouts.push({date:U.today(),day,logs});return {...s,history,daily:{...s.daily,workoutCompleted:{...s.daily.workoutCompleted,[day]:true}}}})},
    previousSets(day,exerciseId){const h=[...(state.history.workouts||[])].reverse().find(x=>x.day===day&&x.logs?.[exerciseId]);return h?.logs?.[exerciseId]||[]},
    addWeight(entry){const e={id:U.id('weight'),...entry,weightKg:Number(entry.weightKg),waistCm:entry.waistCm?Number(entry.waistCm):undefined};set(s=>({...s,weights:[...s.weights,e],program:{...s.program,profile:{...s.program.profile,currentWeightKg:e.weightKg}}}))},
    removeWeight(id){set(s=>{const weights=s.weights.filter(x=>x.id!==id);const last=[...weights].sort((a,b)=>a.date.localeCompare(b.date)).at(-1);return {...s,weights,program:{...s.program,profile:{...s.program.profile,currentWeightKg:last?.weightKg??s.program.profile.startWeightKg}}}})},
    export(){U.downloadJson('fitnesscut-backup.json',state)},
    async import(file){try{const raw=JSON.parse(await file.text());if(!raw?.program?.profile||!raw?.program?.workouts)throw new Error('bad');state=migrate(raw);save();return {ok:true,message:'پشتیبان با موفقیت بازیابی شد.'}}catch(e){return {ok:false,message:'فایل پشتیبان معتبر نیست.'}}},
    reset(){state=baseState();save()},
    resetDaily(){set(s=>({...s,daily:freshDaily()}))}
  };
  window.FCState=A;applyTheme();
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{if(state.theme==='system')applyTheme()});
})();
