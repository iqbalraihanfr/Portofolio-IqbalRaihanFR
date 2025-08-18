"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollIndicator() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div 
      className="h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 fixed top-0 left-0 right-0 origin-left z-50"
      style={{ scaleX }}
    />
  )
}
