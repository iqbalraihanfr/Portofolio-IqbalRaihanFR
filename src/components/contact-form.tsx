"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/lib/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Clock,
  MessageCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { colors } from "@/lib/utils/colors";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "iqbaalraihanrr@gmail.com",
    href: "mailto:iqbaalraihanrr@gmail.com",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+62 85156482279",
    href: "tel:+6285156482279",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Surabaya, Indonesia",
    href: "#",
    color: "from-red-500 to-yellow-500",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "iqbalraihanfaturrahmanr",
    href: "https://linkedin.com/in/iqbalraihanfaturrahmanr/",
    color: "from-blue-600 to-indigo-600",
  },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    toast({
      title: "Message sent successfully!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    form.reset();
    setIsSubmitting(false);
  };

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
    <section className="py-20 relative overflow-hidden bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${colors.gradients.contact} bg-clip-text text-transparent`}
          >
            Get In Touch
          </h2>

          <p
            className={`text-xl ${colors.text.secondary} max-w-3xl mx-auto leading-relaxed`}
          >
            Have a project in mind or want to collaborate? I'd love to hear from
            you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-10"
          >
            <motion.div variants={itemVariants}>
              <h3
                className={`text-3xl font-bold mb-6 ${colors.gradients.primary} bg-clip-text text-transparent`}
              >
                Let's Connect
              </h3>
              <p
                className={`text-lg ${colors.text.secondary} mb-8 leading-relaxed`}
              >
                I'm always open to discussing new opportunities, interesting
                projects, or just having a chat about technology and innovation.
                Feel free to reach out!
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="group"
                >
                  <a
                    href={info.href}
                    className={`flex items-center space-x-6 p-6 ${colors.gradients.glass} backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-transparent hover:${colors.border.accent}`}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      info.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    <div
                      className={`w-14 h-14 bg-linear-to-r ${info.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      <info.icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <div>
                      <p
                        className={`font-bold text-lg ${colors.text.primary} group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300`}
                      >
                        {info.label}
                      </p>
                      <p
                        className={`${colors.text.secondary} group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300`}
                      >
                        {info.value}
                      </p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <SpotlightCard>
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div
                      className={`w-12 h-12 ${colors.gradients.primary} rounded-full flex items-center justify-center`}
                    >
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-xl">Quick Response</h4>
                  </div>
                  <p className={`${colors.text.secondary} leading-relaxed`}>
                    I typically respond to messages within 24 hours. For urgent
                    matters, feel free to reach out via phone or LinkedIn.
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SpotlightCard className="shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
              <div className="text-center p-6">
                <h2 className="text-2xl font-bold bg-linear-to-r from-red-700 to-yellow-500 bg-clip-text text-transparent">
                  Send a Message
                </h2>
                <p className="text-lg text-muted-foreground mt-2">
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </p>
              </div>
              <div className="p-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">
                              Name
                            </FormLabel>
                            <FormControl>
                              <motion.div
                                whileFocus={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Input
                                  placeholder="Your name"
                                  className="h-12 text-base bg-white/50 dark:bg-gray-800/50 backdrop-blur-xs border-2 border-transparent focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300"
                                  {...field}
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">
                              Email
                            </FormLabel>
                            <FormControl>
                              <motion.div
                                whileFocus={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Input
                                  placeholder="your.email@example.com"
                                  className="h-12 text-base bg-white/50 dark:bg-gray-800/50 backdrop-blur-xs border-2 border-transparent focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300"
                                  {...field}
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            Subject
                          </FormLabel>
                          <FormControl>
                            <motion.div
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Input
                                placeholder="What's this about?"
                                className="h-12 text-base bg-white/50 dark:bg-gray-800/50 backdrop-blur-xs border-2 border-transparent focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300"
                                {...field}
                              />
                            </motion.div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            Message
                          </FormLabel>
                          <FormControl>
                            <motion.div
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Textarea
                                placeholder="Tell me about your project or just say hello!"
                                className="min-h-[150px] text-base bg-white/50 dark:bg-gray-800/50 backdrop-blur-xs resize-none border-2 border-transparent focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300"
                                {...field}
                              />
                            </motion.div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full h-14 text-lg shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                          />
                        ) : (
                          <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform duration-200" />
                        )}
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
