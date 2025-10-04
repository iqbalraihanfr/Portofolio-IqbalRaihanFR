// src/lib/hooks/use-guestbook.ts

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import type { ValidApiEndpoints } from '@/lib/types/api';
import type { Guestbook } from '@/lib/types/guestbook';

type UseGuestbook = {
  guestbook?: Guestbook[];
  isLoading: boolean;
  registerGuestbook: (message: string) => Promise<void>;
  unRegisterGuestbook: (id: string) => Promise<void>;
};

/**
 * Returns the guestbook data and a function to register guestbook.
 */
export function useGuestbook(fallbackData: Guestbook[]): UseGuestbook {
  const {
    data: guestbook,
    isLoading,
    mutate
  } = useSWR<Guestbook[], unknown, ValidApiEndpoints>(
    '/api/guestbook',
    (url: ValidApiEndpoints) => fetcher(url).then((data: any) => data.items),
    { 
      fallbackData 
    }
  );

  // FIX 2: Sederhanakan fungsi registerGuestbook untuk memicu re-fetch
  const registerGuestbook = async (message: string): Promise<void> => {
    // Kirim pesan baru ke API
    await fetcher('/api/guestbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }) // Pastikan key adalah 'message'
    });
    // Panggil mutate() tanpa argumen untuk memberitahu SWR agar mengambil ulang data
    await mutate();
  };

  const unRegisterGuestbook = async (id: string): Promise<void> => {
    // Best Practice: Optimistic UI, hapus dari tampilan sebelum request selesai
    mutate(
      guestbook?.filter((entry) => entry.id !== id),
      false
    );

    // Kirim request DELETE ke API
    await fetcher(`/api/guestbook/${id}`, { method: 'DELETE' });

    // Revalidasi data untuk memastikan sinkron dengan server
    await mutate();
  };

  return { guestbook, isLoading, registerGuestbook, unRegisterGuestbook };
}