import { useEffect, useState } from "react";

function getFirstScrollableDiv() {
  if (typeof window === 'undefined') return null;
  const divs = document.querySelectorAll('div');
  for (let div of divs) {
    if (div.scrollHeight > div.clientHeight) return div;
  }
  return null;
}

export default function useHideOnScroll() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const scrollableDiv = getFirstScrollableDiv();
    let lastScrollY = window.scrollY;
    let lastDivScrollY = scrollableDiv ? scrollableDiv.scrollTop : 0;
    let ticking = false;
    const scrollThreshold = 30;
    const minShowScroll = 50;
    const handleWindowScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          console.log('useHideOnScroll: window.scrollY', currentScrollY);
          if (currentScrollY > lastScrollY + scrollThreshold && currentScrollY > minShowScroll) {
            setHide(true);
          } else if (currentScrollY < lastScrollY - scrollThreshold) {
            setHide(false);
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    const handleDivScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = scrollableDiv.scrollTop;
          console.log('useHideOnScroll: div.scrollTop', currentScrollY);
          if (currentScrollY > lastDivScrollY + scrollThreshold && currentScrollY > minShowScroll) {
            setHide(true);
          } else if (currentScrollY < lastDivScrollY - scrollThreshold) {
            setHide(false);
          }
          lastDivScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    if (scrollableDiv) {
      scrollableDiv.addEventListener('scroll', handleDivScroll, { passive: true });
    }
    setHide(window.scrollY > minShowScroll || (scrollableDiv && scrollableDiv.scrollTop > minShowScroll));
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      if (scrollableDiv) scrollableDiv.removeEventListener('scroll', handleDivScroll);
    };
  }, []);
  return hide;
}
