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
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'ping' }),
        });

        const ct = res.headers.get('content-type') || '';
        const text = await res.text().catch(() => '');

        if (!res.ok) {
          console.error('Upstream returned error:', res.status, text);
          return;
        }

        let data: unknown;
        if (ct.includes('application/json')) {
          try {
            data = JSON.parse(text);
          } catch (err) {
            console.warn('Failed to parse JSON, falling back to raw text:', err);
            data = { response: text };
          }
        } else {
          data = { response: text };
        }

        console.log('API response:', data);
      } catch (err) {
        console.error('Error triggering API:', err);
      }
    };

    void triggerAPI();
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
