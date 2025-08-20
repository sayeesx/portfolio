"use client"

import { useEffect, useState } from "react"
import SplitText from "./Hero-Animation/SplitText"
import styles from "./Hero.module.css"
import CVDownloadButton from "../Buttons/Button"

const roles = ["Student ✦", "AI engineer ✦", "Software Developer"]

const handleAnimationComplete = () => {
  // You can add any callback logic here if needed
}

export const Hero = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroInner}>
          {/* Fade-up animation wrapper */}
          <div className={mounted ? styles.fadeUp : styles.invisible}>
            <SplitText
              text="Hey, I am"
              className={styles.heroGreeting}
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
              onLetterAnimationComplete={handleAnimationComplete}
            />
            <SplitText
              text="Muhammed Sayees"
              className={`${styles.heroTitle} text-center`}
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />
            <div className={styles.heroSubHeading}>
              {roles.map(role => (
                <span key={role} className={styles.roleText}>{role}</span>
              ))}
            </div>
            <div style={{ height: "2rem" }} />
            <div className={styles.cvButton}>
              <CVDownloadButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
