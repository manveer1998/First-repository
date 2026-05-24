import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FavouriteButton } from "@/components/favourite-button";
import { NutrientStats } from "@/components/nutrient-stats";
import { perPortion } from "@/lib/search";
import type { FoodItem } from "@/lib/types";

function CarbStat({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="flex-1 rounded-lg bg-accent/60 px-3 py-2">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold leading-none text-accent-foreground">
          {value}
        </span>
        <span className="text-sm font-medium text-accent-foreground">g</span>
      </div>
      <div className="mt-0.5 text-xs font-medium text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export function FoodCard({ food }: { food: FoodItem }) {
  const portion = perPortion(food);

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold capitalize leading-snug">
            {food.name}
          </h3>
          <Badge variant="secondary" className="mt-1 font-normal">
            {food.category}
          </Badge>
        </div>
        <FavouriteButton kind="food" id={food.id} label={food.name} />
      </div>

      <div className="mt-3 flex gap-2">
        <CarbStat value={portion.carbs} label={`carbs · ${food.portionLabel}`} />
        <CarbStat value={food.carbsPer100g} label="carbs · per 100g" />
      </div>

      <NutrientStats
        className="mt-3"
        calories={food.caloriesPer100g}
        protein={food.proteinPer100g}
        fat={food.fatPer100g}
        suffix="/100g"
      />
    </Card>
  );
}
