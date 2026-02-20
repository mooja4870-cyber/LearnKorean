// Antigravity Design System - Colors
// Space/gravity theme: deep purple, neon blue, starlight gold

export const colors = {
  light: {
    primary: '#6C5CE7',        // Deep purple
    primaryLight: '#A29BFE',   // Light purple
    secondary: '#00CEFF',      // Neon cyan
    secondaryLight: '#74E5FF', // Light cyan
    accent: '#FFD93D',         // Starlight gold
    accentWarm: '#FF6B6B',     // Warm coral

    background: '#F8F9FE',     // Soft lavender white
    surface: '#FFFFFF',
    surfaceElevated: '#F0EFFF',
    card: '#FFFFFF',

    text: '#1A1A2E',           // Deep navy
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    textOnPrimary: '#FFFFFF',

    border: '#E5E7EB',
    divider: '#F3F4F6',

    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',

    streak: '#FF6B35',         // Fire orange for streaks
    xp: '#FFD93D',             // Gold for XP

    tabBar: '#FFFFFF',
    tabBarBorder: '#E5E7EB',
    tabBarActive: '#6C5CE7',
    tabBarInactive: '#9CA3AF',
  },
  dark: {
    primary: '#A29BFE',
    primaryLight: '#6C5CE7',
    secondary: '#00CEFF',
    secondaryLight: '#0099CC',
    accent: '#FFD93D',
    accentWarm: '#FF6B6B',

    background: '#0F0E1A',     // Deep space
    surface: '#1A1930',        // Dark purple surface
    surfaceElevated: '#252342',
    card: '#1A1930',

    text: '#F1F1F6',
    textSecondary: '#A0A0BC',
    textMuted: '#6B6B8D',
    textOnPrimary: '#FFFFFF',

    border: '#2D2B4A',
    divider: '#1E1D35',

    success: '#34D399',
    error: '#F87171',
    warning: '#FBBF24',
    info: '#60A5FA',

    streak: '#FF6B35',
    xp: '#FFD93D',

    tabBar: '#1A1930',
    tabBarBorder: '#2D2B4A',
    tabBarActive: '#A29BFE',
    tabBarInactive: '#6B6B8D',
  },
};

export type ThemeColors = typeof colors.light;
