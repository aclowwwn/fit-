
import { Recipe, InventoryItem, Workout } from './types';

export const INVENTORY: InventoryItem[] = [
  { name: 'Beef Bones', quantity: '2kg' },
  { name: 'Beef Chuck', quantity: '3kg' },
  { name: 'Pork Loin', quantity: '2.5kg' },
  { name: 'Chicken Thighs', quantity: '4kg' },
  { name: 'Chicken Breast', quantity: '2kg' },
  { name: 'Potatoes', quantity: 'Bulk' },
  { name: 'Mixed Greens', quantity: 'Weekly' },
  { name: 'Whole Grain Bread', quantity: 'Weekly' },
  { name: 'Carrots/Celery', quantity: 'Bulk' },
  { name: 'Onions/Garlic', quantity: 'Bulk' },
  { name: 'Tomato Paste', quantity: '5 cans' },
  { name: 'Sourdough Starter', quantity: 'Active' },
];

export const WORKOUTS: Record<string, Workout> = {
  // Base Jan/Placeholder Workouts
  'crossfit-alpha': {
    title: 'CrossFit: Power & Burn',
    type: 'CrossFit',
    warmup: ['5 mins Jumping Jacks', '20 Arm Circles', '10 Bodyweight Squats'],
    exercises: ['4 Rounds:', '15 Burpees', '20 Kettlebell Swings', '15 Push-ups', '400m Run'],
    cooldown: ['Deep Lunge Stretch', 'Child’s Pose (1 min)', 'Shoulder Stretch']
  },
  'bodyweight-strength': {
    title: 'Strength Foundations',
    type: 'Bodyweight',
    warmup: ['Cat-Cow (10 reps)', 'High Knees (2 mins)', 'Leg Swings'],
    exercises: ['3 Sets of:', '15 Air Squats', '12 Diamond Push-ups', '20 Walking Lunges', '45 Sec Plank'],
    cooldown: ['Quad Stretch', 'Hamstring Stretch', 'Cobra Pose']
  },
  // FEBRUARY SPECIFIC - COUPLES PLAN
  // THU FEB 5
  'feb5-husb': {
    title: 'Freeletics (Moderate)',
    type: 'Bodyweight',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['2 Rounds:', 'Squats × 25', 'Push-ups × 12', 'Mountain climbers × 30', 'Plank × 40s'],
    cooldown: ['5-8 min Standard Routine']
  },
  'feb5-wife': {
    title: 'Freeletics (Easy)',
    type: 'Bodyweight',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['2 Rounds:', 'Squats × 15', 'Knee push-ups × 8', 'Marching in place × 30', 'Plank (knees) × 20s'],
    cooldown: ['5-8 min Standard Routine']
  },
  // FRI FEB 6
  'feb6-both': {
    title: 'Pilates (Pace-Adjusted)',
    type: 'Pilates',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['Pelvic tilts × 10', 'Dead bug × 6/side', 'Glute bridge × 12', 'Side-lying leg lifts × 10/side', 'Seated spine stretch × 6'],
    cooldown: ['5-8 min Standard Routine']
  },
  // MON FEB 9
  'feb9-husb': {
    title: 'Freeletics (Moderate)',
    type: 'Bodyweight',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['2 Rounds:', 'Jump squats × 15', 'Push-ups × 15', 'Sit-ups × 20', 'High knees × 40'],
    cooldown: ['5-8 min Standard Routine']
  },
  'feb9-wife': {
    title: 'Freeletics (Easy)',
    type: 'Bodyweight',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['2 Rounds:', 'Squats × 15', 'Incline push-ups × 8', 'Crunches × 10', 'Marching × 30'],
    cooldown: ['5-8 min Standard Routine']
  },
  // TUE FEB 10
  'feb10-both': {
    title: 'Pilates: Core Stability',
    type: 'Pilates',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['Cat–cow × 8', 'Heel slides × 10/side', 'Clamshells × 12/side', 'Arm circles (controlled) × 10', 'Child’s pose × 60s'],
    cooldown: ['5-8 min Standard Routine']
  },
  // WED FEB 11
  'feb11-both': {
    title: 'Recovery + Walk',
    type: 'Bodyweight', // Using as placeholder for recovery
    warmup: ['Brisk walk 20–30 min'],
    exercises: ['Light stretching 10 min'],
    cooldown: ['Breathe & Hydrate']
  },
  // THU FEB 12
  'feb12-husb': {
    title: 'Freeletics (Moderate)',
    type: 'Bodyweight',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['2 Rounds:', 'Lunges × 12/leg', 'Pike push-ups × 8', 'Mountain climbers × 40', 'Plank × 45s'],
    cooldown: ['5-8 min Standard Routine']
  },
  'feb12-wife': {
    title: 'Freeletics (Easy)',
    type: 'Bodyweight',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['2 Rounds:', 'Reverse lunges × 8/leg', 'Wall push-ups × 8', 'Step jacks × 30', 'Plank (knees) × 25s'],
    cooldown: ['5-8 min Standard Routine']
  },
  // FRI FEB 13
  'feb13-both': {
    title: 'Pilates: Flexibility',
    type: 'Pilates',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['Pelvic clock × 6', 'Glute bridge hold × 20s × 3', 'Side kick series × 8/side', 'Seated hamstring stretch × 45s/side'],
    cooldown: ['5-8 min Standard Routine']
  },
  // MON FEB 16
  'feb16-husb': {
    title: 'Freeletics (Moderate)',
    type: 'Bodyweight',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['3 Rounds:', 'Squats × 30', 'Push-ups × 15', 'Sit-ups × 25', 'Plank × 45s'],
    cooldown: ['5-8 min Standard Routine']
  },
  'feb16-wife': {
    title: 'Freeletics (Easy)',
    type: 'Bodyweight',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['2 Rounds:', 'Squats × 18', 'Knee push-ups × 10', 'Crunches × 12', 'Plank (knees) × 30s'],
    cooldown: ['5-8 min Standard Routine']
  },
  // TUE FEB 17
  'feb17-both': {
    title: 'Pilates: Flow',
    type: 'Pilates',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['Dead bug × 6/side', 'Single-leg glute bridge × 8/side', 'Standing roll-down × 6', 'Chest opener stretch × 45s'],
    cooldown: ['5-8 min Standard Routine']
  },
  // WED FEB 18
  'feb18-both': {
    title: 'Recovery + Walk',
    type: 'Bodyweight',
    warmup: ['Walk 25–35 min'],
    exercises: ['Mobility flow 10 min'],
    cooldown: ['Relax']
  },
  // THU FEB 19
  'feb19-husb': {
    title: 'Freeletics (Moderate)',
    type: 'Bodyweight',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['2 Rounds:', 'Burpees × 8', 'Jump squats × 20', 'Push-ups × 15', 'Plank × 60s'],
    cooldown: ['5-8 min Standard Routine']
  },
  'feb19-wife': {
    title: 'Freeletics (Easy)',
    type: 'Bodyweight',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['2 Rounds:', 'Step-back burpees × 5', 'Squats × 15', 'Incline push-ups × 10', 'Plank (knees) × 30s'],
    cooldown: ['5-8 min Standard Routine']
  },
  // FRI FEB 20
  'feb20-both': {
    title: 'Pilates: Core Twist',
    type: 'Pilates',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['Pelvic tilts × 10', 'Side-lying leg circles × 8/side', 'Spine twist supine × 6/side', 'Child’s pose × 60s'],
    cooldown: ['5-8 min Standard Routine']
  },
  // MON FEB 23
  'feb23-husb': {
    title: 'Freeletics (Moderate)',
    type: 'Bodyweight',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['3 Rounds:', 'Squats × 35', 'Push-ups × 18', 'Mountain climbers × 50', 'Plank × 60s'],
    cooldown: ['5-8 min Standard Routine']
  },
  'feb23-wife': {
    title: 'Freeletics (Easy)',
    type: 'Bodyweight',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['2 Rounds:', 'Squats × 20', 'Knee push-ups × 12', 'Marching × 40', 'Plank (knees) × 30s'],
    cooldown: ['5-8 min Standard Routine']
  },
  // TUE FEB 24
  'feb24-both': {
    title: 'Pilates: Alignment',
    type: 'Pilates',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['Cat–cow × 8', 'Dead bug × 6/side', 'Clamshells × 12/side', 'Seated spinal twist × 30s/side'],
    cooldown: ['5-8 min Standard Routine']
  },
  // WED FEB 25
  'feb25-both': {
    title: 'Recovery + Walk',
    type: 'Bodyweight',
    warmup: ['Walk 30–40 min'],
    exercises: ['Long stretch 10–15 min'],
    cooldown: ['Reset']
  },
  // THU FEB 26
  'feb26-husb': {
    title: 'Freeletics (Moderate)',
    type: 'Bodyweight',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['2 Rounds:', 'Burpees × 10', 'Squats × 30', 'Push-ups × 20', 'Sit-ups × 25'],
    cooldown: ['5-8 min Standard Routine']
  },
  'feb26-wife': {
    title: 'Freeletics (Easy)',
    type: 'Bodyweight',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['2 Rounds:', 'Step-back burpees × 6', 'Squats × 18', 'Incline push-ups × 12', 'Crunches × 15'],
    cooldown: ['5-8 min Standard Routine']
  },
  // FRI FEB 27
  'feb27-both': {
    title: 'Pilates (Reset)',
    type: 'Pilates',
    warmup: ['5-8 min Standard Routine'],
    exercises: ['Pelvic tilts × 10', 'Glute bridges × 15', 'Side-lying leg lifts × 12/side', 'Full-body stretch 10 min'],
    cooldown: ['5-8 min Standard Routine']
  },
  'recovery-base': {
    title: 'Rest & Recovery',
    type: 'Bodyweight',
    warmup: ['Deep Breathing'],
    exercises: ['Active Recovery / Foam Rolling'],
    cooldown: ['Hydration']
  }
};

