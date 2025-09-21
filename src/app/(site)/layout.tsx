import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer"; // <- perbaiki typo
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://contoh-domainmu.com"), // <- penting untuk OG absolute URL
  title: "Iqbal Raihan - Full Stack Developer & IT Project Manager",
  description:
    "Computer Science undergraduate specializing in IT Project Management. Passionate about creating impactful digital solutions.",
  keywords: ["Full Stack Developer", "IT Project Manager", "Next.js", "React", "Python", "Web Development"],
  authors: [{ name: "Iqbal Raihan Faturrahman Rahardjo" }],
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#a855f7" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Iqbal Raihan",
  },
  openGraph: {
    title: "Iqbal Raihan - Full Stack Developer & IT Project Manager",
    description: "Computer Science undergraduate specializing in IT Project Management",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="motion-safe:scroll-smooth">
      <body
        className={`${inter.variable} min-h-dvh flex flex-col font-sans antialiased bg-white text-gray-900 transition-colors duration-200 dark:bg-black dark:text-gray-100`}
      >
        {/* A11y: skip link */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[1000] focus:px-3 focus:py-2 focus:rounded-md focus:bg-black focus:text-white"
        >
          Skip to content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="portfolio-theme"
        >
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b dark:bg-gray-950/80">
            <nav aria-label="Primary">
              <Navbar />
            </nav>
          </header>

          <main id="content" className="flex-1">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-9 py-9">{children}</div>
          </main>

          <footer>
            <Footer />
          </footer>

          <Toaster />
        </ThemeProvider>

        {/* Boleh di luar ThemeProvider */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}