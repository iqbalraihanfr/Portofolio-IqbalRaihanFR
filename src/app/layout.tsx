import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iqbal Raihan Portfolio",
  description:
    "Personal portfolio website of Iqbal Raihan Faturrahman Rahardjo",
};

import { SplashScreen } from "@/components/splash-screen";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="motion-safe:scroll-smooth">
      <body
        className={`${inter.variable} min-h-dvh flex flex-col font-sans antialiased bg-white text-gray-900 dark:bg-black dark:text-gray-100`}
      >
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
