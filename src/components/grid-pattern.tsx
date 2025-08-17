"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface GridPatternProps {
  className?: string;
  children?: React.ReactNode;
}

export function GridPattern({ className, children }: GridPatternProps) {
  return (
    <div className={cn("relative w-full min-h-screen bg-black", className)}>
      {/* Grid background: behind content, repeats and scrolls with page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(38,38,38,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(38,38,38,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundRepeat: "repeat",
          backgroundAttachment: "scroll",
          backgroundPosition: "0 0",
          opacity: 0.4,
          // no masks or radial overlays here
        }}
      />

      <div className="relative z-0">{children}</div>
    </div>
  );
}
