
import { Recipe, InventoryItem, Workout } from './types';

export const INVENTORY: InventoryItem[] = [
  { name: 'Beef Bones', quantity: '2kg' },
  { name: 'Beef', quantity: '4kg' },
  { name: 'Pork Meat', quantity: '3kg' },
  { name: 'Sausage', quantity: '1kg' },
  { name: 'Flour', quantity: '1kg (for biscuits/naan)' },
  { name: 'Potatoes', quantity: 'Bulk' },
  { name: 'Carrots', quantity: '3 large' },
  { name: 'Onions', quantity: 'Bulk' },
  { name: 'Garlic', quantity: 'Bulk' },
  { name: 'Pasta Sauce', quantity: 'Jars' },
  { name: 'Tomato Juice', quantity: 'Cartons' },
  { name: 'Spreads', quantity: 'Assorted (Nut butter, hummus, etc)' },
  { name: 'Sourdough Starter', quantity: 'Active' },
  { name: 'Cooked Salmon', quantity: 'For cutlets' },
  { name: 'Chicken Stock', quantity: 'Frozen', isFrozen: true },
  { name: 'Chicken Stew', quantity: 'Frozen', isFrozen: true },
  { name: 'Chicken Soup', quantity: 'Frozen', isFrozen: true },
  { name: 'Sarmale', quantity: 'Frozen (2-3 days worth)', isFrozen: true },
];

export const WORKOUTS: Record<string, Workout> = {
  'crossfit-alpha': {
    title: 'CrossFit: Power & Burn',
    type: 'CrossFit',
    warmup: ['5 mins Jumping Jacks', '20 Arm Circles', '10 Bodyweight Squats'],
    exercises: ['4 Rounds:', '15 Burpees', '20 Kettlebell Swings (or Weighted Bag)', '15 Push-ups', '400m Run (or 2 mins High Knees)'],
    cooldown: ['Deep Lunge Stretch', 'Child’s Pose (1 min)', 'Shoulder Stretch']
  },
  'bodyweight-strength': {
    title: 'Strength Foundations',
    type: 'Bodyweight',
    warmup: ['Cat-Cow (10 reps)', 'High Knees (2 mins)', 'Leg Swings'],
    exercises: ['3 Sets of:', '15 Air Squats', '12 Diamond Push-ups', '20 Walking Lunges', '45 Sec Plank'],
    cooldown: ['Quad Stretch', 'Hamstring Stretch', 'Cobra Pose']
  },
  'pilates-core': {
    title: 'Pilates: Precision Core',
    type: 'Pilates',
    warmup: ['The Hundred Prep', 'Neck Rolls', 'Spine Stretch Forward'],
    exercises: ['10 The Hundred', '15 Single Leg Circles (each)', '10 Rolling Like a Ball', '12 Scissor Kicks', '15 Glute Bridges'],
    cooldown: ['Butterfly Stretch', 'Seated Forward Fold', 'Deep Breathing (2 mins)']
  },
  'pilates-flow': {
    title: 'Total Body Pilates Flow',
    type: 'Pilates',
    warmup: ['Pelvic Tilts', 'Chest Lifts', 'Arm Reaches'],
    exercises: ['12 Leg Pull Front', '15 Side Leg Series', '10 Swan Dive', '20 Criss-Cross', '15 Plank Leg Lifts'],
    cooldown: ['Cat-Cow', 'Pigeon Pose', 'Wrist Circles']
  },
  'hiit-metcon': {
    title: 'HIIT MetCon Blast',
    type: 'CrossFit',
    warmup: ['Running on spot (3 mins)', 'Inchworms (5 reps)', 'Mountain Climbers (30 secs)'],
    exercises: ['EMOM (Every Minute on the Minute) 15 mins:', 'Min 1: 15 Goblet Squats', 'Min 2: 15 Sit-ups', 'Min 3: 10 Sprawls'],
    cooldown: ['Chest Stretch', 'Tricep Stretch', 'Calf Stretch']
  }
};

