import { NextResponse } from "next/server";
import { db } from "@/lib/server/firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  limit,
  startAfter,
  getDoc,
  doc,
} from "firebase/firestore";
import { GuestbookSchema } from "@/lib/validations/guestbook";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { CustomSession } from "@/lib/types/api";

const COL = "guestbook";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const take = Number(searchParams.get("limit") ?? 20);
  const cursor = searchParams.get("cursor");

  let q = query(collection(db, COL), orderBy("createdAt", "desc"), limit(take));

  if (cursor) {
    const curDoc = await getDoc(doc(db, COL, cursor));
    if (curDoc.exists()) {
      q = query(
        collection(db, COL),
        orderBy("createdAt", "desc"),
        startAfter(curDoc),
        limit(take)
      );
    }
  }

  const snap = await getDocs(q);
  const data = snap.docs.map((d) => {
    const v = d.data() as any;
    return {
      id: d.id,
      text: v.message || v.text,
      name: v.name,
      email: v.email || "",
      image: v.image || "",
      username: v.username || "",
      createdAt: v.createdAt?.toMillis?.() ?? null,
      createdBy: v.createdBy || "",
    };
  });

  const nextCursor = snap.docs.length
    ? snap.docs[snap.docs.length - 1].id
    : null;

  return NextResponse.json(
    { items: data, nextCursor },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions)) as CustomSession;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = GuestbookSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { message } = parsed.data;

  const docRef = await addDoc(collection(db, COL), {
    name: session.user.name,
    message,
    createdAt: serverTimestamp(),
    createdBy: session.user.id,
    image: session.user.image,
    username: session.user.username,
  });

  return NextResponse.json({ ok: true, id: docRef.id });
}
