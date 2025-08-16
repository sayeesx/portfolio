 'use client';

 import React, { useState, useEffect } from "react";

// Define the props type
 interface TypeWriterProps {
  text: string;
  onComplete?: () => void;
  onCharacterTyped?: () => void;
}

export default function TypeWriter({
  text,
  onComplete,
  onCharacterTyped,
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
        if (onCharacterTyped) onCharacterTyped();
      }, 15); // typing speed

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete, onCharacterTyped]);

  return (
    <span className="typing-text">
      {displayedText}
      <span className="cursor"></span>
    </span>
  );
}
