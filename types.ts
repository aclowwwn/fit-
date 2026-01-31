
export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  calories?: number;
  protein?: number;
  carbs?: number;
}

export interface Workout {
  title: string;
  type: 'CrossFit' | 'Bodyweight' | 'Pilates';
  warmup: string[];
  exercises: string[];
  cooldown: string[];
}

export interface MealPlanDay {
  date: number; // 1 to 31
  month: number; // 0 for Jan, 1 for Feb
  dayOfWeek: string;
  isCookingDay: boolean;
  lunch: {
    name: string;
    description: string;
  };
  dinner: {
    name: string;
    recipeId: string;
    isLeftover?: boolean;
    leftoverFrom?: number;
  };
  snack: {
    name: string;
    description: string;
  };
  babyMeal?: {
    name: string;
    description: string;
    recipeId: string;
  };
  husbandWorkout: Workout;
  wifeWorkout: Workout;
}

export interface InventoryItem {
  name: string;
  quantity: string;
  isFrozen?: boolean;
}
