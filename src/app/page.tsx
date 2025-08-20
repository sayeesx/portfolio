"use client"

import Hero from "@/components/Hero/Hero"
import ChatWidget from "@/components/ChatWidget"
import { useEffect, useState } from "react"
import { GridPattern } from "@/components/grid-pattern"
import styled from "styled-components"
import { useRouter } from "next/navigation"
import { Github, ExternalLink } from "lucide-react"
import Image from 'next/image';

// Modern About Me Button (with arrow and responsive size)
const AboutButton = () => {
  const router = useRouter()
  return (
    <StyledWrapper>
      <button onClick={() => router.push("/about/about")}>
        <span>Learn More About Me</span>
        <span className="arrow-bg">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="#3D6AFF" />
            <path d="M8 6L12 10L8 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </StyledWrapper>
  )
}

// See All Projects Button (same styling as About button)
const ProjectsButton = () => {
  const router = useRouter()
  return (
    <StyledWrapper>
      <button onClick={() => router.push("/projects")}>
        <span>See All My Projects</span>
        <span className="arrow-bg">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="#3D6AFF" />
            <path d="M8 6L12 10L8 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  button {
    position: relative;
    padding: 10px 18px 10px 18px;
    border-radius: 7px;
    border: 1px solid rgb(61, 106, 255);
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 2px;
    background: transparent;
    color: #fff;
    overflow: hidden;
    box-shadow: 0 0 0 0 transparent;
    transition: all 0.2s ease-in;
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }

  .arrow-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    margin-left: 6px;
    transition: background 0.2s;
    box-shadow: 0 2px 8px 0 rgba(61,106,255,0.18);
  }

  button:hover {
    background: rgb(61, 106, 255);
    box-shadow: 0 0 30px 5px rgba(0, 142, 236, 0.815);
    transition: all 0.2s ease-out;
  }

  button:hover .arrow-bg {
    background: #3D6AFF;
  }

  button:hover .arrow-bg svg circle {
    fill: #fff;
    transition: fill 0.2s;
  }

  button:hover .arrow-bg svg path {
    stroke: #3D6AFF;
    transition: stroke 0.2s;
  }

  button:active {
    box-shadow: 0 0 0 0 transparent;
    transition: box-shadow 0.2s ease-in;
  }

  @media (max-width: 600px) {
    button {
      padding: 7px 12px 7px 12px;
      font-size: 12px;
      gap: 0.5rem;
    }
    .arrow-bg {
      width: 22px;
      height: 22px;
      margin-left: 4px;
    }
    .arrow-bg svg {
      width: 14px;
      height: 14px;
    }
  }
`

const AboutSection = styled.section`
  max-width: 540px;
  margin: 3.5rem auto 4rem auto;
  padding: 0;
  background: none;
  border: none;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 600px) {
    margin: 2rem 0.5rem 2.5rem 0.5rem;
    max-width: 98vw;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 1.1rem;
    text-align: left;
    letter-spacing: -0.02em;
    line-height: 1.1;
    padding-left: 0.1rem;
  }

  p {
    font-size: 0.95rem;
    color: #e5e5e5;
    margin-bottom: 2.2rem;
    text-align: left;
    line-height: 1.7;
    border-radius: 1.1rem;
    background: none;
    padding: 1.2rem 1.1rem;
    border: 1.5px solid #222;
    box-shadow: 0 2px 18px 0 rgba(0,0,0,0.10);
    width: 100%;
    font-weight: 500;
    max-width: 600px;
    
    @media (max-width: 600px) {
      font-size: 0.85rem;
      padding: 1rem 0.9rem;
      line-height: 1.6;
    }
  }
`

const ProjectsSection = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 1rem;

  @media (max-width: 600px) {
    margin: 2rem 0.5rem;
    padding: 0 0.5rem;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 3rem;
    text-align: left;
    letter-spacing: -0.02em;
    line-height: 1.1;
    padding-left: 0.1rem;

    @media (max-width: 600px) {
      font-size: 1.8rem;
      margin-bottom: 2rem;
    }
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    justify-items: center;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
`

