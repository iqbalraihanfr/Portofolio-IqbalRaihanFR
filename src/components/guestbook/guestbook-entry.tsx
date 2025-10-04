// src/components/guestbook/guestbook-entry.tsx

import { useState } from "react";
import { motion } from "framer-motion";
import { HiTrash } from "react-icons/hi2";
import { formatFullTimeStamp, formatTimestamp } from "@/lib/format";
import { UnstyledLink } from "@/components/link/unstyled-link";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Menggunakan komponen Avatar Anda
import type { CustomSession } from "@/lib/types/api";
import type { Guestbook } from "@/lib/types/guestbook";

type GuestbookEntryProps = Guestbook & {
  session: CustomSession | null;
  unRegisterGuestbook: (id: string) => Promise<void>;
};

export function GuestbookEntry({
  id,
  message, // Pastikan prop ini bernama 'message'
  name,
  image,
  session,
  username,
  createdAt,
  createdBy,
  unRegisterGuestbook,
}: GuestbookEntryProps): React.JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleUnRegisterGuestbook = async (): Promise<void> => {
    setLoading(true);
    await unRegisterGuestbook(id);
    // setLoading tidak perlu di-reset ke false karena komponen akan hilang
  };

  const isOwner = session?.user.id === createdBy || session?.user.admin;
  const githubProfileUrl = `https://github.com/${username}`;

  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
      // Styling diadaptasi dari SCSS Risal ke Tailwind CSS
      className="main-border relative flex items-start gap-4 rounded-2xl p-4"
    >
      {/* Avatar Section */}
      <UnstyledLink href={githubProfileUrl}>
        <Avatar className="h-12 w-12 border-2 border-gray-200 dark:border-gray-700">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
      </UnstyledLink>

      {/* Content Section */}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <UnstyledLink
            href={githubProfileUrl}
            className="truncate font-bold hover:underline decoration-transparent transition-all duration-300 ease-in-out [text-decoration-thickness:2px] hover:decoration-inherit hover:[text-decoration-thickness:2px]"
          >
            {name}
          </UnstyledLink>
          <Tooltip
            className="whitespace-nowrap"
            tip={formatFullTimeStamp(createdAt)}
          >
            <time
              dateTime={new Date(createdAt).toISOString()}
              className="cursor-pointer text-sm text-gray-600 dark:text-gray-300 "
            >
              {formatTimestamp(createdAt)}
            </time>
          </Tooltip>
        </div>
        <p className="break-words pt-1 text-gray-800 dark:text-gray-200">
          {message}
        </p>
      </div>

      {/* Delete Button */}
      {isOwner && (
        <Tooltip tip="Delete message">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-md p-1 text-gray-500 transition-colors hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            disabled={loading}
            onClick={handleUnRegisterGuestbook}
            aria-label="Delete message"
          >
            <HiTrash className="h-5 w-5" />
          </Button>
        </Tooltip>
      )}
    </motion.article>
  );
}
