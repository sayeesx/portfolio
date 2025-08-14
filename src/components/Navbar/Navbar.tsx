'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'About', path: '#about' },
  { name: 'Projects', path: '#projects' },
  { name: 'Contact', path: '#contact' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.logo}>
          MUHAMMED SAYEES
        </Link>

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

        <button
          className={styles.menuButton}
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          ☰
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className={`${styles.nav} ${styles.active}`}
          >
            <nav className={styles.navList} aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={styles.navLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                className={`${styles.navLink} ${styles.active}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Hire Me
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