const ProjectCard = styled.div`
  position: relative;
  drop-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  width: 320px;
  height: 420px;
  overflow: hidden;
  border-radius: 8px;
  z-index: 1;
  border: solid 1px #202222;
  background-size: 20px 20px;
  background: radial-gradient(circle 280px at 0% 0%, #444444, #0c0d0d);

  &.exclusive::before {
    content: 'EXCLUSIVE';
    position: absolute;
    top: 12px;
    left: 12px;
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    padding: 4px 12px;
    border-radius: 8px;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    z-index: 10;
    box-shadow: 0 4px 15px rgba(238, 90, 36, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .ray {
    width: 220px;
    height: 45px;
    border-radius: 100px;
    position: absolute;
    background-color: #c7c7c7;
    opacity: 0.4;
    box-shadow: 0 0 50px #fff;
    filter: blur(10px);
    transform-origin: 10%;
    top: 0%;
    left: 0;
    transform: rotate(40deg);
  }

  .card-content {
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .blur-effect {
    position: absolute;
    width: 14rem;
    height: 12rem;
    background: white;
    blur: 50px;
    left: -50%;
    top: -50%;
  }

  .project-image {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    width: 100%;
    height: 180px;
    background: linear-gradient(135deg, #9333ea, #7c3aed);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    svg {
      width: 48px;
      height: 48px;
      fill: white;
    }
  }

  .project-info {
    margin-bottom: 16px;

    h3 {
      font-size: 20px;
      font-weight: 600;
      color: white;
      margin-bottom: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p {
      font-size: 14px;
      color: #d1d5db;
      margin: 0 0 8px 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.4;
    }
  }

  .technologies {
    margin-bottom: 20px;

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .tech-tag {
        padding: 4px 8px;
        font-size: 10px;
        background: rgba(255, 255, 255, 0.1);
        color: #d1d5db;
        border-radius: 4px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: border-color 0.3s ease;

        &:hover {
          border-color: rgba(255, 255, 255, 0.4);
        }
      }

      .more-count {
        padding: 4px 8px;
        font-size: 10px;
        color: #9ca3af;
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: auto;
    padding-top: 8px;

    .action-buttons {
      display: flex;
      gap: 8px;

      a {
        padding: 10px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
        }

        svg {
          width: 16px;
          height: 16px;
        }
      }
    }

    .see-project {
      position: relative;
      flex: 1;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 6px 18px;
      background: #2563eb;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      gap: 8px;
      font-weight: 700;
      border: 2px solid rgba(255, 255, 255, 0.3);
      overflow: hidden;
      font-size: 14px;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        transform: scale(1.05);
        border-color: rgba(255, 255, 255, 0.6);
      }

      .shine {
        position: absolute;
        width: 96px;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
        top: 0;
        opacity: 0.6;
        animation: shine 1.5s ease-out infinite;
      }

      svg {
        width: 16px;
        height: 16px;
        transition: transform 0.3s ease;
      }

      &:hover svg {
        transform: translateX(4px);
      }
    }
  }

  @keyframes shine {
    0% {
      left: -96px;
    }
    100% {
      left: 100%;
    }
  }
`

const SectionDivider = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 1rem;
  display: flex;
  justify-content: center;

  @media (max-width: 600px) {
    margin: 3rem auto;
    padding: 0 0.5rem;
  }

  .divider-line {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 80%, transparent);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      background: #3D6AFF;
      border-radius: 50%;
      box-shadow: 0 0 20px rgba(61, 106, 255, 0.5);
    }
  }
