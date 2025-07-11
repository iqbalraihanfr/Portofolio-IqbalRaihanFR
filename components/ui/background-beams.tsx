"use client"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const beamsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const beams = beamsRef.current
    if (!beams) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = beams.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      beams.style.setProperty("--mouse-x", `${x}px`)
      beams.style.setProperty("--mouse-y", `${y}px`)
    }

    beams.addEventListener("mousemove", handleMouseMove)
    return () => beams.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={beamsRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `
          radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
          rgba(59, 130, 246, 0.15), transparent 40%),
          radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
          rgba(139, 92, 246, 0.1), transparent 40%)
        `,
      }}
    >
      {/* Animated beams */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-linear-to-r from-transparent via-blue-500 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 200 + 100}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
