"use client";

import * as React from "react";

const STORAGE_KEY = "carbref:recent-searches:v1";
const MAX_RECENT = 10;

export function useRecentSearches() {
  const [recent, setRecent] = React.useState<string[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setRecent(parsed.slice(0, MAX_RECENT));
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
    } catch {
      // ignore
    }
  }, [recent, loaded]);

  const addRecent = React.useCallback((term: string) => {
    const t = term.trim();
    if (!t) return;
    setRecent((prev) => {
      const deduped = prev.filter(
        (item) => item.toLowerCase() !== t.toLowerCase()
      );
      return [t, ...deduped].slice(0, MAX_RECENT);
    });
  }, []);

  const clearRecent = React.useCallback(() => setRecent([]), []);

  return { recent, addRecent, clearRecent, loaded };
}
