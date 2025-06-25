"use client";
import React from "react";

export default function LogoCarousel({ logos }) {
  return (
    <div className="flex flex-nowrap items-center justify-start gap-12 overflow-x-auto px-4 py-2">
      {logos.map((logo, index) => {
        const LogoComponent = logo.img;
        return (
          <div
            key={index}
            className="shimmer-container relative h-8 w-20 flex-shrink-0 md:h-10 md:w-24"
            style={{ "--shimmer-delay": `${index * 0.2}s` }}
          >
            <LogoComponent />
          </div>
        );
      })}
    </div>
  );
} 