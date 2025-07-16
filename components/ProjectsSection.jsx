import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: 6,
    title: "Miznet",
    image: "/assets/miznet.png",
    tech: "AI + Blockchain + ML + Retail Automation",
    tags: ["AI", "Blockchain", "Automation"],
    timeAgo: "New",
    projectLink: "https://miznet.vercel.app/",
    description: "Miznet is a smart, AI-powered, blockchain-integrated platform designed to automate and optimize retail supply chains — from warehouse to shelf to billing. It tracks every product in real-time, eliminates manual inventory work, predicts demand using machine learning, and ensures seamless restocking with zero human intervention. Miznet empowers modern retailers to reduce stockouts, cut operational costs, and stay ahead with data-driven decisions."
  },
  {
    id: 1,
    title: "AI - Integrated Blockchain",
    image: "/assets/blockchain.png",
    tech: "Python - Flask,Fast API,Gunicorn, SQL",
    tags: ["AI", "Blockchain"],
    timeAgo: "In Development",
    projectLink: "https://github.com/sayeesx/blockchain",
  },
  {
    id: 2,
    title: "Exquio",
    image: "/assets/healo.webp",
    tech: "python + react native + supabase + tailwind css",
    tags: ["Mobile", "Health"],
    timeAgo: "4 months ago",
    projectLink: "https://github.com/sayeesx/exquio",
  },
  {
    id: 3,
    title: "Roamio",
    image: "/assets/roamio.webp",
    tech: "Next.js + Supabase + MySQL + Java + Machine Learning + AI",
    tags: ["Travel", "AI"],
    timeAgo: "1 year ago",
    projectLink: "https://github.com/sayeesx/roamio",
  },
  {
    id: 4,
    title: "ZapIT",
    image: "/assets/zapit.webp",
    tech: "React + TypeScript",
    tags: ["Web", "Productivity"],
    timeAgo: "2 years ago",
    projectLink: "https://github.com/sayeesx/zapit",
  },
  {
    id: 5,
    title: "Requery",
    image: "/assets/requery.webp",
    tech: "html + css + js + MySQL",
    tags: ["Web", "Database"],
    timeAgo: "2 years ago",
    projectLink: "https://github.com/sayeesx/requery-empire",
  },
];

const ProjectsSectionContent = ({ isMobile }) => {
  const projectsToDisplay = isMobile ? projects.slice(0, 2) : projects;
  const router = useRouter();
  const handleCardClick = () => {
    router.push('/works');
  };
  return (
    <>
      <div
        className="flex justify-center flex-wrap gap-6 pb-16 px-2 md:px-0 font-sans"
        style={{ cursor: "pointer" }}
      >
        {projectsToDisplay.map((project) => (
          <div key={project.id} onClick={handleCardClick}>
            <ProjectCard
              image={project.image}
              title={project.title}
              tech={project.tech}
              tags={project.tags}
              projectLink={project.projectLink}
              shadow
            />
          </div>
        ))}
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
  return (
    <section
      id="projects-section"
      ref={projectsSectionRef}
      className="min-h-screen pt-2 mt-8 opacity-100 translate-y-0"
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
