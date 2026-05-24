import { cn } from "@/lib/utils";

/** Secondary nutrient row: calories / protein / fat. Carbs are shown separately and prominently. */
export function NutrientStats({
  calories,
  protein,
  fat,
  suffix,
  className,
}: {
  calories: number;
  protein: number;
  fat: number;
  /** e.g. "/100g" or "" */
  suffix?: string;
  className?: string;
}) {
  const s = suffix ?? "";
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground",
        className
      )}
    >
      <span>
        <span className="font-medium text-foreground">{calories}</span> kcal
        {s}
      </span>
      <span aria-hidden className="text-border">
        •
      </span>
      <span>
        P <span className="font-medium text-foreground">{protein}g</span>
      </span>
      <span aria-hidden className="text-border">
        •
      </span>
      <span>
        F <span className="font-medium text-foreground">{fat}g</span>
      </span>
    </div>
  );
}
