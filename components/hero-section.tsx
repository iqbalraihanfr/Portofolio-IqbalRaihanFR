"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Spotlight } from "@/components/ui/spotlight";
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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-neutral-950">
      {/* Dynamic Background */}
      {/* Hapus background absolute gradient/navy, cukup pakai bg section di atas */}

      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div> */}

      {/* Aceternity Effects */}
      {/* <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" /> */}
      {/* <BackgroundBeams className="absolute inset-0" /> */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          {/* Profile Image with Enhanced Animation */}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative w-40 h-40 mx-auto mb-8"
            >
              <div className="absolute inset-0 bg-linear-to-r from-red-400 to-red-700 rounded-full blur-xl opacity-30 animate-pulse" />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-full h-full"
              >
                <Image
                  src="/images/Foto_Fomal1.jpg"
                  alt="Iqbal Raihan"
                  fill
                  className="rounded-full object-cover shadow-2xl transition-all duration-300 hover:shadow-3xl"
                />
                <div className="absolute inset-0 rounded-full bg-linear-to-tr from-red-400/20 to-red-700/20 transition-opacity duration-300 hover:opacity-30" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Text with Gradient */}
          <div className="space-y-8 mb-12">
            <TextGenerateEffect
              words="Hi, I'm Iqbal Raihan"
              className={`text-5xl sm:text-7xl lg:text-8xl font-bold font-plus-jakarta ${colors.gradients.hero} bg-clip-text text-transparent`}
            />

            <motion.div variants={itemVariants} className="space-y-4">
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-semibold ${colors.gradients.primary} bg-clip-text text-transparent`}
              >
                Full Stack Developer & IT Project Manager
              </h2>

              <p
                className={`text-lg sm:text-xl ${colors.text.secondary} max-w-3xl mx-auto leading-relaxed`}
              >
                Computer Science undergraduate with a passion for creating
                impactful digital solutions. Specializing in IT Project
                Management while building innovative web applications.
              </p>
            </motion.div>
          </div>

          {/* Enhanced Status Indicators */}
          {/* <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 text-sm mb-12">
            <div className="flex items-center space-x-3 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xs rounded-full shadow-lg">
              <div className="w-3 h-3 bg-linear-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
              <span className="font-medium text-gray-700 dark:text-gray-200">Available for opportunities</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xs rounded-full shadow-lg">
              <div className="w-3 h-3 bg-linear-to-r from-blue-400 to-cyan-500 rounded-full shadow-lg shadow-blue-400/50" />
              <span className="font-medium text-gray-700 dark:text-gray-200">Based in Surabaya, Indonesia</span>
            </div>
          </motion.div> */}

          {/* Enhanced Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="group shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              asChild
            >
              <Link href="/projects">
                <span className="mr-2 group-hover:animate-pulse">
                  View My Work
                </span>
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group shadow-xl bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
              asChild
            >
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                Get In Touch
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="group hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <Download className="mr-2 h-5 w-5 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
              Download CV
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className={`flex flex-col items-center ${colors.text.muted}`}
        >
          <span className="text-sm mb-2 font-medium">Scroll to explore</span>
          <div
            className={`w-6 h-10 border-2 ${colors.border.primary} rounded-full flex justify-center`}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className={`w-1 h-3 ${colors.gradients.primary} rounded-full mt-2`}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
