'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'About', path: '#about' },
  { name: 'Projects', path: '#projects' },
  { name: 'Contact', path: '#contact' },
];

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <motion.div
        className={styles.navbarContainer}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.logoPlaceholder}></div>
        <nav className={styles.navList} aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} className={styles.navLink}>
              {link.name}
              <span className={styles.activeIndicator} />
            </Link>
          ))}
          <Link href="#contact" className={`${styles.navLink} ${styles.active}`}>
            <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              Hire Me
            </motion.span>
          </Link>
        </nav>
      </motion.div>
    </header>
  );
};

export default Navbar;
