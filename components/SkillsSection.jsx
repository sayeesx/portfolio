import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";

const OrbitingSkills = dynamic(() => import("./orbiting-skills"), { ssr: false });

export default function SkillsSection() {
  const [isSuperpowersVisible, setIsSuperpowersVisible] = useState(false);
  useEffect(() => {
    const superpowersObserver = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsSuperpowersVisible(true);
      },
      { threshold: 0.1 }
    );
    const superpowersSection = document.getElementById('superpowers-section');
    if (superpowersSection) superpowersObserver.observe(superpowersSection);
    return () => {
      if (superpowersSection) superpowersObserver.unobserve(superpowersSection);
    };
  }, []);
  return (
    <section 
      id="superpowers-section" 
      className={`min-h-[40vh] py-20 transition-all duration-1000 ease-out transform ${isSuperpowersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-black text-shadow-3d">
          My Skills
        </h2>
        <div className="w-full flex justify-center items-center">
          <OrbitingSkills isMobile={typeof window !== 'undefined' ? window.innerWidth <= 768 : false} />
        </div>
      </div>
    </section>
  );
}