`

// Sample project data - replace with your actual projects
const projects = [
  {
    title: "MIZNET",
    description:
      "Smart Supply Chain Automation Using AI and Blockchain.",
    technologies: ["Python", "TensorFlow", "ML", "Blochain"],
    githubUrl: "https://github.com/sayeesx/miznet",
    websiteUrl: "https://miznet.vercel.app",
    projectSlug: "MIZNET – Smart Supply Chain Automation Using AI ",
    imageUrl: "/placeholder.jpg",
  },
  {
    title: "ML Handwriting Recognition System",
    description:
      "Prescription Extracter – ML With NLP & Handwriting Recognition System",
    technologies:["Python", "NLP", "ML", "OCR"],
    githubUrl: "https://github.com/sayeesx/Prescription-Extracter---NLP",
    websiteUrl: "https://github.com/sayeesx",
    projectSlug: "Prescription-Extracter – ML With NLP & Handwriting Recognition System ",
    imageUrl: "/placeholder.jpg",
  },
  {
    title: "EXQUIO",
    description:
      "Doctor Appointment App ",
    technologies:["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/sayeesx/exquio",
    websiteUrl: "https://github.com/sayeesx",
    projectSlug: "portfolio-website",
    imageUrl: "/placeholder.jpg",
  },
]

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    const triggerAPI = async () => {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "ping" }),
        })

        const ct = res.headers.get("content-type") || ""
        const text = await res.text().catch(() => "")

        if (!res.ok) {
          console.error("Upstream returned error:", res.status, text)
          return
        }

        let data: unknown
        if (ct.includes("application/json")) {
          try {
            data = JSON.parse(text)
          } catch (err) {
            console.warn("Failed to parse JSON, falling back to raw text:", err)
            data = { response: text }
          }
        } else {
          data = { response: text }
        }

        console.log("API response:", data)
      } catch (err) {
        console.error("Error triggering API:", err)
      }
    }

    void triggerAPI()
  }, [])

  return (
    <div className="bg-black min-h-screen relative">
      <GridPattern>
        <main className="relative z-10">
          <Hero />

          {/* Modern About Section */}
          <AboutSection>
            <h2>About Me</h2>
            <p>
              I&apos;m Muhammed Sayees, a Computer Applications student and AI Engineer passionate about machine learning and
              intelligent systems. Currently interning at Rubixe AI while pursuing my BCA, I&apos;m always eager to learn,
              create, and push the boundaries of what&apos;s possible with AI. Let&apos;s build the future together.
            </p>
            <AboutButton />
          </AboutSection>

          <SectionDivider>
            <div className="divider-line" />
          </SectionDivider>

          {/* Projects Section */}
          <ProjectsSection>
            <h2>My Projects</h2>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <ProjectCard key={index} className={index === 0 ? "exclusive" : ""}>
                  <div className="ray" />
                  <div className="card-content">
                    <div className="project-image">
                      {project.imageUrl ? (
                        <Image 
                          src={project.imageUrl || "/placeholder.jpg"} 
                          alt={project.title}
                          width={320}
                          height={180}
                          style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      ) : (
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z" />
                        </svg>
                      )}
                    </div>
                    <div className="project-info">
                      <h3>{project.title}</h3>
                      {project.description && <p>{project.description}</p>}
                    </div>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="technologies">
                        <div className="tech-tags">
                          {project.technologies.slice(0, 4).map((tech, techIndex) => (
                            <span key={techIndex} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="more-count">+{project.technologies.length - 4} more</span>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="actions">
                      <div className="action-buttons">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github />
                        </a>
                        <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink />
                        </a>
                      </div>

                      <a href={`/projects/${project.projectSlug}`} className="see-project">
                        <div className="shine" />
                        <span>See Project</span>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </ProjectCard>
              ))}
            </div>

            <div
              className="projects-button-container"
              style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
            >
              <ProjectsButton />
            </div>
          </ProjectsSection>
        </main>
        <ChatWidget hideLauncher={false} open={chatOpen} onOpenChange={setChatOpen} />
      </GridPattern>
    </div>
  )
}