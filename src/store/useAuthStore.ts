import { create } from 'zustand';
import {
    UserProfile, createGuestUser, createNewUserProfile,
    saveLocalUser, loadLocalUser, clearLocalUser,
    isOnboarded, setOnboarded, clearOnboarding,
} from '../services/auth';
import { auth, db } from '../../firebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithCredential,
    User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { COLLECTIONS } from '../utils/constants';

interface AuthState {
    user: UserProfile | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    hasOnboarded: boolean;

    // Actions
    initialize: () => Promise<void>;
    loginAsGuest: (language: string) => Promise<void>;
    loginWithEmail: (email: string, password: string, language: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string, language: string) => Promise<void>;
    loginWithGoogle: (idToken: string, language: string) => Promise<void>;
    signOut: () => Promise<void>;
    updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
    refreshUser: () => Promise<void>;
    _setFirebaseListener: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    hasOnboarded: false,

    initialize: async () => {
        try {
            const onboarded = await isOnboarded();
            const localUser = await loadLocalUser();

            set({
                user: localUser,
                isAuthenticated: !!localUser,
                hasOnboarded: onboarded && !!localUser,
            });

            // Start listening to Firebase Auth state
            get()._setFirebaseListener();
        } catch {
            set({ isLoading: false });
        }
    },

    _setFirebaseListener: () => {
        onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
            try {
                if (firebaseUser) {
                    // User is signed in to Firebase. Fetch profile from Firestore.
                    const docRef = doc(db, COLLECTIONS.USERS, firebaseUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const profile = docSnap.data() as UserProfile;
                        await saveLocalUser(profile);
                        const onboarded = await isOnboarded();
                        set({ user: profile, isAuthenticated: true, hasOnboarded: onboarded, isLoading: false });
                    } else {
                        // Edge case: Auth exists but Firestore doc missing. Handled in signup logic.
                        set({ isLoading: false });
                    }
                } else {
                    // User is signed out. Check if it's a guest user.
                    const localUser = await loadLocalUser();
                    if (localUser?.isGuest) {
                        const onboarded = await isOnboarded();
                        set({ user: localUser, isAuthenticated: true, hasOnboarded: onboarded, isLoading: false });
                    } else {
                        set({ user: null, isAuthenticated: false, isLoading: false });
                    }
                }
            } catch (err) {
                set({ isLoading: false });
            }
        });
    },

    loginAsGuest: async (language: string) => {
        try {
            set({ isLoading: true });
            const guest = createGuestUser(language);
            await saveLocalUser(guest);
            await setOnboarded();
            set({ user: guest, isAuthenticated: true, hasOnboarded: true, isLoading: false });
        } catch (e: any) {
            set({ isLoading: false });
            throw e;
        }
    },

    loginWithEmail: async (email: string, password: string, _language: string) => {
        set({ isLoading: true });
        try {
            // 1. Authenticate with Firebase
            const cred = await signInWithEmailAndPassword(auth, email, password);

            // 2. Fetch User Profile
            const docRef = doc(db, COLLECTIONS.USERS, cred.user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const profile = docSnap.data() as UserProfile;
                await saveLocalUser(profile);
                await setOnboarded();
                set({ user: profile, isAuthenticated: true, hasOnboarded: true, isLoading: false });
            } else {
                throw new Error("User profile not found in database.");
            }
        } catch (error: any) {
            set({ isLoading: false });
            // Throw simplified error message to UI
            const code = error.code;
            if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
                throw new Error('Invalid email or password.');
            } else if (code === 'auth/too-many-requests') {
                throw new Error('Too many failed attempts. Try again later.');
            } else {
                throw new Error(error.message || 'Login failed.');
            }
        }
    },

    signUpWithEmail: async (email: string, password: string, language: string) => {
        set({ isLoading: true });
        try {
            // 1. Create Auth credential
            const cred = await createUserWithEmailAndPassword(auth, email, password);

            // 2. Create User Profile
            const profile = createNewUserProfile(cred.user.uid, email, language);

            // 3. Save to Firestore
            const docRef = doc(db, COLLECTIONS.USERS, profile.uid);
            await setDoc(docRef, profile);

            // 4. Save Locally
            await saveLocalUser(profile);
            await setOnboarded();

            set({ user: profile, isAuthenticated: true, hasOnboarded: true, isLoading: false });
        } catch (error: any) {
            set({ isLoading: false });
            const code = error.code;
            if (code === 'auth/email-already-in-use') {
                throw new Error('This email is already in use.');
            } else if (code === 'auth/invalid-email') {
                throw new Error('Please enter a valid email address.');
            } else if (code === 'auth/weak-password') {
                throw new Error('Password must be at least 6 characters.');
            } else {
                throw new Error(error.message || 'Sign up failed.');
            }
        }
    },

    loginWithGoogle: async (idToken: string, language: string) => {
        set({ isLoading: true });
        try {
            const credential = GoogleAuthProvider.credential(idToken);
            const result = await signInWithCredential(auth, credential);
            const fbUser = result.user;

            // Check if user exists in Firestore
            const docRef = doc(db, COLLECTIONS.USERS, fbUser.uid);
            const docSnap = await getDoc(docRef);

            let profile: UserProfile;
            if (docSnap.exists()) {
                profile = docSnap.data() as UserProfile;
            } else {
                profile = createNewUserProfile(fbUser.uid, fbUser.email || '', language);
                profile.displayName = fbUser.displayName || profile.displayName;
                await setDoc(docRef, profile);
            }

            await saveLocalUser(profile);
            await setOnboarded();
            set({ user: profile, isAuthenticated: true, hasOnboarded: true, isLoading: false });
        } catch (error: any) {
            set({ isLoading: false });
            throw new Error(error.message || 'Google sign-in failed.');
        }
    },

    signOut: async () => {
        set({ isLoading: true });
        try {
            // Check if we are logging out a Firebase user or a local Guest
            const { user } = get();
            if (user && !user.isGuest) {
                await signOut(auth);
            }

            await clearLocalUser();
            await clearOnboarding();
            set({ user: null, isAuthenticated: false, hasOnboarded: false, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            console.error('Logout error', error);
        }
    },

    updateProfile: async (updates: Partial<UserProfile>) => {
        const current = get().user;
        if (!current) return;
        const updated = { ...current, ...updates };

        // Save locally
        await saveLocalUser(updated);

        // Sync to Firestore if not guest
        if (!current.isGuest) {
            try {
                const docRef = doc(db, COLLECTIONS.USERS, current.uid);
                await setDoc(docRef, updated, { merge: true });
            } catch (err) {
                console.error('Failed to sync user updates to Firestore', err);
            }
        }

        set({ user: updated });
    },

    refreshUser: async () => {
        const current = get().user;
        if (!current) return;

        if (current.isGuest) {
            // For guest, simply reload from local
            const local = await loadLocalUser();
            if (local) set({ user: local, isAuthenticated: true });
        } else {
            // For authenticated user, pull fresh data from Firestore
            try {
                const docRef = doc(db, COLLECTIONS.USERS, current.uid);
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    const freshProfile = snap.data() as UserProfile;
                    await saveLocalUser(freshProfile);
                    set({ user: freshProfile, isAuthenticated: true });
                }
            } catch (err) {
                console.error('Failed to pull fresh profile from Firestore', err);
            }
        }
    },
}));
