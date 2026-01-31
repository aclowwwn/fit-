
import React, { useState, useMemo, useEffect } from 'react';
import { MealPlanDay, Recipe, Workout } from './types';
import { INVENTORY, RECIPES, WORKOUTS } from './constants';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const STORAGE_KEY = 'zenith_weight_tracker_2026';

const generatePlan = (month: number): MealPlanDay[] => {
  const plan: MealPlanDay[] = [];
  const isJan = month === 0;
  const daysInMonth = isJan ? 31 : 28;
  const startDay = isJan ? 4 : 0; // Jan 1 2026: Thu (4), Feb 1 2026: Sun (0)

  const getJanMeal = (day: number) => {
    if (day === 1) return { recipeId: 'bone-broth-stew', name: 'Beef Bone Broth Stew' };
    if (day <= 3) return { recipeId: 'bone-broth-stew', name: 'Beef Bone Broth Stew', isLeftover: true };
    if (day <= 7) return { recipeId: 'pork-roast', name: 'Slow Cooker Pork', isLeftover: day > 4 };
    if (day <= 10) return { recipeId: 'salmon-cutlets', name: 'Salmon Cutlets', isLeftover: day > 8 };
    return { recipeId: 'beef-pasta-sauce', name: 'Slow Cooked Beef Pasta', isLeftover: day % 2 === 0 };
  };

  const getFebMeal = (day: number) => {
    if (day <= 4) return { recipeId: 'herb-chicken-roast', name: 'Rosemary Roasted Chicken', isLeftover: day > 1 };
    if (day <= 8) return { recipeId: 'garlic-pork-tenderloin', name: 'Garlic Butter Pork', isLeftover: day > 5 };
    if (day <= 12) return { recipeId: 'beef-vegetable-stirfry', name: 'Beef & Veg Stir-Fry', isLeftover: day > 9 };
    if (day <= 16) return { recipeId: 'chicken-lemon-soup', name: 'Chicken Lemon Soup', isLeftover: day > 13 };
    return { recipeId: 'slow-beef-pot-roast', name: 'Zenith Pot Roast', isLeftover: day % 2 === 1 };
  };

  const getFebLunch = (day: number) => {
    const options = [
      { name: 'Chicken Caesar Salad', description: 'Fresh romaine with roasted chicken strips.' },
      { name: 'Beef & Horseradish Sandwich', description: 'Sourdough with thin beef slices and greens.' },
      { name: 'Quinoa & Veggie Power Bowl', description: 'Mixed carrots, beans, and fresh spinach.' },
      { name: 'Turkey & Cranberry Wrap', description: 'Whole grain wrap with light spread.' }
    ];
    return options[day % options.length];
  };

  const getFebBaby = (day: number): { recipeId: string; name: string; description?: string } => {
    if (day <= 4) return { recipeId: 'baby-herb-chicken', name: 'Soft Chicken & Potato' };
    if (day <= 8) return { recipeId: 'baby-pork-medallion', name: 'Pork & Bean Mash' };
    if (day <= 12) return { recipeId: 'baby-beef-stew-mild', name: 'Gentle Beef Puree' };
    return { recipeId: 'baby-chicken-orzo', name: 'Chicken & Orzo Mash' };
  };

  const getSnack = (day: number) => {
    const snacks = [
      { name: 'Almonds & Berries', description: '10 nuts and a handful of berries.' },
      { name: 'Greek Yogurt', description: 'Plain yogurt with a dash of honey.' },
      { name: 'Hard Boiled Egg', description: 'Simple protein hit.' }
    ];
    return snacks[day % snacks.length];
  };

  const getWorkouts = (day: number) => {
    const husbKeys = ['crossfit-alpha', 'bodyweight-strength', 'hiit-metcon'];
    const wifeKeys = ['pilates-core', 'pilates-flow', 'bodyweight-strength'];
    return {
      husband: WORKOUTS[husbKeys[day % husbKeys.length]],
      wife: WORKOUTS[wifeKeys[day % wifeKeys.length]]
    };
  };

  for (let d = 1; d <= daysInMonth; d++) {
    const dayIndex = (startDay + d - 1) % 7;
    const dinner = isJan ? getJanMeal(d) : getFebMeal(d);
    const lunch = isJan ? { name: 'Sourdough & Spreads', description: 'Homemade sourdough with assorted spreads.' } : getFebLunch(d);
    const baby: { name: string; recipeId: string; description?: string } = isJan 
      ? { name: 'Beef & Root Puree', recipeId: 'baby-beef-veggie', description: 'Mild blend.' } 
      : getFebBaby(d);
    const w = getWorkouts(d);

    plan.push({
      date: d,
      month: month,
      dayOfWeek: DAYS_OF_WEEK[dayIndex],
      isCookingDay: dayIndex === 2 || dayIndex === 6,
      lunch,
      dinner: { ...dinner, recipeId: dinner.recipeId },
      babyMeal: { ...baby, recipeId: baby.recipeId, description: baby.description || 'Gentle for tiny tummies' },
      snack: getSnack(d),
      husbandWorkout: w.husband,
      wifeWorkout: w.wife
    });
  }
  return plan;
};

