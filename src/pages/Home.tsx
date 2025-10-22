import { useNavigate } from "react-router";
import Navbar from "@/components/Navbar";
import Squares from "@/components/Squares";
import ChatWidget from "@/components/ChatWidget";
import ContactFormStepper from "@/components/ContactFormStepper";
import { useState } from "react";
import CVPreviewModal from "@/components/CVPreviewModal";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import SkillsSection from "@/components/home/SkillsSection";
import FeaturedProjectsSection from "@/components/home/FeaturedProjectsSection";
import SupportSection from "@/components/home/SupportSection";

export default function Home() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const sectionItems = [
    {
      title: "About Me",
      content: <AboutSection />
    },
    {
      title: "Skills & Expertise",
      content: <SkillsSection />
    },
    {
      title: "Featured Projects",
      content: <FeaturedProjectsSection />
    },
    {
      title: "Support / Patronage",
      content: <SupportSection />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative bg-black">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0">
        <Squares 
          speed={0.3} 
          squareSize={40}
          direction='down'
          borderColor='rgba(255, 255, 255, 0.15)'
          hoverFillColor='rgba(255, 255, 255, 0.05)'
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <HeroSection onCvModalOpen={() => setCvModalOpen(true)} />

        {/* Sections as Horizontal Cards */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto space-y-8">
            {sectionItems.map((item, index) => (
              <div
                key={item.title}
                className="group backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all relative overflow-hidden"
                style={{
                  '--spotlight-color': 'rgba(255,255,255,0.3)'
                } as React.CSSProperties}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
              >
                <div className="relative z-10">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="px-6 py-20">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Get In Touch
              </h2>
              <p className="text-sm md:text-lg text-gray-300">
                Have a project in mind? Let's talk about it.
              </p>
            </div>
            <ContactFormStepper />
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-8 backdrop-blur-md bg-black/30">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-400">
            © 2025 Muhammed Sayees. All rights reserved.
          </div>
        </footer>
      </div>

      {/* Chat Widget */}
      <ChatWidget open={chatOpen} onOpenChange={setChatOpen} />

      {/* CV Preview Modal */}
      <CVPreviewModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </div>
  );
}