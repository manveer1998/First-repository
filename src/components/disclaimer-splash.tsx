"use client";

import * as React from "react";
import { HeartPulse } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STORAGE_KEY = "carbref:disclaimer-accepted:v1";

export function DisclaimerSplash() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const accepted = window.localStorage.getItem(STORAGE_KEY) === "true";
      if (!accepted) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  function accept() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    setOpen(false);
  }

  return (
    <Dialog open={open}>
      <DialogContent
        hideClose
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="max-w-sm"
      >
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <HeartPulse className="h-7 w-7" />
          </div>
          <DialogTitle className="text-center text-xl">
            Carb Reference
          </DialogTitle>
          <DialogDescription className="text-center text-base leading-relaxed text-foreground">
            This app is a{" "}
            <span className="font-semibold">carb look-up tool only</span>.
          </DialogDescription>
        </DialogHeader>
        <p className="rounded-lg bg-muted p-4 text-center text-sm leading-relaxed text-muted-foreground">
          Carb reference only. Not medical advice. Always verify with your
          diabetes care team. It does not provide insulin, dosing, or blood
          glucose guidance.
        </p>
        <Button size="lg" className="w-full" onClick={accept}>
          I understand
        </Button>
      </DialogContent>
    </Dialog>
  );
}
