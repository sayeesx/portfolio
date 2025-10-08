import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import Navbar from "@/components/Navbar";

export default function Skills() {
  const navigate = useNavigate();

  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Convex", "PostgreSQL", "REST APIs", "GraphQL"]
    },
    {
      title: "Tools & Others",
      skills: ["Git", "Docker", "Figma", "VS Code", "Vercel"]
    }
  ];

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
                Skills & Expertise
              </h1>
              <div className="h-1 w-20 bg-white" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {skillCategories.map((category, idx) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                  className="space-y-6"
                >
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                    {category.title}
                  </h2>
                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="border border-gray-700 rounded-lg px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-white hover:border-white transition-colors"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}