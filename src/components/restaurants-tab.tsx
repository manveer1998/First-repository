"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FavouriteButton } from "@/components/favourite-button";
import { NutrientStats } from "@/components/nutrient-stats";
import { restaurants } from "@/data/restaurants";
import type { Restaurant, RestaurantCategory, RestaurantItem } from "@/lib/types";

const ALL_CATEGORIES: RestaurantCategory[] = [
  "Mains",
  "Sides",
  "Drinks",
  "Desserts",
];

export function RestaurantsTab() {
  const [activeId, setActiveId] = React.useState(restaurants[0]?.id);
  const [filter, setFilter] = React.useState<RestaurantCategory | "All">("All");

  const active: Restaurant | undefined = React.useMemo(
    () => restaurants.find((r) => r.id === activeId),
    [activeId]
  );

  const presentCategories = React.useMemo(() => {
    if (!active) return [];
    return ALL_CATEGORIES.filter((c) =>
      active.items.some((i) => i.category === c)
    );
  }, [active]);

  const items = React.useMemo(() => {
    if (!active) return [];
    return filter === "All"
      ? active.items
      : active.items.filter((i) => i.category === filter);
  }, [active, filter]);

  function selectRestaurant(id: string) {
    setActiveId(id);
    setFilter("All");
  }

  return (
    <div className="flex flex-col">
      {/* Restaurant picker */}
      <div className="sticky top-0 z-10 space-y-3 border-b bg-background/95 px-4 py-3 backdrop-blur">
        <div className="grid grid-cols-2 gap-2">
          {restaurants.map((r) => (
            <button
              key={r.id}
              onClick={() => selectRestaurant(r.id)}
              className={cn(
                "rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                r.id === activeId
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Category filter */}
        {presentCategories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <FilterChip
              label="All"
              active={filter === "All"}
              onClick={() => setFilter("All")}
            />
            {presentCategories.map((c) => (
              <FilterChip
                key={c}
                label={c}
                active={filter === c}
                onClick={() => setFilter(c)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="px-4 py-4">
        {active?.note && (
          <p className="mb-3 text-xs text-muted-foreground">{active.note}</p>
        )}
        <div className="space-y-3">
          {items.map((item) => (
            <RestaurantItemCard
              key={item.id}
              item={item}
              restaurantName={active!.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {label}
    </button>
  );
}

export function RestaurantItemCard({
  item,
  restaurantName,
}: {
  item: RestaurantItem;
  restaurantName: string;
}) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold leading-snug">{item.name}</h3>
        <div className="mt-0.5 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="font-normal">
            {restaurantName}
          </Badge>
          <Badge variant="outline" className="font-normal">
            {item.category}
          </Badge>
          {item.serving && (
            <span className="text-xs text-muted-foreground">
              {item.serving}
            </span>
          )}
        </div>
        <NutrientStats
          className="mt-2"
          calories={item.calories}
          protein={item.protein}
          fat={item.fat}
        />
      </div>

      <div className="flex flex-col items-end gap-1">
        <div className="rounded-lg bg-accent/60 px-3 py-1.5 text-right">
          <div className="flex items-baseline gap-0.5">
            <span className="text-2xl font-bold leading-none text-accent-foreground">
              {item.carbs}
            </span>
            <span className="text-sm font-medium text-accent-foreground">
              g
            </span>
          </div>
          <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            carbs
          </div>
        </div>
        <FavouriteButton kind="restaurant" id={item.id} label={item.name} />
      </div>
    </Card>
  );
}
