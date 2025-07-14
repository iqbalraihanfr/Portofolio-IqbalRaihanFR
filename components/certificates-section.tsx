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
import {
  Award,
  Calendar,
  Building,
  ExternalLink,
  Download,
  CheckCircle,
  Star,
} from "lucide-react";

const certificates = [
  {
    id: 1,
    title: "Samsung Innovation Campus Batch 5",
    organization: "Samsung",
    issueDate: "July 2024",
    description:
      "Comprehensive training program covering Cloud & Platform, Internet of Things, and Artificial Intelligence using Python. Gained essential skills for advancing career in technology field.",
    category: "Technology",
    skills: ["Python", "Cloud Computing", "IoT", "Artificial Intelligence"],
    credentialId: "SIC-2024-B5-001",
    image: "/placeholder.svg?height=300&width=400",
    verificationUrl: "#",
    type: "Scholarship Program",
    duration: "6 months",
    highlights: [
      "Hands-on experience with AI/ML algorithms",
      "Cloud platform deployment projects",
      "IoT device programming and integration",
      "Industry-standard Python development practices",
    ],
  },
  {
    id: 2,
    title: "Learn Data Science",
    organization: "Dicoding",
    issueDate: "2024",
    description:
      "Comprehensive data science course covering data analysis, visualization, machine learning fundamentals, and practical implementation using Python libraries.",
    category: "Data Science",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Machine Learning"],
    credentialId: "DCD-DS-2024-002",
    image: "/placeholder.svg?height=300&width=400",
    verificationUrl: "#",
    type: "Professional Certificate",
    duration: "3 months",
    highlights: [
      "Data cleaning and preprocessing techniques",
      "Statistical analysis and visualization",
      "Machine learning model development",
      "Real-world data science projects",
    ],
  },
  {
    id: 3,
    title: "System Administration and IT Infrastructure Services",
    organization: "Dicoding",
    issueDate: "2024",
    description:
      "Advanced course in system administration covering server management, network configuration, security protocols, and IT infrastructure best practices.",
    category: "System Administration",
    skills: [
      "Linux",
      "Network Administration",
      "Security",
      "Server Management",
    ],
    credentialId: "DCD-SA-2024-003",
    image: "/placeholder.svg?height=300&width=400",
    verificationUrl: "#",
    type: "Professional Certificate",
    duration: "2 months",
    highlights: [
      "Linux server administration",
      "Network security implementation",
      "Infrastructure monitoring and maintenance",
      "Troubleshooting and optimization",
    ],
  },
  {
    id: 4,
    title: "Pemilihan Umum Raya Fakultas Ilmu Komputer 2025",
    organization: "UPN Veteran Jawa Timur",
    issueDate: "January 2025",
    description:
      "Recognition for successfully organizing and leading the Faculty of Computer Science General Election as Committee Chairperson.",
    category: "Leadership",
    skills: [
      "Project Management",
      "Leadership",
      "Event Organization",
      "Team Coordination",
    ],
    credentialId: "PEMIRA-2025-CHAIR",
    image: "/placeholder.svg?height=300&width=400",
    type: "Leadership Certificate",
    duration: "3 months",
    highlights: [
      "Led cross-functional teams",
      "Managed electoral process integrity",
      "Coordinated logistics and operations",
      "Ensured transparent democratic process",
    ],
  },
];

const categories = [
  "All",
  "Technology",
  "Data Science",
  "System Administration",
  "Leadership",
];

