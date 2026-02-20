import { UserProfile } from './auth';
import { getToday, getYesterday } from '../utils/helpers';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { COLLECTIONS } from '../utils/constants';

export interface QuizCompletionData {
    quizId: string;
    score: number;
    passed: boolean;
    xpEarned: number;
}

/**
 * Checks streak logic and records today as study day
 */
export async function recordStudy(user: UserProfile): Promise<UserProfile> {
    const updatedUser = { ...user };
    const today = getToday();
    const yesterday = getYesterday();

    if (updatedUser.lastStudyDate !== today) {
        if (updatedUser.lastStudyDate === yesterday) {
            updatedUser.currentStreak += 1;
        } else {
            updatedUser.currentStreak = 1;
        }

        if (updatedUser.currentStreak > updatedUser.longestStreak) {
            updatedUser.longestStreak = updatedUser.currentStreak;
        }

        updatedUser.lastStudyDate = today;
        updatedUser.totalStudyDays += 1;
    }

    return updatedUser;
}

export function completeLesson(user: UserProfile, lessonId: string): UserProfile {
    const updatedUser = { ...user };
    if (!updatedUser.lessonsCompleted.includes(lessonId)) {
        updatedUser.lessonsCompleted.push(lessonId);
        updatedUser.totalXP += 25; // default lesson xp
    }
    return updatedUser;
}

export function completeQuiz(user: UserProfile, data: QuizCompletionData): UserProfile {
    const updatedUser = { ...user };

    updatedUser.quizResults.push({
        quizId: data.quizId,
        score: data.score,
        completedAt: new Date().toISOString(),
    });

    updatedUser.totalXP += data.xpEarned;
    return updatedUser;
}

export function getQuizAccuracy(user: UserProfile): number {
    if (user.quizResults.length === 0) return 0;

    const totalScore = user.quizResults.reduce((acc, curr) => acc + curr.score, 0);
    return Math.round(totalScore / user.quizResults.length);
}

export function getLevelProgress(user: UserProfile): number {
    // Simplistic MVP: Assume Level 1 requires 10 lessons or quizzes max
    const totalInteractions = user.lessonsCompleted.length + user.quizResults.length;
    const progress = (totalInteractions / 10) * 100;
    return Math.min(Math.round(progress), 100);
}

// --- Firebase Sync ---
export async function syncProgressToFirestore(
    user: UserProfile,
    activity: { type: 'lesson'; id: string } | { type: 'quiz'; data: QuizCompletionData }
): Promise<void> {
    if (user.isGuest) return;

    const today = getToday();
    try {
        const progressRef = doc(db, COLLECTIONS.USERS, user.uid, COLLECTIONS.USER_PROGRESS, today);

        const xpChange = activity.type === 'lesson' ? 25 : activity.data.xpEarned;

        // Use setDoc with merge to ensure the document gets created if it doesn't exist today
        await setDoc(progressRef, {
            xpEarned: xpChange, // NOTE: Need a Firestore Transaction / FieldValue.increment in pro, but keeping simple for MVP mapping
            updatedAt: new Date().toISOString()
        }, { merge: true });

        // Append history items using arrayUnion
        if (activity.type === 'lesson') {
            await setDoc(progressRef, {
                lessonsCompleted: arrayUnion(activity.id)
            }, { merge: true });
        } else if (activity.type === 'quiz') {
            await setDoc(progressRef, {
                quizzesTaken: arrayUnion({
                    quizId: activity.data.quizId,
                    score: activity.data.score,
                    passed: activity.data.passed,
                    timestamp: new Date().toISOString(),
                })
            }, { merge: true });
        }

    } catch (error) {
        console.error('Error syncing progress to Firestore', error);
    }
}
