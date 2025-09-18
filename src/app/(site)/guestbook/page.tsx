import { getServerSession } from "next-auth/next";
import { getGuestbook } from "@/lib/api";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import type { CustomSession } from "@/lib/types/api";
import type { Metadata } from 'next';
import GuestbookClient from "./client";

export const metadata: Metadata = {
  title: 'Guestbook',
  description: 'Sign my digital guestbook and share some wisdom.',
};

export default async function GuestbookPage() {
  const session = (await getServerSession(authOptions)) as CustomSession | null;
  const guestbook = await getGuestbook();

  return <GuestbookClient session={session} fallbackData={guestbook} />;
}