"use client";

import Link from "next/link";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useInView } from "framer-motion";
import { clsx } from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/certificates" },
  { name: "Guestbook", href: "/guestbook" },
  { name: "About", href: "/about" },
  // { name: "Contact", href: "/contact" },
] as const;

export function Navbar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "40px 0px 0px", amount: "all" });

  const pathname = usePathname();
  const baseRoute = "/" + (pathname.split("/")[1] || "");

  return (
    <>
      <div ref={ref} />
      <header
        className={clsx(
          "sticky top-0 z-20 w-full bg-white/60 backdrop-blur-md transition dark:bg-black/60",
          !inView && "shadow-sm dark:shadow-gray-900"
        )}
      >
        <div className="h-2 bg-gradient-to-r from-[var(--color-accent-start)] to-[var(--color-accent-end)]" />
        <div className="flex items-center justify-between py-4 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-4 font-medium">
            {navLinks.map(({ name, href }) => (
              <Link
                className={clsx(
                  "smooth-tab text-xs hover:text-[var(--color-accent-main)] hover:transition-colors md:text-base",
                  baseRoute === href &&
                    "bg-clip-text text-transparent bg-gradient-to-r from-[#BD0000] via-[#FF7A00] to-[#FFC900] font-semibold"
                )}
                href={href}
                key={name}
              >
                {name}
              </Link>
            ))}
          </nav>
          <ThemeSwitch />
        </div>
      </header>
    </>
  );
}
