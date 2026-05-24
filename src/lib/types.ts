// Core data model for the carb reference tool.
// All nutrition values are approximate, for reference only — never dosing.

/** A generic food from the reference database (values per 100g + one common portion). */
export interface FoodItem {
  id: string;
  name: string;
  category: string;
  /** grams of carbohydrate per 100g */
  carbsPer100g: number;
  caloriesPer100g: number;
  proteinPer100g: number;
  fatPer100g: number;
  /** Label for a common serving, e.g. "1 slice", "1 medium". */
  portionLabel: string;
  /** Weight of that common serving in grams (used to derive per-portion carbs). */
  portionGrams: number;
}

export type RestaurantCategory = "Mains" | "Sides" | "Drinks" | "Desserts";

/** A single menu item at a restaurant (values are per item as sold). */
export interface RestaurantItem {
  id: string;
  name: string;
  category: RestaurantCategory;
  carbs: number;
  calories: number;
  protein: number;
  fat: number;
  /** Optional serving note, e.g. "Tall, semi-skimmed" or "Regular". */
  serving?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  /** Short note about portion conventions / source. */
  note?: string;
  items: RestaurantItem[];
}

/** A favourite points at either a generic food or a specific restaurant item. */
export type FavouriteKind = "food" | "restaurant";

export interface FavouriteRef {
  kind: FavouriteKind;
  id: string;
}
