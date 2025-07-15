"use client";

import Link from 'next/link';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useInView } from 'framer-motion';
import { clsx } from 'clsx';
import { ThemeSwitch } from '@/components/theme-switch';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
  { name: 'Guestbook', href: '/guestbook' },
  { name: 'About', href: '/about' }
] as const;

export function Navbar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '40px 0px 0px', amount: 'all' });

  const pathname = usePathname();
  const baseRoute = '/' + (pathname.split('/')[1] || '');

  return (
    <>
      <div ref={ref} />
      <header
        className={clsx(
          'sticky top-0 z-50 w-full bg-background/60 backdrop-blur-md transition-shadow',
          !inView && 'shadow-md'
        )}
      >
        <div className='h-1.5 bg-gradient-to-r from-[var(--color-accent-start)] to-[var(--color-accent-end)]' />
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4'>
          <nav className='flex gap-4 sm:gap-6 font-medium'>
            {navLinks.map(({ name, href }) => (
              <Link
                className={clsx(
                  'text-sm sm:text-base transition-colors hover:text-[var(--color-accent-main)]',
                  baseRoute === href && 'gradient-title !text-transparent'
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
