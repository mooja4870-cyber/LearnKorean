// Firebase App Configuration
import { initializeApp, getApps, getApp } from 'firebase/app';
import { Auth, getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

// Placeholder config - user must replace these in production
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "AIzaSy_PLACEHOLDER_KEY",
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "antigravity-dev.firebaseapp.com",
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "antigravity-dev",
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "antigravity-dev.appspot.com",
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth safely per platform.
// - Web: use default browser persistence via getAuth(app)
// - Native: initializeAuth(app) and fallback to getAuth(app) on refresh/re-init
let auth: Auth;
if (Platform.OS === 'web') {
    auth = getAuth(app);
} else {
    try {
        auth = initializeAuth(app);
    } catch {
        // In fast refresh / already initialized cases, fallback to existing auth instance.
        auth = getAuth(app);
    }
}

const db = getFirestore(app);

export { app, auth, db };
