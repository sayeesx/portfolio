
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ChatWidget to enable code-splitting
const ChatWidget = dynamic(
  () => import('./ChatWidget'),
  { ssr: false }
);

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Add a small delay before showing the button for a smoother initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
      }}
   >
      <div
        style={{
          transition: 'all 300ms ease-in-out',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        }}
      >
        {isOpen && (
          <div style={{ marginBottom: 12 }}>
            <ChatWidget onClose={() => setIsOpen(false)} />
          </div>
        )}

        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label={'Open chat'}
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              background: 'linear-gradient(90deg, #1f37c7, #3d5be0 60%, #7aa2ff)',
              border: '1px solid rgba(61,91,224,0.35)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
              transform: 'none',
              transition: 'transform 150ms ease, box-shadow 200ms ease, filter 200ms ease',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 24px 48px rgba(0,0,0,0.45)';
              (e.currentTarget as HTMLButtonElement).style.filter = 'saturate(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'none';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 20px 40px rgba(0,0,0,0.35)';
              (e.currentTarget as HTMLButtonElement).style.filter = 'none';
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M20 12.5c0 3.59-3.582 6.5-8 6.5-1.056 0-2.06-.168-2.972-.473-.267-.09-.402-.135-.534-.157-.12-.02-.187-.024-.308.008-.114.03-.238.1-.485.239l-2.6 1.47c-.39.22-.586.33-.744.315a.5.5 0 0 1-.416-.296c-.072-.162-.008-.387.12-.837l.74-2.63c.08-.284.121-.426.116-.555-.004-.118-.036-.233-.098-.444C3.64 15.27 3 13.94 3 12.5 3 8.91 6.582 6 11 6s9 2.91 9 6.5Z" fill="white" fillOpacity="0.95"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default FloatingChatButton;
