"use client"

import { motion } from "framer-motion"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip"

const teamMembers = [
  {
    id: 1,
    name: "Iqbal Raihan",
    designation: "Project Lead",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Team Member 1",
    designation: "Frontend Developer",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Team Member 2",
    designation: "Backend Developer",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Team Member 3",
    designation: "UI/UX Designer",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Team Member 4",
    designation: "Data Scientist",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function TeamTooltipSection() {
  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h3 className="text-2xl font-bold mb-4">Collaboration & Teamwork</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          I've had the privilege to work with amazing people across various projects
        </p>

        <div className="flex flex-row items-center justify-center mb-10 w-full">
          <AnimatedTooltip items={teamMembers} />
        </div>
      </motion.div>
    </section>
  )
}
