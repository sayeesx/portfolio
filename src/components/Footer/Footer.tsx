'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import styles from './Footer.module.css';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: <FaGithub />,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: <FaLinkedin />,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: <FaTwitter />,
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: <FaEnvelope />,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <motion.div 
          className={styles.footerContent}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.topSection}>
            <div className={styles.brand}>
              <h3 className={styles.logo}>Portfolio</h3>
              <p className={styles.tagline}>
                Creating beautiful, responsive web experiences with modern technologies.
              </p>
            </div>

            <div className={styles.links}>
              <div className={styles.linksGroup}>
                <h4 className={styles.linksTitle}>Navigation</h4>
                <ul className={styles.linksList}>
                  <li><Link href="#home" className={styles.link}>Home</Link></li>
                  <li><Link href="#about" className={styles.link}>About</Link></li>
                  <li><Link href="#projects" className={styles.link}>Projects</Link></li>
                  <li><Link href="#contact" className={styles.link}>Contact</Link></li>
                </ul>
              </div>
              
              <div className={styles.linksGroup}>
                <h4 className={styles.linksTitle}>Connect</h4>
                <ul className={styles.socialLinks}>
                  {socialLinks.map((social) => (
                    <li key={social.name}>
                      <a 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.socialLink}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.bottomSection}>
            <p className={styles.copyright}>
              &copy; {currentYear} Portfolio. All rights reserved.
            </p>
            <div className={styles.legalLinks}>
              <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
              <span className={styles.divider}>•</span>
              <Link href="/terms" className={styles.legalLink}>Terms of Service</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
