'use client';
import { motion } from 'framer-motion';
import styles from './About.module.css';

const About = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <motion.div 
        className={styles.aboutContent}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={styles.sectionTitle}>About Me</h2>
        <div className={styles.aboutText}>
          <p>
            I&apos;m a passionate web developer focused on creating responsive and user-friendly applications.
            With expertise in modern web technologies, I bring ideas to life through clean code and
            innovative solutions.
          </p>
        </div>
        
        <div className={styles.skills}>
          <h3>Technologies I Work With</h3>
          <div className={styles.skillsGrid}>
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'TailwindCSS', 'MongoDB'].map((skill) => (
              <span key={skill} className={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;