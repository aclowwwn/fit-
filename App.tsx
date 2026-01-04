
import React, { useState, useMemo, useEffect } from 'react';
import { MealPlanDay, Recipe, Workout } from './types';
import { INVENTORY, RECIPES, WORKOUTS } from './constants';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const STORAGE_KEY = 'zenith_weight_tracker_2026';

const generateJan2026Plan = (): MealPlanDay[] => {
  const plan: MealPlanDay[] = [];
  const daysInJan = 31;
  const startDay = 4; // Jan 1, 2026 is a Thursday

  const getMealForDay = (day: number): { recipeId: string; name: string; isLeftover?: boolean; leftoverFrom?: number } => {
    if (day === 1) return { recipeId: 'frozen-sarmale', name: 'Frozen Sarmale' };
    if (day === 2) return { recipeId: 'frozen-sarmale', name: 'Frozen Sarmale (Leftover)', isLeftover: true, leftoverFrom: 1 };
    if (day >= 3 && day < 6) return { recipeId: 'bone-broth-stew', name: 'Beef Bone Broth Stew', isLeftover: day > 3, leftoverFrom: 3 };
    if (day >= 6 && day < 10) return { recipeId: 'pork-roast', name: 'Slow Cooker Pork', isLeftover: day > 6, leftoverFrom: 6 };
    if (day >= 10 && day < 13) return { recipeId: 'salmon-cutlets', name: 'Salmon Cutlets', isLeftover: day > 10, leftoverFrom: 10 };
    if (day >= 13 && day < 17) return { recipeId: 'sausage-potato-hash', name: 'Sausage & Potato Hash', isLeftover: day > 13, leftoverFrom: 13 };
    if (day >= 17 && day < 20) return { recipeId: 'beef-pasta-sauce', name: 'Slow Cooked Beef Pasta', isLeftover: day > 17, leftoverFrom: 17 };
    if (day >= 20 && day < 24) return { recipeId: 'beef-tomato-soup', name: 'Beef & Tomato Soup', isLeftover: day > 20, leftoverFrom: 20 };
    if (day >= 24 && day < 27) return { recipeId: 'frozen-stew', name: 'Chicken Stew (Frozen)', isLeftover: day > 24, leftoverFrom: 24 };
    if (day >= 27 && day < 31) return { recipeId: 'pork-roast', name: 'Garlic Pork (Final Batch)', isLeftover: day > 27, leftoverFrom: 27 };
    return { recipeId: 'frozen-soup', name: 'Chicken Soup (Frozen)' };
  };

  const getBabyMeal = (day: number) => {
    if (day < 6) return { name: 'Beef & Root Puree', description: 'Batch cooked on Sat/Tue', recipeId: 'baby-beef-veggie' };
    if (day < 10) return { name: 'Pork & Potato Mash', description: 'Batch cooked with Tuesday roast', recipeId: 'baby-pork-potato' };
    if (day < 13) return { name: 'Salmon & Potato Mash', description: 'Using fresh cooked salmon', recipeId: 'baby-salmon-mash' };
    if (day < 17) return { name: 'Veggie Broth Puree', description: 'Mild and nutrient rich', recipeId: 'baby-veggie-broth-puree' };
    if (day < 24) return { name: 'Beef & Veggie Blend', description: 'Using slow cooked beef', recipeId: 'baby-beef-veggie' };
    return { name: 'Potato & Carrot Mix', description: 'Gentle for tiny tummies', recipeId: 'baby-veggie-broth-puree' };
  };

  const getSnack = (day: number) => {
    const snacks = [
      { name: 'Nuts & Dried Fruits', description: 'Mixed nuts with dried cranberries or dates.' },
      { name: 'Air-Popped Popcorn', description: 'Homemade popcorn—low calorie snack.' },
      { name: 'Fresh Seasonal Fruit', description: 'An apple, pear, or a bowl of berries.' },
      { name: 'Carrot Sticks & Spreads', description: 'Raw carrots with a small amount of hummus.' },
      { name: 'Dates & Walnuts', description: 'Two dates stuffed with walnut halves.' }
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

  for (let d = 1; d <= daysInJan; d++) {
    const dayIndex = (startDay + d - 1) % 7;
    const isCookingDay = dayIndex === 2 || dayIndex === 6;
    const dinner = getMealForDay(d);
    const babyMeal = getBabyMeal(d);
    const snack = getSnack(d);
    const w = getWorkouts(d);

    plan.push({
      date: d,
      dayOfWeek: DAYS_OF_WEEK[dayIndex],
      isCookingDay,
      lunch: {
        name: 'Sourdough & Spreads',
        description: 'Homemade sourdough bread or lettuce wraps.'
      },
      dinner: dinner,
      babyMeal: babyMeal,
      snack: snack,
      husbandWorkout: w.husband,
      wifeWorkout: w.wife
    });
  }
  return plan;
};

const WorkoutDisplay: React.FC<{ person: string; workout: Workout; accent: string }> = ({ person, workout, accent }) => (
  <div className={`p-6 rounded-3xl bg-neutral-900 border-2 border-emerald-900/50 shadow-2xl h-full transition-transform hover:scale-[1.01]`}>
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-[10px] uppercase font-black text-amber-500 tracking-[0.2em]">{person} Protocol</h4>
      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${accent} text-white`}>{workout.type}</span>
    </div>
    <h5 className="text-xl font-black text-neutral-100 mb-4">{workout.title}</h5>
    
    <div className="space-y-4">
      <div className="bg-neutral-800 p-3 rounded-xl border border-neutral-700">
        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Warm-Up</span>
        <ul className="text-xs text-neutral-400 mt-2 space-y-1 font-medium">
          {workout.warmup.map((w, i) => <li key={i} className="flex gap-2"><span>•</span> {w}</li>)}
        </ul>
      </div>
      <div className="bg-emerald-900/40 p-4 rounded-xl text-neutral-100 shadow-lg border border-emerald-500/30">
        <span className="text-[9px] font-black text-emerald-300 uppercase tracking-widest">Performance Set</span>
        <ul className="text-xs mt-2 space-y-1.5 font-bold">
          {workout.exercises.map((e, i) => <li key={i} className="flex gap-2"><span>▶</span> {e}</li>)}
        </ul>
      </div>
      <div className="bg-neutral-800 p-3 rounded-xl border border-neutral-700">
        <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">Recovery</span>
        <ul className="text-xs text-neutral-400 mt-2 space-y-1 font-medium">
          {workout.cooldown.map((c, i) => <li key={i} className="flex gap-2"><span>❄</span> {c}</li>)}
        </ul>
      </div>
    </div>
  </div>
);

type WeightEntry = { husband: string; wife: string };
type WeightData = Record<number, WeightEntry>;

const App: React.FC = () => {
  const mealPlan = useMemo(() => generateJan2026Plan(), []);
  const [selectedDay, setSelectedDay] = useState<MealPlanDay | null>(null);
  const [weightData, setWeightData] = useState<WeightData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weightData));
  }, [weightData]);

  const handleWeightChange = (date: number, person: keyof WeightEntry, value: string) => {
    setWeightData(prev => ({
      ...prev,
      [date]: {
        ...(prev[date] || { husband: '', wife: '' }),
        [person]: value
      }
    }));
  };

  const currentRecipe = useMemo(() => {
    if (!selectedDay) return null;
    return RECIPES[selectedDay.dinner.recipeId] || null;
  }, [selectedDay]);

  const multipliers = { husband: 1.2, wife: 0.8 };

  const latestHusbandWeight = useMemo(() => {
    const entries = (Object.entries(weightData) as [string, WeightEntry][]).sort((a, b) => Number(b[0]) - Number(a[0]));
    const found = entries.find(e => e[1].husband);
    return found ? found[1].husband : '91.0';
  }, [weightData]);

  const latestWifeWeight = useMemo(() => {
    const entries = (Object.entries(weightData) as [string, WeightEntry][]).sort((a, b) => Number(b[0]) - Number(a[0]));
    const found = entries.find(e => e[1].wife);
    return found ? found[1].wife : '54.0';
  }, [weightData]);

  return (
    <div className="min-h-screen pb-12 bg-[#0a0a0a] text-neutral-200">
      <header className="bg-neutral-950 p-10 shadow-[0_0_50px_rgba(16,185,129,0.1)] border-b border-amber-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-3">
               <h1 className="text-5xl font-black tracking-tighter italic text-amber-500">ZENITH 2026</h1>
               <div className="h-10 w-px bg-emerald-500/30 hidden md:block"></div>
               <span className="bg-emerald-950/50 text-emerald-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-emerald-500/30">Obsidian Protocol</span>
            </div>
            <p className="text-neutral-500 text-sm font-semibold tracking-[0.1em]">Summit Threshold: 85.0kg & 48.0kg</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-neutral-900 px-7 py-4 rounded-2xl border border-amber-500/10 flex flex-col items-center gold-glow">
              <span className="text-[10px] uppercase font-black text-amber-500 tracking-[0.2em] mb-1">Metabolic Window</span>
              <span className="text-3xl font-black tabular-nums text-neutral-100">12:00 — 20:00</span>
            </div>
            <div className="bg-emerald-900/20 p-5 rounded-2xl flex items-center gap-4 text-sm font-black border border-emerald-500/20 emerald-glow">
              <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_20px_#10b981]"></div>
              <span className="uppercase tracking-[0.2em] text-emerald-400">Zenith Active</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar - Widened to col-span-5 */}
        <section className="lg:col-span-5 space-y-8">
          <div className="bg-neutral-900/80 rounded-[2.5rem] shadow-2xl p-10 border border-neutral-800 sticky top-48">
            <div className="mb-10">
               <h2 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.4em] mb-8">Asset Targets</h2>
               <div className="space-y-5">
                 <div className="bg-neutral-800 p-10 rounded-2xl border-l-8 border-amber-500 shadow-xl">
                    <p className="text-[10px] font-black text-amber-500 uppercase mb-2 tracking-[0.2em]">Asset Alpha</p>
                    <div className="flex justify-between items-end">
                       <span className="text-5xl font-black text-neutral-100 tracking-tighter">{latestHusbandWeight}<span className="text-sm opacity-50 ml-1">kg</span></span>
                       <span className="text-[12px] font-black text-emerald-500">Target: 85.0</span>
                    </div>
                 </div>
                 <div className="bg-neutral-800 p-10 rounded-2xl border-l-8 border-emerald-600 shadow-xl">
                    <p className="text-[10px] font-black text-emerald-500 uppercase mb-2 tracking-[0.2em]">Asset Beta</p>
                    <div className="flex justify-between items-end">
                       <span className="text-5xl font-black text-neutral-100 tracking-tighter">{latestWifeWeight}<span className="text-sm opacity-50 ml-1">kg</span></span>
                       <span className="text-[12px] font-black text-emerald-500">Target: 48.0</span>
                    </div>
                 </div>
               </div>
            </div>

            <div className="pt-6 border-t border-neutral-800">
              <h2 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.4em] mb-6">Inventory Registry</h2>
              <ul className="space-y-4 max-h-[30vh] overflow-y-auto pr-4 custom-scrollbar text-neutral-400">
                {INVENTORY.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center text-xs font-bold border-b border-neutral-800 pb-2">
                    <span>{item.name}</span>
                    <span className="text-amber-500/60 font-black">{item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Calendar - Narrowed slightly to col-span-7 to accommodate wider sidebar */}
        <section className="lg:col-span-7">
          <div className="bg-neutral-900/50 rounded-[3rem] shadow-2xl overflow-hidden border border-neutral-800">
            <div className="grid grid-cols-7 bg-neutral-950 border-b border-neutral-800">
              {DAYS_OF_WEEK.map(day => (
                <div key={day} className="py-8 text-center text-[10px] font-black text-neutral-500 uppercase tracking-[0.5em]">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {[...Array(4)].map((_, i) => (
                <div key={`pad-${i}`} className="h-16 md:h-40 bg-neutral-950/40 border-r border-b border-neutral-800/50"></div>
              ))}
              {mealPlan.map((day) => (
                <button
                  key={day.date}
                  onClick={() => setSelectedDay(day)}
                  className={`relative h-16 md:h-40 border-r border-b border-neutral-800/50 p-3 md:p-5 text-left transition-all hover:bg-neutral-800/60 group
                    ${day.isCookingDay ? 'bg-emerald-950/10' : ''}
                    ${selectedDay?.date === day.date ? 'bg-neutral-800 shadow-[inset_0_0_20px_rgba(212,175,55,0.1)] ring-2 ring-amber-500/50 z-10' : ''}
                  `}
                >
                  <span className={`text-xs md:text-sm font-black ${day.dayOfWeek === 'Sun' || day.dayOfWeek === 'Sat' ? 'text-amber-500' : 'text-neutral-600 group-hover:text-amber-400 transition-colors'}`}>{day.date}</span>
                  {day.isCookingDay && <div className="absolute top-2 right-2 md:top-5 md:right-5 w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></div>}
                  
                  {/* Daily details hidden on mobile view as requested */}
                  <div className="mt-4 hidden md:block">
                    <p className={`text-[11px] leading-tight font-black uppercase tracking-tight truncate ${day.dinner.isLeftover ? 'text-neutral-600' : 'text-neutral-200'}`}>
                      {day.dinner.name}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                       <span className="text-[7px] bg-neutral-950 text-neutral-500 px-2 py-0.5 rounded-full font-black border border-neutral-800 uppercase tracking-tighter">{day.husbandWorkout.type}</span>
                       <span className="text-[7px] bg-neutral-950 text-neutral-500 px-2 py-0.5 rounded-full font-black border border-neutral-800 uppercase tracking-tighter">{day.wifeWorkout.type}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {selectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
          <div className="bg-neutral-900 rounded-[3rem] shadow-2xl max-w-6xl w-full max-h-[94vh] overflow-hidden flex flex-col border border-amber-500/20">
            <div className="p-10 border-b border-neutral-800 flex justify-between items-center bg-neutral-950/50">
              <div className="flex items-center gap-8">
                <div className="bg-gradient-to-br from-neutral-800 to-black text-amber-500 w-20 h-20 md:w-24 md:h-24 rounded-[2rem] flex items-center justify-center font-black text-3xl md:text-4xl shadow-2xl border border-amber-500/30 rotate-3">
                  {selectedDay.date}
                </div>
                <div>
                  <h3 className="text-xs font-black text-emerald-500 uppercase tracking-[0.5em] mb-2">{selectedDay.dayOfWeek} JAN PROTOCOL</h3>
                  <h2 className="text-2xl md:text-4xl font-black text-neutral-100 tracking-tighter uppercase">{selectedDay.dinner.name}</h2>
                </div>
              </div>
              <button onClick={() => setSelectedDay(null)} className="p-4 hover:bg-neutral-800 rounded-full transition-all group active:scale-90">
                <svg className="w-8 h-8 text-neutral-600 group-hover:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="overflow-y-auto p-12 space-y-16 custom-scrollbar flex-grow">
              <section className="bg-neutral-950 rounded-[3rem] p-10 border-2 border-amber-900/30 shadow-inner">
                 <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-center text-2xl">⚖️</div>
                       <div>
                          <h4 className="font-black text-2xl text-neutral-100 tracking-tight">Body Mass Tracking</h4>
                          <p className="text-[10px] font-black uppercase text-amber-500 tracking-widest">Daily Summit Verification</p>
                       </div>
                    </div>
                    
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest block ml-2">Husband Log (kg)</label>
                          <input 
                            type="number"
                            step="0.1"
                            value={weightData[selectedDay.date]?.husband || ''}
                            onChange={(e) => handleWeightChange(selectedDay.date, 'husband', e.target.value)}
                            placeholder="e.g. 90.5"
                            className="w-full bg-neutral-900 border-2 border-neutral-800 rounded-2xl p-4 text-2xl font-black text-neutral-100 focus:border-amber-500/50 focus:outline-none transition-all placeholder:text-neutral-800"
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest block ml-2">Wife Log (kg)</label>
                          <input 
                            type="number"
                            step="0.1"
                            value={weightData[selectedDay.date]?.wife || ''}
                            onChange={(e) => handleWeightChange(selectedDay.date, 'wife', e.target.value)}
                            placeholder="e.g. 53.2"
                            className="w-full bg-neutral-900 border-2 border-neutral-800 rounded-2xl p-4 text-2xl font-black text-neutral-100 focus:border-emerald-500/50 focus:outline-none transition-all placeholder:text-neutral-800"
                          />
                       </div>
                    </div>
                 </div>
                 <div className="mt-8 flex justify-end">
                    <p className="text-[9px] font-black uppercase text-neutral-600 tracking-widest">Progress recorded to local vault</p>
                 </div>
              </section>

              <section>
                <div className="flex items-center gap-8 mb-10">
                  <h4 className="text-xs font-black text-neutral-600 uppercase tracking-[0.6em]">Training Cadence</h4>
                  <div className="h-px flex-grow bg-neutral-800"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <WorkoutDisplay person="Husband" workout={selectedDay.husbandWorkout} accent="bg-amber-600" />
                   <WorkoutDisplay person="Wife" workout={selectedDay.wifeWorkout} accent="bg-emerald-700" />
                </div>
              </section>

              <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                 <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-neutral-950 rounded-[3rem] p-10 text-neutral-200 shadow-2xl border border-amber-500/10">
                      <div className="flex items-center justify-between mb-10">
                        <h4 className="font-black text-2xl tracking-tighter italic text-amber-500">Alpha Intake</h4>
                        <span className="bg-amber-500/10 text-amber-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/30">85kg Peak</span>
                      </div>
                      {currentRecipe && (
                        <div className="grid grid-cols-3 gap-8 text-center pb-10 border-b border-neutral-800 mb-8">
                          <div>
                             <p className="text-[10px] font-black uppercase text-neutral-600 tracking-widest mb-1">Kcal</p>
                             <p className="text-4xl font-black tabular-nums text-neutral-100">{Math.round((currentRecipe.calories || 0) * multipliers.husband)}</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase text-neutral-600 tracking-widest mb-1">P</p>
                             <p className="text-4xl font-black tabular-nums text-emerald-500">{Math.round((currentRecipe.protein || 0) * multipliers.husband)}g</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase text-neutral-600 tracking-widest mb-1">C</p>
                             <p className="text-4xl font-black tabular-nums text-amber-500">{Math.round((currentRecipe.carbs || 0) * multipliers.husband)}g</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-neutral-950 rounded-[3rem] p-10 border border-emerald-500/10 shadow-2xl">
                      <div className="flex items-center justify-between mb-10">
                        <h4 className="font-black text-2xl tracking-tighter italic text-emerald-500">Beta Intake</h4>
                        <span className="bg-emerald-500/10 text-emerald-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">48kg Peak</span>
                      </div>
                      {currentRecipe && (
                        <div className="grid grid-cols-3 gap-8 text-center pb-10 border-b border-neutral-800 mb-8 text-neutral-100">
                          <div>
                             <p className="text-[10px] font-black uppercase text-neutral-600 tracking-widest mb-1">Kcal</p>
                             <p className="text-4xl font-black tabular-nums">{Math.round((currentRecipe.calories || 0) * multipliers.wife)}</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase text-neutral-600 tracking-widest mb-1">P</p>
                             <p className="text-4xl font-black tabular-nums text-emerald-500">{Math.round((currentRecipe.protein || 0) * multipliers.wife)}g</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase text-neutral-600 tracking-widest mb-1">C</p>
                             <p className="text-4xl font-black tabular-nums text-amber-500">{Math.round((currentRecipe.carbs || 0) * multipliers.wife)}g</p>
                          </div>
                        </div>
                      )}
                    </div>
                 </div>

                 <div className="bg-neutral-950 rounded-[3rem] p-10 border border-neutral-800 flex flex-col justify-between shadow-inner">
                    <div>
                       <h4 className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-10">Intake Window</h4>
                       <div className="space-y-8">
                          <div className="flex gap-6">
                             <span className="w-10 h-10 rounded-xl bg-neutral-800 text-amber-500 flex items-center justify-center text-sm font-black border border-amber-500/20">12</span>
                             <div>
                                <p className="text-xs font-black uppercase tracking-widest text-neutral-100">Lunch Protocol</p>
                                <p className="text-[11px] font-bold text-neutral-500">{selectedDay.lunch.name}</p>
                             </div>
                          </div>
                          <div className="flex gap-6">
                             <span className="w-10 h-10 rounded-xl bg-neutral-800 text-neutral-200 flex items-center justify-center text-sm font-black border border-neutral-700">15</span>
                             <div>
                                <p className="text-xs font-black uppercase tracking-widest text-neutral-100">Macro Snack</p>
                                <p className="text-[11px] font-bold text-neutral-500">{selectedDay.snack.name}</p>
                             </div>
                          </div>
                          <div className="flex gap-6">
                             <span className="w-10 h-10 rounded-xl bg-emerald-900 text-emerald-400 flex items-center justify-center text-sm font-black border border-emerald-500/30">19</span>
                             <div>
                                <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Peak Meal</p>
                                <p className="text-[11px] font-bold text-neutral-500 italic">Strict cutoff by 20:00.</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </section>
            </div>
            
            {/* Modal Footer - Refined and smaller button as requested */}
            <div className="p-8 bg-transparent flex justify-center sticky bottom-0 border-t border-amber-500/5">
              <button 
                onClick={() => setSelectedDay(null)}
                className="w-full md:w-auto px-12 py-3.5 bg-amber-500 text-black rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:scale-105 transition-all shadow-xl active:scale-95"
              >
                STAY ON TARGET
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
