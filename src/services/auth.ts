// Enhanced Auth & User Management Service (Firebase Integrated)
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

// --- Data Types ---
export interface UserProfile {
    uid: string;                 // Firebase UID or guest ID
    email: string;               // empty if guest
    displayName: string;         // from email username or "Guest"
    nativeLanguage: string;
    isGuest: boolean;

    // Progress & Stats
    currentLevel: number;
    currentStreak: number;
    longestStreak: number;
    totalStudyDays: number;
    totalXP: number;

    // History tracking
    lastStudyDate: string;       // YYYY-MM-DD format
    lessonsCompleted: string[];  // Array of lesson IDs
    quizResults: {
        quizId: string;
        score: number;
        completedAt: string;
    }[];

    createdAt: string;
    settings: UserSettings;
}

export interface UserSettings {
    notifications: boolean;
    reminderTime: string; // HH:mm
    soundEnabled: boolean;
    autoPlayAudio: boolean;
    darkMode: boolean;
}

// --- Factory ---
export function createGuestUser(language: string): UserProfile {
    return {
        uid: `guest_${Date.now()}`,
        email: '',
        displayName: 'Guest',
        nativeLanguage: language,
        isGuest: true,
        currentLevel: 1,
        currentStreak: 0,
        longestStreak: 0,
        totalStudyDays: 0,
        totalXP: 0,
        lastStudyDate: '',
        lessonsCompleted: [],
        quizResults: [],
        createdAt: new Date().toISOString(),
        settings: {
            notifications: true,
            reminderTime: '18:00',
            soundEnabled: true,
            autoPlayAudio: true,
            darkMode: false,
        },
    };
}

export function createNewUserProfile(uid: string, email: string, language: string): UserProfile {
    return {
        ...createGuestUser(language),
        uid,
        email,
        displayName: email.split('@')[0],
        isGuest: false,
    };
}

// --- Local Storage Management for caching ---
export async function saveLocalUser(user: UserProfile): Promise<void> {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
        console.error('Failed to save user info to local storage', error);
    }
}

export async function loadLocalUser(): Promise<UserProfile | null> {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEYS.USER);
        if (data) return JSON.parse(data);
    } catch (error) {
        console.error('Failed to load user info from local storage', error);
    }
    return null;
}

export async function clearLocalUser(): Promise<void> {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
        console.error('Failed to clear local user', error);
    }
}

// --- Onboarding Flow Tracking ---
export async function setOnboarded(): Promise<void> {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDED, 'true');
    } catch (error) {
        console.error('Failed to set onboarded flag', error);
    }
}

export async function isOnboarded(): Promise<boolean> {
    try {
        const val = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDED);
        return val === 'true';
    } catch (error) {
        return false;
    }
}

export async function clearOnboarding(): Promise<void> {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.ONBOARDED);
    } catch (error) {
        console.error('Failed to clear onboarding state', error);
    }
}
