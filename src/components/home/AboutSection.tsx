import { Button } from "@/components/ui/button";
import { ArrowRight, Code2 } from "lucide-react";
import { useNavigate } from "react-router";

export default function AboutSection() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Code2 className="h-6 w-6 text-white" />
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">About Me</h2>
      </div>
      <p className="text-sm md:text-lg text-gray-300 leading-relaxed mb-6">
        Hi, I'm Sayees, a passionate developer who loves building modern, intelligent, and meaningful digital experiences. 
        I enjoy turning ideas into reality through clean code and creative design. 
        My work blends technology and innovation to solve real-world problems. 
        Always learning, always creating. That's what keeps me going.
      </p>
      <Button
        variant="outline"
        onClick={() => navigate("/about")}
        className="cursor-pointer bg-white text-black border-white hover:bg-gray-200 transition-all"
      >
        Learn More
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </>
  );
}
