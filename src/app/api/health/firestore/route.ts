// src/app/api/health/firestore/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/server/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export async function GET() {
  try {
    const ref = await addDoc(collection(db, '_healthcheck'), {
      ping: 'ok',
      at: serverTimestamp(),
    })
    return NextResponse.json({ ok: true, id: ref.id })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 })
  }
}
