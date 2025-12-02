"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Database, Brain, Globe, Smartphone, Users, Server, Code, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data Skills ---
const skillsData = [
  {
    title: "Frontend Ecosystem",
    description: "Building immersive web experiences with React 19, Next.js 15, and Tailwind 4.",
    icon: <Globe className="h-6 w-6 text-blue-400" />,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "group-hover:border-blue-500/50",
    className: "md:col-span-2",
  },
  {
    title: "Backend Architecture",
    description: "Scalable APIs using Node.js, Hono, and FastAPI with robust database designs.",
    icon: <Server className="h-6 w-6 text-emerald-400" />,
    color: "from-emerald-500/20 to-green-500/20",
    borderColor: "group-hover:border-emerald-500/50",
    className: "md:col-span-1",
  },
  {
    title: "AI & Machine Learning",
    description: "Integrating LLMs and predictive models using Python, TensorFlow, and LangChain.",
    icon: <Brain className="h-6 w-6 text-purple-400" />,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "group-hover:border-purple-500/50",
    className: "md:col-span-1",
  },
  {
    title: "Mobile & Cross-Platform",
    description: "Native-like performance with React Native and Flutter for iOS and Android.",
    icon: <Smartphone className="h-6 w-6 text-orange-400" />,
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "group-hover:border-orange-500/50",
    className: "md:col-span-1",
  },
  {
    title: "Technical Leadership",
    description: "Leading agile teams, code reviews, and architectural decision-making.",
    icon: <Users className="h-6 w-6 text-indigo-400" />,
    color: "from-indigo-500/20 to-violet-500/20",
    borderColor: "group-hover:border-indigo-500/50",
    className: "md:col-span-1",
  },
];

// --- Components ---

const SpotlightCard = ({
  children,
  className = "",
  borderColor = "group-hover:border-neutral-500/50",
}: {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative border border-neutral-200 dark:border-white/10 bg-white dark:bg-black overflow-hidden rounded-xl transition-colors duration-500",
        borderColor, // Dynamic hover border color
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

export function SkillsBentoGrid() {
  return (
    <section className="py-24 px-4 md:px-8 relative">
       {/* Background Gradient Blob for ambiance */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
            <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl mix-blend-screen animate-pulse" />
            <div className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ animationDelay: "2s" }} />
       </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500">
              Technical Arsenal
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
             A curated stack of technologies I leverage to build robust, scalable, and beautiful applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillsData.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={cn("h-full", skill.className)}
            >
              <SpotlightCard borderColor={skill.borderColor} className="h-full flex flex-col">
                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br pointer-events-none", skill.color)} />
                
                <div className="p-8 flex flex-col h-full relative z-10">
                  <div className="mb-6 inline-flex p-3 rounded-lg bg-neutral-100 dark:bg-neutral-900/50 w-fit">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2 group-hover:translate-x-1 transition-transform duration-300">
                    {skill.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed flex-grow">
                    {skill.description}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}