// Constants
export const APP_NAME = 'Antigravity';
export const APP_SLOGAN = 'Break the gravity of language barriers!';
export const APP_VERSION = '1.0.0';
export const APP_BUILD = 'MVP';

// Firebase collections
export const COLLECTIONS = {
    USERS: 'users',
    HANGUL_LESSONS: 'hangulLessons',
    QUIZZES: 'quizzes',
    USER_PROGRESS: 'userProgress',
    COMING_SOON: 'comingSoonInterest',
} as const;

// AsyncStorage keys
export const STORAGE_KEYS = {
    USER: '@antigravity_user',
    THEME: '@antigravity_theme',
    LANGUAGE: '@antigravity_language',
    ONBOARDED: '@antigravity_onboarded',
    SETTINGS: '@antigravity_settings',
} as const;

// Quiz
export const QUIZ_PASSING_SCORE = 70;
export const QUIZ_XP_PER_CORRECT = 10;
export const LESSON_XP_REWARD = 25;

// Levels
export const MAX_LEVEL = 5;
export const LEVEL_NAMES: Record<number, string> = {
    1: 'Hangul Master',
    2: 'Daily Korean',
    3: 'K-Culture Korean',
    4: 'Intermediate',
    5: 'Advanced',
};

// Supported languages for i18n
export const DEFAULT_LANGUAGE = 'en';

// Animation durations (ms)
export const ANIMATION = {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000,
} as const;

// Contact
export const SUPPORT_EMAIL = 'support@antigravity.app';
export const PRIVACY_URL = 'https://antigravity.app/privacy';
export const TERMS_URL = 'https://antigravity.app/terms';
