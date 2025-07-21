"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { HiDocumentText } from "react-icons/hi2";
import { colors } from "@/lib/colors";
import dynamic from 'next/dynamic';

// Dynamically import the NowPlaying component with no SSR
const NowPlaying = dynamic(
  () => import('@/components/spotify/NowPlaying'),
  { ssr: false }
);

const socialLinks = [
  {
    name: 'Resume',
    href: 'https://docs.google.com/document/d/1emlC1CdiKDE0sVVqkpoZWj5FSLdXoFUe2kIXAFxF8Kg/edit?usp=sharing',
    Icon: HiDocumentText
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    Icon: SiLinkedin
  },
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',
    Icon: SiGithub
  }
];

export function HeroSection() {
  return (
    <section className="-mt-35 min-h-screen grid content-center">
      <motion.h2
        className="text-2xl font-bold transition-colors delay-100 md:text-4xl 2xl:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hi!
      </motion.h2>
      
      <motion.h1
        className="mt-1 text-3xl font-bold transition-colors delay-200 md:text-5xl 2xl:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        I'm{' '}
        <span className={`${colors.gradients.hero} bg-clip-text text-transparent`}>
          Raihan
        </span>
        {' '}- Full Stack Developer
      </motion.h1>
      
      <motion.p
        className="mt-4 max-w-4xl leading-relaxed text-gray-700 transition-colors delay-[400ms] dark:text-gray-200 
                   md:mt-6 md:text-lg 2xl:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Computer Science undergraduate with a passion for creating impactful
        digital solutions. Specializing in IT Project Management while
        building innovative web applications.
      </motion.p>
      <NowPlaying />
      
      <motion.div 
        className="mt-8 flex gap-4 text-sm md:text-base"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Button asChild className="shadow-md">
          <Link href="/projects">View My Work</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">
            <Mail className="mr-2 h-4 w-4" />
            Contact Me
          </Link>
        </Button>
      </motion.div>
      
      <motion.div 
        className="mt-8 flex flex-col md:flex-row md:items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex gap-4">
          {socialLinks.map(({ name, href, Icon }) => (
            <Link
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-gray-600 transition
                        dark:text-gray-400 md:text-base hover:text-primary hover:dark:text-primary"
            >
              <Icon className="group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-black dark:group-hover:text-white">
                {name}
              </span>
            </Link>
          ))}
        </div>
        
        <motion.div 
          className="w-full max-w-md mt-4 md:mt-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          
        </motion.div>
      </motion.div>
    </section>
  );
}
