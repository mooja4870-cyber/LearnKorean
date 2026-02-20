// Menu Data — Full menu structure for Coming Soon tracking
export interface MenuItem {
    id: string;
    title_en: string;
    title_ja: string;
    emoji: string;
    phase: number;
    isLocked: boolean;
    category: 'learn' | 'kzone' | 'profile' | 'etc';
    parentId?: string;
}

export const MENU_DATA: MenuItem[] = [
    // Learn tab locked items
    { id: 'vocabulary', title_en: 'Vocabulary', title_ja: '単語帳', emoji: '📖', phase: 2, isLocked: true, category: 'learn' },
    { id: 'grammar', title_en: 'Grammar', title_ja: '文法', emoji: '📝', phase: 3, isLocked: true, category: 'learn' },
    { id: 'speaking', title_en: 'Speaking', title_ja: '会話', emoji: '🗣️', phase: 4, isLocked: true, category: 'learn' },
    { id: 'ai_tutor', title_en: 'AI Tutor', title_ja: 'AIチューター', emoji: '🤖', phase: 3, isLocked: true, category: 'learn' },
    { id: 'writing', title_en: 'Writing', title_ja: '書き', emoji: '✍️', phase: 4, isLocked: true, category: 'learn' },
    { id: 'review', title_en: 'Review', title_ja: '復習', emoji: '📖', phase: 2, isLocked: true, category: 'learn' },

    // K-Zone items
    { id: 'kpop', title_en: 'K-Pop Zone', title_ja: 'K-Popゾーン', emoji: '🎤', phase: 5, isLocked: true, category: 'kzone' },
    { id: 'kdrama', title_en: 'K-Drama Zone', title_ja: 'K-Dramaゾーン', emoji: '🎬', phase: 5, isLocked: true, category: 'kzone' },
    { id: 'kfood', title_en: 'K-Food Zone', title_ja: 'K-Foodゾーン', emoji: '🍽️', phase: 6, isLocked: true, category: 'kzone' },
    { id: 'kvariety', title_en: 'K-Variety Zone', title_ja: 'K-バラエティゾーン', emoji: '🎮', phase: 6, isLocked: true, category: 'kzone' },
    { id: 'ksns', title_en: 'K-SNS Zone', title_ja: 'K-SNSゾーン', emoji: '📱', phase: 5, isLocked: true, category: 'kzone' },
    { id: 'kculture', title_en: 'Korean Culture', title_ja: '韓国文化', emoji: '🏛️', phase: 6, isLocked: true, category: 'kzone' },

    // Profile locked items
    { id: 'achievements', title_en: 'Achievements', title_ja: '業績', emoji: '🏆', phase: 2, isLocked: true, category: 'profile' },
    { id: 'ranking', title_en: 'Ranking', title_ja: 'ランキング', emoji: '🏅', phase: 4, isLocked: true, category: 'profile' },
    { id: 'community', title_en: 'Community', title_ja: 'コミュニティ', emoji: '👥', phase: 5, isLocked: true, category: 'profile' },
    { id: 'premium', title_en: 'Premium', title_ja: 'プレミアム', emoji: '💎', phase: 4, isLocked: true, category: 'profile' },

    // Etc
    { id: 'notification_center', title_en: 'Notification Center', title_ja: '通知センター', emoji: '🔔', phase: 2, isLocked: true, category: 'etc' },
    { id: 'search', title_en: 'Search', title_ja: '検索', emoji: '🔍', phase: 3, isLocked: true, category: 'etc' },
    { id: 'offline', title_en: 'Offline Mode', title_ja: 'オフラインモード', emoji: '📴', phase: 5, isLocked: true, category: 'etc' },
];

export function getMenuByCategory(category: MenuItem['category']): MenuItem[] {
    return MENU_DATA.filter(m => m.category === category);
}

export function getMenuById(id: string): MenuItem | undefined {
    return MENU_DATA.find(m => m.id === id);
}
