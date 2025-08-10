"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, Calendar, Building, ExternalLink, Download, CheckCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import "../styles/flip-card.css";

const certificates = [
  {
    id: 1,
    title: "Samsung Innovation Campus Batch 5",
    organization: "Samsung",
    issueDate: "July 2024",
    description: "Comprehensive training program covering Cloud & Platform, Internet of Things, and Artificial Intelligence using Python.",
    category: "Technology",
    image: "/placeholder.svg?height=400&width=600",
    type: "Scholarship Program",
    achievementType: "Gold Medal – Technology Excellence"
  },
  {
    id: 2,
    title: "Learn Data Science",
    organization: "Dicoding",
    issueDate: "2024",
    description: "Comprehensive data science course covering data analysis, visualization, machine learning fundamentals.",
    category: "Data Science",
    image: "/placeholder.svg?height=400&width=600",
    type: "Professional Certificate",
    achievementType: "Certificate – Data Science Mastery"
  },
  {
    id: 3,
    title: "System Administration and IT Infrastructure Services",
    organization: "Dicoding",
    issueDate: "2024",
    description: "Advanced course in system administration covering server management and network configuration.",
    category: "System Administration",
    image: "/placeholder.svg?height=400&width=600",
    type: "Professional Certificate",
    achievementType: "Certificate – Infrastructure Expert"
  },
  {
    id: 4,
    title: "Pemilihan Umum Raya Fakultas Ilmu Komputer 2025",
    organization: "UPN Veteran Jawa Timur",
    issueDate: "January 2025",
    description: "Recognition for successfully organizing and leading the Faculty of Computer Science General Election.",
    category: "Leadership",
    image: "/placeholder.svg?height=400&width=600",
    type: "Leadership Certificate",
    achievementType: "Award – Leadership Excellence"
  },
];

interface FlipCardProps {
  certificate: typeof certificates[0];
  isActive: boolean;
  direction: number;
}

function FlipCard({ certificate, isActive, direction }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="flip-card-container relative w-full max-w-md mx-auto"
      initial={{ rotateY: direction > 0 ? 90 : -90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      exit={{ rotateY: direction > 0 ? -90 : 90, opacity: 0 }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      onTap={() => setIsFlipped(!isFlipped)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className={`flip-card relative w-full h-96 cursor-pointer ${isFlipped ? 'flipped' : ''}`}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div className="flip-card-front absolute inset-0 w-full h-full rounded-2xl overflow-hidden flip-card-shadow hover:flip-card-shadow-hover transition-shadow duration-300">
          <div className="relative w-full h-full gradient-bg-light dark:gradient-bg-dark">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <Badge className="mb-3 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-colors duration-300">
                {certificate.category}
              </Badge>
              <h3 className="text-xl font-bold mb-2 drop-shadow-lg">{certificate.title}</h3>
              <p className="text-sm opacity-90 drop-shadow-md">{certificate.organization}</p>
              <div className="mt-3 flex items-center gap-2 text-xs opacity-80">
                <Calendar className="w-3 h-3" />
                <span>{certificate.issueDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="flip-card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden flip-card-shadow">
          <div className="w-full h-full gradient-bg-card-back-light dark:gradient-bg-card-back-dark p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                  {certificate.achievementType}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
                {certificate.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
                {certificate.description}
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Building className="w-4 h-4" />
                <span>{certificate.organization}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>{certificate.issueDate}</span>
              </div>
              <Button size="sm" className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Certificate
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CertificatesSection({
  isPreview = false,
}: {
  isPreview?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const dragX = useMotionValue(0);
  const dragProgress = useTransform(dragX, [-200, 0, 200], [-1, 0, 1]);

  const nextCard = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevCard = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevCard();
    } else if (info.offset.x < -threshold) {
      nextCard();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prevCard();
      if (event.key === "ArrowRight") nextCard();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Certificates & Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Professional certifications and achievements showcasing continuous learning and expertise
        </motion.p>
      </div>

      {/* 3D Flip Card Carousel */}
      <div className="relative max-w-2xl mx-auto">
        {/* Main Card Container */}
        <motion.div
          className="relative h-[500px] flex items-center justify-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{ x: dragX }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <FlipCard
              key={currentIndex}
              certificate={certificates[currentIndex]}
              isActive={true}
              direction={direction}
            />
          </AnimatePresence>
        </motion.div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
          <Button
            variant="outline"
            size="icon"
            onClick={prevCard}
            className="pointer-events-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 shadow-lg border-0 hover:scale-110 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextCard}
            className="pointer-events-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 shadow-lg border-0 hover:scale-110 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 scale-125"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Caption */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-6"
        >
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {certificates[currentIndex].achievementType}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {certificates[currentIndex].organization} • {certificates[currentIndex].issueDate}
          </p>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 text-sm text-muted-foreground"
        >
          <p>Hover or tap cards to flip • Use arrow keys or drag to navigate</p>
        </motion.div>
      </div>
    </section>
  );
}
