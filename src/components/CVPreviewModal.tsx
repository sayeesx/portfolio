import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Set up PDF.js worker
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.mjs`;
}

interface CVPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVPreviewModal({ isOpen, onClose }: CVPreviewModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(2.0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfDocRef = useRef<any>(null);
  const canvasRefs = useRef<HTMLCanvasElement[]>([]);

  const cvUrl = "/assets/resume.pdf";

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      loadPDF();
    } else {
      document.body.style.overflow = "";
      // Cleanup
      if (pdfDocRef.current) {
        pdfDocRef.current.destroy();
        pdfDocRef.current = null;
      }
      canvasRefs.current = [];
      setIsLoading(true);
      setError(null);
      setTotalPages(0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Smooth progress animation
  useEffect(() => {
    if (loadingProgress < targetProgress) {
      const timer = setTimeout(() => {
        setLoadingProgress(prev => Math.min(prev + 1, targetProgress));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [loadingProgress, targetProgress]);

  useEffect(() => {
    if (pdfDocRef.current && !isLoading && !error && totalPages > 0) {
      renderAllPages();
    }
  }, [scale, totalPages, isLoading, error]);

  const loadPDF = async () => {
      setIsLoading(true);
      setError(null);
      setLoadingProgress(0);
      setTargetProgress(0);

    try {
      console.log("Loading PDF from:", cvUrl);
      
      const loadingTask = pdfjsLib.getDocument({
        url: cvUrl,
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.296/cmaps/',
        cMapPacked: true,
      });
      
      // Track actual loading progress
      loadingTask.onProgress = (progressData: { loaded: number; total: number }) => {
        if (progressData.total > 0) {
          const percent = Math.round((progressData.loaded / progressData.total) * 100);
          setTargetProgress(percent);
        }
      };
      
      const pdf = await loadingTask.promise;
      pdfDocRef.current = pdf;
      setTotalPages(pdf.numPages);
      console.log("PDF loaded successfully, total pages:", pdf.numPages);
      
      setTargetProgress(100);
      
      // Wait for smooth animation to reach 100%
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsLoading(false);
      
      // Force render after state updates
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          renderAllPages();
        });
      });
    } catch (err) {
      console.error("Error loading PDF:", err);
      setError("Failed to load CV");
      setIsLoading(false);
      
      // Fallback: open PDF in new tab if rendering fails
      setTimeout(() => {
        window.open(cvUrl, '_blank');
      }, 1000);
    }
  };

  const renderAllPages = async () => {
    if (!pdfDocRef.current) {
      console.error("PDF document not loaded");
      return;
    }

    try {
      console.log("Rendering all pages:", totalPages);
      
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const canvas = canvasRefs.current[pageNum - 1];
        if (!canvas) {
          console.error(`Canvas ref not available for page ${pageNum}`);
          continue;
        }

        const page = await pdfDocRef.current.getPage(pageNum);
        const viewport = page.getViewport({ scale });
        
        const context = canvas.getContext("2d");
        
        if (context) {
          // Clear canvas first
          context.clearRect(0, 0, canvas.width, canvas.height);
          
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          console.log(`Canvas dimensions set for page ${pageNum}:`, canvas.width, "x", canvas.height);

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext).promise;
          console.log(`Page ${pageNum} rendered successfully`);
          
          // Force canvas visibility
          canvas.style.display = "block";
        } else {
          console.error(`Could not get 2D context from canvas for page ${pageNum}`);
        }
      }
    } catch (err) {
      console.error("Error rendering pages:", err);
      setError("Failed to render CV pages");
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 sm:inset-4 md:inset-8 lg:inset-16 z-[9999] flex items-center justify-center"
          >
            <div className="relative w-full h-full bg-black border border-white/20 rounded-lg shadow-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10 bg-black/90">
                <div className="flex items-center gap-4">
                  <h2 className="text-white font-semibold text-base sm:text-lg">CV Preview</h2>
                  {!isLoading && !error && totalPages > 0 && (
                    <span className="text-gray-400 text-xs sm:text-sm">
                      {totalPages} {totalPages === 1 ? 'Page' : 'Pages'}
                    </span>
                  )}
                </div>
                
                {/* Controls */}
                {!isLoading && !error && (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={handleZoomOut}
                      className="px-2 py-1 sm:px-3 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded transition-colors text-xs sm:text-sm touch-manipulation"
                      aria-label="Zoom out"
                    >
                      −
                    </button>
                    <span className="text-white text-xs sm:text-sm min-w-[45px] text-center">{Math.round(scale * 50)}%</span>
                    <button
                      onClick={handleZoomIn}
                      className="px-2 py-1 sm:px-3 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded transition-colors text-xs sm:text-sm touch-manipulation"
                      aria-label="Zoom in"
                    >
                      +
                    </button>
                    <a
                      href={cvUrl}
                      download="Muhammed_Sayees_CV.pdf"
                      className="px-2 py-1 sm:px-3 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded transition-colors text-xs sm:text-sm flex items-center gap-1 touch-manipulation ml-1"
                      aria-label="Download CV"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span className="hidden sm:inline">Download</span>
                    </a>
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="bg-black/80 hover:bg-black text-white rounded-full p-1.5 sm:p-2 transition-colors"
                  aria-label="Close CV preview"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-auto bg-gray-900" ref={containerRef} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
                {/* Loading Animation */}
                <AnimatePresence>
                  {isLoading && !error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center bg-black z-20"
                    >
                      <style>{`
                        .cv-loader-card {
                          --bg-color: transparent;
                          background-color: var(--bg-color);
                          padding: 0;
                        }
                        .cv-loader {
                          color: white;
                          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                          font-weight: 500;
                          font-size: 25px;
                          box-sizing: content-box;
                          height: 40px;
                          padding: 10px 10px;
                          display: flex;
                          border-radius: 8px;
                        }
                        @media (max-width: 768px) {
                          .cv-loader {
                            font-size: 18px;
                            height: 30px;
                            padding: 8px 8px;
                          }
                        }
                        .cv-spinner {
                          animation: cv_rotate 2s linear infinite;
                        }
                        @media (max-width: 768px) {
                          .cv-spinner {
                            width: 30px;
                            height: 30px;
                          }
                        }
                        .cv-spinner-path {
                          stroke: white;
                          stroke-linecap: round;
                          animation: cv_dash 1.5s ease-in-out infinite;
                        }
                        @keyframes cv_rotate {
                          100% {
                            transform: rotate(360deg);
                          }
                        }
                        @keyframes cv_dash {
                          0% {
                            stroke-dasharray: 1, 150;
                            stroke-dashoffset: 0;
                          }
                          50% {
                            stroke-dasharray: 90, 150;
                            stroke-dashoffset: -35;
                          }
                          100% {
                            stroke-dasharray: 90, 150;
                            stroke-dashoffset: -124;
                          }
                        }
                        .cv-loader-words {
                          overflow: hidden;
                          position: relative;
                        }
                        .cv-loader-words::after {
                          content: "";
                          position: absolute;
                          inset: 0;
                          background: linear-gradient(
                            transparent 10%,
                            transparent 30%,
                            transparent 70%,
                            transparent 90%
                          );
                          z-index: 20;
                        }
                        .cv-loader-word {
                          display: block;
                          height: 100%;
                          padding-left: 6px;
                          color: white;
                          animation: cv_spin_words 6s infinite;
                        }
                        @keyframes cv_spin_words {
                          0% {
                            transform: translateY(0%);
                          }
                          25% {
                            transform: translateY(0%);
                          }
                          30% {
                            transform: translateY(-102%);
                          }
                          40% {
                            transform: translateY(-100%);
                          }
                          50% {
                            transform: translateY(-202%);
                          }
                          60% {
                            transform: translateY(-200%);
                          }
                          70% {
                            transform: translateY(-302%);
                          }
                          80% {
                            transform: translateY(-300%);
                          }
                          85% {
                            transform: translateY(-402%);
                          }
                          92% {
                            transform: translateY(-400%);
                          }
                          96% {
                            transform: translateY(-502%);
                          }
                          100% {
                            transform: translateY(-500%);
                          }
                        }
                      `}</style>
                      <div className="cv-loader-card">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="relative">
                            <svg className="cv-spinner" width="40" height="40" viewBox="0 0 50 50">
                              <circle className="cv-spinner-path" cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-white font-semibold" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '9px' }}>
                                {loadingProgress}%
                              </span>
                            </div>
                          </div>
                          <div className="cv-loader">
                            <div className="cv-loader-words">
                              <span className="cv-loader-word">fetching</span>
                              <span className="cv-loader-word">updated</span>
                              <span className="cv-loader-word">CV</span>
                              <span className="cv-loader-word">from</span>
                              <span className="cv-loader-word">database</span>
                              <span className="cv-loader-word">fetching</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Message */}
                {error && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20">
                    <p className="text-red-500 font-semibold text-lg mb-2">
                      {error}
                    </p>
                    <button
                      onClick={loadPDF}
                      className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* PDF Canvas - Vertical Scroll */}
                {!isLoading && !error && totalPages > 0 && (
                  <div className="flex flex-col items-center gap-4 p-4 min-h-full overflow-y-auto">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <canvas
                        key={i}
                        ref={(el) => {
                          if (el) canvasRefs.current[i] = el;
                        }}
                        className="shadow-2xl"
                        style={{ 
                          display: "block", 
                          width: typeof window !== 'undefined' && window.innerWidth <= 768 ? "95%" : "50%", 
                          height: "auto",
                          maxWidth: "100%"
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}