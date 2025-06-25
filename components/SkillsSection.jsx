import Image from "next/image";
import { useEffect, useState } from "react";

const skills = [
  { name: 'JavaScript', logo: '/img/javascript.svg' },
  { name: 'HTML', logo: '/img/html.svg' },
  { name: 'CSS', logo: '/img/css.svg' },
  { name: 'React', logo: '/img/react.svg' },
  { name: 'Next.js', logo: '/img/nextjs.svg' },
  { name: 'Python', logo: '/img/python.svg' },
  { name: 'TensorFlow', logo: '/img/tensorflow.png' },
  { name: 'Pandas', logo: '/img/pandas.svg' },
  { name: 'C++', logo: '/img/cpp.svg' },
  { name: 'Java', logo: '/img/java.svg' },
  { name: 'SQL', logo: '/img/sql.svg' },
];

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
        <div className="relative overflow-hidden">
          <div className="relative flex justify-center items-center gap-3 md:gap-6 overflow-x-auto hide-scrollbar py-8">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="flex flex-col items-center transform transition-all duration-700 ease-out hover:scale-110 flex-shrink-0"
                style={{
                  opacity: isSuperpowersVisible ? 1 : 0,
                  transform: `translateX(${isSuperpowersVisible ? '0' : index % 2 === 0 ? '100px' : '-100px'})`,
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="relative w-8 h-8 md:w-14 md:h-14 mb-1 glass-shimmer">
                  <Image
                    src={skill.logo}
                    alt={`${skill.name} logo`}
                    fill
                    className="object-contain transition-all duration-500 ease-out"
                  />
                </div>
                <span className="text-[10px] md:text-xs text-black font-medium transition-all duration-300">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
