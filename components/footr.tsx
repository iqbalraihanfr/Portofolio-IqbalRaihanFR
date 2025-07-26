"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type FooterLink = {
  name: string;
  href: string;
  tip: string;
};

const footerLinks: FooterLink[] = [
  {
    name: 'Source code',
    href: 'https://github.com/iqbalraihanfr/Portofolio-IqbalRaihanFR',
    tip: 'This website is open source!'
  },
  {
    name: 'Design',
    href: '/design',
    tip: 'View design system'
  },
  {
    name: 'Statistics',
    href: '/statistics',
    tip: 'View website statistics'
  }
];

type SocialLink = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tip: string;
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      href: "https://github.com/iqbalraihanfr",
      icon: Github,
      tip: "View my GitHub profile"
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/iqbalraihanfr",
      icon: Linkedin,
      tip: "Connect on LinkedIn"
    },
    {
      name: "Email",
      href: "mailto:iqbaalraihanrr@gmail.com",
      icon: Mail,
      tip: "Send me an email"
    },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800/50 bg-white/50 dark:bg-black/50 backdrop-blur-lg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
          {footerLinks.map(({ name, href, tip }) => (
            <motion.div
              key={name}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Link
                href={href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                {name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <span className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap">
                {tip}
              </span>
            </motion.div>
          ))}
        </nav>

        {/* Social Links */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.9 }}
                className="relative group"
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="h-6 w-6" />
                </a>
                <span className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap">
                  {link.tip}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="-mb-10 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {currentYear} Iqbal Raihan. All rights reserved.</p>
        </div>

        {/* Back to top button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      </div>
    </footer>
  );
}
