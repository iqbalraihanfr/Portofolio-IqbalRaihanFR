import 'server-only'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { backendEnv } from '@/lib/env-server' // <-- Impor env yang sudah divalidasi

// Gunakan variabel dari backendEnv, bukan process.env langsung
const config = {
  apiKey: backendEnv.API_KEY,
  authDomain: backendEnv.AUTH_DOMAIN,
  projectId: backendEnv.PROJECT_ID,
  storageBucket: backendEnv.STORAGE_BUCKET,
  messagingSenderId: backendEnv.MESSAGING_SENDER_ID,
  appId: backendEnv.APP_ID,
}

// Pola ini sudah benar, untuk mencegah inisialisasi ganda
const app = getApps().length ? getApp() : initializeApp(config)
export const db = getFirestore(app)