"use client";

import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useFavourites } from "@/hooks/use-favourites";
import type { FavouriteKind } from "@/lib/types";

export function FavouriteButton({
  kind,
  id,
  label,
}: {
  kind: FavouriteKind;
  id: string;
  label: string;
}) {
  const { isFavourite, toggle, loaded } = useFavourites();
  const active = loaded && isFavourite(kind, id);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="shrink-0"
      aria-pressed={active}
      aria-label={
        active ? `Remove ${label} from favourites` : `Add ${label} to favourites`
      }
      onClick={() => toggle(kind, id)}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors",
          active
            ? "fill-destructive text-destructive"
            : "text-muted-foreground"
        )}
      />
    </Button>
  );
}
