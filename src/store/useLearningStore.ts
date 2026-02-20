// Learning Store — Zustand
import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';
import { completeLesson, completeQuiz, recordStudy, QuizCompletionData, syncProgressToFirestore } from '../services/progress';

interface LearningState {
    currentLessonId: string | null;
    currentQuizId: string | null;
    completedLessons: string[];
    quizHistory: any[];

    // Actions
    startLesson: (lessonId: string) => void;
    finishLesson: (lessonId: string) => Promise<void>;
    startQuiz: (quizId: string) => void;
    finishQuiz: (data: QuizCompletionData) => Promise<void>;
    loadProgress: () => void;
}

export const useLearningStore = create<LearningState>((set) => ({
    currentLessonId: null,
    currentQuizId: null,
    completedLessons: [],
    quizHistory: [],

    startLesson: (lessonId: string) => {
        set({ currentLessonId: lessonId });
    },

    finishLesson: async (lessonId: string) => {
        const user = useAuthStore.getState().user;
        if (user) {
            // 1. Optimistic local update
            let updatedUser = completeLesson(user, lessonId);
            updatedUser = await recordStudy(updatedUser);

            // Update local storage via auth wrapper
            await useAuthStore.getState().updateProfile(updatedUser);

            set({
                completedLessons: updatedUser.lessonsCompleted,
                currentLessonId: null,
            });

            // 2. Sync to Firestore in background
            if (!user.isGuest) {
                await syncProgressToFirestore(updatedUser, { type: 'lesson', id: lessonId });
            }
        }
    },

    startQuiz: (quizId: string) => {
        set({ currentQuizId: quizId });
    },

    finishQuiz: async (data: QuizCompletionData) => {
        const user = useAuthStore.getState().user;
        if (user) {
            // 1. Optimistic local update
            let updatedUser = completeQuiz(user, data);
            updatedUser = await recordStudy(updatedUser);

            // Update local storage via auth wrapper
            await useAuthStore.getState().updateProfile(updatedUser);

            set({
                quizHistory: updatedUser.quizResults,
                currentQuizId: null,
            });

            // 2. Sync to Firestore in background
            if (!user.isGuest) {
                await syncProgressToFirestore(updatedUser, { type: 'quiz', data });
            }
        }
    },

    loadProgress: () => {
        const user = useAuthStore.getState().user;
        if (user) {
            set({
                completedLessons: user.lessonsCompleted,
                quizHistory: user.quizResults,
            });
        }
    },
}));
