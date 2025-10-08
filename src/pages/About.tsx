import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, {
    damping,
    stiffness
  });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(direction === 'down' ? to : from);
    }
  }, [from, to, direction]);

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === 'function') {
        onStart();
      }
      const timeoutId = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === 'function') {
            onEnd();
          }
        },
        delay * 1000 + duration * 1000
      );

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', latest => {
      if (ref.current) {
        const hasDecimals = maxDecimals > 0;
        const options: Intl.NumberFormatOptions = {
          useGrouping: !!separator,
          minimumFractionDigits: hasDecimals ? maxDecimals : 0,
          maximumFractionDigits: hasDecimals ? maxDecimals : 0
        };
        const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);
        ref.current.textContent = separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
      }
    });
    return () => unsubscribe();
  }, [springValue, separator, maxDecimals]);

  return <span className={className} ref={ref} />;
}

export default function About() {
  const navigate = useNavigate();
  const [selectedCert, setSelectedCert] = useState<{ name: string; images: string[] } | null>(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const certifications = [
    {
      name: "HP",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
      image: "/assets/hp.jpg",
      filter: "brightness-0 invert"
    },
    {
      name: "Hugging Face",
      logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
      image: "/assets/huggingface.jpg",
      filter: ""
    },
    {
      name: "Google",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
      image: "/assets/google.jpg",
      filter: ""
    },
    {
      name: "Oracle",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
      image: "/assets/oracle.jpg",
      filter: ""
    },
    {
      name: "AWS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      image: "/assets/aws.jpg",
      filter: "brightness-0 invert"
    },
    {
      name: "NVIDIA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a4/NVIDIA_logo.svg",
      image: "/assets/nvidia.jpg",
      filter: "brightness-0 invert"
    },
    {
      name: "Accenture",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
      image: "/assets/accenture.jpg",
      filter: "brightness-0 invert"
    },
    {
      name: "Infosys",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
      image: "/assets/infosys.jpg",
      filter: "brightness-0 invert"
    },
    {
      name: "OneRoadmap",
      logo: "",
      image: "/assets/oneroadmap.jpg",
      filter: ""
    },
    {
      name: "SEBI",
      logo: "",
      image: "/assets/sebi.jpg",
      filter: ""
    },
    {
      name: "Indian Central Government",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg",
      images: ["/assets/indian.jpg", "/assets/indian2.jpg"],
      filter: "brightness-0 invert"
    },
    {
      name: "Intel",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg",
      images: ["/assets/intel.jpg", "/assets/intel2.jpg"],
      filter: "brightness-0 invert"
    }
  ];

  const handleCertClick = (cert: { name: string; image?: string; images?: string[] }) => {
    const images = cert.images || (cert.image ? [cert.image] : []);
    setSelectedCert({ name: cert.name, images });
    setImageError(false);
    setImageLoading(true);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedCert(null);
    setImageError(false);
    setImageLoading(true);
    setCurrentImageIndex(0);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCert) {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedCert]);

  // Auto-cycle through images for certifications with multiple images
  useEffect(() => {
    if (selectedCert && selectedCert.images.length > 1 && !imageLoading) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % selectedCert.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedCert, imageLoading]);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />

      {/* Content */}
      <div className="flex-1 px-6 py-16 pt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="cursor-pointer -ml-4 text-white hover:bg-white hover:text-black"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>

            <div className="space-y-6">
              <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-white">
                About Me
              </h1>
              <div className="h-1 w-20 bg-white" />
            </div>

            <div className="space-y-8 text-sm md:text-lg text-gray-300 leading-relaxed">
              <p>
                Hi, I'm Sayees, a passionate developer who loves building modern, intelligent, and meaningful digital experiences. 
                I enjoy turning ideas into reality through clean code and creative design. 
                My work blends technology and innovation to solve real-world problems. 
                Always learning, always creating. That's what keeps me going.
              </p>
              <p>
                As a student, developer, AI and ML engineer, data analyst, and data scientist, I specialize in creating 
                intelligent systems that solve complex problems. My expertise spans across machine learning, data analysis, 
                and full-stack development, allowing me to build end-to-end solutions that make a real impact.
              </p>
              <p>
                I believe in continuous learning and staying at the forefront of technology. Whether it's training neural networks, 
                analyzing data patterns, or building scalable applications, I approach every challenge with curiosity and dedication.
              </p>
            </div>

            <div className="flex flex-row justify-between gap-4 pt-8">
              <div className="space-y-1 md:space-y-2 flex-1">
                <h3 className="text-2xl md:text-4xl font-bold text-white">
                  <CountUp to={1} duration={1.5} />+
                </h3>
                <p className="text-xs md:text-base text-gray-400">Years Experience</p>
              </div>
              <div className="space-y-1 md:space-y-2 flex-1">
                <h3 className="text-2xl md:text-4xl font-bold text-white">
                  <CountUp to={30} duration={2} />+
                </h3>
                <p className="text-xs md:text-base text-gray-400">Projects Completed</p>
              </div>
              <div className="space-y-1 md:space-y-2 flex-1">
                <h3 className="text-2xl md:text-4xl font-bold text-white">
                  <CountUp to={40} duration={2} />+
                </h3>
                <p className="text-xs md:text-base text-gray-400">LeetCode Solved</p>
              </div>
            </div>

            {/* Certifications Section */}
            <div className="space-y-6 pt-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Certifications
              </h2>
              <div className="h-1 w-20 bg-white" />
              <p className="text-sm md:text-base text-gray-300">
                Certified by leading technology companies and organizations
              </p>
              
              <div className="grid grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 pt-6">
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    onClick={() => handleCertClick(cert)}
                    className="flex items-center justify-center p-4 border border-gray-700 rounded-lg hover:border-white transition-colors cursor-pointer"
                  >
                    {cert.logo ? (
                      <img 
                        src={cert.logo} 
                        alt={cert.name} 
                        className={`w-16 h-16 object-contain ${cert.filter}`}
                      />
                    ) : (
                      <span className="text-white text-xs md:text-sm font-medium text-center">
                        {cert.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Certification Preview Modal */}
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-black border border-white/20 rounded-lg p-6 max-w-[90vw] max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              {selectedCert.name} Certification
              {selectedCert.images.length > 1 && (
                <span className="text-sm text-gray-400 ml-2">
                  ({currentImageIndex + 1}/{selectedCert.images.length})
                </span>
              )}
            </h3>
            
            {selectedCert.images.length > 0 ? (
              imageError ? (
                <div className="flex items-center justify-center h-64 bg-black/50 rounded-lg">
                  <p className="text-red-400 text-lg">Failed to fetch image from database</p>
                </div>
              ) : (
                <div className="relative flex items-center justify-center">
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg className="cv-spinner" width="40" height="40" viewBox="0 0 50 50">
                          <circle className="cv-spinner-path" cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
                        </svg>
                        <span className="text-white font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          Loading...
                        </span>
                      </div>
                    </div>
                  )}
                  <img
                    key={currentImageIndex}
                    src={selectedCert.images[currentImageIndex]}
                    alt={`${selectedCert.name} certification ${currentImageIndex + 1}`}
                    className={`w-full max-h-[70vh] h-auto object-contain rounded-lg ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageError(true);
                      setImageLoading(false);
                    }}
                  />
                </div>
              )
            ) : (
              <div className="flex items-center justify-center h-64 bg-black/50 rounded-lg">
                <p className="text-gray-400 text-lg">No certification image available</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}