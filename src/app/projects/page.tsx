import React from 'react';

const projects = [
  {
    title: "Project 1",
    description: "Description of project 1",
    technologies: ["React", "Next.js", "TypeScript"],
    link: "#"
  },
  // Add more projects as needed
];

export default function ProjectPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="bg-white/5 backdrop-blur-lg rounded-lg p-6 hover:transform hover:scale-105 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-blue-500/20 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <a 
              href={project.link} 
              className="text-blue-400 hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