const WorkoutDisplay: React.FC<{ person: string; workout: Workout; accent: string }> = ({ person, workout, accent }) => (
  <div className={`p-6 rounded-3xl bg-neutral-900 border-2 border-neutral-800 shadow-2xl h-full transition-transform hover:scale-[1.01]`}>
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-[10px] uppercase font-black text-neutral-500 tracking-[0.2em]">{person} Protocol</h4>
      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${accent} text-white`}>{workout.type}</span>
    </div>
    <h5 className="text-xl font-black text-neutral-100 mb-4">{workout.title}</h5>
    <div className="space-y-4 text-xs">
       <div className="bg-neutral-800 p-3 rounded-xl">
         <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">Main Set</span>
         <ul className="mt-2 space-y-1 text-neutral-400 font-medium">
           {workout.exercises.map((e, i) => <li key={i}>▶ {e}</li>)}
         </ul>
       </div>
    </div>
  </div>
);

type WeightEntry = { husband: string; wife: string };
type WeightData = Record<string, WeightEntry>;

const App: React.FC = () => {
  const [activeMonth, setActiveMonth] = useState(0); // 0 = Jan, 1 = Feb
  const mealPlan = useMemo(() => generatePlan(activeMonth), [activeMonth]);
  const [selectedDay, setSelectedDay] = useState<MealPlanDay | null>(null);
  const [weightData, setWeightData] = useState<WeightData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const [draftWeights, setDraftWeights] = useState<WeightEntry>({ husband: '', wife: '' });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weightData));
  }, [weightData]);

  useEffect(() => {
    if (selectedDay) {
      const key = `${selectedDay.month}_${selectedDay.date}`;
      setDraftWeights(weightData[key] || { husband: '', wife: '' });
      setSaveStatus('idle');
    }
  }, [selectedDay, weightData]);

  const handleCommitWeights = () => {
    if (!selectedDay) return;
    setSaveStatus('saving');
    const key = `${selectedDay.month}_${selectedDay.date}`;
    setTimeout(() => {
      setWeightData(prev => ({
        ...prev,
        [key]: draftWeights
      }));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 400);
  };

  const monthVibe = activeMonth === 0 ? {
    accent: 'text-amber-500',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/10',
    glow: 'shadow-[0_0_50px_rgba(212,175,55,0.1)]',
    name: 'Obsidian Gold'
  } : {
    accent: 'text-rose-400',
    border: 'border-rose-400/20',
    bg: 'bg-rose-400/10',
    glow: 'shadow-[0_0_50px_rgba(244,63,94,0.1)]',
    name: 'Rose Obsidian'
  };

  const currentRecipe = useMemo(() => {
    if (!selectedDay) return null;
    return RECIPES[selectedDay.dinner.recipeId] || null;
  }, [selectedDay]);

  const latestWeights = useMemo(() => {
    const keys = Object.keys(weightData).sort((a, b) => {
      const [mA, dA] = a.split('_').map(Number);
      const [mB, dB] = b.split('_').map(Number);
      return (mB * 100 + dB) - (mA * 100 + dA);
    });

    const keyH = keys.find(k => weightData[k].husband !== '');
    const keyW = keys.find(k => weightData[k].wife !== '');

    const formatKeyToDate = (key?: string) => {
      if (!key) return null;
      const [m, d] = key.split('_');
      return `${m === '0' ? 'Jan' : 'Feb'} ${d}`;
    };

    return { 
      h: weightData[keyH || '']?.husband || '91.0', 
      dateH: formatKeyToDate(keyH),
      w: weightData[keyW || '']?.wife || '54.0',
      dateW: formatKeyToDate(keyW)
    };
  }, [weightData]);

  const isToday = (m: number, d: number) => {
    const now = new Date();
    return now.getMonth() === m && now.getDate() === d;
  };

  return (
    <div className="min-h-screen pb-12 bg-[#050505] text-neutral-200">
      <header className={`bg-black/80 backdrop-blur-md p-10 border-b ${monthVibe.border} sticky top-0 z-40 transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
               <h1 className={`text-5xl font-black tracking-tighter italic ${monthVibe.accent}`}>ZENITH 2026</h1>
               <div className="h-10 w-px bg-neutral-800 hidden md:block"></div>
               <span className={`bg-neutral-900 ${monthVibe.accent} px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border ${monthVibe.border}`}>{monthVibe.name}</span>
            </div>
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">{activeMonth === 0 ? 'January' : 'February'} Deployment</p>
          </div>
          
          <div className="flex items-center gap-3 bg-neutral-900/50 p-2 rounded-2xl border border-neutral-800">
            <button 
              onClick={() => setActiveMonth(0)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMonth === 0 ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-neutral-500 hover:text-white'}`}
            >
              January
            </button>
            <button 
              onClick={() => setActiveMonth(1)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMonth === 1 ? 'bg-rose-500 text-black shadow-lg shadow-rose-500/20' : 'text-neutral-500 hover:text-white'}`}
            >
              February
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <section className="lg:col-span-4 space-y-8">
          <div className="bg-neutral-900/40 rounded-[2.5rem] p-10 border border-neutral-800/50 sticky top-48">
            <h2 className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.4em] mb-10">Asset Telemetry</h2>
            <div className="space-y-6">
               <div className="bg-black/40 p-8 rounded-3xl border-l-8 border-amber-500 shadow-xl transition-all duration-500">
                  <p className="text-[10px] font-black text-amber-500 uppercase mb-2 tracking-widest flex justify-between">
                    Alpha (Husband)
                    {latestWeights.dateH && <span className="text-[8px] text-neutral-600">LAST: {latestWeights.dateH}</span>}
                  </p>
                  <div className="flex justify-between items-baseline">
                     <span className="text-5xl font-black text-white">{latestWeights.h}<span className="text-sm opacity-50 ml-1">kg</span></span>
                     <span className="text-[11px] font-bold text-neutral-500">Goal: 85.0</span>
                  </div>
               </div>
               <div className="bg-black/40 p-8 rounded-3xl border-l-8 border-rose-500 shadow-xl transition-all duration-500">
                  <p className="text-[10px] font-black text-rose-500 uppercase mb-2 tracking-widest flex justify-between">
                    Beta (Wife)
                    {latestWeights.dateW && <span className="text-[8px] text-neutral-600">LAST: {latestWeights.dateW}</span>}
                  </p>
                  <div className="flex justify-between items-baseline">
                     <span className="text-5xl font-black text-white">{latestWeights.w}<span className="text-sm opacity-50 ml-1">kg</span></span>
                     <span className="text-[11px] font-bold text-neutral-500">Goal: 48.0</span>
                  </div>
               </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-neutral-800">
               <h2 className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-6">Inventory Registry</h2>
               <div className="space-y-4 max-h-[20vh] overflow-y-auto custom-scrollbar pr-2">
                  {INVENTORY.slice(0, 10).map((item, i) => (
                    <div key={i} className="flex justify-between text-[11px] font-bold border-b border-neutral-800 pb-2">
                       <span className="text-neutral-400">{item.name}</span>
                       <span className={monthVibe.accent}>{item.quantity}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        <section className="lg:col-span-8">
          <div className="bg-neutral-900/20 rounded-[3rem] shadow-2xl overflow-hidden border border-neutral-800/50">
            <div className="grid grid-cols-7 bg-black/40 border-b border-neutral-800/50">
              {DAYS_OF_WEEK.map(day => (
                <div key={day} className="py-6 text-center text-[10px] font-black text-neutral-600 uppercase tracking-[0.4em]">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {[...Array(activeMonth === 0 ? 4 : 0)].map((_, i) => (
                <div key={`pad-${i}`} className="h-20 md:h-44 bg-black/10 border-r border-b border-neutral-800/30"></div>
              ))}
              {mealPlan.map((day) => (
                <button
                  key={day.date}
                  onClick={() => setSelectedDay(day)}
                  className={`relative h-20 md:h-44 border-r border-b border-neutral-800/30 p-3 md:p-6 text-left transition-all hover:bg-neutral-800/40 group
                    ${isToday(activeMonth, day.date) ? 'border-2 border-emerald-500/50 bg-emerald-500/5 z-10' : ''}
                  `}
                >
                  <span className={`text-xs md:text-base font-black flex items-center gap-2 ${isToday(activeMonth, day.date) ? 'text-emerald-400 underline underline-offset-4' : 'text-neutral-600 group-hover:text-white'}`}>
                    {day.date}
                    {isToday(activeMonth, day.date) && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>}
                  </span>
                  
                  <div className="mt-4 hidden md:block">
                    <p className={`text-[10px] leading-tight font-black uppercase tracking-tight truncate ${day.dinner.isLeftover ? 'opacity-30' : 'text-neutral-200'}`}>
                      {day.dinner.name}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                       <div className={`w-2 h-2 rounded-full ${day.isCookingDay ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-neutral-800'}`}></div>
                       <span className="text-[7px] text-neutral-500 font-bold uppercase">{day.husbandWorkout.type}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {selectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="bg-neutral-900 rounded-[3rem] shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col border border-neutral-800">
            <div className={`p-10 border-b border-neutral-800 flex justify-between items-center bg-black/20`}>
              <div className="flex items-center gap-8">
                <div className={`w-20 h-20 rounded-3xl bg-neutral-950 flex items-center justify-center font-black text-3xl shadow-xl border ${monthVibe.border} ${monthVibe.accent}`}>
                  {selectedDay.date}
                </div>
                <div>
                  <h3 className={`text-[10px] font-black uppercase tracking-[0.5em] mb-2 ${monthVibe.accent}`}>{selectedDay.dayOfWeek} DEPLOYMENT</h3>
                  <h2 className="text-4xl font-black text-white tracking-tighter uppercase">{selectedDay.dinner.name}</h2>
                </div>
              </div>
              <button onClick={() => setSelectedDay(null)} className="p-4 hover:bg-neutral-800 rounded-full transition-all group">
                <svg className="w-8 h-8 text-neutral-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="overflow-y-auto p-12 space-y-16 custom-scrollbar">
              <section className="bg-black/40 rounded-[2.5rem] p-10 border border-neutral-800/50">
                 <div className="grid grid-cols-1 md:grid-cols-4 items-end gap-12">
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 rounded-2xl bg-neutral-950 flex items-center justify-center text-2xl border border-neutral-800">⚖️</div>
                       <div>
                          <h4 className="font-black text-xl text-white">Weight Protocol</h4>
                          <p className="text-[9px] font-black uppercase text-neutral-500 tracking-widest">Vault Entry Mode</p>
                       </div>
                    </div>
                    <div className="space-y-3 relative">
                       <label className="text-[9px] font-black uppercase text-neutral-500 tracking-widest block ml-1">Alpha (H)</label>
                       <input 
                         type="number" step="0.1"
                         value={draftWeights.husband}
                         onChange={(e) => setDraftWeights(prev => ({ ...prev, husband: e.target.value }))}
                         className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-2xl font-black text-amber-500 focus:outline-none focus:border-amber-500/50"
                         placeholder="91.0"
                       />
                       {draftWeights.husband !== (weightData[`${selectedDay.month}_${selectedDay.date}`]?.husband || '') && (
                         <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-[7px] font-black px-1.5 py-0.5 rounded-full animate-bounce">DRAFT</span>
                       )}
                    </div>
                    <div className="space-y-3 relative">
                       <label className="text-[9px] font-black uppercase text-neutral-500 tracking-widest block ml-1">Beta (W)</label>
                       <input 
                         type="number" step="0.1"
                         value={draftWeights.wife}
                         onChange={(e) => setDraftWeights(prev => ({ ...prev, wife: e.target.value }))}
                         className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-2xl font-black text-rose-400 focus:outline-none focus:border-rose-400/50"
                         placeholder="54.0"
                       />
                       {draftWeights.wife !== (weightData[`${selectedDay.month}_${selectedDay.date}`]?.wife || '') && (
                         <span className="absolute -top-1 -right-1 bg-rose-400 text-black text-[7px] font-black px-1.5 py-0.5 rounded-full animate-bounce">DRAFT</span>
                       )}
                    </div>
                    <div>
                       <button 
                         onClick={handleCommitWeights}
                         disabled={saveStatus !== 'idle'}
                         className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all duration-300 transform active:scale-95 ${saveStatus === 'saved' ? 'bg-emerald-500 text-black shadow-[0_0_20px_#10b98144]' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white border border-neutral-700'}`}
                       >
                         {saveStatus === 'idle' && 'Commit to Vault'}
                         {saveStatus === 'saving' && 'Syncing...'}
                         {saveStatus === 'saved' && 'VAULT COMMITTED ✓'}
                       </button>
                    </div>
                 </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <div className="space-y-10">
                    <h4 className="text-xl font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-800 pb-4">Culinary Specifications</h4>
                    <div className="grid grid-cols-2 gap-6 text-center">
                       <div className="bg-neutral-950 p-6 rounded-3xl border border-neutral-800">
                          <p className="text-[9px] font-black text-neutral-600 uppercase mb-2">Alpha Scaling</p>
                          <p className="text-3xl font-black text-white">{Math.round((currentRecipe?.calories || 0) * 1.2)}<span className="text-xs ml-1 opacity-50">kcal</span></p>
                          <p className="text-[9px] font-bold text-emerald-500 mt-2">{Math.round((currentRecipe?.protein || 0) * 1.2)}g Protein</p>
                       </div>
                       <div className="bg-neutral-950 p-6 rounded-3xl border border-neutral-800">
                          <p className="text-[9px] font-black text-neutral-600 uppercase mb-2">Beta Scaling</p>
                          <p className="text-3xl font-black text-white">{Math.round((currentRecipe?.calories || 0) * 0.8)}<span className="text-xs ml-1 opacity-50">kcal</span></p>
                          <p className="text-[9px] font-bold text-rose-400 mt-2">{Math.round((currentRecipe?.protein || 0) * 0.8)}g Protein</p>
                       </div>
                    </div>
                    
                    <div className="bg-neutral-950 p-8 rounded-[2rem] border border-neutral-800 space-y-6">
                       <div>
                          <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-3">Lunch Protocol (12:00)</p>
                          <p className="text-sm font-bold text-neutral-100">{selectedDay.lunch.name}</p>
                          <p className="text-xs text-neutral-500 italic mt-1">{selectedDay.lunch.description}</p>
                       </div>
                       <div className="h-px bg-neutral-800"></div>
                       <div>
                          <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-3">Metabolic Reset (16:00)</p>
                          <p className="text-sm font-bold text-neutral-100">{selectedDay.snack.name}</p>
                          <p className="text-xs text-neutral-500 italic mt-1">{selectedDay.snack.description}</p>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-10">
                    <h4 className="text-xl font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-800 pb-4">Junior Deployment</h4>
                    <div className="bg-neutral-950 p-10 rounded-[3rem] border border-emerald-500/10 shadow-inner">
                       <div className="flex justify-between items-start mb-4">
                          <p className="text-2xl font-black text-emerald-500 italic">{selectedDay.babyMeal?.name}</p>
                          <span className="bg-emerald-950/50 text-emerald-400 text-[8px] px-2 py-1 rounded font-black uppercase">No Spices</span>
                       </div>
                       <p className="text-xs text-neutral-500 leading-relaxed mb-8">{selectedDay.babyMeal?.description}</p>
                       <div className="space-y-4">
                          {RECIPES[selectedDay.babyMeal?.recipeId || '']?.instructions.map((step, i) => (
                            <div key={i} className="flex gap-4 text-[11px] font-bold text-neutral-400">
                               <span className="text-emerald-500 font-black">{i+1}.</span> {step}
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                 <WorkoutDisplay person="Alpha" workout={selectedDay.husbandWorkout} accent="bg-amber-600" />
                 <WorkoutDisplay person="Beta" workout={selectedDay.wifeWorkout} accent="bg-rose-600" />
              </section>
            </div>
            
            <div className="p-10 flex justify-center border-t border-neutral-800 bg-neutral-900/50">
              <button 
                onClick={() => setSelectedDay(null)}
                className={`w-full md:w-auto px-24 py-7 ${activeMonth === 0 ? 'bg-amber-500' : 'bg-rose-500'} text-black rounded-[2rem] font-black uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-2xl active:scale-95`}
              >
                CLOSE PROTOCOL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
