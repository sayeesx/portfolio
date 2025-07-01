import { OrbitingCircles } from "@/components/magicui/orbiting-circles"
import Image from "next/image"

const skillIcons = [
  { src: "/img/python.svg", alt: "Python" },
  { src: "/img/sql.svg", alt: "SQL" },
  { src: "/img/scikit.svg", alt: "Scikit" },
  { src: "/img/tensorflow.png", alt: "TensorFlow" },
  { src: "/img/julia.svg", alt: "Julia" },
  { src: "/img/cpp.svg", alt: "C++" },
  { src: "/img/tailwind.png", alt: "  Tailwind" },
  { src: "/img/html.svg", alt: "HTML" },
  { src: "/img/css.svg", alt: "CSS" },
  { src: "/img/javascript.svg", alt: "JavaScript" },
  { src: "/img/react.svg", alt: "React" },
  { src: "/img/nextjs.svg", alt: "Next.js" },
]

export default function OrbitingSkills() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <OrbitingCircles iconSize={40} radius={160} path={true}>
        {skillIcons.slice(0, 6).map((icon, index) => (
          <Image
            key={index}
            src={icon.src || "/placeholder.svg"}
            alt={icon.alt}
            width={40}
            height={40}
            className="rounded-md"
            style={{ background: "white" }}
            priority
          />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={30} radius={100} reverse speed={2} path={true}>
        {skillIcons.slice(6).map((icon, index) => (
          <Image
            key={index}
            src={icon.src || "/placeholder.svg"}
            alt={icon.alt}
            width={30}
            height={30}
            className="rounded-md"
            style={{ background: "white" }}
            priority
          />
        ))}
      </OrbitingCircles>
    </div>
  )
}
