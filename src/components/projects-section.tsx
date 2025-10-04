"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Calendar, Award, X } from "lucide-react";
import { TechIcon } from "@/components/ui/tech-icons";
import { colors } from "@/lib/utils/colors";
import Image from "next/image";
import { useOutsideClick } from "@/lib/hooks/use-outside-click";

const projects = [
  {
    id: 1,
    title: "Personalized Movie Recommendation System",
    description:
      "A hybrid recommendation system integrating content-based and collaborative filtering approaches",
    longDescription:
      "Developed a full-featured web application using Next.js, Tailwind CSS, and shadcn/ui to simulate profile selection and recommendations. Implemented data cleaning techniques and visualized key insights using Pandas, NumPy, and Matplotlib. Fine-tuned matrix factorization and LSTM models for collaborative filtering with optimized hyperparameters.",
    image: "/images/movie-project.png",
    tech: ["Next.js", "Python", "FastAPI", "TensorFlow", "Pandas", "NumPy"],
    category: "AI/ML",
    date: "May 2025 - Jun 2025",
    // status: "Completed",
    github: "https://github.com/iqbalraihanfr/hybrid-recommender-backend.git",
    demo: "#",
    features: [
      "Hybrid recommendation algorithm",
      "Real-time movie suggestions",
      "User preference learning",
      "Performance visualization",
    ],
  },
  {
    id: 2,
    title: "UMKM Educational Toy Catalog Website",
    description:
      "Community service project empowering local UMKM with web-based product catalog",
    longDescription:
      "A community service initiative aimed at empowering a local UMKM that produces handmade educational toys. Developed a responsive frontend using Next.js App Router and Tailwind CSS, optimized for mobile devices and SEO. Built a lightweight PHP + MySQL backend for the admin dashboard.",
    image: "/images/LEGOWO.png",
    tech: ["Next.js", "PHP", "MySQL", "Tailwind CSS", "SEO"],
    category: "Web Development",
    date: "Jun 2025 - Ongoing",
    // status: "In Progress",
    github: "https://github.com/iqbalraihanfr/Web_UMKM_Legowo.git",
    demo: "https://www.legowo.id",
    features: [
      "Responsive product catalog",
      "Admin dashboard",
      "SEO optimization",
      "Mobile-first design",
    ],
  },
  {
    id: 3,
    title: "RATIH Creative Website",
    description:
      "Company profile website for a local production house offering creative services",
    longDescription:
      "A static company profile website developed for RATIH Creative, a local production house offering photography, videography, and graphic design services since 2021. Acted as the sole fullstack developer, responsible for architecture planning, component structuring, UI development, deployment, and SEO optimization.",
    image: "/images/ratih.png",
    tech: ["Next.js", "Tailwind CSS", "Netlify", "Headless CMS"],
    category: "Web Development",
    date: "2025",
    // status: "Live",
    github: "https://github.com/iqbalraihanfr/website-ratih-2025",
    demo: "https://ratih-house.netlify.app/",
    features: [
      "Modern company profile",
      "Portfolio showcase",
      "Contact integration",
      "Performance optimized",
    ],
  },
];

const categories = ["All", "Web Development", "AI/ML", "Mobile"];

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeProject, setActiveProject] = useState<
    (typeof projects)[number] | null
  >(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    }
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeProject]);

  useOutsideClick(overlayRef as React.RefObject<HTMLDivElement>, () =>
    setActiveProject(null)
  );

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-auto bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Expandable Overlay Background */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 h-full w-full z-10"
            />
          )}
        </AnimatePresence>
        {/* Expandable Overlay Content */}
        <AnimatePresence>
          {activeProject ? (
            <div className="fixed inset-0 grid place-items-center z-[100]">
              <motion.button
                key={`close-${activeProject.id}-${uid}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-white rounded-full h-8 w-8 shadow"
                onClick={() => setActiveProject(null)}
                aria-label="Close details"
              >
                <X className="h-5 w-5 text-black" />
              </motion.button>
              <motion.div
                layoutId={`card-${activeProject.id}-${uid}`}
                ref={overlayRef}
                className="w-full max-w-2xl max-h-[80vh] min-h-0 flex flex-col bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg border-0 text-black"
              >
                <motion.div
                  layoutId={`image-${activeProject.id}-${uid}`}
                  className="px-6 pt-6"
                >
                  <Image
                    src={activeProject.image || "/placeholder.svg"}
                    alt={activeProject.title}
                    width={1200}
                    height={600}
                    className="w-full h-auto max-h-72 object-contain rounded-lg"
                  />
                </motion.div>
                <div className="p-6 space-y-6 flex-1 overflow-y-auto min-h-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <motion.h3
                        layoutId={`title-${activeProject.id}-${uid}`}
                        className="text-2xl font-bold dark:text-neutral-200"
                      >
                        {activeProject.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${activeProject.id}-${uid}`}
                        className="text-base text-neutral-600 dark:text-neutral-400"
                      >
                        {activeProject.longDescription}
                      </motion.p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 dark:text-neutral-200">Key Features</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground dark:text-neutral-200">
                      {activeProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 dark:text-neutral-200">Technologies Used</h4>
                    <div className="flex flex-wrap items-center gap-8 dark:text-neutral-200">
                      {activeProject.tech.map((tech) => (
                        <TechIcon
                          key={tech}
                          tech={tech}
                          className="w-12 h-12"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 dark:text-neutral-200">
                    {activeProject.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={activeProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {activeProject.demo && (
                      <Button size="sm" asChild>
                        <a
                          href={activeProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-[#BD0000] via-[#FF7A00] to-[#FFC900] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work in web development, AI/ML, and project
            management
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {/* {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline-solid"}
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))} */}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="sync">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layoutId={`card-${project.id}-${uid}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative rounded-3xl hover:shadow-lg"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <SpotlightCard className="h-full flex flex-col">
                  <motion.div
                    layoutId={`image-${project.id}-${uid}`}
                    className="relative overflow-hidden rounded-t-lg"
                  >
                    <Image
                      src={project.image || "/asset.png"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow space-y-4">
                      <div>
                        <motion.h3
                          layoutId={`title-${project.id}-${uid}`}
                          className="text-lg font-semibold hover:text-amber-600 transition-colors"
                        >
                          {project.title}
                        </motion.h3>
                        <motion.p
                          layoutId={`description-${project.id}-${uid}`}
                          className="text-sm text-muted-foreground mt-2"
                        >
                          {project.description}
                        </motion.p>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{project.date}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        {project.tech.slice(0, 5).map((tech) => (
                          <TechIcon key={tech} tech={tech} />
                        ))}
                        {project.tech.length > 5 && (
                          <div className="text-xs text-muted-foreground">
                            + more
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 gap-2 flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent"
                        onClick={() => setActiveProject(project)}
                      >
                        View Details
                      </Button>

                      {project.demo && (
                        <Button size="sm" variant="ghost" asChild>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Achievement Highlight */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <SpotlightCard
            className="max-w-2xl mx-auto"
          >
            <div className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-yellow-500 mr-2" />
                <h3 className="text-xl font-bold">Recent Achievement</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                🏆 Gold Medalist at Indonesia International Applied Science
                Project Olympiad (I2ASPO) 2024
              </p>
              <Badge variant="secondary">Scientific Research Team</Badge>
            </div>
          </SpotlightCard>
        </motion.div> */}
      </div>
    </section>
  );
}
