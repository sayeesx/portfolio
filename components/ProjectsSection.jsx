import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import ChromaGrid from "./ChromaGrid";

const projects = [
    {
    id: 1,
    title: "AI - Integrated Blockchain",
    image: "/assets/blockchain.png",
    tech: "Python - Flask,Fast API,Gunicorn, SQL",
    timeAgo: "In Development",
    projectLink: "https://github.com/sayeesx/blockchain",
  },
  {
    id: 2,
    title: "Exquio",
    image: "/assets/healo.webp",
    tech: "python + react native + supabase + tailwind css",
    timeAgo: "4 months ago",
    projectLink: "https://github.com/sayeesx/exquio",
  },
  {
    id: 3,
    title: "Roamio",
    image: "/assets/roamio.webp",
    tech: "Next.js + Supabase + MySQL + Java + Machine Learning + AI",
    timeAgo: "1 year ago",
    projectLink: "https://github.com/sayeesx/roamio",
  },
  {
    id: 4,
    title: "ZapIT",
    image: "/assets/zapit.webp",
    tech: "React + TypeScript",
    timeAgo: "2 years ago",
    projectLink: "https://github.com/sayeesx/zapit",
  },
  {
    id: 5,
    title: "Requery",
    image: "/assets/requery.webp",
    tech: "html + css + js + MySQL",
    timeAgo: "2 years ago",
    projectLink: "https://github.com/sayeesx/requery-empire",
  },
  
];

const chromaProjects = projects.map((p) => ({
  image: p.image,
  title: p.title,
  subtitle: p.tech,
  handle: p.timeAgo,
  borderColor: "#4F46E5", // You can customize per project
  gradient: "linear-gradient(145deg, #4F46E5, #000)", // Or set per project
}));

const ProjectsSectionContent = ({ isMobile }) => {
  const projectsToDisplay = isMobile ? chromaProjects.slice(0, 2) : chromaProjects;
  const router = useRouter();
  const handleCardClick = () => {
    router.push('/works');
  };
  return (
    <>
      <div className="flex justify-center flex-wrap gap-6 pb-16 px-2 md:px-0 font-sans" onClick={handleCardClick} style={{cursor: 'pointer'}}>
        <ChromaGrid 
          items={projectsToDisplay} 
          columns={isMobile ? 1 : 3} 
          rows={isMobile ? 2 : 2} 
          cardClassName="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-2 md:p-4 font-sans text-base md:text-lg border-0 mb-0 text-center"
        />
      </div>
      {/* Button */}
      <div className="text-center mt-8 md:mt-12 mb-16 md:mb-24 font-sans">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 bg-transparent text-black border border-black px-4 md:px-5 py-1.5 md:py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/20 text-sm md:text-base font-sans"
        >
          View All Projects
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
};

export default function ProjectsSection({ isMobile, projectsSectionRef }) {
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsProjectsVisible(true);
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById("projects-section");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects-section"
      ref={projectsSectionRef}
      className={`min-h-screen pt-2 mt-8 transition-all duration-1000 ease-out transform ${
        isProjectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-shadow-3d">
          Featured Projects
        </h2>
        <ProjectsSectionContent isMobile={isMobile} />
      </div>
    </section>
  );
}