export const RECIPES: Record<string, Recipe> = {
  'frozen-sarmale': {
    id: 'frozen-sarmale',
    name: 'Reheated Frozen Sarmale',
    ingredients: ['Frozen sarmale', 'Tomato juice (optional)'],
    instructions: ['Thaw overnight.', 'Heat in a pot with a splash of tomato juice for moisture.', 'Simmer for 15-20 mins until hot.'],
    cookingTime: '20 mins',
    calories: 450,
    protein: 25,
    carbs: 35
  },
  'frozen-stew': {
    id: 'frozen-stew',
    name: 'Reheated Chicken Stew',
    ingredients: ['Frozen chicken stew', 'Potatoes (optional side)'],
    instructions: ['Thaw stew.', 'Reheat on stove.', 'Serve with a simple boiled potato if needed.'],
    cookingTime: '15 mins',
    calories: 420,
    protein: 32,
    carbs: 38
  },
  'frozen-soup': {
    id: 'frozen-soup',
    name: 'Reheated Chicken Soup',
    ingredients: ['Frozen chicken soup'],
    instructions: ['Thaw soup.', 'Bring to a gentle boil.', 'Serve warm with sourdough toast.'],
    cookingTime: '10 mins',
    calories: 280,
    protein: 18,
    carbs: 22
  },
  'bone-broth-stew': {
    id: 'bone-broth-stew',
    name: 'Rich Beef Bone Broth Stew',
    ingredients: ['2kg beef bones', '1kg beef', '1 carrot', '1 onion', 'Garlic', 'Potatoes'],
    instructions: ['Roast bones for 30 mins.', 'Boil bones with onion/carrot for 6 hours (or slow cook overnight) to make stock.', 'Sear beef cubes.', 'Combine beef, stock, and potato chunks. Slow cook for 4 hours.'],
    cookingTime: '10+ hours (passive)',
    calories: 580,
    protein: 48,
    carbs: 30
  },
  'pork-roast': {
    id: 'pork-roast',
    name: 'Slow Cooker Pork & Garlic',
    ingredients: ['1.5kg Pork meat', 'Garlic cloves', 'Onion', 'Potatoes'],
    instructions: ['Rub pork with garlic and salt.', 'Place in slow cooker with sliced onion and potatoes.', 'Cook on low for 8 hours until tender.'],
    cookingTime: '8 hours',
    calories: 620,
    protein: 52,
    carbs: 28
  },
  'salmon-cutlets': {
    id: 'salmon-cutlets',
    name: 'Salmon & Potato Cutlets',
    ingredients: ['Cooked salmon', 'Mashed potatoes', 'Onion', 'Flour (for dusting)'],
    instructions: ['Flake salmon and mix with cold mashed potatoes and minced onion.', 'Form into patties.', 'Dust with flour and pan-fry until golden.'],
    cookingTime: '30 mins',
    calories: 410,
    protein: 28,
    carbs: 32
  },
  'sausage-potato-hash': {
    id: 'sausage-potato-hash',
    name: 'Sheet Pan Sausage & Potato Roast',
    ingredients: ['500g Sausage', 'Potatoes', 'Onion', 'Garlic'],
    instructions: ['Slice sausages and cube potatoes.', 'Toss with onion, garlic, and oil.', 'Roast at 200C for 40 mins until crispy.'],
    cookingTime: '45 mins',
    calories: 680,
    protein: 22,
    carbs: 55
  },
  'beef-pasta-sauce': {
    id: 'beef-pasta-sauce',
    name: 'Slow Cooked Beef in Pasta Sauce',
    ingredients: ['1kg Beef', 'Pasta Sauce', 'Garlic', 'Onion'],
    instructions: ['Dice beef small.', 'Brown beef with onion/garlic.', 'Add pasta sauce and simmer for 3 hours (or slow cook 6 hours).', 'Serve with potatoes or homemade biscuits.'],
    cookingTime: '3-6 hours',
    calories: 520,
    protein: 42,
    carbs: 34
  },
  'beef-tomato-soup': {
    id: 'beef-tomato-soup',
    name: 'Beef & Tomato Hearty Soup',
    ingredients: ['1kg Beef', 'Tomato Juice', 'Carrot', 'Onion', 'Garlic'],
    instructions: ['Simmer beef in water/stock until tender.', 'Add diced carrots, onions, and garlic.', 'Pour in tomato juice and simmer another 30 mins.', 'Serve with sourdough.'],
    cookingTime: '2 hours',
    calories: 380,
    protein: 38,
    carbs: 24
  },
  'baby-beef-veggie': {
    id: 'baby-beef-veggie',
    name: 'Baby Beef & Root Veggie Puree',
    ingredients: ['50g Beef', '1/4 Carrot', '1/2 Potato', 'Beef Bone Broth'],
    instructions: ['Steam or slow-cook beef and veggies until very soft.', 'Blend with a few spoons of bone broth until smooth.', 'Freeze in ice cube trays for easy portions.'],
    cookingTime: '40 mins'
  },
  'baby-pork-potato': {
    id: 'baby-pork-potato',
    name: 'Baby Pork & Sweet Potato Mash',
    ingredients: ['50g Pork meat', '1 Potato', 'Tiny piece of Onion'],
    instructions: ['Boil pork, potato, and onion until tender.', 'Mash finely or blend with a little cooking water/stock.', 'Pork should be very finely shredded or pureed for an 8-month-old.'],
    cookingTime: '30 mins'
  },
  'baby-salmon-mash': {
    id: 'baby-salmon-mash',
    name: 'Baby Salmon & Potato Fluff',
    ingredients: ['30g Cooked Salmon', '1 Potato', '1/4 Carrot'],
    instructions: ['Mash the potato and carrot together.', 'Flake the salmon extremely finely, ensuring NO bones.', 'Mix together with a little breastmilk, formula, or warm water for smoothness.'],
    cookingTime: '15 mins'
  },
  'baby-veggie-broth-puree': {
    id: 'baby-veggie-broth-puree',
    name: 'Golden Veggie & Broth Puree',
    ingredients: ['1 Potato', '1/2 Carrot', 'Bone Broth'],
    instructions: ['Boil veggies in bone broth until falling apart.', 'Blend into a thick, nutrient-dense soup/puree.', 'Great for introducing savory bone broth flavors.'],
    cookingTime: '25 mins'
  }
};
