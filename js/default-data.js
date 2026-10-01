(function(){
  const m=(calories,protein,carbs,fat)=>({calories,protein,carbs,fat});
  window.FC_DEFAULT_PROGRAM={
    version:4,
    profile:{
      name:'FitnessCut',gender:'male',age:22,heightCm:173,startWeightKg:80,currentWeightKg:80,targetWeightKg:68,
      experienceYears:3,trainingDaysPerWeek:3,activityLevel:'low',calorieTarget:1815,proteinTarget:185,carbTarget:175,fatTarget:40,stepTarget:8000,waterTargetMl:3000
    },
    oliveOilMode:1,
    meals:[
      {id:'breakfast',title:'صبحانه',time:'۷ تا ۹ صبح',image:'assets/meal-breakfast.jpg',foods:[
        {id:'whole-eggs',name:'تخم‌مرغ کامل',grams:100,household:'۲ عدد',macros:m(144,12.6,.7,9.5)},
        {id:'egg-whites',name:'سفیده تخم‌مرغ',grams:100,household:'۳ عدد',macros:m(51,10.8,.7,.2)},
        {id:'oats',name:'جو دوسر',grams:30,household:'۳ قاشق غذاخوری سرپُر',macros:m(114,3.8,19,2.3)},
        {id:'milk',name:'شیر کم‌چرب',grams:200,household:'۱ لیوان',macros:m(94,6.8,9.6,3)},
        {id:'apple',name:'سیب سبز کوچک',grams:100,household:'۱ عدد',macros:m(52,.3,14,.2)}
      ]},
      {id:'preworkout',title:'میان‌وعده قبل تمرین',time:'۶۰ تا ۹۰ دقیقه قبل',image:'assets/meal-preworkout.jpg',foods:[
        {id:'whey-pre',name:'پروتئین وی',grams:30,household:'۱ اسکوپ',macros:m(120,24,3,2)},
        {id:'rice-cakes',name:'رایس‌کیک',grams:18,household:'۲ عدد',macros:m(70,1.5,15,.5)},
        {id:'banana',name:'موز کوچک',grams:70,household:'۱ عدد کوچک یا نصف موز بزرگ',macros:m(62,.8,16,.2)}
      ]},
      {id:'lunch',title:'ناهار',time:'۲ تا ۴ بعدازظهر',image:'assets/meal-lunch.jpg',foods:[
        {id:'chicken-lunch',name:'سینه مرغ بدون پوست، پخته',grams:140,household:'۱ تکه متوسط',macros:m(231,43.4,0,5)},
        {id:'rice',name:'برنج پخته',grams:135,household:'۹ قاشق غذاخوری سرپُر',macros:m(176,3.6,38,.4)},
        {id:'salad',name:'سالاد بدون سس',grams:250,household:'۲ کاسه کوچک',macros:m(60,3,12,.5)},
        {id:'olive-lunch',name:'روغن زیتون',grams:4.5,household:'۱ قاشق چای‌خوری',macros:m(40,0,0,4.5)}
      ]},
      {id:'snack',title:'میان‌وعده عصر',time:'متناسب با ساعت کار',image:'assets/meal-snack.jpg',foods:[
        {id:'greek-yogurt',name:'ماست یونانی کم‌چرب',grams:150,household:'حدود ¾ لیوان',macros:m(90,15,6,0)},
        {id:'whey-snack',name:'پروتئین وی با آب',grams:30,household:'۱ اسکوپ',macros:m(120,24,3,2)}
      ]},
      {id:'dinner',title:'شام',time:'۲ تا ۳ ساعت پیش از خواب',image:'assets/meal-dinner.jpg',foods:[
        {id:'chicken-dinner',name:'سینه مرغ بدون پوست، پخته',grams:120,household:'۱ تکه متوسط',macros:m(198,37,0,4.3)},
        {id:'pasta',name:'پاستای پخته',grams:80,household:'۵ تا ۶ قاشق غذاخوری',macros:m(126,4.6,25,.8)},
        {id:'vegetables',name:'سبزیجات خردشده/پخته',grams:250,household:'۲ لیوان',macros:m(70,4,14,.5)},
        {id:'olive-dinner',name:'روغن زیتون',grams:0,household:'در حالت پایه بدون روغن',macros:m(0,0,0,0),optional:true}
      ]}
    ],
    supplements:[
      {id:'creatine',nameFa:'کراتین مونوهیدرات',nameEn:'Creatine Monohydrate',image:'assets/supp-creatine.jpg',priority:'high',amount:'۳ تا ۵ گرم هر روز',timing:'هر زمان ثابت، حتی روز استراحت',purpose:'کمک به عملکرد و حفظ قدرت در دوره کات',note:'تداوم مصرف مهم‌تر از زمان مصرف است.'},
      {id:'whey',nameFa:'پروتئین وی',nameEn:'Whey Protein',image:'assets/supp-whey.jpg',priority:'medium',amount:'۲ اسکوپ در منوی غذایی؛ جمعاً ۶۰ گرم پودر',timing:'۱ اسکوپ قبل تمرین + ۱ اسکوپ میان‌وعده عصر',purpose:'تکمیل پروتئین روزانه در کنار غذا',note:'این دو اسکوپ در کالری منو محاسبه شده‌اند.'},
      {id:'bcaa',nameFa:'BCAA',nameEn:'Branched-Chain Amino Acids',image:'assets/supp-bcaa.jpg',priority:'low',amount:'دوز روتین توصیه نمی‌شود',timing:'در صورت پروتئین کافی نیاز نیست',purpose:'مزیت افزوده قابل‌توجهی نسبت به پروتئین کامل انتظار نمی‌رود'},
      {id:'glutamine',nameFa:'گلوتامین',nameEn:'Glutamine',image:'assets/supp-glutamine.jpg',priority:'low',amount:'اختیاری؛ در صورت مصرف ۵ گرم',timing:'زمان تعیین‌کننده نیست',purpose:'شواهد برای بهبود عملکرد یا کاهش چربی محدود است'}
    ],
    workouts:{
      push:{id:'push',title:'PUSH',subtitle:'سینه · سرشانه · پشت بازو · ساعد',duration:'۷۵ تا ۹۰ دقیقه',focus:['سینه','سرشانه','پشت بازو','ساعد'],exercises:[
        {id:'push-incline-press',nameFa:'پرس بالا سینه دمبل',nameEn:'Incline Dumbbell Press',muscleGroup:'سینه بالایی',equipment:'دمبل و نیمکت',image:'assets/push-incline-press.jpg',sets:3,repMin:6,repMax:10,restSec:165,rirMin:1,rirMax:3,instructions:'نیمکت را ۳۰ تا ۴۵ درجه تنظیم کن، کتف‌ها عقب و پایین. دمبل را تا کنار بالای سینه پایین بیاور و بدون ضربه پرس کن.'},
        {id:'push-machine-press',nameFa:'پرس سینه دستگاه',nameEn:'Machine Chest Press',muscleGroup:'سینه',equipment:'دستگاه',image:'assets/push-machine-press.jpg',sets:3,repMin:8,repMax:12,restSec:135,rirMin:1,rirMax:3,instructions:'پشتی و صندلی را طوری تنظیم کن که دستگیره هم‌سطح سینه باشد؛ پرس کن و برگشت را آهسته کنترل کن.'},
        {id:'push-cable-fly',nameFa:'فلای سینه سیم‌کش',nameEn:'Cable Chest Fly',muscleGroup:'سینه',equipment:'کابل',image:'assets/push-cable-fly.jpg',sets:2,repMin:10,repMax:15,restSec:80,rirMin:1,rirMax:3,instructions:'آرنج کمی خم و ثابت؛ دست‌ها را در مسیر قوسی جلوی سینه نزدیک کن و بدون تاب‌دادن برگرد.'},
        {id:'push-lateral-raise',nameFa:'نشر جانب دمبل یا سیم‌کش',nameEn:'Lateral Raise',muscleGroup:'سرشانه میانی',equipment:'دمبل یا کابل',image:'assets/push-lateral-raise.jpg',sets:3,repMin:12,repMax:20,restSec:75,rirMin:1,rirMax:3,instructions:'دست‌ها کمی خم؛ تا نزدیک ارتفاع شانه بالا بیاور. تنه را تاب نده و شانه را بالا نکش.'},
        {id:'push-overhead-triceps',nameFa:'پشت بازو سیم‌کش بالای سر',nameEn:'Overhead Triceps Extension',muscleGroup:'پشت بازو',equipment:'کابل',image:'assets/push-overhead-triceps.jpg',sets:2,repMin:10,repMax:15,restSec:80,rirMin:1,rirMax:3,instructions:'آرنج رو به جلو و تا حد ممکن ثابت؛ ساعد را صاف کن و کشش ملایم پشت بازو را حفظ کن.'},
        {id:'push-pushdown',nameFa:'پشت بازو سیم‌کش از بالا',nameEn:'Triceps Pushdown',muscleGroup:'پشت بازو',equipment:'کابل',image:'assets/push-pushdown.jpg',sets:2,repMin:10,repMax:15,restSec:75,rirMin:1,rirMax:3,instructions:'آرنج‌ها چسبیده به تنه؛ طناب را پایین ببر، یک مکث کوتاه و برگشت کنترل‌شده داشته باش.'}
      ],accessory:[
        {id:'reverse-wrist-curl',nameFa:'بازکردن مچ · پشت ساعد',nameEn:'Reverse Wrist Curl',muscleGroup:'پشت ساعد',equipment:'دمبل',sets:2,repMin:15,repMax:20,restSec:60,rirMin:2,rirMax:3,instructions:'ساعد تکیه‌داده و کف دست رو به پایین؛ پشت دست را آرام بالا بیاور و آرنج ثابت بماند.'},
        {id:'pronation-supination',nameFa:'چرخش ساعد',nameEn:'Pronation / Supination',muscleGroup:'ساعد',equipment:'دمبل سبک',sets:1,repMin:12,repMax:12,restSec:45,rirMin:3,rirMax:4,instructions:'آرنج ۹۰ درجه کنار بدن؛ با دمبل خیلی سبک، کف دست را آرام رو به بالا و پایین بچرخان.'},
        {id:'radial-ulnar',nameFa:'حرکت کناره‌های مچ',nameEn:'Radial / Ulnar Deviation',muscleGroup:'ساعد',equipment:'دمبل سبک',sets:1,repMin:12,repMax:12,restSec:45,rirMin:3,rirMax:4,instructions:'ساعد روی میز؛ مچ را بدون پیچاندن آرنج به سمت شست و انگشت کوچک حرکت بده.',optional:true}
      ],core:[
        {id:'push-upper',region:'بالا شکم',name:'کرانچ معمولی',sets:2,reps:'۱۲ تا ۱۵',instructions:'شانه‌ها را با جمع‌کردن شکم از زمین جدا کن؛ گردن را نکش.'},
        {id:'push-mid',region:'وسط شکم',name:'کرانچ سیم‌کش',sets:2,reps:'۱۰ تا ۱۵',instructions:'دنده‌ها را به لگن نزدیک کن؛ لگن تا حد ممکن ثابت.'},
        {id:'push-lower',region:'زیر شکم',name:'کرانچ معکوس',sets:2,reps:'۱۲ تا ۱۵',instructions:'لگن را آرام از زمین بلند کن، نه فقط زانوها را جابه‌جا کنی.'},
        {id:'push-oblique',region:'پهلو',name:'پالوف‌پرس سیم‌کش',sets:2,reps:'۱۰ تا ۱۲ هر سمت',instructions:'دسته را جلوی سینه پرس کن؛ تنه در برابر چرخش مقاومت کند.'}
      ],cardio:{type:'پیاده‌روی تند روی تردمیل با شیب ملایم',durationMin:15,durationMax:20,intensity:'Zone 2',description:'بلافاصله بعد تمرین؛ نفس کمی تند اما امکان مکالمه کوتاه حفظ شود.',stepTargetMin:7000,stepTargetMax:8000}},
      pull:{id:'pull',title:'PULL',subtitle:'پشت · لت · کول · جلو بازو · ساعد',duration:'۷۵ تا ۹۰ دقیقه',focus:['پشت','لت','پشت‌شانه','کول','جلو بازو','ساعد'],exercises:[
        {id:'pull-lat-pulldown',nameFa:'لت سیم‌کش دست متوسط',nameEn:'Lat Pulldown',muscleGroup:'لت',equipment:'سیم‌کش',image:'assets/pull-lat-pulldown.jpg',sets:3,repMin:6,repMax:10,restSec:150,rirMin:1,rirMax:3,instructions:'سینه بالا، کمی به عقب متمایل؛ میله را به بخش بالایی سینه بکش، نه پشت گردن.'},
        {id:'pull-chest-row',nameFa:'پارویی دستگاه سینه‌تکیه',nameEn:'Chest-Supported Row',muscleGroup:'پشت و کول میانی',equipment:'دستگاه',image:'assets/pull-chest-row.jpg',sets:3,repMin:8,repMax:12,restSec:135,rirMin:1,rirMax:3,instructions:'سینه روی پد و تنه ثابت؛ آرنج‌ها را عقب ببر، کتف‌ها را نزدیک کن و وزنه را با کنترل برگردان.'},
        {id:'pull-single-lat',nameFa:'لت تک‌دست سیم‌کش',nameEn:'Single-Arm Lat Pulldown',muscleGroup:'لت',equipment:'سیم‌کش',image:'assets/pull-single-lat.jpg',sets:2,repMin:10,repMax:15,restSec:80,rirMin:1,rirMax:3,instructions:'دست را بالا در دامنه مناسب کش بده، سپس آرنج را به سمت پهلو و پایین بکش.'},
        {id:'pull-reverse-fly',nameFa:'فلای معکوس دستگاه',nameEn:'Reverse Pec Deck',muscleGroup:'پشت شانه',equipment:'دستگاه',image:'assets/pull-reverse-fly.jpg',sets:2,repMin:12,repMax:20,restSec:75,rirMin:1,rirMax:3,instructions:'ارتفاع دسته در راستای شانه؛ دست‌ها را باز کن و بدون تاب‌دادن روی پشت شانه تمرکز کن.'},
        {id:'pull-incline-curl',nameFa:'جلو بازو دمبل روی نیمکت شیب‌دار',nameEn:'Incline Dumbbell Curl',muscleGroup:'جلو بازو',equipment:'دمبل',image:'assets/pull-incline-curl.jpg',sets:2,repMin:8,repMax:12,restSec:80,rirMin:1,rirMax:3,instructions:'پشت به نیمکت تکیه بده، بازوها کنار بدن آویزان؛ آرنج را جلو نبر و وزنه را آرام پایین بیاور.'},
        {id:'pull-hammer-curl',nameFa:'جلو بازو چکشی · ساعد بیرونی',nameEn:'Hammer Curl / Brachioradialis',muscleGroup:'جلو بازو و ساعد',equipment:'دمبل',image:'assets/pull-hammer-curl.svg',sets:2,repMin:10,repMax:15,restSec:75,rirMin:1,rirMax:3,instructions:'کف دست‌ها رو به هم، آرنج کنار بدن؛ بدون تاب‌دادن، دمبل را بالا ببر و آرام پایین بده.',replacementNote:'جایگزین جلو بازو لاری است.'}
      ],accessory:[
        {id:'dumbbell-shrug',nameFa:'شراگ دمبل · کول بالایی',nameEn:'Dumbbell Shrug',muscleGroup:'کول بالایی',equipment:'دمبل',sets:2,repMin:10,repMax:15,restSec:80,rirMin:2,rirMax:3,instructions:'دمبل کنار بدن؛ شانه‌ها را مستقیم به بالا ببر، مکث کوتاه و پایین‌دادن آهسته؛ شانه‌ها را دایره‌ای نچرخان.'},
        {id:'prone-y-raise',nameFa:'نشر Y · کول پایینی',nameEn:'Prone Y Raise',muscleGroup:'کول پایینی',equipment:'دمبل سبک یا وزن بدن',sets:2,repMin:12,repMax:15,restSec:65,rirMin:2,rirMax:3,instructions:'سینه روی نیمکت شیب‌دار و شست‌ها رو به بالا؛ دست‌ها را شکل Y تا نزدیکی راستای گوش بالا بیاور.'},
        {id:'wrist-curl',nameFa:'خم‌کردن مچ · جلوی ساعد',nameEn:'Wrist Curl',muscleGroup:'جلوی ساعد',equipment:'دمبل',sets:2,repMin:12,repMax:20,restSec:60,rirMin:2,rirMax:3,instructions:'ساعد روی ران و کف دست رو به بالا؛ فقط مچ را خم کن و با کنترل پایین بیاور؛ آرنج ثابت بماند.'},
        {id:'farmer-carry',nameFa:'راه‌رفتن کشاورز · قدرت گرفتن',nameEn:'Farmer Carry',muscleGroup:'قبضه و ساعد',equipment:'دمبل',sets:2,repMin:30,repMax:30,restSec:60,rirMin:2,rirMax:3,instructions:'دو دمبل متعادل را محکم بگیر و با تنه قائم قدم کوتاه بردار. اگر ساعد خسته است حذف کن.',optional:true}
      ],core:[
        {id:'pull-upper',region:'بالا شکم',name:'کرانچ شیب‌دار',sets:1,reps:'۱۵',instructions:'با خم‌کردن تنه، شانه را از پد بلند کن؛ بدون کشیدن سر.'},
        {id:'pull-mid',region:'وسط شکم',name:'کرانچ سیم‌کش',sets:2,reps:'۱۰ تا ۱۵',instructions:'شکم را جمع کن و اجازه نده دست‌ها کل وزنه را بکشند.'},
        {id:'pull-lower',region:'زیر شکم',name:'بالاآوردن زانو خوابیده',sets:2,reps:'۱۲ تا ۱۵',instructions:'کمر را کنترل کن و زانوها را همراه با کمی چرخش لگن بالا بیاور.'},
        {id:'pull-oblique',region:'پهلو',name:'پلانک جانبی',sets:2,reps:'۳۰ تا ۴۵ ثانیه هر سمت',instructions:'بدن در یک خط مستقیم بماند و لگن نیفتد.'}
      ],cardio:{type:'دوچرخه ثابت یا الپتیکال',durationMin:20,durationMax:25,intensity:'Zone 2',description:'فشار ملایم تا متوسط و ریتم یکنواخت؛ نباید کیفیت تمرین قدرتی را پایین بیاورد.',stepTargetMin:7000,stepTargetMax:8000}},
      legs:{id:'legs',title:'LEGS',subtitle:'چهارسر · همسترینگ · باسن · ساق',duration:'۷۰ تا ۸۵ دقیقه',focus:['چهارسر','همسترینگ','باسن','ساق'],exercises:[
        {id:'legs-hack-squat',nameFa:'هک اسکوات',nameEn:'Hack Squat',muscleGroup:'چهارسر و باسن',equipment:'دستگاه هک',image:'assets/legs-hack-squat.jpg',sets:3,repMin:6,repMax:10,restSec:165,rirMin:1,rirMax:3,instructions:'کمر و باسن به پشتی تکیه کنند؛ زانو هم‌مسیر پنجه، تا دامنه‌ای که لگن از پد جدا نشود پایین برو.'},
        {id:'legs-rdl',nameFa:'ددلیفت رومانیایی',nameEn:'Romanian Deadlift',muscleGroup:'همسترینگ و باسن',equipment:'هالتر یا دمبل',image:'assets/legs-rdl.jpg',sets:3,repMin:6,repMax:10,restSec:165,rirMin:1,rirMax:3,instructions:'زانو کمی خم، باسن به عقب، کمر خنثی و وزنه نزدیک پاها؛ با انقباض باسن به ایستاده برگرد.'},
        {id:'legs-leg-press',nameFa:'پرس پا',nameEn:'Leg Press',muscleGroup:'چهارسر و باسن',equipment:'دستگاه',image:'assets/legs-leg-press.jpg',sets:2,repMin:10,repMax:15,restSec:135,rirMin:1,rirMax:3,instructions:'کف پا کامل روی صفحه، لگن روی پشتی؛ تا دامنه مناسب پایین بیا و زانو را محکم قفل نکن.'},
        {id:'legs-leg-curl',nameFa:'پشت پا دستگاه',nameEn:'Leg Curl',muscleGroup:'همسترینگ',equipment:'دستگاه',image:'assets/legs-leg-curl.jpg',sets:3,repMin:8,repMax:12,restSec:80,rirMin:1,rirMax:3,instructions:'محور دستگاه با زانو تنظیم باشد؛ پاشنه‌ها را به باسن نزدیک و برگشت را آرام کنترل کن.'},
        {id:'legs-leg-extension',nameFa:'جلو پا دستگاه',nameEn:'Leg Extension',muscleGroup:'چهارسر',equipment:'دستگاه',image:'assets/legs-leg-extension.jpg',sets:2,repMin:12,repMax:15,restSec:75,rirMin:1,rirMax:3,instructions:'محور زانو و دستگاه هم‌راستا؛ بالا مکث کوتاه و برگشت آرام؛ بدون ضربه پا را باز کن.'},
        {id:'legs-calf-raise',nameFa:'ساق پا ایستاده یا دستگاه',nameEn:'Calf Raise',muscleGroup:'ساق',equipment:'دستگاه یا وزن آزاد',image:'assets/legs-calf-raise.jpg',sets:3,repMin:10,repMax:15,restSec:75,rirMin:1,rirMax:3,instructions:'از دامنه کشش آرام پاشنه پایین شروع کن، با پنجه بالا برو و بالای حرکت یک ثانیه مکث کن.'}
      ],accessory:[],core:[
        {id:'legs-upper',region:'بالا شکم',name:'کرانچ ساده',sets:1,reps:'۱۵',instructions:'تمرکز روی نزدیک‌کردن دنده‌ها به لگن.'},
        {id:'legs-mid',region:'وسط شکم',name:'کرانچ سیم‌کش سبک',sets:1,reps:'۱۲ تا ۱۵',instructions:'با ریتم آهسته و بدون فشار به کمر.'},
        {id:'legs-lower',region:'زیر شکم',name:'کرانچ معکوس',sets:1,reps:'۱۲ تا ۱۵',instructions:'لگن را کوتاه و کنترل‌شده بالا بیاور.'},
        {id:'legs-oblique',region:'پهلو',name:'پالوف‌پرس',sets:1,reps:'۱۲ هر سمت',instructions:'تنه را ثابت نگه دار؛ حرکت سبک برای پایان روز پا.'}
      ],cardio:{type:'هوازی بسیار سبک برای ریکاوری',durationMin:10,durationMax:15,intensity:'ریکاوری / Zone 1–2',description:'در صورت خستگی پا حذف شود. در یک روز استراحت ۳۵ تا ۴۵ دقیقه پیاده‌روی تند انجام بده.',stepTargetMin:7000,stepTargetMax:9000}}
    },
    validationNotes:[
      'جمع کالری و درشت‌مغذی‌ها ممکن است با برچسب برند وی، ماست و روش پخت چند درصد تفاوت داشته باشد.',
      'حالت پایه روغن زیتون: ۱ قاشق چای‌خوری در ناهار و بدون روغن افزوده در شام. حالت ۲ قاشق: ۱ قاشق دیگر به شام اضافه و برنج ناهار از ۱۳۵ به ۱۰۵ گرم کاهش یابد.',
      'برچسب‌های بالا/وسط/زیر شکم و پهلو، ناحیه تأکید تمرین را نشان می‌دهند و به معنی چربی‌سوزی موضعی نیستند.'
    ]
  };
})();