export const RECIPES: Record<string, Recipe> = {
  // JANUARY RECIPES
  'bone-broth-stew': {
    id: 'bone-broth-stew',
    name: 'Rich Beef Bone Broth Stew',
    ingredients: ['Beef bones', 'Beef', 'Carrot', 'Onion', 'Garlic', 'Potatoes'],
    instructions: ['Roast bones.', 'Boil bones for 6 hours.', 'Sear beef.', 'Combine and slow cook.'],
    cookingTime: '10 hours', calories: 580, protein: 48, carbs: 30
  },
  'pork-roast': {
    id: 'pork-roast',
    name: 'Slow Cooker Pork & Garlic',
    ingredients: ['Pork meat', 'Garlic', 'Onion', 'Potatoes'],
    instructions: ['Rub pork with garlic.', 'Slow cook for 8 hours.'],
    cookingTime: '8 hours', calories: 620, protein: 52, carbs: 28
  },
  'salmon-cutlets': {
    id: 'salmon-cutlets',
    name: 'Salmon & Potato Cutlets',
    ingredients: ['Salmon', 'Mashed potatoes', 'Onion'],
    instructions: ['Mix and form patties.', 'Pan-fry until golden.'],
    cookingTime: '30 mins', calories: 410, protein: 28, carbs: 32
  },
  'beef-pasta-sauce': {
    id: 'beef-pasta-sauce',
    name: 'Slow Cooked Beef Pasta',
    ingredients: ['Beef', 'Pasta Sauce', 'Garlic'],
    instructions: ['Simmer beef in sauce for 3-6 hours.'],
    cookingTime: '6 hours', calories: 520, protein: 42, carbs: 34
  },
  
  // FEBRUARY RECIPES (NEW)
  'herb-chicken-roast': {
    id: 'herb-chicken-roast',
    name: 'Rosemary Roasted Chicken',
    ingredients: ['Chicken Thighs', 'Rosemary', 'Potatoes', 'Carrots', 'Olive Oil'],
    instructions: ['Season chicken and veggies with rosemary and salt.', 'Roast at 200C for 45 mins.'],
    cookingTime: '50 mins', calories: 480, protein: 38, carbs: 25
  },
  'garlic-pork-tenderloin': {
    id: 'garlic-pork-tenderloin',
    name: 'Garlic Butter Pork Tenderloin',
    ingredients: ['Pork Loin', 'Butter', 'Garlic', 'Green Beans'],
    instructions: ['Sear pork on all sides.', 'Bake with garlic butter for 20 mins.', 'Serve with steamed beans.'],
    cookingTime: '35 mins', calories: 450, protein: 44, carbs: 12
  },
  'beef-vegetable-stirfry': {
    id: 'beef-vegetable-stirfry',
    name: 'Healthy Beef & Veg Stir-Fry',
    ingredients: ['Beef strips', 'Broccoli', 'Bell Peppers', 'Soy Sauce', 'Ginger'],
    instructions: ['Stir-fry beef over high heat.', 'Add vegetables and ginger.', 'Finish with light soy sauce.'],
    cookingTime: '20 mins', calories: 390, protein: 36, carbs: 18
  },
  'chicken-lemon-soup': {
    id: 'chicken-lemon-soup',
    name: 'Chicken Lemon & Orzo Soup',
    ingredients: ['Chicken Breast', 'Orzo', 'Lemon Juice', 'Celery', 'Chicken Stock'],
    instructions: ['Simmer chicken in stock.', 'Add orzo and celery.', 'Stir in lemon juice before serving.'],
    cookingTime: '40 mins', calories: 350, protein: 30, carbs: 42
  },
  'slow-beef-pot-roast': {
    id: 'slow-beef-pot-roast',
    name: 'Zenith Slow Pot Roast',
    ingredients: ['Beef Chuck', 'Onions', 'Carrots', 'Beef Stock'],
    instructions: ['Sear beef.', 'Place in slow cooker with veggies and stock for 8 hours.'],
    cookingTime: '8 hours', calories: 510, protein: 42, carbs: 15
  },

  // CHILDREN'S FEBRUARY MEALS
  'baby-herb-chicken': {
    id: 'baby-herb-chicken',
    name: 'Mild Roasted Chicken & Potato',
    ingredients: ['Chicken Thigh', 'Potato', 'Carrot'],
    instructions: ['Cook chicken and veggies until soft.', 'Shred chicken finely, mash veggies.'],
    cookingTime: '45 mins'
  },
  'baby-pork-medallion': {
    id: 'baby-pork-medallion',
    name: 'Soft Pork & Green Bean Mash',
    ingredients: ['Pork Loin', 'Green Beans', 'Potato'],
    instructions: ['Steam until very soft.', 'Blend or mash with a bit of broth.'],
    cookingTime: '30 mins'
  },
  'baby-beef-stew-mild': {
    id: 'baby-beef-stew-mild',
    name: 'Gentle Beef & Carrot Puree',
    ingredients: ['Beef Chuck', 'Carrot', 'Beef Stock'],
    instructions: ['Slow cook until falling apart.', 'Blend into a smooth puree.'],
    cookingTime: '4 hours'
  },
  'baby-chicken-orzo': {
    id: 'baby-chicken-orzo',
    name: 'Chicken & Orzo Porridge',
    ingredients: ['Chicken Breast', 'Orzo', 'Chicken Stock'],
    instructions: ['Overcook orzo slightly in stock.', 'Mix with finely chopped chicken.'],
    cookingTime: '20 mins'
  }
};
