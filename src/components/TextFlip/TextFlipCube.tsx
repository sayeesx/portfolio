"use client"

import { useState, useEffect } from "react"

interface TextFlipCubeProps {
  words: string[]
  duration?: number
  className?: string
}

const TextFlipCube = ({ words, duration = 2000, className = "" }: TextFlipCubeProps) => {
  const [rotationCount, setRotationCount] = useState(0)

  useEffect(() => {
    console.log("[v0] Starting animation with words:", words)
    const interval = setInterval(() => {
      setRotationCount((prev) => {
        const newCount = prev + 1
        console.log("[v0] Rotation count:", newCount, "Current word:", words[newCount % words.length])
        return newCount
      })
    }, duration)

    return () => clearInterval(interval)
  }, [words, duration]) // Updated to include words and duration directly

  const currentWordIndex = rotationCount % words.length
  const currentWord = words[currentWordIndex]

  const rotationAngle = rotationCount * 90

  console.log("[v0] Rendering - rotationAngle:", rotationAngle, "currentWord:", currentWord)

  return (
    <div className={`cube-container ${className}`}>
      <div
        className="cube"
        style={{
          transform: `rotateX(-${rotationAngle}deg)`,
        }}
      >
        {[0, 1, 2, 3].map((faceIndex) => {
          const wordIndex = (currentWordIndex + faceIndex) % words.length
          const word = words[wordIndex]
          return (
            <div
              key={`face-${faceIndex}`}
              className="cube-face"
              style={{
                transform: `rotateX(${faceIndex * 90}deg) translateZ(2rem)`,
              }}
            >
              {word}
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .cube-container {
          perspective: 300px;
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .cube {
          position: relative;
          width: 100%;
          height: 4rem;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cube-face {
          position: absolute;
          width: 100%;
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: hidden;
          font-weight: 600;
          white-space: nowrap;
          left: 0;
          top: 0;
        }

        @media (max-width: 768px) {
          .cube-container {
            height: 3rem;
          }
          
          .cube {
            height: 3rem;
          }
          
          .cube-face {
            height: 3rem;
          }
        }

        @media (max-width: 480px) {
          .cube-container {
            height: 2.5rem;
          }
          
          .cube {
            height: 2.5rem;
          }
          
          .cube-face {
            height: 2.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default TextFlipCube
