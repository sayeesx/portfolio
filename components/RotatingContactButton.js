import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Github, Linkedin, Twitter, Mail, Instagram, Facebook } from "lucide-react"

export default function ContactButton() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0)

  const socialData = [
    { Icon: Github, color: '#333' },
    { Icon: Linkedin, color: '#0077b5' },
    { Icon: Twitter, color: '#1DA1F2' },
    { Icon: Mail, color: '#EA4335' },
    { Icon: Instagram, color: '#E4405F' },
    { Icon: Facebook, color: '#1877F2' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % socialData.length)
    }, 800)
    return () => clearInterval(interval)
  }, [socialData.length])

  const handleClick = () => {
    router.push('/contact')
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative px-6 py-3 bg-transparent rounded-full moving-border-btn overflow-hidden transition-all duration-300"
      style={{ minWidth: '160px', minHeight: '44px' }}
    >
      {/* Animated moving border using SVG (smoothed, thinner, lower opacity, perfectly aligned) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 208 56" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <rect x="2" y="2" width="204" height="52" rx="26" stroke="url(#border-gradient)" strokeWidth="2" className="moving-border-rect" />
        <defs>
          <linearGradient id="border-gradient" x1="0" y1="0" x2="208" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3d5be0" stopOpacity="0.5" />
            <stop offset="0.5" stopColor="#ff5941" stopOpacity="0.4" />
            <stop offset="1" stopColor="#3d5be0" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex items-center space-x-2 relative z-10">
        <span className="text-black font-medium text-base whitespace-nowrap">
          Contact me via
        </span>
        <div className="relative w-6 h-6 flex items-center justify-center">
          {socialData.map(({ Icon, color }, index) => (
            <Icon
              key={index}
              className={`absolute w-5 h-5 transition-all duration-300 ${
                index === currentLogoIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{ color }}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .moving-border-btn {
          position: relative;
          z-index: 0;
          background: #fff;
          border-radius: 9999px;
        }
        .moving-border-rect {
          stroke-dasharray: 520 100;
          stroke-dashoffset: 0;
          animation: border-move 3s linear infinite;
        }
        @keyframes border-move {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -620;
          }
        }
      `}</style>
    </button>
  )
}