'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={`${styles.blob} ${styles.blobPurple}`} />
        <div className={`${styles.blob} ${styles.blobBlue} ${styles.delay2000}`} />
        <div className={`${styles.blob} ${styles.blobPink} ${styles.delay4000}`} />
      </div>

      <div className={styles.heroContainer}>
        <div className={styles.heroInner}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.block}>Building Bold</span>
            <span className={styles.gradientText}>AI & Software</span>
            <span className={styles.gradientText}>Solutions</span>
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            I design and develop cutting-edge AI-powered tools, web applications, and digital
            experiences that solve complex problems.
          </motion.p>

          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="#projects" className={styles.ctaButton}>
              View My Work
              <FiArrowRight className={styles.ctaIcon} />
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        className={styles.scrollPrompt}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span>Scroll down</span>
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  );
};

export default Hero;
