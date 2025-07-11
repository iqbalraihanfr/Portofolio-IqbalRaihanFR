"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUp, Github, Linkedin, Mail, Heart } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/iqbalraihan",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/iqbalraihanfaturrahmanr/",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:iqbaalraihanrr@gmail.com",
    icon: Mail,
  },
]

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Certificates", href: "/certificates" },
  { name: "Achievements", href: "/achievements" },
  { name: "Contact", href: "/contact" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-2xl font-bold text-gradient mb-4">Iqbal Raihan</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Full Stack Developer & IT Project Manager passionate about creating impactful digital solutions and
                leading innovative projects.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <motion.div key={link.name} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 bg-transparent"
                    >
                      <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                        <link.icon className="w-4 h-4 hover:scale-110 transition-transform duration-200" />
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-semibold mb-4">Get In Touch</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Surabaya, Indonesia</p>
                <p>iqbaalraihanrr@gmail.com</p>
                <p>+62 85156482279</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t border-border/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
            © {new Date().getFullYear()} Iqbal Raihan. Made with <Heart className="inline w-4 h-4 text-red-500 mx-1" />
            using Next.js & Tailwind CSS
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="group bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4 mr-2 group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300" />
              Back to Top
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
