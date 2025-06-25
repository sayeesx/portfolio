import { useEffect, useState } from "react";

export default function useHideOnScroll() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let lastScrollY = window.scrollY;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setHide(currentScrollY > lastScrollY && currentScrollY > 50);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    setHide(window.scrollY > 50);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return hide;
}
