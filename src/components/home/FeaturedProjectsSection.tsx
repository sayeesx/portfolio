import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useMemo, memo } from "react";

const projects = [
  {
    title: "Lune - AI Health Assistant",
    description: "Intelligent healthcare platform providing AI-powered medical consultations, prescription analysis, medication guidance, lab result interpretation, medical imaging analysis, and symptom assessment to revolutionize personal healthcare management.",
    image: "/assets/lune.png",
    techStack: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
    ]
  },
  {
    title: "miznet - Smart Inventory Management",
    description: "AI-driven inventory management system using blockchain and machine learning to automatically eliminate stockouts, manage product expiry dates, and handle restocking operations without human intervention.",
    image: "/assets/miznet.png",
    techStack: [
      { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
      { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
    ]
  },
  {
    title: "loan.ly - Secure AI Banking Platform",
    description: "Next-generation banking platform combining artificial intelligence for personalized financial insights, blockchain technology for transaction verification, and cryptocurrency integration for enhanced security and protection.",
    image: "/assets/loanly.png",
    techStack: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
    ]
  }
];

const ProjectCard = memo(({ project, idx, isExpanded, onToggle, onNavigate }: {
  project: typeof projects[0];
  idx: number;
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) => {
  return (
    <div 
      className="group relative drop-shadow-xl w-full h-[450px] overflow-visible rounded-xl bg-black border border-white/20 transition-colors duration-300"
    >
      <div className="absolute flex flex-col items-start justify-start text-white z-10 rounded-xl inset-0.5 bg-black/30 backdrop-blur-[2px] p-6">
        {!isExpanded && (
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden flex-shrink-0">
            <div className="w-full h-full flex items-center justify-center bg-gray-700">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute -top-1 -right-1 z-50 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] font-bold rounded-md shadow-lg border border-orange-400/50">
              <span className="tracking-wider">FEATURED</span>
            </div>
          </div>
        )}
        
        <h3 className="text-lg font-bold mb-2 flex-shrink-0">{project.title}</h3>
        
        <div className="mb-2 flex-shrink-0">
          <p className={`text-sm text-gray-400 transition-all duration-300 ease-in-out ${isExpanded ? '' : 'line-clamp-2'}`}>
            {project.description}
          </p>
        </div>
        
        <button 
          type="button"
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors mb-3 underline cursor-pointer flex-shrink-0"
          onClick={onToggle}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
        
        <div className="flex items-center justify-between gap-3 mt-auto flex-shrink-0">
          <div className="flex items-center gap-1 flex-shrink-0">
            {project.techStack.map((tech, techIdx) => (
              <div 
                key={techIdx}
                className="relative w-6 h-6 flex items-center justify-center"
                style={{
                  marginLeft: techIdx > 0 ? '-6px' : '0',
                  zIndex: project.techStack.length - techIdx
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 rounded-full" />
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-5 h-5 object-contain relative z-10"
                  title={tech.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
          
          <button 
            type="button" 
            onClick={onNavigate}
            className="flex justify-center gap-1.5 items-center text-xs bg-black font-semibold border-white relative z-10 px-3 py-1.5 border-2 rounded-full text-white hover:bg-white/10 transition-colors"
          >
            View Project
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default function FeaturedProjectsSection() {
  const navigate = useNavigate();
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({});

  const toggleDescription = (idx: number) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-white">Featured Projects</h2>
      <p className="text-sm md:text-lg text-gray-300 leading-relaxed mb-6">
        Explore my latest AI and ML projects, featuring intelligent systems, neural networks, and cutting-edge machine learning applications.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full md:w-auto">
        {projects.map((project, idx) => (
          <ProjectCard
            key={idx}
            project={project}
            idx={idx}
            isExpanded={!!expandedDescriptions[idx]}
            onToggle={() => toggleDescription(idx)}
            onNavigate={() => navigate("/projects")}
          />
        ))}
      </div>
      
      <Button
        onClick={() => navigate("/projects")}
        className="cursor-pointer bg-white hover:bg-gray-200 text-black border-2 border-white shadow-lg transition-all font-semibold"
      >
        View All Projects
        <ArrowRight className="ml-2 h-4 w-4 text-black" />
      </Button>
    </>
  );
}