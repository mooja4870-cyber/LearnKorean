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

const hasGoogleClientId =
    !!GOOGLE_CLIENT_ID.expoClientId ||
    !!GOOGLE_CLIENT_ID.iosClientId ||
    !!GOOGLE_CLIENT_ID.androidClientId ||
    !!GOOGLE_CLIENT_ID.webClientId;

/**
 * Hook to use Google Sign-In
 * Returns [request, response, promptAsync]
 */
export function useGoogleAuth() {
    const fallbackClientId =
        GOOGLE_CLIENT_ID.webClientId ||
        GOOGLE_CLIENT_ID.expoClientId ||
        GOOGLE_CLIENT_ID.iosClientId ||
        GOOGLE_CLIENT_ID.androidClientId ||
        'MISSING_GOOGLE_CLIENT_ID';

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: fallbackClientId,
        webClientId: GOOGLE_CLIENT_ID.webClientId,
        iosClientId: GOOGLE_CLIENT_ID.iosClientId,
        androidClientId: GOOGLE_CLIENT_ID.androidClientId,
    });

    const safePromptAsync = async () => {
        if (!hasGoogleClientId) {
            throw new Error('Google Sign-In is not configured. Set EXPO_PUBLIC_GOOGLE_* client IDs in .env');
        }
        return promptAsync();
    };

    return { request, response, promptAsync: safePromptAsync, isConfigured: hasGoogleClientId };
}

/**
 * Sign in to Firebase with Google OAuth token
 */
export async function firebaseSignInWithGoogle(idToken: string): Promise<void> {
    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, credential);
}
