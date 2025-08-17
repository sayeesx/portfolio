'use client';
import { motion } from 'framer-motion';
import styles from './Projects.module.css';

const projects = [
	{
		title: 'Project 1',
		description: 'Description of project 1',
		tech: ['React', 'Node.js', 'MongoDB'],
		image: '/project1.jpg',
		link: '#',
	},
	// Add more projects here
];

const Projects = () => {
	return (
		<section id="projects" className={styles.projectsSection}>
			<motion.div
				className={styles.sectionHeader}
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
			>
				<h2 className={styles.sectionTitle}>My Projects</h2>
				<p className={styles.sectionSubtitle}>Here&apos;s some projects...</p>
			</motion.div>

			<div className={styles.projectsGrid}>
				{projects.map((project, index) => (
					<motion.div
						key={index}
						className={styles.projectCard}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
					>
						<div className={styles.projectContent}>
							<h3>{project.title}</h3>
							<p>{project.description}</p>
							<div className={styles.techStack}>
								{project.tech.map((tech) => (
									<span key={tech} className={styles.techTag}>
										{tech}
									</span>
								))}
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default Projects;