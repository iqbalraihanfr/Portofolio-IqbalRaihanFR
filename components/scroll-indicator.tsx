"use client"

import { motion, useScroll } from "framer-motion"

export function ScrollIndicator() {
  const { scrollYProgress } = useScroll()

  return <motion.div className="scroll-indicator" style={{ scaleX: scrollYProgress }} />
}
