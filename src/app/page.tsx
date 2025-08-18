'use client';

import Hero from '@/components/Hero/Hero';
import Projects from '@/components/Projects/Projects';
import About from '@/components/About/About';
import ChatWidget from '@/components/ChatWidget';
import { useEffect, useState } from 'react';
import { GridPattern } from '@/components/grid-pattern';
import styles from './page.module.css';

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

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
      <GridPattern>
        <main className="relative z-10">
          <Hero />
          <About />
          <Projects />
        </main>
        {/* Only render ChatWidget, no floating button here */}
        <ChatWidget hideLauncher={false} open={chatOpen} onOpenChange={setChatOpen} />
      </GridPattern>
    </div>
  );
}
