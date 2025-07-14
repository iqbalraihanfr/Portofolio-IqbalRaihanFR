"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExternalLink, Github, Calendar, Award } from "lucide-react";
import { colors } from "@/lib/colors";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Personalized Movie Recommendation System",
    description:
      "A hybrid recommendation system integrating content-based and collaborative filtering approaches",
    longDescription:
      "Developed a full-featured web application using Next.js, Tailwind CSS, and shadcn/ui to simulate profile selection and recommendations. Implemented data cleaning techniques and visualized key insights using Pandas, NumPy, and Matplotlib. Fine-tuned matrix factorization and LSTM models for collaborative filtering with optimized hyperparameters.",
    image: "/placeholder.svg?height=300&width=500",
    tech: ["Next.js", "Python", "FastAPI", "TensorFlow", "Pandas", "NumPy"],
    category: "AI/ML",
    date: "May 2025 - Jun 2025",
    status: "Completed",
    github: "#",
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
    image: "/asset.png",
    tech: ["Next.js", "PHP", "MySQL", "Tailwind CSS", "SEO"],
    category: "Web Development",
    date: "Jun 2025 - Ongoing",
    status: "In Progress",
    demo: "#",
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
    image: "/placeholder.svg?height=300&width=500",
    tech: ["Next.js", "Tailwind CSS", "Netlify", "Headless CMS"],
    category: "Web Development",
    date: "2025",
    status: "Live",
    demo: "#",
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
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

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
    <section className="py-20 bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gradient">
            Featured Projects
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="sync">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                className="group"
              >
                <Card className="h-full card-hover border-0 shadow-lg bg-card/50 backdrop-blur-xs">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={project.image || "/asset.png"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant={
                          project.status === "Completed"
                            ? "default"
                            : project.status === "Live"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {project.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.date}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tech.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] text-black overflow-y-auto rounded-2xl border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">
                              {project.title}
                            </DialogTitle>
                            <DialogDescription className="text-base">
                              {project.longDescription}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              width={600}
                              height={300}
                              className="w-full h-64 object-cover rounded-lg"
                            />

                            <div>
                              <h4 className="font-semibold mb-2">
                                Key Features
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                {project.features.map((feature, index) => (
                                  <li key={index}>{feature}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">
                                Technologies Used
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                  <Badge key={tech} variant="secondary">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              {project.github && (
                                <Button variant="outline" size="sm" asChild>
                                  <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Github className="w-4 h-4 mr-2" />
                                    GitHub
                                  </a>
                                </Button>
                              )}
                              {project.demo && (
                                <Button size="sm" asChild>
                                  <a
                                    href={project.demo}
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
                        </DialogContent>
                      </Dialog>

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
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Achievement Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Card
            className={`max-w-2xl mx-auto ${colors.gradients.card} border-0`}
          >
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-yellow-500 mr-2" />
                <h3 className="text-xl font-bold">Recent Achievement</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                🏆 Gold Medalist at Indonesia International Applied Science
                Project Olympiad (I2ASPO) 2024
              </p>
              <Badge variant="secondary">Scientific Research Team</Badge>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
