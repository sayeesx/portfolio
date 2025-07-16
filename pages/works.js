"use client"

import React from 'react';
import Layout from '../components/Layout';
import { ArrowRight } from 'lucide-react';
import NavButtons from '../components/NavButtons';

const SQUARE_LOGO_PROJECTS = ["ZapIT", "Roamio", "Exquio"];
const DESCRIPTION_LIMIT = 120;

const Works = () => {
  const projects = [
    {
      id: 6,
      title: "Miznet",
      description: "Miznet is a smart, AI-powered, blockchain-integrated platform designed to automate and optimize retail supply chains — from warehouse to shelf to billing. It tracks every product in real-time, eliminates manual inventory work, predicts demand using machine learning, and ensures seamless restocking with zero human intervention. Miznet empowers modern retailers to reduce stockouts, cut operational costs, and stay ahead with data-driven decisions.",
      image: "/assets/miznet.png",
      tech: "Python + Blockchain + ML + Retail Automation",
      timeAgo: "New",
      websiteLink: "https://miznet.vercel.app",
      githubLink: "https://github.com/placeholder/miznet",
      isUpdating: false
    },
    {
      id: 1,
      title: "Exquio",
      description: "Doctor Appointment Booking App (React Native + Supabase): Built a cross-platform app to connect patients with doctors. Designed user and admin interfaces, handling auth, booking flow, backend logic, AI lab reports analysis, and payment integration.",
      image: "/assets/healo.webp",
      tech: "python + react native + supabase + tailwind css",
      timeAgo: "4 months ago",
      websiteLink: "null",
      githubLink: "https://github.com/sayeesx/exquio",
      isUpdating: false
    },
    {
      id: 2,
      title: "Roamio",
      description: "Developed a platform connecting travelers with local guides for tailored experiences. Implemented an ML-based guide recommendation engine and AI-generated travel itinerary planner based on user preferences.",
      image: "/assets/roamio.webp",
      tech: "Next.js + Supabase + MySQL + Java + Machine Learning + AI",
      timeAgo: "1 year ago",
      websiteLink: "null",
      githubLink: "https://github.com/placeholder/roamio",
      isUpdating: false
    },
    {
      id: 3,
      title: "ZapIT",
      description: "ZapIT is a rapid development startup specializing in delivering high-quality dynamic and static websites and apps within just 24 hours. Whether you're a startup needing a quick launch or a business looking for a fast digital solution, Zapit combines speed, design, and performance to get you online—fast",
      image: "/assets/zapit.webp",
      tech: "React + TypeScript",
      timeAgo: "2 years ago",
      websiteLink: "null",
      githubLink: "https://github.com/placeholder/zapit",
      isUpdating: false
    },
    {
      id: 4,
      title: "Requery",
      description: "Student Complaint Portal: Complaint submission and tracking for college students. Developed using HTML, css, javascript and SQL, implemented user authentication, and real-time notifications.",
      image: "/assets/requery.webp",
      tech: "html + css + js + MySQL",
      timeAgo: "2 years ago",
      websiteLink: "null",
      githubLink: "https://github.com/placeholder/requery",
      isUpdating: false
    },
    {
      id: 5,
      title: "AI Based blockchain",
      description: " a Python-based blockchain platform enhanced with AI and ML capabilities for fraud detection, dynamic mining difficulty adjustment, anomaly detection, and transaction pattern analysis.It combines the fundamentals of blockchain technology with modern intelligence to create a robust,secure, and adaptive network.",
      image: "/assets/blockchain.png",
      tech: "Coming Soon",
      timeAgo: "Updating...",
      websiteLink: "https://miznet.vercel.app/",
      githubLink: "https://github.com/sayeesx/blockchain",
      isUpdating: true
    }
  ];

  const [expanded, setExpanded] = React.useState({});

  const handleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Layout>
      <NavButtons rightLabel="My Skills" rightHref="/skills" rightIcon={<ArrowRight className="w-3 h-3" />} />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8 mt-20">
        <div className="relative flex justify-center mb-6">
          <div className="heading-glass relative w-full max-w-xl flex items-center justify-center rounded-lg overflow-hidden shadow-lg" style={{zIndex:2}}>
            <div className="heading-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="heading-bg absolute top-0 left-0 w-full h-full z-10" />
            <h1 className="relative z-20 text-center text-3xl sm:text-4xl font-bold text-sky-900 py-8 px-4 heading-text-shadow">My Projects</h1>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((project) => {
            const isSquare = SQUARE_LOGO_PROJECTS.includes(project.title.replace(/\s/g, ""));
            const showReadMore = project.description.length > DESCRIPTION_LIMIT;
            const isExpanded = expanded[project.id];
            return (
              <div
                key={project.id}
                className={`card bg-[#fefefe] rounded-2xl shadow-lg p-2 w-full max-w-xs sm:w-[300px] flex flex-col justify-between mx-auto h-[440px] transition-all duration-300 ${isExpanded ? 'h-auto min-h-[440px]' : ''} relative`}
              >
                {/* TimeAgo Badge */}
                <span className="card__badge">{project.timeAgo}</span>
                {/* Card Header */}
                <div className="card__hero bg-sky-100 rounded-t-2xl p-4 flex flex-col gap-2 relative">
                  <div className="card__hero-header flex items-center justify-between gap-2 font-bold">
                    <div className={`card__icon flex items-center justify-center ${isSquare ? 'w-16 h-16 rounded-lg' : 'w-16 h-16 rounded-full'} bg-white shadow overflow-hidden`}>
                      <img src={project.image} alt={project.title} className="object-contain w-12 h-12" />
                    </div>
                  </div>
                  <p className="card__job-title text-xl font-semibold mt-4 mb-0 text-[#141417] text-left">{project.title}</p>
                  {/* Tech Stack Badge Centered on Partition */}
                  <span className="card__tech-badge absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2 z-20 px-3 py-1 bg-[#e0f2fe] text-[#0ea5e9] rounded-full text-xs font-semibold border border-white shadow">{project.tech.split("+")[0]}</span>
                </div>
                {/* Card Body */}
                <div className="flex-1 flex flex-col justify-between p-4">
                  <p className="text-gray-600 text-sm mb-4 text-left">
                    {showReadMore && !isExpanded
                      ? project.description.slice(0, DESCRIPTION_LIMIT) + '...'
                      : project.description}
                    {showReadMore && !isExpanded && (
                      <button
                        className="ml-1 text-sky-500 underline text-xs font-medium hover:text-sky-700 focus:outline-none"
                        onClick={() => handleReadMore(project.id)}
                      >
                        Read More
                      </button>
                    )}
                    {showReadMore && isExpanded && (
                      <button
                        className="ml-1 text-sky-500 underline text-xs font-medium hover:text-sky-700 focus:outline-none"
                        onClick={() => handleReadMore(project.id)}
                      >
                        Show Less
                      </button>
                    )}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto w-full">
                    <a
                      href={project.websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="animated-btn w-full sm:w-auto text-center animated-btn--small"
                      style={{'--clr': '#3b82f6'}}
                    >
                      <span className="animated-btn__icon-wrapper">
                        <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="animated-btn__icon-svg" width={12}>
                          <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
                        </svg>
                        <svg viewBox="0 0 14 15" fill="none" width={12} xmlns="http://www.w3.org/2000/svg" className="animated-btn__icon-svg animated-btn__icon-svg--copy">
                          <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
                        </svg>
                      </span>
                      <span className="hidden md:inline">Project</span><span className="inline md:hidden">Show Project</span>
                    </a>
                    {!project.isUpdating && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="animated-btn w-full sm:w-auto text-center animated-btn--small"
                        style={{'--clr': '#1d4ed8'}}
                      >
                        <span className="animated-btn__icon-wrapper">
                          <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="animated-btn__icon-svg" width={12}>
                            <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
                          </svg>
                          <svg viewBox="0 0 14 15" fill="none" width={12} xmlns="http://www.w3.org/2000/svg" className="animated-btn__icon-svg animated-btn__icon-svg--copy">
                            <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
                          </svg>
                        </span>
                        GitHub Repo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx global>{`
        .heading-glass {
          position: relative;
          min-height: 90px;
          background: transparent;
        }
        .heading-bg {
          position: absolute;
          top: 5px;
          left: 5px;
          width: calc(100% - 10px);
          height: calc(100% - 10px);
          z-index: 2;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(24px);
          border-radius: 10px;
          outline: 2px solid white;
        }
        .heading-blob {
          position: absolute;
          z-index: 1;
          top: 50%;
          left: 50%;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background-color: #0ea5e9;
          opacity: 0.35;
          filter: blur(24px);
          animation: blob-bounce 5s infinite ease;
          transform: translate(-100%, -100%);
        }
        .heading-text-shadow {
          text-shadow: 0 2px 8px rgba(0,0,0,0.13), 0 1px 0 #fff;
        }
        @keyframes blob-bounce {
          0% { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
          25% { transform: translate(-100%, -100%) translate3d(100%, 0, 0); }
          50% { transform: translate(-100%, -100%) translate3d(100%, 100%, 0); }
          75% { transform: translate(-100%, -100%) translate3d(0, 100%, 0); }
          100% { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
        }
        .animated-btn {
          line-height: 1;
          text-decoration: none;
          display: inline-flex;
          border: none;
          cursor: pointer;
          align-items: center;
          gap: 0.75rem;
          background-color: var(--clr);
          color: #fff;
          border-radius: 10rem;
          font-weight: 600;
          padding: 0.45rem 1rem;
          padding-left: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: background-color 0.3s;
          position: relative;
          font-size: 0.92rem;
        }
        .animated-btn--small {
          padding: 0.35rem 0.8rem;
          padding-left: 12px;
          font-size: 0.88rem;
        }
        .animated-btn__icon-wrapper {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          position: relative;
          color: var(--clr);
          background-color: #fff;
          border-radius: 50%;
          display: grid;
          place-items: center;
          overflow: hidden;
        }
        .animated-btn:hover {
          background-color: #000;
          color: #fff;
        }
        .animated-btn:hover .animated-btn__icon-wrapper {
          color: #000;
        }
        .animated-btn__icon-svg--copy {
          position: absolute;
          transform: translate(-150%, 150%);
        }
        .animated-btn:hover .animated-btn__icon-svg:first-child {
          transition: transform 0.3s ease-in-out;
          transform: translate(150%, -150%);
        }
        .animated-btn:hover .animated-btn__icon-svg--copy {
          transition: transform 0.3s ease-in-out 0.1s;
          transform: translate(0);
        }
        .card {
          margin: auto;
          width: min(300px, 100%);
          background-color: #fefefe;
          border-radius: 1rem;
          padding: 0.5rem;
          color: #141417;
        }
        .card__hero {
          background-color: #e0f2fe;
          border-radius: 0.5rem 0.5rem 0 0;
          padding: 1.5rem;
          font-size: 0.875rem;
        }
        .card__hero .card__job-title {
          margin: 2rem 0 0.5rem 0;
          font-size: 2rem;
          font-weight: 600;
          padding-right: 2rem;
        }
        .card__hero-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 1rem;
          font-weight: 700;
        }
        .card__btn {
          font-weight: 400;
          border: none;
          display: block;
          cursor: pointer;
          text-align: center;
          padding: 0.5rem 1.25rem;
          border-radius: 1rem;
          background-color: #141417;
          color: #fff;
          font-size: 1rem;
        }
        .card__badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #10b981;
          color: white;
          padding: 0.25em 0.5em;
          border-radius: 999px;
          font-size: 0.7em;
          font-weight: 600;
          transform: scale(0.8);
          opacity: 1;
          transition: all 0.4s ease 0.1s;
          z-index: 30;
        }
        .card__tech-badge {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translate(-50%, 50%);
          z-index: 20;
          background: #e0f2fe;
          color: #0ea5e9;
          border-radius: 999px;
          font-size: 0.8em;
          font-weight: 600;
          padding: 0.25em 1em;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        @media (max-width: 640px) {
          .max-w-xs {
            max-width: 95vw !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Works;