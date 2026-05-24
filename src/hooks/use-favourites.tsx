"use client";

import * as React from "react";

import type { FavouriteKind, FavouriteRef } from "@/lib/types";

const STORAGE_KEY = "carbref:favourites:v1";

interface FavouritesContextValue {
  favourites: FavouriteRef[];
  isFavourite: (kind: FavouriteKind, id: string) => boolean;
  toggle: (kind: FavouriteKind, id: string) => void;
  loaded: boolean;
}

const FavouritesContext = React.createContext<FavouritesContextValue | null>(
  null
);

export function FavouritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favourites, setFavourites] = React.useState<FavouriteRef[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setFavourites(parsed);
      }
    } catch {
      // ignore corrupt / unavailable storage
    }
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {
      // ignore quota / unavailable storage
    }
  }, [favourites, loaded]);

  const isFavourite = React.useCallback(
    (kind: FavouriteKind, id: string) =>
      favourites.some((f) => f.kind === kind && f.id === id),
    [favourites]
  );

  const toggle = React.useCallback((kind: FavouriteKind, id: string) => {
    setFavourites((prev) => {
      const exists = prev.some((f) => f.kind === kind && f.id === id);
      if (exists) {
        return prev.filter((f) => !(f.kind === kind && f.id === id));
      }
      return [{ kind, id }, ...prev];
    });
  }, []);

  const value = React.useMemo(
    () => ({ favourites, isFavourite, toggle, loaded }),
    [favourites, isFavourite, toggle, loaded]
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const ctx = React.useContext(FavouritesContext);
  if (!ctx) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return ctx;
}
