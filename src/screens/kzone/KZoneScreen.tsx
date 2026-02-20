// K-Zone Screen — All Coming Soon
import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadow } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { ComingSoon } from '../../components/ComingSoon';
import { useTranslation } from 'react-i18next';

const KZONE_ITEMS = [
    { id: 'kpop', emoji: '🎤', key: 'kpop', phase: 5, color: '#FF69B4' },
    { id: 'kdrama', emoji: '🎬', key: 'kdrama', phase: 5, color: '#9B59B6' },
    { id: 'kfood', emoji: '🍽️', key: 'kfood', phase: 6, color: '#E74C3C' },
    { id: 'kvariety', emoji: '🎮', key: 'kvariety', phase: 6, color: '#F39C12' },
    { id: 'ksns', emoji: '📱', key: 'ksns', phase: 5, color: '#3498DB' },
    { id: 'kculture', emoji: '🏛️', key: 'kculture', phase: 6, color: '#1ABC9C' },
];

export const KZoneScreen = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [comingSoonVisible, setComingSoonVisible] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState('');

    const handlePress = (item: typeof KZONE_ITEMS[0]) => {
        setSelectedFeature(t(`kzone.${item.key}`));
        setComingSoonVisible(true);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={[styles.headerTitle, { color: theme.text }]}>
                        🎵 {t('kzone.title')}
                    </Text>
                    <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
                        {t('kzone.subtitle')}
                    </Text>
                </View>

                {/* Grid */}
                <View style={styles.grid}>
                    {KZONE_ITEMS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.card,
                                { backgroundColor: theme.surface },
                                shadow.md,
                            ]}
                            onPress={() => handlePress(item)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconBg, { backgroundColor: item.color + '15' }]}>
                                <Text style={styles.emoji}>{item.emoji}</Text>
                            </View>
                            <Text style={[styles.cardTitle, { color: theme.text }]}>
                                {t(`kzone.${item.key}`)}
                            </Text>
                            <View style={[styles.lockedBadge, { backgroundColor: theme.surfaceElevated }]}>
                                <Text style={[styles.lockedText, { color: theme.textMuted }]}>
                                    🔒 Phase {item.phase}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Info */}
                <View style={[styles.infoCard, { backgroundColor: theme.surfaceElevated }]}>
                    <Text style={styles.infoEmoji}>✨</Text>
                    <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                        K-Zone features are coming soon! Complete Hangul fundamentals first, and exciting K-Culture content will unlock.
                    </Text>
                </View>
            </ScrollView>

            <ComingSoon
                visible={comingSoonVisible}
                onClose={() => setComingSoonVisible(false)}
                featureName={selectedFeature}
                estimatedDate="2025 Q4~"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: {
        padding: spacing.xl,
        paddingTop: 60,
        paddingBottom: 100,
    },
    header: {
        marginBottom: spacing.xl,
    },
    headerTitle: {
        fontSize: typography.fontSize.xxl,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.xs,
    },
    headerSubtitle: {
        fontSize: typography.fontSize.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
        marginBottom: spacing.xl,
    },
    card: {
        width: '47%',
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        alignItems: 'center',
        gap: spacing.sm,
    },
    iconBg: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emoji: { fontSize: 28 },
    cardTitle: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
        textAlign: 'center',
    },
    lockedBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xxs,
        borderRadius: borderRadius.full,
    },
    lockedText: {
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.medium,
    },
    infoCard: {
        flexDirection: 'row',
        padding: spacing.lg,
        borderRadius: borderRadius.md,
        gap: spacing.md,
        alignItems: 'flex-start',
    },
    infoEmoji: { fontSize: 20, marginTop: 2 },
    infoText: {
        flex: 1,
        fontSize: typography.fontSize.sm,
        lineHeight: 20,
    },
});
