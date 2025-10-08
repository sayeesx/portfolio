import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useNavigate } from "react-router";
import SplitText from "@/components/SplitText";

interface HeroSectionProps {
  onCvModalOpen: () => void;
}

export default function HeroSection({ onCvModalOpen }: HeroSectionProps) {
  const navigate = useNavigate();

  return (
    <section className="flex-1 flex items-center justify-center px-6 pt-20 min-h-screen">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="w-full">
              <SplitText
                text="Muhammed Sayees"
                tag="h1"
                className="text-6xl md:text-7xl font-bold tracking-tight text-white block"
                textAlign="left"
                delay={50}
                duration={0.8}
                from={{ opacity: 0, y: 60, rotateX: -90 }}
                to={{ opacity: 1, y: 0, rotateX: 0 }}
                ease="power3.out"
                threshold={0.2}
              />
            </div>
            <p className="text-sm md:text-2xl text-gray-300 max-w-2xl">
              AI & ML Engineer ✦ Student ✦ Software Developer
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/projects")}
              className="cursor-pointer bg-white hover:bg-gray-200 text-black shadow-lg transition-all font-semibold"
            >
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              onClick={onCvModalOpen}
              className="cursor-pointer border-white text-white hover:bg-white hover:text-black transition-all brutalist-cv-button"
              variant="outline"
            >
              <svg className="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              View My CV
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-8">
            <a
              href="https://github.com/sayeesx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/msayees/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <button
              onClick={() => {
                const headings = Array.from(document.querySelectorAll('h2'));
                const contactHeading = headings.find(h => h.textContent?.includes('Get In Touch'));
                const contactSection = contactHeading?.closest('section');
                
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <Mail className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
