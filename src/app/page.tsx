'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero/Hero';
import Projects from '@/components/Projects/Projects';
import About from '@/components/About/About';
import { useEffect } from 'react';
import { GridPattern } from '@/components/grid-pattern';

// Dynamically import FloatingChatButton
const FloatingChatButton = dynamic(
  () => import('@/components/FloatingChatButton'),
  { ssr: false }
);

export default function Home() {
  useEffect(() => {
    const triggerAPI = async () => {
      try {
        const response = await fetch('https://chatbot-4cn8.onrender.com/', {
          method: 'GET',
        });
        if (!response.ok) {
          console.log('API initialization failed');
        }
      } catch (error) {
        console.log('Error triggering API:', error);
      }
    };

    triggerAPI();
  }, []);

  return (
    <div className="bg-black min-h-screen relative">
      {/* Use GridPattern (single source of grid background) */}
      <GridPattern>
        <main className="relative z-10">
          <Hero />
          <About />
          <Projects />
          <FloatingChatButton />
        </main>
      </GridPattern>
    </div>
  );
}
