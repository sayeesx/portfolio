import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import ChromaGrid from "./ChromaGrid";

const projects = [
  {
    id: 1,
    title: "Exquio",
    image: "/assets/healo.webp",
    tech: "python + react native + supabase + tailwind css",
    timeAgo: "4 months ago",
    projectLink: "https://github.com/sayeesx/exquio",
  },
  {
    id: 2,
    title: "Roamio",
    image: "/assets/roamio.webp",
    tech: "Next.js + Supabase + MySQL + Java + Machine Learning + AI",
    timeAgo: "1 year ago",
    projectLink: "https://github.com/sayeesx/roamio",
  },
  {
    id: 3,
    title: "ZapIT",
    image: "/assets/zapit.webp",
    tech: "React + TypeScript",
    timeAgo: "2 years ago",
    projectLink: "https://github.com/sayeesx/zapit",
  },
  {
    id: 4,
    title: "Requery",
    image: "/assets/requery.webp",
    tech: "html + css + js + MySQL",
    timeAgo: "2 years ago",
    projectLink: "https://github.com/sayeesx/requery-empire",
  },
  {
    id: 5,
    title: "Coming Soon",
    image: "/assets/coming-soon.webp",
    tech: "New Project in Development",
    timeAgo: "Coming Soon",
    projectLink: "#",
  },
];

const chromaProjects = projects.map((p) => ({
  image: p.image,
  title: p.title,
  subtitle: p.tech,
  handle: p.timeAgo,
  borderColor: "#4F46E5", // You can customize per project
  gradient: "linear-gradient(145deg, #4F46E5, #000)", // Or set per project
  url: p.projectLink !== "#" ? p.projectLink : undefined,
}));

const ProjectsSectionContent = ({ isMobile }) => {
  const projectsToDisplay = isMobile ? chromaProjects.slice(0, 2) : chromaProjects;
  return (
    <>
      <div className="flex justify-center flex-wrap gap-6 pb-8 project-cards-row px-2 md:px-0">
        <ChromaGrid items={projectsToDisplay} columns={isMobile ? 1 : 3} rows={isMobile ? 2 : 2} />
      </div>
      {/* Button */}
      <div className="text-center mt-8 md:mt-12 mb-16 md:mb-24">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 bg-transparent text-black border border-black px-5 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/20"
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
