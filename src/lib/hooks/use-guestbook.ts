// src/lib/hooks/use-guestbook.ts
import { Timestamp } from 'firebase/firestore';

import useSWRInfinite from 'swr/infinite';
import { fetcher } from '@/lib/fetcher';
import type { Guestbook } from '@/lib/types/guestbook';

type UseGuestbook = {
  guestbook: Guestbook[];
  isLoading: boolean;
  isLoadingMore: boolean;
  isReachingEnd: boolean;
  loadMore: () => void;
  registerGuestbook: (message: string) => Promise<void>;
  unRegisterGuestbook: (id: string) => Promise<void>;
};

type GuestbookResponse = {
  items: Guestbook[];
  nextCursor?: string;
};

export function useGuestbook(fallbackData: Guestbook[]): UseGuestbook {
  const getKey = (
    pageIndex: number,
    previousPageData: GuestbookResponse | null
  ) => {
    // First page, no cursor
    if (pageIndex === 0) return '/api/guestbook?limit=20';

    // Reached the end
    if (!previousPageData || !previousPageData.nextCursor) return null;

    // Next pages with cursor
    return `/api/guestbook?limit=20&cursor=${previousPageData.nextCursor}`;
  };

  const { data, error, size, setSize, mutate, isLoading } = useSWRInfinite<
    GuestbookResponse,
    Error
  >(getKey, fetcher, {
    fallbackData: [{ items: fallbackData, nextCursor: undefined }],
    revalidateFirstPage: false,
  });

  // Flatten the array of pages into a single array of items
  const guestbook = data ? data.flatMap((page) => page.items) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.items.length === 0;
  const isReachingEnd =
    isEmpty || (data && !data[data.length - 1]?.nextCursor);

  const loadMore = () => {
    if (!isReachingEnd && !isLoadingMore) {
      setSize(size + 1);
    }
  };

  const registerGuestbook = async (message: string): Promise<void> => {
    const newItem: Guestbook = {
      id: Date.now().toString(), // Temporary ID
      name: 'You', // Placeholder, UI should handle specific session checks if needed, but mostly visual
      message,
      createdAt: Timestamp.now(), // Current time
      createdBy: 'me',
      // Optional fields, handled safely by UI
      email: '',
      image: '',
      username: '',
    };

    // Optimistic update: Prepend to the first page
    await mutate(
      (currentData) => {
        if (!currentData) return [{ items: [newItem] }];
        const newFirstPage = {
          ...currentData[0],
          items: [newItem, ...currentData[0].items],
        };
        return [newFirstPage, ...currentData.slice(1)];
      },
      { revalidate: false }
    );

    try {
      await fetcher('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      // Trigger revalidation to get real data (ID, user info)
      await mutate();
    } catch (err) {
      // Revert on error (trigger revalidation)
      await mutate();
    }
  };

  const unRegisterGuestbook = async (id: string): Promise<void> => {
    // Optimistic update: Filter out the item
    await mutate(
      (currentData) => {
        if (!currentData) return [];
        return currentData.map((page) => ({
          ...page,
          items: page.items.filter((entry) => entry.id !== id),
        }));
      },
      { revalidate: false }
    );

    try {
      await fetcher(`/api/guestbook/${id}`, { method: 'DELETE' });
      // Revalidate to ensure sync
      await mutate();
    } catch (err) {
      await mutate();
    }
  };

  return {
    guestbook,
    isLoading,
    isLoadingMore: !!isLoadingMore,
    isReachingEnd: !!isReachingEnd,
    loadMore,
    registerGuestbook,
    unRegisterGuestbook,
  };
}