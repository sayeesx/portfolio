import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import useHideOnScroll from "../lib/useHideOnScroll";

/**
 * NavButtons component
 * Always shows left 'Back to Home' button.
 * Right button is customizable via props (label, href, icon).
 * Both auto-hide on scroll (fade/slide up).
 *
 * @param {string} rightLabel - Label for right button
 * @param {string} rightHref - Href for right button
 * @param {JSX.Element} [rightIcon] - Icon for right button (optional)
 * @param {string} [rightClassName] - Extra class for right button (optional)
 */
export default function NavButtons({
  rightLabel = '',
  rightHref = '',
  rightIcon = <ArrowRight className="w-3 h-3" />, // default icon
  rightClassName = '',
}) {
  const hideNavButtons = useHideOnScroll();
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-2
        bg-white/60 backdrop-blur-md shadow-lg
        transition-all duration-300
        ${hideNavButtons ? 'opacity-0 -translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'}
      `}
      style={{ transition: 'opacity 0.4s, transform 0.4s' }}
    >
      {/* Left: Back to Home */}
      <Link
        href="/"
        className="flex items-center gap-1 px-3 py-1.5 text-black hover:text-[#3d5be0] transition-all duration-300 text-xs rounded-full bg-white/70 shadow-none"
        style={{ border: 'none' }}
      >
        <ArrowLeft className="w-3 h-3" />
        Back to Home
      </Link>

      {/* Right: Customizable */}
      {rightLabel && rightHref && (
        <Link
          href={rightHref}
          className={`flex items-center gap-1 px-3 py-1.5 text-black hover:text-[#3d5be0] transition-all duration-300 rounded-full bg-white/70 shadow-none text-xs ${rightClassName}`}
          style={{ border: 'none' }}
        >
          {rightLabel}
          {rightIcon}
        </Link>
      )}
    </div>
  );
}
