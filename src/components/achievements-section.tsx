"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
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
import {
  Trophy,
  Calendar,
  Target,
  Star,
  Crown,
  Medal,
  Zap,
  BookOpen,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { PhotoCardStack, type PhotoItem } from "@/components/card-stack";

const achievements = [
  {
    id: 1,
    title: "Gold Medalist - I2ASPO 2024",
    category: "Academic Excellence",
    description:
      "Achieved Gold Medal at Indonesia International Applied Science Project Olympiad (I2ASPO) as part of Scientific Research Team",
    longDescription:
      "Led a scientific research team to victory at the prestigious Indonesia International Applied Science Project Olympiad (I2ASPO) 2024. Our project focused on innovative applications of technology in solving real-world problems, demonstrating exceptional research methodology, presentation skills, and collaborative teamwork.",
    date: "December 2024",
    organization: "IYSA (International Youth Science Association)",
    impact: "International Recognition",
    icon: Trophy,
    color: "text-yellow-500",
    bgColor:
      "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
    type: "Competition",
    teamSize: "3-5 members",
    skills: [
      "Research Methodology",
      "Scientific Writing",
      "Presentation",
      "Team Leadership",
    ],
    highlights: [
      "Led interdisciplinary research team",
      "Developed innovative technology solution",
      "Presented findings to international panel",
      "Competed against teams from multiple countries",
    ],
    metrics: {
      "Competition Level": "International",
      Participants: "100+ teams",
      Achievement: "Gold Medal",
      "Team Role": "Team Leader",
    },
  },
  {
    id: 2,
    title: "PEMIRA Committee Chairperson",
    category: "Leadership",
    description:
      "Successfully led the organization of Faculty of Computer Science General Election 2025 as Committee Chairperson",
    longDescription:
      "Appointed as Chairperson for the General Election (PEMIRA) organizing committee at UPN Veteran Jawa Timur's Faculty of Computer Science. Led cross-functional teams across logistics, public relations, and technical operations to ensure a transparent, efficient, and democratic electoral process.",
    date: "November 2024 - January 2025",
    organization: "UPN Veteran Jawa Timur",
    impact: "Faculty-wide Democratic Process",
    icon: Crown,
    color: "text-purple-500",
    bgColor:
      "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
    type: "Leadership Role",
    teamSize: "15+ committee members",
    skills: [
      "Project Management",
      "Team Leadership",
      "Event Organization",
      "Stakeholder Management",
    ],
    highlights: [
      "Managed electoral process integrity",
      "Coordinated multiple operational teams",
      "Ensured transparent democratic procedures",
      "Achieved 90%+ student participation rate",
    ],
    metrics: {
      Duration: "3 months",
      "Team Size": "15+ members",
      "Voter Turnout": "90%+",
      "Budget Managed": "Faculty allocation",
    },
  },
  {
    id: 3,
    title: "Samsung Innovation Campus Scholar",
    category: "Professional Development",
    description:
      "Selected as scholarship recipient for Samsung Innovation Campus Batch 5 training program",
    longDescription:
      "Competitively selected for the prestigious Samsung Innovation Campus scholarship program, covering advanced topics in Cloud & Platform technologies, Internet of Things (IoT), and Artificial Intelligence. Completed intensive training with hands-on projects and industry-standard practices.",
    date: "February 2024 - July 2024",
    organization: "Samsung",
    impact: "Advanced Technical Skills",
    icon: Star,
    color: "text-blue-500",
    bgColor:
      "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
    type: "Scholarship",
    duration: "6 months",
    skills: [
      "Python Programming",
      "Cloud Computing",
      "IoT Development",
      "AI/ML",
    ],
    highlights: [
      "Competitive selection process",
      "Comprehensive technology curriculum",
      "Industry mentor guidance",
      "Capstone project completion",
    ],
    metrics: {
      "Selection Rate": "Highly competitive",
      Duration: "6 months",
      Technologies: "4+ domains",
      Projects: "Multiple hands-on",
    },
  },
  {
    id: 4,
    title: "Academic Excellence - 3.85 GPA",
    category: "Academic Achievement",
    description:
      "Maintaining exceptional academic performance with 3.85/4.00 GPA in Computer Science program",
    longDescription:
      "Consistently demonstrated academic excellence throughout Computer Science undergraduate program at UPN Veteran Jawa Timur, maintaining a cumulative GPA of 3.85/4.00. This achievement reflects dedication to learning, strong analytical skills, and effective time management while balancing multiple leadership responsibilities.",
    date: "August 2023 - Present",
    organization: "UPN Veteran Jawa Timur",
    impact: "Academic Excellence",
    icon: BookOpen,
    color: "text-green-500",
    bgColor:
      "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    type: "Academic",
    duration: "Ongoing",
    skills: [
      "Analytical Thinking",
      "Problem Solving",
      "Time Management",
      "Research",
    ],
    highlights: [
      "Top 10% of class performance",
      "Consistent semester achievements",
      "Balance of academics and leadership",
      "Strong foundation in CS fundamentals",
    ],
    metrics: {
      "Current GPA": "3.85/4.00",
      "Class Ranking": "Top 10%",
      Semesters: "3+ completed",
      "Expected Graduation": "2027",
    },
  },
  {
    id: 5,
    title: "Music Organization President",
    category: "Leadership",
    description:
      "Led Allegrosmasica Music Organization as President, organizing cultural events and fostering community engagement",
    longDescription:
      "Served as President of Allegrosmasica Music Organization at SMAN 1 Mejayan, leading the organization in planning and executing various musical events and performances. Fostered a collaborative environment that enhanced cultural experience within the school community while developing leadership and organizational skills.",
    date: "September 2021 - November 2022",
    organization: "SMAN 1 Mejayan",
    impact: "Cultural Community Building",
    icon: Medal,
    color: "text-indigo-500",
    bgColor:
      "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
    type: "Leadership Role",
    duration: "14 months",
    skills: [
      "Event Management",
      "Team Building",
      "Creative Direction",
      "Public Relations",
    ],
    highlights: [
      "Organized multiple cultural events",
      "Enhanced community engagement",
      "Developed creative programming",
      "Built lasting partnerships",
    ],
    metrics: {
      "Events Organized": "10+ performances",
      "Team Size": "25+ members",
      "Community Reach": "School-wide",
      Duration: "14 months",
    },
  },
  {
    id: 6,
    title: "Multiple Project Completions",
    category: "Technical Achievement",
    description:
      "Successfully developed and deployed multiple full-stack applications including AI/ML and web development projects",
    longDescription:
      "Demonstrated technical expertise through successful completion of diverse projects including a Personalized Movie Recommendation System with AI/ML components, UMKM Educational Toy Catalog for community service, and RATIH Creative company website. Each project showcased different aspects of full-stack development and problem-solving skills.",
    date: "2024 - Present",
    organization: "Personal & Community Projects",
    impact: "Technical Portfolio Development",
    icon: Lightbulb,
    color: "text-orange-500",
    bgColor:
      "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
    type: "Technical",
    projectCount: "3+ major projects",
    skills: [
      "Full-Stack Development",
      "AI/ML",
      "Project Management",
      "Community Service",
    ],
    highlights: [
      "Diverse technology stack usage",
      "Real-world problem solving",
      "Community impact projects",
      "End-to-end development",
    ],
    metrics: {
      "Projects Completed": "3+ major",
      "Technologies Used": "10+ different",
      "Community Impact": "Local UMKM support",
      Deployment: "Live applications",
    },
  },
];

const categories = [
  "All",
  "Academic Excellence",
  "Leadership",
  "Professional Development",
  "Academic Achievement",
  "Technical Achievement",
];

// PEMIRA photos for the achievement card
const pemiraPhotos: PhotoItem[] = [
  {
    id: "pemira1",
    src: "/images/pemira1.jpg",
    alt: "PEMIRA Committee team photo with green blazers",
  },
  {
    id: "pemira2",
    src: "/images/pemira2.jpg",
    alt: "PEMIRA Committee group photo with heart hand gestures",
  },
];

export function AchievementsSection({
  isPreview = false,
}: {
  isPreview?: boolean;
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredAchievements = isPreview
    ? achievements.slice(0, 4)
    : selectedCategory === "All"
    ? achievements
    : achievements.filter(
        (achievement) => achievement.category === selectedCategory
      );

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Academic Excellence":
        return "🏆";
      case "Leadership":
        return "👑";
      case "Professional Development":
        return "🚀";
      case "Academic Achievement":
        return "📚";
      case "Technical Achievement":
        return "💻";
      default:
        return "⭐";
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gradient">
            Achievements & Recognition
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Significant accomplishments, awards, and recognitions that highlight
            my journey of growth and excellence
          </p>
        </motion.div>

        {/* Category Filter */}
        {/* {!isPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={
                  selectedCategory === category ? "default" : "outline-solid"
                }
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300"
              >
                {category !== "All" && (
                  <span className="mr-2">{getCategoryIcon(category)}</span>
                )}
                {category}
              </Button>
            ))}
          </motion.div>
        )} */}

        {/* Achievements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                variants={itemVariants}
                layout
                className="group"
              >
                <SpotlightCard className="h-full overflow-hidden">
                  <div
                    className={`h-2 bg-linear-to-r ${achievement.bgColor}`}
                  />

                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-lg bg-linear-to-br ${achievement.bgColor} flex items-center justify-center`}
                      >
                        <achievement.icon
                          className={`w-6 h-6 ${achievement.color}`}
                        />
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-2">
                          <span className="mr-1">
                            {getCategoryIcon(achievement.category)}
                          </span>
                          {achievement.category}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {achievement.date}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-base text-muted-foreground">
                      {achievement.description}
                    </p>

                    {/* Photo stack for PEMIRA achievement */}
                    {achievement.id === 2 && (
                      <div className="mt-4">
                        <PhotoCardStack
                          photos={pemiraPhotos}
                          frameClassName="w-full h-32 aspect-[16/9]"
                          fit="cover"
                          visibleCount={2}
                          autoAdvance={false}
                          className="mb-4"
                        />
                      </div>
                    )}
                  </div>

                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Organization:
                        </span>
                        <span className="font-medium">
                          {achievement.organization}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Impact:</span>
                        <Badge variant="outline">{achievement.impact}</Badge>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {achievement.skills.slice(0, 3).map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {achievement.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{achievement.skills.length - 3}
                          </Badge>
                        )}
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full bg-transparent group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors"
                          >
                            View Full Details
                            <TrendingUp className="w-4 h-4 ml-2" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <div className="flex items-start gap-4 mb-4">
                              <div
                                className={`w-16 h-16 rounded-xl bg-linear-to-br ${achievement.bgColor} flex items-center justify-center`}
                              >
                                <achievement.icon
                                  className={`w-8 h-8 ${achievement.color}`}
                                />
                              </div>
                              <div className="flex-1">
                                <DialogTitle className="text-2xl mb-2">
                                  {achievement.title}
                                </DialogTitle>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {achievement.date}
                                  </div>
                                  <Badge variant="secondary">
                                    <span className="mr-1">
                                      {getCategoryIcon(achievement.category)}
                                    </span>
                                    {achievement.category}
                                  </Badge>
                                </div>
                                <p className="text-muted-foreground">
                                  {achievement.organization}
                                </p>
                              </div>
                            </div>
                            <DialogDescription className="text-base leading-relaxed">
                              {achievement.longDescription}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6">
                            {/* Key Highlights */}
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center">
                                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                                Key Highlights
                              </h4>
                              <ul className="space-y-2">
                                {achievement.highlights.map(
                                  (highlight, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start"
                                    >
                                      <Zap className="w-4 h-4 mr-2 text-blue-500 mt-0.5 shrink-0" />
                                      <span className="text-sm text-muted-foreground">
                                        {highlight}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>

                            {/* Skills Demonstrated */}
                            <div>
                              <h4 className="font-semibold mb-3">
                                Skills Demonstrated
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {achievement.skills.map((skill) => (
                                  <Badge key={skill} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Achievement Metrics */}
                            <div>
                              <h4 className="font-semibold mb-3">
                                Achievement Metrics
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(achievement.metrics).map(
                                  ([key, value]) => (
                                    <div
                                      key={key}
                                      className="p-3 bg-muted/50 rounded-lg"
                                    >
                                      <p className="text-sm font-medium">
                                        {key}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {value}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            {/* Impact Statement */}
                            <div className="p-4 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                              <h4 className="font-semibold mb-2 flex items-center">
                                <Target className="w-4 h-4 mr-2 text-blue-600" />
                                Impact & Significance
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                This achievement demonstrates{" "}
                                {achievement.impact.toLowerCase()} and showcases
                                my ability to excel in{" "}
                                {achievement.category.toLowerCase()} while
                                contributing meaningfully to the community and
                                organization.
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Achievement Summary */}
        {!isPreview && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <SpotlightCard className="max-w-5xl mx-auto bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <div className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">
                    Achievement Summary
                  </h3>
                  <p className="text-muted-foreground">
                    A snapshot of my accomplishments across different domains
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      🏆
                    </div>
                    <div className="text-2xl font-bold text-yellow-600 mb-1">
                      1
                    </div>
                    <p className="text-sm text-muted-foreground">Gold Medal</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      👑
                    </div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      3
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Leadership Roles
                    </p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      🚀
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      1
                    </div>
                    <p className="text-sm text-muted-foreground">Scholarship</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      📚
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      3.85
                    </div>
                    <p className="text-sm text-muted-foreground">GPA</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      💻
                    </div>
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      3+
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Major Projects
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        )}
      </div>
    </section>
  );
}
