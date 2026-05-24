"use client";

import * as React from "react";
import { Search, X, Clock } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FoodCard } from "@/components/food-card";
import { searchFoods } from "@/lib/search";
import { useRecentSearches } from "@/hooks/use-recent-searches";

export function SearchTab() {
  const [query, setQuery] = React.useState("");
  const { recent, addRecent, clearRecent } = useRecentSearches();

  const results = React.useMemo(() => searchFoods(query), [query]);
  const trimmed = query.trim();

  function commit(term: string) {
    if (term.trim().length >= 2) addRecent(term);
  }

  return (
    <div className="flex flex-col">
      {/* Sticky search bar */}
      <div className="sticky top-0 z-10 border-b bg-background/95 px-4 py-3 backdrop-blur">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            commit(query);
            (e.currentTarget.querySelector("input") as HTMLInputElement)?.blur();
          }}
          role="search"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              inputMode="search"
              autoComplete="off"
              enterKeyHint="search"
              placeholder="Search foods, e.g. rice, banana, bread"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => commit(query)}
              className="pl-10 pr-10"
              aria-label="Search foods"
            />
            {trimmed.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="px-4 py-4">
        {trimmed.length === 0 ? (
          <RecentSearches
            recent={recent}
            onPick={(term) => setQuery(term)}
            onClear={clearRecent}
          />
        ) : results.length === 0 ? (
          <EmptyResults query={trimmed} />
        ) : (
          <>
            <p className="mb-3 text-sm text-muted-foreground">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
            <div className="space-y-3">
              {results.map((food) => (
                <FoodCard key={food.id} food={food} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function RecentSearches({
  recent,
  onPick,
  onClear,
}: {
  recent: string[];
  onPick: (term: string) => void;
  onClear: () => void;
}) {
  if (recent.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
          <Search className="h-7 w-7 text-muted-foreground" />
        </div>
        <p className="font-medium">Search for any food</p>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Type a name to see carbs per 100g and per common portion.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Clock className="h-4 w-4" />
          Recent searches
        </div>
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {recent.map((term) => (
          <button
            key={term}
            onClick={() => onPick(term)}
            className="rounded-full border bg-secondary px-4 py-2 text-sm font-medium capitalize text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}

function EmptyResults({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="font-medium">No matches for &ldquo;{query}&rdquo;</p>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        Try a simpler term, or check the Restaurants tab.
      </p>
    </div>
  );
}
