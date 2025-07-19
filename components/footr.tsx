"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
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
  ];

  return (
    <footer className="border-t border-gray-100 dark:border-gray-800/50 bg-white/50 dark:bg-gray-950/50 backdrop-blur-lg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Iqbal Raihan. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors flex items-center gap-1"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
            >
              <h3 className="text-2xl font-bold text-gradient mb-4">
                Iqbal Raihan
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Full Stack Developer & IT Project Manager passionate about
                creating impactful digital solutions and leading innovative
                projects.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 bg-transparent"
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                      >
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
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
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
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t border-border/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
            © {new Date().getFullYear()} Iqbal Raihan. Made with{" "}
            <Heart className="inline w-4 h-4 text-red-500 mx-1" />
            using Next.js & Tailwind CSS
          </p>

          
        </motion.div> */}
      </div>
    </footer>
  );
}
