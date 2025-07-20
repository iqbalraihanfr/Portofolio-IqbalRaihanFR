import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footr"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { Toaster } from "@/components/ui/toaster"
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from "@vercel/analytics/react"
import { Providers } from "./providers"

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-200`}>
        <Providers>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="system" 
            enableSystem 
            disableTransitionOnChange={false}
            storageKey="portfolio-theme"
          >
            {/* <ProgressProvider /> */}
            <ScrollIndicator />
            <Navbar />
            <main className="dark:bg-black min-h-[calc(100vh-4rem)] pt-16">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </div>
            </main>
            <SpeedInsights />
            <Analytics />
            <Footer />
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
