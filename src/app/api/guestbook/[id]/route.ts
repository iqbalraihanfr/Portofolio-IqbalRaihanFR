// src/app/api/guestbook/[id]/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/server/firebase';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import type { CustomSession } from '@/lib/types/api';

const COL = 'guestbook'; // Nama koleksi di Firestore

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = (await getServerSession(authOptions)) as CustomSession;

  // Best Practice: Selalu validasi sesi di backend
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });
  }

  try {
    const docRef = doc(db, COL, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    const data = docSnap.data();
    // Best Practice: Cek hak akses, apakah pengguna adalah pemilik atau admin
    const isOwner = data.created_by === session.user.id;
    const isAdmin = session.user.admin === true; // Cek peran admin

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await deleteDoc(docRef);

    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}