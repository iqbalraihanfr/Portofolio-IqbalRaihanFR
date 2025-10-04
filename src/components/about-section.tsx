"use client";

import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accent } from "@/components/ui/accent";
import {
  GraduationCap,
  Users,
  Trophy,
  ArrowRight,
  Award,
  BadgeCheck as Certificate,
} from "lucide-react";
import Link from "next/link";
import { SkillsBentoGrid } from "./skills-bento-grid";
import { AchievementsSection } from "./achievements-section";
import { TeamTooltipSection } from "./team-tooltip-section";
import { Timeline } from "./ui/timeline";

const experiences = [
  {
    title: "Music Organization President",
    organization: "SMAN 1 Mejayan",
    period: "Sep 2021 - Nov 2022",
    description:
      "Led musical events and performances, fostering community engagement.",
    icon: Users,
  },
  {
    title: "GDSC Member",
    organization: "Google Developer Student Club ITB",
    period: "Oct 2023 - Jul 2024",
    description:
      "Collaborated on technical skills enhancement through workshops and community projects.",
    icon: Users,
  },
  {
    title: "Samsung Innovation Campus",
    organization: "Samsung",
    period: "Feb 2024 - Jul 2024",
    description:
      "Scholarship holder covering Cloud & Platform, IoT, and AI using Python.",
    icon: Award,
  },
  {
    title: "PEMIRA Committee Chairperson",
    organization: "UPN Veteran Jawa Timur",
    period: "Nov 2024 - Jan 2025",
    description:
      "Led the overall planning, coordination, and execution of the 2025 General Election at the Faculty of Computer Science.",
    icon: Trophy,
  },
  
  
  
];

export function AboutSection() {
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
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-10 bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gradient">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about technology, leadership, and creating meaningful
            digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Personal Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <SpotlightCard className="h-full">
                <div className="flex items-center mb-4">
                  <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                  <h3 className="text-lg font-semibold">Background</h3>
                </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  I'm a committed Computer Science undergraduate at UPN Veteran
                  Jawa Timur with a growing focus on IT Project Management and
                  team coordination. Currently maintaining a 3.85/4.00 GPA while
                  developing a strong foundation in software development.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My experience spans from technical development to leadership
                  roles, having served as a committee chairperson and
                  organization president. I'm passionate about managing
                  timelines, collaborating with diverse stakeholders, and
                  aligning tech solutions with business needs.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I'm eager to lead impactful digital projects and grow within
                  dynamic, fast-paced environments, combining my technical
                  skills with project management expertise.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <SpotlightCard>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">GPA</span>
                  <Badge variant="secondary">3.85/4.00</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Projects
                  </span>
                  <Badge variant="secondary">4</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Certificates
                  </span>
                  <Badge variant="secondary">5</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Leadership Roles
                  </span>
                  <Badge variant="secondary">2</Badge>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard>
              <div className="space-y-2">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    <span>Studying Computer Science</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                    <span>Building UMKM Catalog</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                    <span>Open for opportunities</span>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Quick Links to Certificates and Achievements */}
            <div className="space-y-3">
              <Button
                asChild
                variant="outline"
                className="w-full justify-between group bg-transparent"
              >
                <Link href="/certificates">
                  <div className="flex items-center">
                    <Certificate className="w-4 h-4 mr-2 text-blue-600" />
                    View All Certificates
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-between group bg-transparent"
              >
                <Link href="/achievements">
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 mr-2 text-yellow-600" />
                    View All Achievements
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Skills Section with Bento Grid */}
        {/* <SkillsBentoGrid /> */}

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-5"
        >
          <Timeline 
            data={experiences.map((exp) => ({
              title: exp.period,
              content: (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <exp.icon className="w-6 h-6 text-orange-500 dark:text-orange-300" />
                    <div>
                      <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                        {exp.title}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 font-medium">
                        {exp.organization}
                      </p>
                    </div>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              )
            }))}
          />
        </motion.div>

        {/* Team Collaboration Section */}
        <TeamTooltipSection />


        {/* Testimonials Section */}
        {/* <TestimonialsSection /> */}

        {/* Certificates Section Preview */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Certificates & Credentials</h3>
            <Button asChild variant="outline">
              <Link href="/certificates">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <CertificatesSection isPreview={true} />
        </motion.div> */}

        {/* Achievements Section Preview */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Achievements & Recognition</h3>
            <Button asChild variant="outline">
              <Link href="/achievements">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <AchievementsSection isPreview={true} />
        </motion.div> */}
      </div>
    </section>
  );
}
