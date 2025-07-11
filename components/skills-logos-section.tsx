"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const skillCategories = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React", logo: "/placeholder.svg?height=60&width=60", color: "text-blue-500" },
      { name: "Next.js", logo: "/placeholder.svg?height=60&width=60", color: "text-black dark:text-white" },
      { name: "TypeScript", logo: "/placeholder.svg?height=60&width=60", color: "text-blue-600" },
      { name: "JavaScript", logo: "/placeholder.svg?height=60&width=60", color: "text-yellow-500" },
      { name: "Tailwind CSS", logo: "/placeholder.svg?height=60&width=60", color: "text-cyan-500" },
      { name: "HTML5", logo: "/placeholder.svg?height=60&width=60", color: "text-orange-500" },
    ],
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Node.js", logo: "/placeholder.svg?height=60&width=60", color: "text-green-600" },
      { name: "Python", logo: "/placeholder.svg?height=60&width=60", color: "text-blue-500" },
      { name: "PHP", logo: "/placeholder.svg?height=60&width=60", color: "text-purple-600" },
      { name: "FastAPI", logo: "/placeholder.svg?height=60&width=60", color: "text-green-500" },
      { name: "MySQL", logo: "/placeholder.svg?height=60&width=60", color: "text-blue-600" },
    ],
  },
  {
    category: "AI/ML & Data Science",
    skills: [
      { name: "TensorFlow", logo: "/placeholder.svg?height=60&width=60", color: "text-orange-500" },
      { name: "Pandas", logo: "/placeholder.svg?height=60&width=60", color: "text-blue-600" },
      { name: "NumPy", logo: "/placeholder.svg?height=60&width=60", color: "text-blue-500" },
      { name: "Matplotlib", logo: "/placeholder.svg?height=60&width=60", color: "text-red-500" },
      { name: "Streamlit", logo: "/placeholder.svg?height=60&width=60", color: "text-red-600" },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Git", logo: "/placeholder.svg?height=60&width=60", color: "text-orange-600" },
      { name: "GitHub", logo: "/placeholder.svg?height=60&width=60", color: "text-gray-800 dark:text-white" },
      { name: "VS Code", logo: "/placeholder.svg?height=60&width=60", color: "text-blue-500" },
      { name: "Figma", logo: "/placeholder.svg?height=60&width=60", color: "text-purple-500" },
      { name: "Canva", logo: "/placeholder.svg?height=60&width=60", color: "text-blue-400" },
      { name: "Photoshop", logo: "/placeholder.svg?height=60&width=60", color: "text-blue-600" },
    ],
  },
]

export function SkillsLogosSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const skillVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-12"
      >
        {skillCategories.map((category, categoryIndex) => (
          <motion.div key={category.category} variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6 text-center">{category.category}</h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  variants={skillVariants}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <Card className="p-4 h-24 flex flex-col items-center justify-center card-hover border-0 shadow-md bg-card/50 backdrop-blur-xs">
                    <CardContent className="p-0 flex flex-col items-center">
                      <div className="relative w-8 h-8 mb-2 group-hover:scale-110 transition-transform">
                        <div className={`w-8 h-8 rounded-lg ${skill.color} bg-current opacity-20 absolute inset-0`} />
                        <div
                          className={`w-6 h-6 ${skill.color} absolute inset-1 flex items-center justify-center text-lg font-bold`}
                        >
                          {skill.name.charAt(0)}
                        </div>
                      </div>
                      <span className="text-xs font-medium text-center group-hover:text-blue-600 transition-colors">
                        {skill.name}
                      </span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating Skills Animation */}
      <div className="relative mt-16 h-32 overflow-hidden">
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/2 transform -translate-y-1/2 flex space-x-8 opacity-20"
        >
          {skillCategories
            .flatMap((cat) => cat.skills)
            .map((skill, index) => (
              <div key={index} className="shrink-0">
                <div
                  className={`w-12 h-12 rounded-full ${skill.color} bg-current opacity-30 flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-sm">{skill.name.charAt(0)}</span>
                </div>
              </div>
            ))}
        </motion.div>
      </div>
    </section>
  )
}
