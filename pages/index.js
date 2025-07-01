"use client"

import Head from "next/head"
import dynamic from "next/dynamic"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"
import SkillsSection from "../components/SkillsSection"
import FullContactSection from "../components/FullContactSection"
import throttle from "lodash.throttle"
import { useEffect, useRef, useState, Suspense } from "react"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { File, Settings, Search } from "lucide-react";
import OrbitingSkills from "@/components/orbiting-skills";
gsap.registerPlugin(ScrollTrigger);

// Lazy load heavy/scroll-sensitive components
const ProjectsSection = dynamic(() => import("../components/ProjectsSection"), { ssr: false })
const ChatWidget = dynamic(() => import("../components/chatWidget"), { ssr: false })

const OrbitingCirclesDemo = () => {
  return (
    <div className="relative overflow-hidden h-[500px] w-full">
      <OrbitingCircles>
        <File />
        <Settings />
        <File />
      </OrbitingCircles>
      <OrbitingCircles radius={100} reverse>
        <File />
        <Settings />
        <File />
        <Search />
      </OrbitingCircles>
    </div>
  );
};

export default function Component() {
  const [zoomOut, setZoomOut] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const projectsSectionRef = useRef(null)
  const heroRef = useRef(null)

  // IntersectionObserver for HeroSection animation
  useEffect(() => {
    if (!heroRef.current) return
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setZoomOut(true)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  // Throttled resize event for isMobile
  useEffect(() => {
    const handleResize = throttle(() => {
      setIsMobile(window.innerWidth <= 768)
    }, 200)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // GSAP entrance and scroll-based animations for smoothness
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Animate HeroSection entrance
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }
    // Animate ProjectsSection on scroll
    if (projectsSectionRef.current) {
      gsap.fromTo(
        projectsSectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    // Clean up triggers
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [])

  // Set smooth scroll globally (in useEffect to avoid SSR issues)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.scrollBehavior = 'smooth';
      const style = document.createElement('style');
      style.innerHTML = `
        html, body, #__next, main, .layoutWrapper, section, [class*='overflow-'], [class*='scroll-'] {
          scroll-behavior: smooth !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, [])

  return (
    <Layout>
      <Head>
        <title>Muhammed Sayees - Portfolio</title>
        <meta name="description" content="Portfolio of Muhammed Sayees" />
      </Head>
      <div ref={heroRef}>
        <HeroSection zoomOut={zoomOut} />
      </div>
      <Suspense fallback={null}>
        <ProjectsSection isMobile={isMobile} projectsSectionRef={projectsSectionRef} />
      </Suspense>
      <SkillsSection />
      <FullContactSection />
      <div className="fixed bottom-8 right-8 z-50">
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      </div>
      <div className="relative overflow-hidden h-[500px] w-full">
        <OrbitingCircles>
          <File />
          <Settings />
          <File />
        </OrbitingCircles>
        <OrbitingCircles radius={100} reverse>
          <File />
          <Settings />
          <File />
          <Search />
        </OrbitingCircles>
      </div>
      <style jsx>{`
        html, body, #__next, main, .layoutWrapper {
          scroll-behavior: smooth !important;
          overflow-x: visible !important;
          min-height: unset !important;
          height: unset !important;
        }

        /* Smooth scrolling for the entire page */
        html, body, #__next, main, .layoutWrapper {
          scroll-behavior: auto !important;
          overflow-x: visible !important;
          min-height: unset !important;
          height: unset !important;
        }

        /* Enhanced animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Smooth transitions for all elements */
        /* * {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        } */

        /* Enhanced hover effects */
        .hover\:scale-110:hover {
          transform: scale(1.1);
          transition-duration: 500ms;
        }

        /* Smooth scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
        }

        /* Hide scrollbar but keep functionality */
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Smooth section transitions */
        section {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          width: 100%;
          overflow: visible;
        }

        /* Enhanced button transitions */
        button, a {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Smooth image transitions */
        img {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced text transitions */
        h1, h2, h3, p, span {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Smooth navigation transitions */
        .fixed {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          /* Base styles */
          * {
            transition-duration: 200ms;
          }

          /* Hero section */
          section.min-h-\[85vh\] {
            min-height: 60vh !important;
            padding-top: 6rem !important;
            padding-bottom: 2rem !important;
          }

          /* Typography */
          h1.text-4xl, h1.text-6xl {
            font-size: 1.75rem !important;
            line-height: 1.2 !important;
          }

          h2.text-2xl, h2.text-4xl {
            font-size: 1.5rem !important;
            line-height: 1.3 !important;
          }

          p.text-lg, p.text-1.5xl {
            font-size: 0.875rem !important;
            line-height: 1.4 !important;
          }

          /* Navigation */
          .fixed.top-12 {
            top: 1rem !important;
          }

          .fixed.top-12.left-6,
          .fixed.top-12.right-6 {
            font-size: 0.65rem !important;
            padding: 0.3rem 0.6rem !important;
          }

          /* Projects section */
          #projects-section {
            padding-top: 3rem !important;
            margin-top: 0 !important;
          }

          .getCardStyle {
            width: 100% !important;
            height: 200px !important;
            margin: 0.5rem 0 !important;
          }

          /* Superpowers section */
          #superpowers-section {
            padding-top: 3rem !important;
            margin-top: 0 !important;
          }

          .glass-shimmer {
            padding: 6px !important;
            border-radius: 8px !important;
          }

          /* Contact section */
          #contact-section {
            padding-top: 3rem !important;
            margin-top: 0 !important;
          }

          /* Buttons and interactive elements */
          button, .shimmer-button {
            font-size: 0.75rem !important;
            padding: 0.4rem 0.8rem !important;
          }

          /* Spacing adjustments */
          .gap-2 {
            gap: 0.5rem !important;
          }

          .gap-3 {
            gap: 0.75rem !important;
          }

          .gap-4 {
            gap: 1rem !important;
          }

          .mb-3 {
            margin-bottom: 0.75rem !important;
          }

          .mb-6 {
            margin-bottom: 1.5rem !important;
          }

          .py-6 {
            padding-top: 1.5rem !important;
            padding-bottom: 1.5rem !important;
          }

          /* Container adjustments */
          .max-w-7xl {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }

          /* Chat widget */
          .fixed.bottom-8.right-8 {
            bottom: 1rem !important;
            right: 1rem !important;
          }
        }

        /* 3D Text Shadow Effect */
        .text-shadow-3d {
          text-shadow: 1px 1px 1px rgba(0,0,0,0.1),
                      2px 2px 2px rgba(0,0,0,0.05),
                      3px 3px 3px rgba(0,0,0,0.025);
        }
        
        /* 3D Button Shadow */
        .shadow-3d {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                    0 2px 4px -1px rgba(0, 0, 0, 0.06),
                    0 1px 0 rgba(255, 255, 255, 0.1) inset;
          transform: translateY(0);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .shadow-3d:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                    0 4px 6px -2px rgba(0, 0, 0, 0.05),
                    0 1px 0 rgba(255, 255, 255, 0.1) inset;
          transform: translateY(-2px);
        }
        
        /* 3D Card Shadow */
        .shadow-3d-card {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                    0 4px 6px -2px rgba(0, 0, 0, 0.05),
                    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        /* 3D Glass Container Shadow */
        .shadow-3d-glass {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                    0 10px 10px -5px rgba(0, 0, 0, 0.04),
                    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }

        /* Ensure the body takes full height and allows scrolling */
        body {
          min-height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        /* Ensure main content takes full height */
        main {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Remove any extra space from the layout wrapper */
        .layoutWrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* Adjust contact section spacing */
        #contact-section {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        #contact-section form {
          margin-bottom: 0;
        }

        #contact-section .max-w-md {
          margin-bottom: 0;
        }

        /* Carousel animation */
        @keyframes carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-carousel {
          animation: carousel 40s linear infinite;
          display: flex;
          width: max-content;
        }

        .animate-carousel:hover {
          animation-play-state: paused;
        }

        /* Modern minimal animation for logos */
        .glass-shimmer {
          position: relative;
          border-radius: 12px;
          padding: 8px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-shimmer:hover {
          transform: scale(1.1);
        }

        .glass-shimmer img {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          filter: grayscale(100%);
        }

        .glass-shimmer:hover img {
          filter: grayscale(0%);
        }

        /* Remove old shimmer effect */
        .glass-shimmer::before,
        .glass-shimmer::after {
          display: none;
        }

        /* Add subtle pulse animation */
        @keyframes subtle-pulse {
          0% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
          }
        }

        .glass-shimmer {
          animation: subtle-pulse 3s ease-in-out infinite;
        }

        .glass-shimmer:hover {
          animation: none;
          opacity: 1;
        }

        /* Coming soon card effect */
        .coming-soon {
          position: relative;
          overflow: hidden;
        }

        .coming-soon::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          animation: shimmer 2s infinite;
          z-index: 1;
        }

        .coming-soon::after {
          content: 'Coming Soon';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          z-index: 2;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .coming-soon:hover::after {
          opacity: 1;
        }

        /* Glowing shimmer border for buttons */
        .shimmer-border-btn {
          position: relative;
          z-index: 0;
        }
        .shimmer-border {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          padding: 2px;
          z-index: 1;
          background: conic-gradient(
            from 0deg,
            #3d5be0 0deg,
            #ff5941 90deg,
            #3d5be0 180deg,
            #ff5941 270deg,
            #3d5be0 360deg
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          animation: shimmer-rotate 2s linear infinite;
        }
        @keyframes shimmer-rotate {
          100% {
            transform: rotate(1turn);
          }
        }
        .shimmer-border-btn .relative {
          z-index: 2;
        }

        /* Animated moving border for button using SVG stroke-dasharray */
        .moving-border-btn {
          position: relative;
          z-index: 0;
          background: #fff;
          border-radius: 9999px;
        }
        .moving-border-rect {
          stroke-dasharray: 520 100;
          stroke-dashoffset: 0;
          animation: border-move 3s linear infinite;
        }
        @keyframes border-move {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -620;
          }
        }
        .spinner {
          display: inline-block;
          width: 1.1em;
          height: 1.1em;
          border: 2.5px solid #3d5be0;
          border-top: 2.5px solid #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .project-cards-row {
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .glassmorphic-card-horizontal {
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.08);
          background: rgba(255, 255, 255, 0.13);
          backdrop-filter: none !important;
          border: 1.5px solid rgba(255,255,255,0.12);
          transition: box-shadow 0.4s, background 0.4s;
        }
        .glassmorphic-card-horizontal:hover {
          box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.10);
          background: rgba(255,255,255,0.22);
        }
        .projects-dark-card {
          background: #fff !important;
          color: #111 !important;
          box-shadow: 0 8px 32px 0 rgba(0,0,0,0.12);
        }

        .rect-card {
          border-radius: 0 !important;
        }
        .rounded-card {
          border-radius: 1.5rem !important;
        }

        #__next, main, .layoutWrapper {
          display: block !important;
        }

        /* Navigation buttons auto-hide on scroll */
        .auto-hide-nav {
          opacity: 1;
          pointer-events: auto;
          transition: opacity 0.3s, top 0.3s;
        }
        .auto-hide-nav.hide {
          opacity: 0;
          pointer-events: none;
          top: 0 !important;
        }
      `}</style>
    </Layout>
  )
}
