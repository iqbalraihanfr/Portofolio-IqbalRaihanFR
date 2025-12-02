"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGuestbook } from "@/lib/hooks/use-guestbook";
import { Accent } from "@/components/ui/accent";
import { GuestbookCard } from "@/components/guestbook/guestbook-card";
import { GuestbookForm } from "@/components/guestbook/guestbook-form";
import { GuestbookEntry } from "@/components/guestbook/guestbook-entry";
import { setTransition } from "@/lib/transition";
import type { CustomSession } from "@/lib/types/api";
import type { Guestbook } from "@/lib/types/guestbook";
import { Button } from "@/components/ui/button";

type GuestbookClientProps = {
  session: CustomSession | null;
  fallbackData: Guestbook[];
};

export default function GuestbookClient({
  session,
  fallbackData,
}: GuestbookClientProps) {
  const {
    guestbook,
    registerGuestbook,
    unRegisterGuestbook,
    loadMore,
    isLoadingMore,
    isReachingEnd,
  } = useGuestbook(fallbackData);

  return (
    <main className="grid min-h-screen content-start gap-6">
      <section className="grid gap-2">
        <motion.h1
          className="text-3xl font-bold md:text-5xl"
          {...setTransition()}
        >
          <Accent>Guestbook</Accent>
        </motion.h1>
        <motion.p
          className="text-gray-600 dark:text-gray-300"
          {...setTransition({ delayIn: 0.1 })}
        >
          Leave a comment below. It could be anything - appreciation,
          information, wisdom, or even humor. Surprise me!
        </motion.p>
      </section>
      <motion.section {...setTransition({ delayIn: 0.2 })}>
        <GuestbookCard>
          <GuestbookForm
            session={session}
            registerGuestbook={registerGuestbook}
          />
        </GuestbookCard>
      </motion.section>
      <motion.section
        className="grid gap-4"
        {...setTransition({ delayIn: 0.3 })}
      >
        <AnimatePresence mode='popLayout'>
          {guestbook?.length ? (
            guestbook.map((entry) => (
              <GuestbookEntry
                {...entry}
                session={session}
                unRegisterGuestbook={unRegisterGuestbook}
                key={entry.id}
              />
            ))
          ) : (
            <motion.h2
              className="text-center text-3xl font-bold"
              {...setTransition({ delayIn: 0.2 })}
            >
              <Accent>Sorry, Guestbook is currently empty :&#40;</Accent>
            </motion.h2>
          )}
        </AnimatePresence>

        {!isReachingEnd && (
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => loadMore()}
              disabled={isLoadingMore}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {isLoadingMore ? "Loading..." : "Load more"}
            </Button>
          </div>
        )}
      </motion.section>
    </main>
  );
}