"use client";

import * as React from "react";
import { Heart, Search, Store } from "lucide-react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { DisclaimerSplash } from "@/components/disclaimer-splash";
import { FooterDisclaimer } from "@/components/footer-disclaimer";
import { SearchTab } from "@/components/search-tab";
import { RestaurantsTab } from "@/components/restaurants-tab";
import { FavouritesTab } from "@/components/favourites-tab";

type TabKey = "search" | "restaurants" | "favourites";

const NAV: { key: TabKey; label: string; icon: typeof Search }[] = [
  { key: "search", label: "Search", icon: Search },
  { key: "restaurants", label: "Restaurants", icon: Store },
  { key: "favourites", label: "Favourites", icon: Heart },
];

export default function Home() {
  const [tab, setTab] = React.useState<TabKey>("search");

  return (
    <div className="flex h-[100dvh] flex-col bg-background">
      <DisclaimerSplash />

      {/* App bar */}
      <header className="flex items-center justify-between border-b px-4 py-3 pt-safe">
        <div>
          <h1 className="text-lg font-bold leading-none tracking-tight">
            Carb Reference
          </h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Carbs at a glance
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* Tab panels (kept mounted to preserve scroll & search state) */}
      <main className="relative flex-1 overflow-hidden">
        <TabPanel active={tab === "search"}>
          <SearchTab />
        </TabPanel>
        <TabPanel active={tab === "restaurants"}>
          <RestaurantsTab />
        </TabPanel>
        <TabPanel active={tab === "favourites"}>
          <FavouritesTab />
        </TabPanel>
      </main>

      <FooterDisclaimer />

      {/* Bottom navigation */}
      <nav className="flex border-t bg-background pb-safe">
        {NAV.map(({ key, label, icon: Icon }) => {
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon
                className={cn("h-6 w-6", active && "fill-primary/10")}
                strokeWidth={active ? 2.4 : 2}
              />
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function TabPanel({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("h-full overflow-y-auto", !active && "hidden")}
      aria-hidden={!active}
    >
      {children}
    </div>
  );
}
