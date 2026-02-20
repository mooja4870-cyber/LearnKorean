// Home Screen — Dashboard
import React, { useEffect, useState, useCallback } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadow } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { StreakBadge } from '../../components/StreakBadge';
import { ProgressBar } from '../../components/ProgressBar';
import { GradientCard } from '../../components/GradientCard';
import { useUserStore } from '../../store/useUserStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useTranslation } from 'react-i18next';

export const HomeScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [refreshing, setRefreshing] = useState(false);

    // Derived state directly from Zustand Stores
    const { displayName, currentStreak, levelProgress, lessonsCompleted, totalStudyDays, quizAccuracy, refresh } = useUserStore();
    const authRefresh = useAuthStore(s => s.refreshUser);

    useFocusEffect(
        useCallback(() => {
            useUserStore.getState().loadUserData();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await authRefresh();
        refresh();
        setRefreshing(false);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={[styles.greeting, { color: theme.textSecondary }]}>
                            Hello, {displayName}! 👋
                        </Text>
                        <Text style={[styles.headerTitle, { color: theme.text }]}>
                            {t('home.dashboard')}
                        </Text>
                    </View>
                    <StreakBadge count={currentStreak} size="small" />
                </View>

                {/* Streak Card */}
                <GradientCard colors={['#FF6B35', '#FF8C42', '#FFD93D']}>
                    <View style={styles.streakCard}>
                        <Text style={styles.streakEmoji}>🔥</Text>
                        <View style={styles.streakInfo}>
                            <Text style={styles.streakCount}>{currentStreak}</Text>
                            <Text style={styles.streakLabel}>
                                {t('home.streak')}
                            </Text>
                        </View>
                        <Text style={styles.streakMsg}>
                            {currentStreak > 0 ? t('home.keepGoing') : 'Start your streak today!'}
                        </Text>
                    </View>
                </GradientCard>

                {/* Level Progress */}
                <View style={[styles.card, { backgroundColor: theme.surface }, shadow.md]}>
                    <View style={styles.cardHeader}>
                        <Text style={[styles.cardTitle, { color: theme.text }]}>
                            {t('home.levelProgress')}
                        </Text>
                        <Text style={[styles.levelBadge, { color: theme.primary }]}>
                            🟢 Level 1
                        </Text>
                    </View>
                    <Text style={[styles.levelName, { color: theme.textSecondary }]}>
                        {t('home.level1')}
                    </Text>
                    <ProgressBar
                        progress={levelProgress}
                        color={theme.primary}
                        label={`${lessonsCompleted} / 3 lessons`}
                    />
                </View>

                {/* Today's Mission */}
                <View style={[styles.card, { backgroundColor: theme.surface }, shadow.md]}>
                    <Text style={[styles.cardTitle, { color: theme.text }]}>
                        🎯 {t('home.todaysMission')}
                    </Text>

                    <TouchableOpacity
                        style={[styles.missionItem, { backgroundColor: theme.surfaceElevated }]}
                        onPress={() => navigation.navigate('LearnTab', {
                            screen: 'Quiz',
                            params: { quizType: 'daily' },
                        })}
                        activeOpacity={0.7}
                    >
                        <View style={styles.missionIcon}>
                            <Text style={styles.missionEmoji}>📝</Text>
                        </View>
                        <View style={styles.missionInfo}>
                            <Text style={[styles.missionTitle, { color: theme.text }]}>
                                {t('home.dailyQuiz')}
                            </Text>
                            <Text style={[styles.missionDesc, { color: theme.textSecondary }]}>
                                {t('home.dailyQuizDesc')}
                            </Text>
                        </View>
                        <Text style={[styles.missionArrow, { color: theme.primary }]}>→</Text>
                    </TouchableOpacity>
                </View>

                {/* Quick Stats */}
                <View style={styles.statsRow}>
                    <View style={[styles.statCard, { backgroundColor: theme.surface }, shadow.sm]}>
                        <Text style={styles.statEmoji}>📚</Text>
                        <Text style={[styles.statValue, { color: theme.text }]}>
                            {lessonsCompleted}
                        </Text>
                        <Text style={[styles.statLabel, { color: theme.textMuted }]}>Lessons</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: theme.surface }, shadow.sm]}>
                        <Text style={styles.statEmoji}>📅</Text>
                        <Text style={[styles.statValue, { color: theme.text }]}>
                            {totalStudyDays}
                        </Text>
                        <Text style={[styles.statLabel, { color: theme.textMuted }]}>Days</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: theme.surface }, shadow.sm]}>
                        <Text style={styles.statEmoji}>🎯</Text>
                        <Text style={[styles.statValue, { color: theme.text }]}>
                            {quizAccuracy}%
                        </Text>
                        <Text style={[styles.statLabel, { color: theme.textMuted }]}>Accuracy</Text>
                    </View>
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
        gap: spacing.lg,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    greeting: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.medium,
    },
    headerTitle: {
        fontSize: typography.fontSize.xxl,
        fontWeight: typography.fontWeight.bold,
    },
    streakCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    streakEmoji: { fontSize: 36 },
    streakInfo: { flex: 0 },
    streakCount: {
        fontSize: typography.fontSize.xxxl,
        fontWeight: typography.fontWeight.extrabold,
        color: '#FFFFFF',
    },
    streakLabel: {
        fontSize: typography.fontSize.sm,
        color: '#FFFFFFCC',
        fontWeight: typography.fontWeight.medium,
    },
    streakMsg: {
        flex: 1,
        fontSize: typography.fontSize.sm,
        color: '#FFFFFFDD',
        fontWeight: typography.fontWeight.medium,
        textAlign: 'right',
    },
    card: {
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        gap: spacing.md,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
    },
    levelBadge: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
    },
    levelName: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
        marginTop: -spacing.xs,
    },
    missionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: borderRadius.md,
        gap: spacing.md,
    },
    missionIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#6C5CE720',
        alignItems: 'center',
        justifyContent: 'center',
    },
    missionEmoji: { fontSize: 20 },
    missionInfo: { flex: 1, gap: 2 },
    missionTitle: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
    },
    missionDesc: {
        fontSize: typography.fontSize.sm,
    },
    missionArrow: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
    },
    statsRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacing.lg,
        borderRadius: borderRadius.lg,
        gap: spacing.xs,
    },
    statEmoji: { fontSize: 24 },
    statValue: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
    },
    statLabel: {
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.medium,
    },
});
