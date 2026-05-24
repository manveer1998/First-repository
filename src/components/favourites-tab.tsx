"use client";

import { Heart } from "lucide-react";

import { FoodCard } from "@/components/food-card";
import { RestaurantItemCard } from "@/components/restaurants-tab";
import { useFavourites } from "@/hooks/use-favourites";
import { getFoodById, getRestaurantItemById } from "@/lib/search";

export function FavouritesTab() {
  const { favourites, loaded } = useFavourites();

  if (!loaded) return null;

  if (favourites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
          <Heart className="h-7 w-7 text-muted-foreground" />
        </div>
        <p className="font-medium">No favourites yet</p>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Tap the heart on any food or menu item to save it here for quick
          access.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 px-4 py-4">
      {favourites.map((fav) => {
        if (fav.kind === "food") {
          const food = getFoodById(fav.id);
          if (!food) return null;
          return <FoodCard key={`food-${fav.id}`} food={food} />;
        }
        const entry = getRestaurantItemById(fav.id);
        if (!entry) return null;
        return (
          <RestaurantItemCard
            key={`rest-${fav.id}`}
            item={entry.item}
            restaurantName={entry.restaurantName}
          />
        );
      })}
    </div>
  );
}
