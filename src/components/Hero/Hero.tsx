'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import styles from './Hero.module.css';
import ContainerTextFlip from "../Text Flip/container-text-flip";
import CVDownloadButton from '../ui/Button';

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Muhammed Sayees
          </motion.h1>
          <ContainerTextFlip className={styles.heroSubtitle} words={["Student", "AI Engineer", "Software Developer", "ML engineer"]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <CVDownloadButton />
          </motion.div>

        </div>
      </div>


    </section>
  );
};

export default Hero;
