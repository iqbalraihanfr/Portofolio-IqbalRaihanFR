"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { colors } from "@/lib/colors";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center mt-20 px-6 gap-12 bg-white dark:bg-neutral-950">
      {/* Left Text Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 text-left max-w-2xl mx-auto"
      >
        <motion.h1
  variants={itemVariants}
  className="text-5xl sm:text-6xl lg:text-7xl font-bold font-sans text-gray-900 dark:text-white"
>
  Hi!
</motion.h1>

<motion.h1
  variants={itemVariants}
  className="text-5xl sm:text-6xl lg:text-7xl font-bold font-sans text-gray-900 dark:text-white -mt-6"
>
  I'm{" "}
  <span className={`${colors.gradients.hero} bg-clip-text text-transparent`}>
    Raihan
  </span>
</motion.h1>

        <motion.h2
          variants={itemVariants}
          className={`text-2xl sm:text-3xl font-semibold ${colors.gradients.primary} bg-clip-text text-transparent`}
        >
          Full Stack Developer & IT Project Manager
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className={`text-lg ${colors.text.secondary} leading-relaxed`}
        >
          Computer Science undergraduate with a passion for creating impactful
          digital solutions. Specializing in IT Project Management while
          building innovative web applications.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 pt-4"
        >
          <Button size="lg" className="shadow-md" asChild>
            <Link href="/projects">View My Work</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Link>
          </Button>
          <Button variant="ghost" size="lg">
            <Download className="mr-2 h-5 w-5" />
            Download CV
          </Button>
        </motion.div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="relative w-72 h-72 mx-auto lg:mx-0"
      >
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="relative w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-red-400 to-red-700 rounded-full blur-xl opacity-30 animate-pulse" />
          <Image
            src="/images/image1.jpeg"
            alt="Iqbal Raihan"
            fill
            className="rounded-full object-cover shadow-2xl"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-400/20 to-red-700/20 transition-opacity duration-300 hover:opacity-30" />
        </motion.div>
      </motion.div>
    </section>
  );
}