import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footr";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Iqbal Raihan - Full Stack Developer & IT Project Manager",
  description:
    "Computer Science undergraduate specializing in IT Project Management. Passionate about creating impactful digital solutions.",
  keywords: [
    "Full Stack Developer",
    "IT Project Manager",
    "Next.js",
    "React",
    "Python",
    "Web Development",
  ],
  authors: [{ name: "Iqbal Raihan Faturrahman Rahardjo" }],
  icons: {
    icon: [{ url: "/app/favicon.ico", sizes: "any" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#a855f7" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Iqbal Raihan",
  },
  openGraph: {
    title: "Iqbal Raihan - Full Stack Developer & IT Project Manager",
    description:
      "Computer Science undergraduate specializing in IT Project Management",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-200`}
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
            storageKey="portfolio-theme"
          >
            {/* <ProgressProvider /> */}
            <Navbar />
            <main className="dark:bg-black min-h-[calc(100vh-4rem)] pt-16">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-9 py-9">
                {children}
              </div>
            </main>
            <SpeedInsights />
            <Analytics />
            <Footer />
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
