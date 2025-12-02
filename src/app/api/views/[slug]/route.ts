import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { contentsCollection } from '@/lib/firebase/collections';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const docRef = doc(contentsCollection, slug);
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();

    if (!data) {
      return NextResponse.json({ message: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json(data.views);
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const docRef = doc(contentsCollection, slug);
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();

    if (!data) {
      return NextResponse.json({ message: 'Content not found' }, { status: 404 });
    }

    await updateDoc(docRef, {
      views: increment(1)
    });

    return NextResponse.json(data.views + 1, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
