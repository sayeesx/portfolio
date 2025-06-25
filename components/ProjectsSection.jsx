import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

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

const ProjectsSectionContent = ({ isMobile }) => {
  const router = useRouter();
  const projectsToDisplay = isMobile ? projects.slice(0, 2) : projects;

  return (
    <>
      <div className="flex justify-center flex-wrap gap-6 pb-8 project-cards-row px-2 md:px-0">
        {projectsToDisplay.map((project, index) => (
          <div
            key={project.id}
            className="relative z-20 group min-w-[320px] max-w-[380px] w-full h-[180px] flex items-stretch bg-white/20 backdrop-blur-xl border-2 border-white/20 rounded-[1.5rem] shadow-2xl glassmorphic-card-horizontal transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => project.id !== 5 && router.push("/works")}
          >
            {/* Image */}
            <div className="relative h-full w-2/5 min-w-[40%] rounded-l-[1.5rem] overflow-hidden bg-white/20">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain p-4"
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center px-4 py-4 w-3/5 min-w-0">
              <h3 className="font-bold text-lg mb-2 text-gray-900 drop-shadow-lg truncate">
                {project.title}
              </h3>
              <p className="text-xs mb-2 text-gray-700 font-medium opacity-80 truncate">
                {project.tech.split("+")[0].trim()}
              </p>
              <span className="text-xs text-gray-500 truncate">{project.timeAgo}</span>
            </div>
          </div>
        ))}
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

      <style jsx>{`
        .glassmorphic-card-horizontal {
          background: rgba(255, 255, 255, 0.18);
          box-shadow: 0 2px 18px 0 rgba(31, 38, 135, 0.18);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 0.7rem;
          border: 2px solid rgba(255,255,255,0.18);
        }
      `}</style>
    </section>
  );
}
