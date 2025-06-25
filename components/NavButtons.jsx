import Link from "next/link";
import { ArrowRight } from "lucide-react";
import useHideOnScroll from "../lib/useHideOnScroll";

export default function NavButtons() {
  const hideNavButtons = useHideOnScroll();
  return (
    <div className="auto-hide-nav-buttons">
      <Link href="/contact"
        className={`fixed top-12 left-6 z-50 flex items-center gap-1 px-2 py-1 text-black hover:text-[#3d5be0] transition-all duration-300 text-xs auto-hide-nav${hideNavButtons ? ' hide' : ''}`}
      >
        <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" />
        Contact Me
      </Link>
      <Link href="/aboutme"
        className={`fixed top-12 right-6 z-50 flex items-center gap-1 px-2 py-1 border border-black text-black rounded-full hover:bg-black/5 transition-all duration-300 text-xs auto-hide-nav${hideNavButtons ? ' hide' : ''}`}
      >
        About Me
        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
