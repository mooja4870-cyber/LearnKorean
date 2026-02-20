// Helper Utilities

/**
 * Format a date string to a human-readable format
 */
export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Get today's date as YYYY-MM-DD string
 */
export function getToday(): string {
    return new Date().toISOString().split('T')[0];
}

/**
 * Get yesterday's date as YYYY-MM-DD string
 */
export function getYesterday(): string {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * Calculate percentage
 */
export function percentage(value: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
}

/**
 * Shuffle an array (Fisher-Yates)
 */
export function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/**
 * Generate a simple UID
 */
export function generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Sleep utility for animations
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}

/**
 * Get streak emoji based on count
 */
export function getStreakEmoji(count: number): string {
    if (count >= 100) return '🏆';
    if (count >= 30) return '⭐';
    if (count >= 7) return '🔥';
    if (count >= 1) return '✨';
    return '💤';
}

/**
 * Get grade text based on quiz score
 */
export function getQuizGrade(score: number): { emoji: string; text: string; color: string } {
    if (score === 100) return { emoji: '🌟', text: 'Perfect!', color: '#FFD93D' };
    if (score >= 90) return { emoji: '🎉', text: 'Excellent!', color: '#10B981' };
    if (score >= 80) return { emoji: '😄', text: 'Great Job!', color: '#10B981' };
    if (score >= 70) return { emoji: '👍', text: 'Good!', color: '#3B82F6' };
    if (score >= 50) return { emoji: '😊', text: 'Not Bad!', color: '#F59E0B' };
    return { emoji: '💪', text: 'Keep Trying!', color: '#EF4444' };
}
