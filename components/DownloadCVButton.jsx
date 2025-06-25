import { useState } from "react";
import { Download } from "lucide-react";

export default function DownloadCVButton() {
  const [isDownloading, setIsDownloading] = useState(false);
  return (
    <>
      <button
        onClick={async () => {
          if (isDownloading) return;
          setIsDownloading(true);
          setTimeout(() => {
            setIsDownloading(false);
            window.open("/MUHAMMED_SAYEES_CV.pdf", "_blank");
          }, 1200);
        }}
        className="group relative px-6 py-3 bg-transparent rounded-full moving-border-btn overflow-hidden transition-all duration-300"
        style={{ minWidth: '160px', minHeight: '44px' }}
        type="button"
        disabled={isDownloading}
        aria-busy={isDownloading}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 208 56" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <rect x="2" y="2" width="204" height="52" rx="26" stroke="url(#border-gradient-color)" strokeWidth="2" className="moving-border-rect" />
          <defs>
            <linearGradient id="border-gradient-color" x1="0" y1="0" x2="208" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3d5be0" stopOpacity="0.5" />
              <stop offset="0.5" stopColor="#ff5941" stopOpacity="0.4" />
              <stop offset="1" stopColor="#3d5be0" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flex items-center space-x-2 relative z-10">
          <span className="text-black font-medium text-base whitespace-nowrap">
            {isDownloading ? (
              <span className="flex items-center gap-2">
                <span className="spinner mr-2" aria-label="Loading" />
                Downloading...
              </span>
            ) : (
              <>Download CV</>
            )}
          </span>
          <Download className="w-5 h-5 text-black transition-all duration-300 ease-in-out transform group-hover:translate-y-0.5" />
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
          CV is of June 2025
        </div>
      </button>
      <style jsx>{`
        .moving-border-rect {
          stroke-dasharray: 600 100;
          stroke-dashoffset: 0;
          animation: border-move-rect 3s linear infinite;
        }
        @keyframes border-move-rect {
          100% {
            stroke-dashoffset: -700;
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
      `}</style>
    </>
  );
}
