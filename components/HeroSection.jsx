import AspiringRoleCube from "./AspiringRoleCube";
import BlurText from "./BlurText";
import DownloadCVButton from "./DownloadCVButton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection({ zoomOut }) {
  return (
    <section className="min-h-[85vh] md:min-h-[85vh] min-h-[60vh] flex items-center justify-center pt-32 md:pt-32 pt-40 pb-0">
      <div
        className={`flex flex-col items-center justify-center text-center px-4 py-12 md:py-12 py-6 transform transition-all duration-1000 ease-out mx-auto mt-12 md:mt-0 ${zoomOut ? "scale-90 opacity-100" : "scale-110 opacity-0"}`}
      >
        <div className="flex flex-col items-center gap-4 md:gap-4 gap-2 mb-6 md:mb-6 mb-3">
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
            <h1 className="text-3xl md:text-6xl text-4xl font-bold text-black mb-0 md:mb-2 text-shadow-3d">
              Hello, I&apos;m
            </h1>
            <h1 className="text-3xl md:text-6xl text-4xl font-bold text-black mb-2 md:mb-2 text-shadow-3d">
              Muhammed Sayees
            </h1>
          </div>
          <div className="scale-100 md:scale-100 scale-75">
            <AspiringRoleCube />
          </div>
        </div>
        <div className="mb-6 md:mb-6 mb-3">
          <div className="max-w-2xl mx-auto mb-4 md:mb-4 mb-2">
            <BlurText
              text="I build and code beautifully simple things, and I love what I do."
              delay={120}
              animateBy="words"
              direction="top"
              className="text-black text-lg md:text-1.5xl text-sm text-center"
            />
          </div>
        </div>
        <div className="mt-4 mb-8 w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <DownloadCVButton className="shadow-3d" />
          <Link
            href="/aboutme"
            className="aboutme-btn group relative px-6 py-3 rounded-full transition-all duration-300 min-w-[160px] min-h-[44px] flex items-center justify-center font-medium text-base text-black"
            style={{ marginLeft: 0, background: 'none', boxShadow: 'none', border: 'none' }}
          >
            <span className="flex items-center gap-2">
              About Me
              <ArrowRight className="w-5 h-5 ml-1 arrow-animate group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
