import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Projects() {
  const navigate = useNavigate();

  const projects = [
    {
      title: "Lune - AI Health Assistant",
      description: "Intelligent healthcare platform providing AI-powered medical consultations, prescription analysis, medication guidance, lab result interpretation, medical imaging analysis, and symptom assessment to revolutionize personal healthcare management.",
      image: "/assets/lune.png",
      tech: ["React", "Node.js", "TensorFlow", "PostgreSQL"],
      github: "https://github.com/sayeesx/lune",
      live: null
    },
    {
      title: "miznet - Smart Inventory Management",
      description: "AI-driven inventory management system using blockchain and machine learning to automatically eliminate stockouts, manage product expiry dates, and handle restocking operations without human intervention.",
      image: "/assets/miznet.png",
      tech: ["Vue.js", "Django", "TensorFlow", "PostgreSQL"],
      github: "https://github.com/sayeesx/miznet",
      live: "https://miznet.vercel.app"
    },
    {
      title: "loan.ly - Secure AI Banking Platform",
      description: "Next-generation banking platform combining artificial intelligence for personalized financial insights, blockchain technology for transaction verification, and cryptocurrency integration for enhanced security and protection.",
      image: "/assets/loanly.png",
      tech: ["React", "Java", "Python", "PostgreSQL"],
      github: "https://github.com/sayeesx/blockchain",
      live: null
    },
    {
      title: "Exquio - Doctor Appointment Booking",
      description: "A mobile app built with React Native and Tailwind CSS, designed to make doctor appointment booking quick, easy, and accessible. With Supabase powering the backend, Exquio provides a modern, secure, and responsive experience for both patients and doctors.",
      image: "/assets/nonexistent-exquio.png",
      tech: ["React Native", "Tailwind CSS", "Supabase"],
      github: "https://github.com/sayeesx/exquio",
      live: null
    },
    {
      title: "Prescription Extractor - NLP",
      description: "An AI system that converts doctors' handwritten notes and prescriptions into accurate, validated digital text with a human-in-the-loop verification workflow for safety.",
      image: "/assets/nonexistent-prescription.png",
      tech: ["Python", "NLP", "TensorFlow", "OCR"],
      github: "https://github.com/sayeesx/Prescription-Extracter---NLP",
      live: null
    },
    {
      title: "Attention Mechanism Walkthrough",
      description: "I created a matrix-driven walkthrough of how attention weights are derived. Basically recreated what Transformers do but on Excel.",
      image: "/assets/nonexistent-attention.png",
      tech: ["Excel", "Transformers", "Attention"],
      github: "https://github.com/sayeesx/attention",
      live: null
    }
  ];

  const [imageStates, setImageStates] = useState<Record<number, 'loading' | 'loaded' | 'error'>>({});
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({});

  const handleImageLoad = (idx: number) => {
    setImageStates(prev => ({ ...prev, [idx]: 'loaded' }));
  };

  const handleImageError = (idx: number) => {
    setImageStates(prev => ({ ...prev, [idx]: 'error' }));
  };

  const toggleDescription = (idx: number) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />

      {/* Content */}
      <div className="flex-1 px-6 py-16 pt-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="cursor-pointer -ml-4 text-white hover:bg-white hover:text-black"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>

            <div className="space-y-6">
              <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-white">
                Featured Projects
              </h1>
              <div className="h-1 w-20 bg-white" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                  className="group relative drop-shadow-xl overflow-hidden rounded-xl bg-black border-2 border-gray-700 hover:border-white transition-all duration-300 flex flex-col h-full"
                >
                  {/* Project Image */}
                  <div className="relative w-full h-48 overflow-hidden bg-gray-800">
                    {(!imageStates[idx] || imageStates[idx] === 'loading') && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 text-white animate-spin" />
                      </div>
                    )}
                    {imageStates[idx] === 'error' ? (
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <p className="text-sm text-gray-400 text-center">Failed to fetch image from database</p>
                      </div>
                    ) : (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onLoad={() => handleImageLoad(idx)}
                        onError={() => handleImageError(idx)}
                        style={{ display: imageStates[idx] === 'loaded' ? 'block' : 'none' }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-white">
                      {project.title}
                    </h2>
                    
                    <p className={`text-sm text-gray-300 leading-relaxed flex-1 ${expandedDescriptions[idx] ? '' : 'line-clamp-3'}`}>
                      {project.description}
                    </p>

                    {project.description.length > 150 && (
                      <button
                        onClick={() => toggleDescription(idx)}
                        className="text-xs text-blue-400 hover:text-blue-300 underline self-start cursor-pointer transition-colors"
                      >
                        {expandedDescriptions[idx] ? 'Read Less' : 'Read More'}
                      </button>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs border border-gray-700 rounded-full text-white bg-black/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-white hover:text-gray-300 transition-colors cursor-pointer"
                      >
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-white hover:text-gray-300 transition-colors cursor-pointer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Demo
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-sm text-gray-500 cursor-not-allowed">
                          <ExternalLink className="h-4 w-4" />
                          Demo
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Lighting effect */}
                  <div className="absolute w-64 h-64 bg-white/10 blur-[80px] -left-1/4 -top-1/4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button
                size="lg"
                onClick={() => window.open("https://github.com/sayeesx", "_blank")}
                className="cursor-pointer bg-white hover:bg-gray-200 text-black shadow-lg transition-all font-semibold"
              >
                <Github className="mr-2 h-5 w-5" />
                Check Out All My Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}