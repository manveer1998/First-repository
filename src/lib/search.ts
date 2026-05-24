import Fuse from "fuse.js";

import { foods } from "@/data/foods";
import { restaurants } from "@/data/restaurants";
import type { FoodItem, RestaurantItem } from "@/lib/types";

const foodFuse = new Fuse(foods, {
  keys: [
    { name: "name", weight: 0.8 },
    { name: "category", weight: 0.2 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 1,
});

/** Fuzzy food search — "ric" -> "Rice, white", "Rice, brown", etc. */
export function searchFoods(query: string, limit = 60): FoodItem[] {
  const q = query.trim();
  if (!q) return [];
  return foodFuse.search(q, { limit }).map((r) => r.item);
}

// --- Lookup maps for resolving favourites by id ---

const foodMap = new Map<string, FoodItem>(foods.map((f) => [f.id, f]));

const restaurantItemMap = new Map<
  string,
  { item: RestaurantItem; restaurantName: string }
>();
for (const r of restaurants) {
  for (const item of r.items) {
    restaurantItemMap.set(item.id, { item, restaurantName: r.name });
  }
}

export function getFoodById(id: string): FoodItem | undefined {
  return foodMap.get(id);
}

export function getRestaurantItemById(id: string) {
  return restaurantItemMap.get(id);
}

/** Carbs (and other nutrients) scaled to a food's common portion. */
export function perPortion(food: FoodItem) {
  const factor = food.portionGrams / 100;
  return {
    carbs: Math.round(food.carbsPer100g * factor),
    calories: Math.round(food.caloriesPer100g * factor),
    protein: Math.round(food.proteinPer100g * factor * 10) / 10,
    fat: Math.round(food.fatPer100g * factor * 10) / 10,
  };
}
