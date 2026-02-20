import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';
import { getQuizAccuracy, getLevelProgress } from '../services/progress';

interface UserState {
    displayName: string;
    email: string;
    nativeLanguage: string;
    currentLevel: number;
    currentStreak: number;
    longestStreak: number;
    totalStudyDays: number;
    totalXP: number;
    lessonsCompleted: number;
    quizAccuracy: number;
    levelProgress: number;
    isGuest: boolean;
    createdAt: string;

    // Actions
    loadUserData: () => void;
    refresh: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    displayName: 'Guest',
    email: '',
    nativeLanguage: 'en',
    currentLevel: 1,
    currentStreak: 0,
    longestStreak: 0,
    totalStudyDays: 0,
    totalXP: 0,
    lessonsCompleted: 0,
    quizAccuracy: 0,
    levelProgress: 0,
    isGuest: true,
    createdAt: '',

    loadUserData: () => {
        // Derived from Auth Store
        const user = useAuthStore.getState().user;
        if (user) {
            set({
                displayName: user.displayName,
                email: user.email,
                nativeLanguage: user.nativeLanguage,
                currentLevel: user.currentLevel,
                currentStreak: user.currentStreak,
                longestStreak: user.longestStreak,
                totalStudyDays: user.totalStudyDays,
                totalXP: user.totalXP,
                lessonsCompleted: user.lessonsCompleted.length,
                quizAccuracy: getQuizAccuracy(user),
                levelProgress: getLevelProgress(user),
                isGuest: user.isGuest,
                createdAt: user.createdAt,
            });
        }
    },

    refresh: () => {
        const user = useAuthStore.getState().user;
        if (user) {
            set({
                displayName: user.displayName,
                currentStreak: user.currentStreak,
                longestStreak: user.longestStreak,
                totalStudyDays: user.totalStudyDays,
                totalXP: user.totalXP,
                lessonsCompleted: user.lessonsCompleted.length,
                quizAccuracy: getQuizAccuracy(user),
                levelProgress: getLevelProgress(user),
            });
        }
    },
}));
