'use client';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero/Hero';

// Dynamically import FloatingChatButton to avoid SSR issues with the chat widget
const FloatingChatButton = dynamic(
  () => import('@/components/FloatingChatButton'),
  { ssr: false }
);
import PortfolioCard from '@/components/PortfolioCard/PortfolioCard';
import styles from './page.module.css';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Hero />
      
      <section id="about" className={`${styles.section} ${styles.aboutSection}`}>
        <div className="container">
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          <div className={styles.aboutContent}>
            <motion.div 
              className={styles.aboutText}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p>
                I’m a passionate Full-Stack Developer with expertise in modern web technologies. 
                I love creating beautiful, responsive, and user-friendly applications that solve 
                real-world problems.
              </p>
              <p>
                With a strong foundation in both front-end and back-end development, 
                I bring ideas to life through clean, efficient, and maintainable code.
              </p>
              <div className={styles.skills}>
                <h3>Skills & Technologies</h3>
                <div className={styles.skillsGrid}>
                  {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL', 'AWS', 'Docker', 'Git'].map((skill) => (
                    <motion.span 
                      key={skill} 
                      className={styles.skillTag}
                      whileHover={{ y: -3, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section id="projects" className={`${styles.section} ${styles.projectsSection}`}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
            <p className={styles.sectionSubtitle}>Some of my recent work and side projects</p>
          </motion.div>
          
          <div className={styles.projectsGrid}>
            <PortfolioCard
              title="Modern E-commerce Platform"
              description="A full-stack e-commerce solution with product listings, cart functionality, and secure checkout process."
              tags={['Next.js', 'Node.js', 'MongoDB', 'Stripe']}
              demoUrl="#"
              githubUrl="#"
              delay={0.1}
            />
            
            <PortfolioCard
              title="Task Management App"
              description="A collaborative task management application with real-time updates and team collaboration features."
              tags={['React', 'Firebase', 'Redux', 'Material-UI']}
              demoUrl="#"
              githubUrl="#"
              delay={0.2}
            />
            
            <PortfolioCard
              title="AI-Powered Blog Platform"
              description="A content management system with AI-powered content suggestions and analytics dashboard."
              tags={['Python', 'Django', 'React', 'OpenAI API']}
              demoUrl="#"
              githubUrl="#"
              delay={0.3}
            />
          </div>
          
          <motion.div 
            className={styles.viewMore}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/projects" className="btn">
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>
      
      <section id="contact" className={`${styles.section} ${styles.contactSection}`}>
        <div className="container">
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h2>
          <motion.div 
            className={styles.contactContent}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p>
              I’m currently looking for new opportunities. Whether you have a question or just want to say hi, 
              I’ll do my best to get back to you!
            </p>
            <motion.a 
              href="mailto:your.email@example.com" 
              className="btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Say Hello
            </motion.a>
          </motion.div>
        </div>
      </section>
      <FloatingChatButton />
    </main>
  );
}
