// Profile Screen
import React, { useState, useCallback } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadow } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { SUPPORTED_LANGUAGES } from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/useAuthStore';
import { useUserStore } from '../../store/useUserStore';

export const ProfileScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const { t } = useTranslation();

    const user = useAuthStore(s => s.user);
    const { totalStudyDays, currentStreak, longestStreak, lessonsCompleted, quizAccuracy } = useUserStore();

    useFocusEffect(
        useCallback(() => {
            useUserStore.getState().loadUserData();
        }, [])
    );

    const langName = SUPPORTED_LANGUAGES.find(l => l.code === user?.nativeLanguage)?.name || 'English';

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <Text style={[styles.headerTitle, { color: theme.text }]}>
                    👤 {t('profile.myProfile')}
                </Text>

                {/* Profile Card */}
                <View style={[styles.profileCard, { backgroundColor: theme.surface }, shadow.md]}>
                    <View style={[styles.avatar, { backgroundColor: theme.primary + '20' }]}>
                        <Text style={styles.avatarEmoji}>
                            {user?.isGuest ? '👤' : '🧑‍🎓'}
                        </Text>
                    </View>
                    <Text style={[styles.displayName, { color: theme.text }]}>
                        {user?.displayName || 'Guest'}
                    </Text>
                    {user?.email ? (
                        <Text style={[styles.email, { color: theme.textSecondary }]}>
                            {user.email}
                        </Text>
                    ) : (
                        <Text style={[styles.email, { color: theme.textMuted }]}>
                            Guest Mode
                        </Text>
                    )}

                    <View style={styles.profileDetails}>
                        <View style={styles.detailRow}>
                            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                                {t('profile.nativeLanguage')}
                            </Text>
                            <Text style={[styles.detailValue, { color: theme.text }]}>{langName}</Text>
                        </View>
                        <View style={[styles.detailDivider, { backgroundColor: theme.divider }]} />
                        <View style={styles.detailRow}>
                            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                                {t('profile.currentLevel')}
                            </Text>
                            <Text style={[styles.detailValue, { color: theme.text }]}>
                                🟢 Level {user?.currentLevel || 1}
                            </Text>
                        </View>
                        <View style={[styles.detailDivider, { backgroundColor: theme.divider }]} />
                        <View style={styles.detailRow}>
                            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                                {t('profile.joinedDate')}
                            </Text>
                            <Text style={[styles.detailValue, { color: theme.text }]}>
                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Stats */}
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                    📊 {t('profile.myStats')}
                </Text>

                <View style={styles.statsGrid}>
                    {[
                        { label: t('profile.totalStudyDays'), value: totalStudyDays, emoji: '📅' },
                        { label: t('profile.currentStreak'), value: `${currentStreak} 🔥`, emoji: '🔥' },
                        { label: t('profile.longestStreak'), value: longestStreak, emoji: '⭐' },
                        { label: t('profile.lessonsCompleted'), value: lessonsCompleted, emoji: '📚' },
                        { label: t('profile.quizAccuracy'), value: `${quizAccuracy}%`, emoji: '🎯' },
                    ].map((stat, i) => (
                        <View key={i} style={[styles.statCard, { backgroundColor: theme.surface }, shadow.sm]}>
                            <Text style={styles.statEmoji}>{stat.emoji}</Text>
                            <Text style={[styles.statValue, { color: theme.text }]}>{stat.value}</Text>
                            <Text style={[styles.statLabel, { color: theme.textMuted }]}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Menu */}
                <View style={[styles.menuCard, { backgroundColor: theme.surface }, shadow.sm]}>
                    {[
                        { label: `⚙️ ${t('settings.title')}`, screen: 'Settings' },
                        { label: `❓ ${t('help.title')}`, screen: 'Help' },
                    ].map((item, i) => (
                        <TouchableOpacity
                            key={i}
                            style={styles.menuItem}
                            onPress={() => navigation.navigate(item.screen)}
                        >
                            <Text style={[styles.menuLabel, { color: theme.text }]}>{item.label}</Text>
                            <Text style={[styles.menuArrow, { color: theme.textMuted }]}>→</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
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
    headerTitle: {
        fontSize: typography.fontSize.xxl,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.lg,
    },
    profileCard: {
        borderRadius: borderRadius.xl,
        padding: spacing.xxl,
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
    },
    avatarEmoji: { fontSize: 36 },
    displayName: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.xxs,
    },
    email: {
        fontSize: typography.fontSize.sm,
        marginBottom: spacing.xl,
    },
    profileDetails: {
        width: '100%',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
    },
    detailLabel: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
    },
    detailValue: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
    },
    detailDivider: {
        height: 1,
    },
    sectionTitle: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.md,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        marginBottom: spacing.xl,
    },
    statCard: {
        width: '48%',
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        alignItems: 'center',
        gap: spacing.xs,
    },
    statEmoji: { fontSize: 24 },
    statValue: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
    },
    statLabel: {
        fontSize: typography.fontSize.xs,
        textAlign: 'center',
    },
    menuCard: {
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.lg,
    },
    menuLabel: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.medium,
    },
    menuArrow: {
        fontSize: typography.fontSize.lg,
    },
});
