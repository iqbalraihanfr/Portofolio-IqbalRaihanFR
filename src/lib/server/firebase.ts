import 'server-only'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: process.env.FB_API_KEY!,
  authDomain: process.env.FB_AUTH_DOMAIN!,
  projectId: process.env.FB_PROJECT_ID!,
}

const app = getApps().length ? getApp() : initializeApp(config)
export const db = getFirestore(app)