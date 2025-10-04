'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { useMounted } from '@/lib/hooks/use-mounted'; // Pastikan path import benar

export function Providers({ children }: { children: React.ReactNode }) {
  const mounted = useMounted();

  return (
    <SessionProvider>
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
        {mounted ? children : null}
      </ThemeProvider>
    </SessionProvider>
  );
}