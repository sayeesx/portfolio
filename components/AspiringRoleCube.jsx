"use client"

import { LayoutGroup, motion } from "framer-motion"
import { useMemo, useState, useEffect } from "react"
import TextRotate from "./TextRotate"

const AspiringRoleCube = () => {
  // Roles to rotate
  const roles = useMemo(() => [
    "Student",
    "Developer",
    "AI & ML Engineer",
  ], [])

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) {
    return (
      <div className="w-full h-full text-lg md:text-2xl flex flex-row items-center justify-center font-semibold text-black overflow-hidden p-0 md:p-2">
        <span>Aspiring <span className="text-white px-2 md:px-3 bg-[#3d5be0] rounded-lg">Student</span></span>
      </div>
    )
  }

  return (
    <div className="w-full h-full text-lg md:text-2xl flex flex-row items-center justify-center font-semibold text-black overflow-hidden p-0 md:p-2">
      <LayoutGroup>
        <motion.p className="flex whitespace-pre" layout>
          <motion.span
            className="pt-0.5 md:pt-1"
            layout
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          >
            Aspiring {" "}
          </motion.span>
          <TextRotate
            texts={roles}
            mainClassName="text-white px-2 md:px-3 bg-[#3d5be0] overflow-hidden py-0.5 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </motion.p>
      </LayoutGroup>
    </div>
  )
}

export default AspiringRoleCube
