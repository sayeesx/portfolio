"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const CommitsGrid = ({ finalColor = "#48d55d" }) => {
  // 7x7 block patterns for each character
  // Grid: 1-7 (row 1), 8-14 (row 2), 15-21 (row 3), 22-28 (row 4), 29-35 (row 5), 36-42 (row 6), 43-49 (row 7)
  const letterPatterns = {
    // GitHub letters (keeping existing working patterns)
    G: [2,3,4,5,6,8,15,22,29,30,31,32,33,36,43,44,45,46,47,48],
    I: [2,3,4,5,6,10,17,24,31,38,44,45,46,47,48],
    T: [1,2,3,4,5,6,7,11,18,25,32,39,46],
    H: [1,7,8,14,15,21,22,23,24,25,26,27,28,29,35,36,42,43,49],
    U: [1,7,8,14,15,21,22,28,29,35,36,42,44,45,46,47,48],
    B: [1,2,3,4,5,6,8,14,15,16,17,18,19,22,28,29,30,31,32,33,36,42,43,44,45,46,47,49],
    
    // SAYEESX - Clear block letters
    S: [
      1,2,3,4,5,6,7,    // Top line (full width)
      8,                // Left side
      15,               // Left side
      22,23,24,25,26,27,28, // Middle line (full width)
      35,               // Right side
      42,               // Right side
      43,44,45,46,47,48,49  // Bottom line (full width)
    ],
    A: [
      // Proper A pattern in 7x7 grid
      // Row 1: 1,2,3,4,5,6,7
      // Row 2: 8,9,10,11,12,13,14  
      // Row 3: 15,16,17,18,19,20,21
      // Row 4: 22,23,24,25,26,27,28
      // Row 5: 29,30,31,32,33,34,35
      // Row 6: 36,37,38,39,40,41,42
      // Row 7: 43,44,45,46,47,48,49
      4,                    // Row 1: center top
      9,13,                 // Row 2: spread out
      16,20,                // Row 3: wider
      22,23,24,25,26,27,28, // Row 4: full crossbar
      29,35,                // Row 5: legs
      36,42,                // Row 6: legs
      43,49                 // Row 7: legs
    ],
    Y: [
      1,7,           // Top corners
      9,13,          // Moving in
      17,19,         // Moving in more
      25,            // Center
      32,            // Down center
      39,            // Down center
      46             // Bottom center
    ],
    E: [
      1,2,3,4,5,6,7,    // Top line
      8,                // Left side
      15,               // Left side
      22,23,24,25,26,27,28, // Middle line
      29,               // Left side
      36,               // Left side
      43,44,45,46,47,48,49  // Bottom line
    ],
    X: [
      1,7,           // Top corners
      9,13,          // Second row diagonal
      17,19,         // Third row diagonal
      25,            // Center
      31,33,         // Fifth row diagonal
      37,41,         // Sixth row diagonal
      43,49          // Bottom corners
    ],
    " ": [],
  };

  const cleanString = (str) =>
    str
      .toUpperCase()
      .normalize("NFD")
      .replace(/[^A-Z ]/g, "")
      .split("")
      .filter((char) => Object.keys(letterPatterns).includes(char))
      .join("");

  // Generate highlighted cells for text
  const generateHighlightedCells = (text) => {
    const cleaned = cleanString(text);
    const charWidth = 7;
    const charHeight = 7;
    const gap = 1;
    const width = cleaned.length * (charWidth + gap) + 2;
    const height = charHeight;
    let currentPosition = 1;
    const highlighted = [];
    
    cleaned.split("").forEach((char, i) => {
      if (letterPatterns[char]) {
        letterPatterns[char].forEach((pos) => {
          const row = Math.floor((pos - 1) / charWidth);
          const col = (pos - 1) % charWidth;
          highlighted.push(row * width + col + currentPosition);
        });
      }
      currentPosition += charWidth + gap;
    });
    
    return {
      cells: highlighted,
      width,
      height,
    };
  };

  const [currentPhase, setCurrentPhase] = React.useState(0); // 0: initial, 1: github, 2: fade out, 3: username
  const [animated, setAnimated] = React.useState({});
  const [fadingOut, setFadingOut] = React.useState({});

  const phases = [
    { text: "GITHUB", duration: 3000 },
    { text: "SAYEESX", duration: 0 }
  ];

  const currentText = phases[Math.min(currentPhase, phases.length - 1)]?.text || "GITHUB";
  const { cells, width, height } = generateHighlightedCells(currentText);

  const highlightColors = ["#48d55d", "#016d32", "#27ae60", "#6ee7b7"];
  const getRandomHighlight = () => highlightColors[Math.floor(Math.random() * highlightColors.length)];

  const getRandomColor = () => {
    const colors = ["#e5e7eb", "#d1fae5", "#f0fdf4"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomDelay = (index) => `${(Math.random() * 0.8 + index * 0.02).toFixed(2)}s`;
  const shouldFlash = () => Math.random() < 0.08;

  // Generate colors for all cells once per phase change
  const cellColors = React.useMemo(() => {
    const colors = {};
    for (let i = 0; i < width * height; i++) {
      colors[i] = getRandomHighlight();
    }
    return colors;
  }, [currentPhase, width, height]);

  React.useEffect(() => {
    // Start the animation sequence
    const startAnimation = setTimeout(() => {
      setCurrentPhase(1);
    }, 500);

    return () => clearTimeout(startAnimation);
  }, []);

  React.useEffect(() => {
    if (currentPhase === 1) {
      // Animate GITHUB
      const timeout = setTimeout(() => {
        const newAnimated = {};
        cells.forEach((idx, i) => {
          setTimeout(() => {
            setAnimated(prev => ({ ...prev, [idx]: true }));
          }, i * 50);
        });
      }, 700);

      // After GITHUB is shown, start fade out and transition to username
      const transitionTimeout = setTimeout(() => {
        setCurrentPhase(2);
        
        // Fade out current cells
        const fadeTimeout = setTimeout(() => {
          setFadingOut(animated);
          setAnimated({});
          
          // Show username after fade
          setTimeout(() => {
            setCurrentPhase(3);
            setFadingOut({});
          }, 800);
        }, 100);

        return () => clearTimeout(fadeTimeout);
      }, phases[0].duration);

      return () => {
        clearTimeout(timeout);
        clearTimeout(transitionTimeout);
      };
    }
  }, [currentPhase, cells]);

  React.useEffect(() => {
    if (currentPhase === 3) {
      // Animate username
      const timeout = setTimeout(() => {
        cells.forEach((idx, i) => {
          setTimeout(() => {
            setAnimated(prev => ({ ...prev, [idx]: true }));
          }, i * 40);
        });
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [currentPhase, cells]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {currentPhase < 2 ? "GitHub" : currentPhase === 2 ? "→" : "Username: sayeesx"}
        </h2>
        <p className="text-muted-foreground text-sm">
          {currentPhase < 2 ? "Showing GitHub commits visualization" : 
           currentPhase === 2 ? "Transitioning..." : 
           "Your commit history"}
        </p>
      </div>
      
      <section
        className="w-full max-w-4xl bg-card border grid p-1 sm:p-2 gap-0.5 sm:gap-1 rounded-[8px] sm:rounded-[12px] mx-auto transition-all duration-500"
        style={{
          gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${height}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: width * height }).map((_, index) => {
          const isHighlighted = cells.includes(index);
          const flash = !isHighlighted && shouldFlash();
          const isDone = animated[index];
          const isFadingOut = fadingOut[index];
          const highlightColor = cellColors[index];
          
          return (
            <div
              key={`${currentPhase}-${index}`}
              className={cn(
                `border w-4 h-4 rounded-[2px] sm:rounded-[2px] transition-all duration-500`,
                isHighlighted && !isDone ? "animate-pulse" : "",
                flash ? "animate-pulse" : "",
                isFadingOut ? "opacity-30 scale-95" : "",
                !isHighlighted && !flash && !isFadingOut ? "bg-card" : ""
              )}
              style={{
                animationDelay: isHighlighted ? getRandomDelay(cells.indexOf(index)) : getRandomDelay(index),
                "--highlight": isHighlighted ? highlightColor : getRandomColor(),
                backgroundColor: isHighlighted && isDone ? highlightColor : 
                               isFadingOut ? highlightColor : 
                               undefined,
                transform: isDone ? 'scale(1.05)' : isFadingOut ? 'scale(0.95)' : 'scale(1)',
                opacity: isFadingOut ? 0.3 : 1,
              }}
            />
          );
        })}
      </section>
      
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <div className={cn(
          "w-3 h-3 rounded-full transition-colors duration-300",
          currentPhase >= 1 ? "bg-green-500" : "bg-gray-300"
        )} />
        <span>GitHub</span>
        <div className="w-8 h-0.5 bg-gray-300" />
        <div className={cn(
          "w-3 h-3 rounded-full transition-colors duration-300",
          currentPhase >= 3 ? "bg-green-500" : "bg-gray-300"
        )} />
        <span>sayeesx</span>
      </div>
    </div>
  );
};

export default CommitsGrid;