export function CertificatesSection({
  isPreview = false,
}: {
  isPreview?: boolean;
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCertificate, setSelectedCertificate] = useState<
    (typeof certificates)[0] | null
  >(null);

  const filteredCertificates = isPreview
    ? certificates.slice(0, 3)
    : selectedCategory === "All"
    ? certificates
    : certificates.filter((cert) => cert.category === selectedCategory);

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
      case "Technology":
        return "🚀";
      case "Data Science":
        return "📊";
      case "System Administration":
        return "⚙️";
      case "Leadership":
        return "👑";
      default:
        return "🏆";
    }
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
            Certificates & Credentials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and credentials that validate my
            expertise across various technology domains
          </p>
        </motion.div>

        {/* Category Filter */}
        {!isPreview && (
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
        )}

        {/* Certificates Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredCertificates.map((certificate) => (
              <motion.div
                key={certificate.id}
                variants={itemVariants}
                layout
                className="group"
              >
                <Card className="h-full card-hover border-0 shadow-lg bg-card/50 backdrop-blur-xs overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group-hover:border group-hover:border-blue-200 dark:group-hover:border-blue-800">
                  <div className="relative">
                    <div className="absolute top-4 right-4 z-10">
                      <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <Award className="w-5 h-5 text-yellow-600" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 z-10">
                      <Badge
                        variant="secondary"
                        className="bg-white/90 text-black"
                      >
                        <span className="mr-1">
                          {getCategoryIcon(certificate.category)}
                        </span>
                        {certificate.category}
                      </Badge>
                    </div>
                    <div className="h-32 bg-linear-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center group-hover:from-blue-200 group-hover:via-purple-100 group-hover:to-pink-200 dark:group-hover:from-blue-800/30 dark:group-hover:via-purple-800/30 dark:group-hover:to-pink-800/30 transition-all duration-500">
                      <div className="text-4xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300">
                        {getCategoryIcon(certificate.category)}
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg group-hover:text-blue-600 group-hover:scale-105 transition-all duration-300 line-clamp-2">
                      {certificate.title}
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Building className="w-4 h-4 mr-1" />
                      {certificate.organization}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {certificate.issueDate}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <CardDescription className="mb-4 line-clamp-3">
                      {certificate.description}
                    </CardDescription>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {certificate.skills.slice(0, 3).map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {certificate.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{certificate.skills.length - 3}
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
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <DialogTitle className="text-2xl mb-2">
                                  {certificate.title}
                                </DialogTitle>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                  <div className="flex items-center">
                                    <Building className="w-4 h-4 mr-1" />
                                    {certificate.organization}
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {certificate.issueDate}
                                  </div>
                                  {certificate.duration && (
                                    <Badge variant="secondary">
                                      {certificate.duration}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="default">
                                  <span className="mr-1">
                                    {getCategoryIcon(certificate.category)}
                                  </span>
                                  {certificate.category}
                                </Badge>
                              </div>
                            </div>
                            <DialogDescription className="text-base leading-relaxed">
                              {certificate.description}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6">
                            {/* Certificate Image */}
                            <div className="relative h-64 bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg overflow-hidden">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="text-6xl mb-4 opacity-30">
                                    {getCategoryIcon(certificate.category)}
                                  </div>
                                  <p className="text-muted-foreground">
                                    Certificate Preview
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Key Highlights */}
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center">
                                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                                Key Highlights
                              </h4>
                              <ul className="space-y-2">
                                {certificate.highlights.map(
                                  (highlight, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start"
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 shrink-0" />
                                      <span className="text-sm text-muted-foreground">
                                        {highlight}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>

                            {/* Skills Acquired */}
                            <div>
                              <h4 className="font-semibold mb-3">
                                Skills Acquired
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {certificate.skills.map((skill) => (
                                  <Badge key={skill} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Certificate Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                              <div>
                                <p className="text-sm font-medium">
                                  Certificate Type
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {certificate.type}
                                </p>
                              </div>
                              {certificate.credentialId && (
                                <div>
                                  <p className="text-sm font-medium">
                                    Credential ID
                                  </p>
                                  <p className="text-sm text-muted-foreground font-mono">
                                    {certificate.credentialId}
                                  </p>
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium">
                                  Issue Date
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {certificate.issueDate}
                                </p>
                              </div>
                              {certificate.duration && (
                                <div>
                                  <p className="text-sm font-medium">
                                    Duration
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {certificate.duration}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              {certificate.verificationUrl && (
                                <Button variant="outline" size="sm" asChild>
                                  <a
                                    href={certificate.verificationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Verify Certificate
                                  </a>
                                </Button>
                              )}
                              <Button size="sm" variant="ghost">
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {certificate.verificationUrl && (
                        <Button size="sm" variant="ghost" asChild>
                          <a
                            href={certificate.verificationUrl}
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

        {/* Stats Summary */}
        {!isPreview && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <Card className="max-w-4xl mx-auto bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {certificates.length}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Total Certificates
                    </p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      4
                    </div>
                    <p className="text-sm text-muted-foreground">Categories</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      2024
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Most Recent Year
                    </p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      15+
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Skills Validated
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
