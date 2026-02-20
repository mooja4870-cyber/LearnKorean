// Google Sign-In Service using expo-auth-session
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

// Complete auth session for web browser redirect
WebBrowser.maybeCompleteAuthSession();

// Google OAuth Client IDs — set these in your Firebase Console → Authentication → Sign-in method → Google
const GOOGLE_CLIENT_ID = {
    expoClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '',
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || '',
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '',
};

/**
 * Hook to use Google Sign-In
 * Returns [request, response, promptAsync]
 */
export function useGoogleAuth() {
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: GOOGLE_CLIENT_ID.webClientId,
        iosClientId: GOOGLE_CLIENT_ID.iosClientId,
        androidClientId: GOOGLE_CLIENT_ID.androidClientId,
    });

    return { request, response, promptAsync };
}

/**
 * Sign in to Firebase with Google OAuth token
 */
export async function firebaseSignInWithGoogle(idToken: string): Promise<void> {
    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, credential);
}
