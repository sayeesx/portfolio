'use client';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import styles from './PortfolioCard.module.css';

interface PortfolioCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  tags?: string[];
  delay?: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  description,
  imageUrl,
  demoUrl = "#",
  githubUrl = "#",
  tags = [],
  delay = 0,
}) => {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px 0px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
    >
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          {imageUrl ? (
            <motion.img 
              src={imageUrl} 
              alt={title}
              className={styles.image}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          ) : (
            <motion.div 
              className={styles.placeholderImage}
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span>{title.charAt(0)}</span>
            </motion.div>
          )}
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.overlayContent}>
              {demoUrl && (
                <motion.a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.overlayButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiExternalLink size={20} />
                  <span>View Demo</span>
                </motion.a>
              )}
              {githubUrl && (
                <motion.a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.overlayButton} ${styles.githubButton}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiGithub size={20} />
                  <span>View Code</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.contentInner}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          
          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <motion.span 
                  key={tag} 
                  className={styles.tag}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}
          
          <motion.div className={styles.links}>
            {demoUrl && (
              <motion.a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span>View Project</span>
                <FiArrowRight className={styles.linkIcon} />
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

export default PortfolioCard;
