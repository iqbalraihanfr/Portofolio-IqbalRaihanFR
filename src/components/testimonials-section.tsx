"use client";

import { motion } from "framer-motion";
import { InfiniteMovingCards } from "@/src/components/ui/infinite-moving-cards";

const testimonials = [
  {
    quote:
      "Iqbal's leadership during the PEMIRA committee was exceptional. His ability to coordinate multiple teams while maintaining transparency and efficiency was remarkable.",
    name: "Dr. Sarah Johnson",
    title: "Faculty Supervisor, UPN Veteran Jawa Timur",
  },
  {
    quote:
      "Working with Iqbal on the UMKM project was a pleasure. His technical skills combined with his understanding of business needs made our collaboration very successful.",
    name: "Ahmad Rizki",
    title: "UMKM Business Owner",
  },
  {
    quote:
      "Iqbal demonstrated outstanding research capabilities and teamwork during our I2ASPO project. His contribution was crucial to our gold medal achievement.",
    name: "Maria Santos",
    title: "Research Team Member",
  },
  {
    quote:
      "As a fellow GDSC member, I was impressed by Iqbal's dedication to learning and sharing knowledge. He's always willing to help others grow.",
    name: "David Chen",
    title: "Google Developer Student Club ITB",
  },
  {
    quote:
      "Iqbal's work on the RATIH Creative website exceeded our expectations. His attention to detail and professional approach made the entire process smooth.",
    name: "Lisa Pratiwi",
    title: "Creative Director, RATIH Creative",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gradient">
            What People Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Testimonials from colleagues, supervisors, and collaborators
          </p>
        </motion.div>

        <div className="h-160 rounded-md flex flex-col antialiased bg-white dark:bg-gray-900 dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
}
