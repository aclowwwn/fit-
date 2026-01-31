
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
  'pilates-core': {
    title: 'Pilates: Precision Core',
    type: 'Pilates',
    warmup: ['The Hundred Prep', 'Neck Rolls', 'Spine Stretch Forward'],
    exercises: ['10 The Hundred', '15 Single Leg Circles', '10 Rolling Like a Ball', '12 Scissor Kicks'],
    cooldown: ['Butterfly Stretch', 'Seated Forward Fold']
  },
  'pilates-flow': {
    title: 'Total Body Pilates Flow',
    type: 'Pilates',
    warmup: ['Pelvic Tilts', 'Chest Lifts', 'Arm Reaches'],
    exercises: ['12 Leg Pull Front', '15 Side Leg Series', '10 Swan Dive', '20 Criss-Cross'],
    cooldown: ['Cat-Cow', 'Pigeon Pose']
  },
  'hiit-metcon': {
    title: 'HIIT MetCon Blast',
    type: 'CrossFit',
    warmup: ['Running on spot (3 mins)', 'Inchworms (5 reps)', 'Mountain Climbers (30 secs)'],
    exercises: ['EMOM 15 mins:', 'Min 1: 15 Goblet Squats', 'Min 2: 15 Sit-ups', 'Min 3: 10 Sprawls'],
    cooldown: ['Chest Stretch', 'Tricep Stretch', 'Calf Stretch']
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
