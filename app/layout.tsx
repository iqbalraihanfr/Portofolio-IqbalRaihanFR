import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { Toaster } from "@/components/ui/toaster";
import ProgressProvider from '@/components/progress-bar';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })


export const metadata: Metadata = {
  title: "Iqbal Raihan - Full Stack Developer & IT Project Manager",
  description:
    "Computer Science undergraduate specializing in IT Project Management. Passionate about creating impactful digital solutions.",
  keywords: ["Full Stack Developer", "IT Project Manager", "Next.js", "React", "Python", "Web Development"],
  authors: [{ name: "Iqbal Raihan Faturrahman Rahardjo" }],
  openGraph: {
    title: "Iqbal Raihan - Full Stack Developer & IT Project Manager",
    description: "Computer Science undergraduate specializing in IT Project Management",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <ProgressProvider />
          <ScrollIndicator />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <SpeedInsights />
          <Analytics />
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
