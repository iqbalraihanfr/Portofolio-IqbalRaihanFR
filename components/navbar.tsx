"use client";

import Link from 'next/link';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useInView } from 'framer-motion';
import { clsx } from 'clsx';
import { ThemeSwitch } from '@/components/theme-switch';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
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
          <nav className='flex gap-6 sm:gap-8 font-medium'>
            {navLinks.map(({ name, href }) => (
              <Link
                className={clsx(
                  'text-sm sm:text-base transition-colors hover:text-[var(--color-accent-main)]',
                  baseRoute === href && 'text-[var(--color-accent-main)]'
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
