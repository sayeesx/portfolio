import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

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
          <div 
            key={idx} 
            className="group relative drop-shadow-xl w-full h-[450px] overflow-visible rounded-xl bg-black border-2 border-transparent transition-colors duration-300"
          >
            
            <div className="absolute flex flex-col items-start justify-start text-white z-10 rounded-xl inset-0.5 bg-black/30 backdrop-blur-sm p-6">
              {!expandedDescriptions[idx] && (
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden flex-shrink-0">
                  <div className="w-full h-full flex items-center justify-center bg-gray-700">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="absolute -top-1 -right-1 z-50 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] font-bold rounded-md overflow-hidden pointer-events-none shadow-lg border border-orange-400/50">
                    <span className="relative z-10 tracking-wider">FEATURED</span>
                    <div className="absolute inset-0 shimmer-effect" />
                  </div>
                </div>
              )}
              
              <h3 className="text-lg font-bold mb-2 flex-shrink-0">{project.title}</h3>
              
              <div className="mb-2 flex-shrink-0">
                <p className={`text-sm text-gray-400 transition-all duration-300 ease-in-out ${expandedDescriptions[idx] ? '' : 'line-clamp-2'}`}>
                  {project.description}
                </p>
              </div>
              
              <button 
                type="button"
                className="text-xs text-blue-400 hover:text-blue-300 hover:scale-105 active:scale-95 mb-3 underline cursor-pointer transition-all duration-200 flex-shrink-0"
                onClick={() => toggleDescription(idx)}
              >
                {expandedDescriptions[idx] ? 'Read Less' : 'Read More'}
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
                      />
                    </div>
                  ))}
                </div>
                
                <button 
                  type="button" 
                  onClick={() => navigate("/projects")}
                  className="flex justify-center gap-1.5 items-center shadow-xl text-xs bg-black backdrop-blur-md font-semibold border-white before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-3 py-1.5 border-2 rounded-full text-white cursor-pointer flex-shrink-0 overflow-hidden group/button"
                >
                  View Project
                  <svg className="w-4 h-4 justify-end group-hover/button:rotate-90 group-hover/button:bg-gray-50 text-white ease-linear duration-300 rounded-full border border-white group-hover/button:border-none p-0.5 rotate-45" viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" className="fill-white group-hover/button:fill-gray-800" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="absolute w-64 h-64 bg-white/20 blur-[80px] -left-1/4 -top-1/4 pointer-events-none" />
          </div>
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