"use client"

import { motion } from "framer-motion"
import { BentoGrid, BentoGridItem } from "@/src/components/ui/bento-grid"
import { Database, Brain, Globe, Smartphone, Users } from "lucide-react"

const SkillHeader = ({ color }: { color: string }) => {
  return (
    <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-linear-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
      <div className={`w-full h-full bg-linear-to-br ${color} opacity-20 rounded-xl`} />
    </div>
  )
}

const skillsData = [
  {
    title: "Frontend Development",
    description: "React, Next.js, TypeScript, Tailwind CSS",
    header: <SkillHeader color="from-blue-500 to-cyan-500" />,
    icon: <Globe className="h-4 w-4 text-blue-500" />,
    className: "md:col-span-2",
  },
  {
    title: "Backend Development",
    description: "Node.js, Python, PHP, FastAPI, MySQL",
    header: <SkillHeader color="from-green-500 to-emerald-500" />,
    icon: <Database className="h-4 w-4 text-green-500" />,
  },
  {
    title: "AI/ML & Data Science",
    description: "TensorFlow, Pandas, NumPy, Matplotlib",
    header: <SkillHeader color="from-purple-500 to-pink-500" />,
    icon: <Brain className="h-4 w-4 text-purple-500" />,
  },
  {
    title: "Mobile Development",
    description: "React Native, Flutter concepts",
    header: <SkillHeader color="from-orange-500 to-red-500" />,
    icon: <Smartphone className="h-4 w-4 text-orange-500" />,
  },
  {
    title: "Project Management",
    description: "Team Leadership, Agile, Stakeholder Management",
    header: <SkillHeader color="from-indigo-500 to-purple-500" />,
    icon: <Users className="h-4 w-4 text-indigo-500" />,
    className: "md:col-span-2",
  },
]

export function SkillsBentoGrid() {
  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h3 className="text-2xl font-bold mb-4 text-gradient">Technical Skills</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">Technologies and tools I use to bring ideas to life</p>
      </motion.div>

      <BentoGrid className="max-w-4xl mx-auto">
        {skillsData.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </section>
  )
}
