// My Stats Screen
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadow } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { getStreakEmoji } from '../../utils/helpers';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/useAuthStore';
import { useUserStore } from '../../store/useUserStore';

export const MyStatsScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const { t } = useTranslation();

    const user = useAuthStore(s => s.user);
    const { totalStudyDays, currentStreak, longestStreak, lessonsCompleted, quizAccuracy, levelProgress } = useUserStore();

    if (!user) return null;

    useFocusEffect(
        useCallback(() => {
            useUserStore.getState().loadUserData();
        }, [])
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={[styles.back, { color: theme.primary }]}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: theme.text }]}>📊 My Stats</Text>
                </View>

                {/* Big Streak */}
                <View style={[styles.bigCard, { backgroundColor: theme.surface }, shadow.md]}>
                    <Text style={styles.bigEmoji}>{getStreakEmoji(currentStreak)}</Text>
                    <Text style={[styles.bigValue, { color: theme.primary }]}>{currentStreak}</Text>
                    <Text style={[styles.bigLabel, { color: theme.textSecondary }]}>Day Streak</Text>
                    <Text style={[styles.bestStreak, { color: theme.textMuted }]}>
                        Best: {longestStreak} days
                    </Text>
                </View>

                {/* Stats Grid */}
                <View style={styles.grid}>
                    {[
                        { label: 'Total Study Days', value: totalStudyDays, emoji: '📅' },
                        { label: 'Lessons Completed', value: lessonsCompleted, emoji: '📚' },
                        { label: 'Quizzes Taken', value: user.quizResults?.length || 0, emoji: '📝' },
                        { label: 'Quiz Accuracy', value: `${quizAccuracy}%`, emoji: '🎯' },
                        { label: 'Level Progress', value: `${levelProgress}%`, emoji: '📈' },
                        { label: 'Total XP', value: user.totalXP || 0, emoji: '⭐' },
                    ].map((stat, i) => (
                        <View key={i} style={[styles.statCard, { backgroundColor: theme.surface }, shadow.sm]}>
                            <Text style={styles.statEmoji}>{stat.emoji}</Text>
                            <Text style={[styles.statValue, { color: theme.text }]}>{stat.value}</Text>
                            <Text style={[styles.statLabel, { color: theme.textMuted }]}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Quiz History */}
                {user.quizResults && user.quizResults.length > 0 && (
                    <>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>📝 Recent Quizzes</Text>
                        {user.quizResults.slice(-5).reverse().map((result, i) => (
                            <View key={i} style={[styles.historyItem, { backgroundColor: theme.surface }, shadow.sm]}>
                                <View>
                                    <Text style={[styles.historyQuiz, { color: theme.text }]}>{result.quizId}</Text>
                                    <Text style={[styles.historyDate, { color: theme.textMuted }]}>
                                        {new Date(result.completedAt).toLocaleDateString()}
                                    </Text>
                                </View>
                                <Text style={[styles.historyScore, {
                                    color: result.score >= 70 ? theme.success : theme.error,
                                }]}>
                                    {result.score}%
                                </Text>
                            </View>
                        ))}
                    </>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: spacing.xl, paddingTop: 60, paddingBottom: 100 },
    header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.xl },
    back: { fontSize: typography.fontSize.md, fontWeight: '600' },
    title: { fontSize: typography.fontSize.xxl, fontWeight: '800' },
    bigCard: { borderRadius: borderRadius.xl, padding: spacing.xxl, alignItems: 'center', marginBottom: spacing.xl, gap: spacing.xs },
    bigEmoji: { fontSize: 48 },
    bigValue: { fontSize: 56, fontWeight: '900' },
    bigLabel: { fontSize: typography.fontSize.lg, fontWeight: '600' },
    bestStreak: { fontSize: typography.fontSize.sm },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.xl },
    statCard: { width: '48%', borderRadius: borderRadius.lg, padding: spacing.lg, alignItems: 'center', gap: spacing.xs },
    statEmoji: { fontSize: 24 },
    statValue: { fontSize: typography.fontSize.xl, fontWeight: '700' },
    statLabel: { fontSize: typography.fontSize.xs, textAlign: 'center' },
    sectionTitle: { fontSize: typography.fontSize.lg, fontWeight: '700', marginBottom: spacing.md },
    historyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg, borderRadius: borderRadius.md, marginBottom: spacing.sm },
    historyQuiz: { fontSize: typography.fontSize.md, fontWeight: '600' },
    historyDate: { fontSize: typography.fontSize.xs, marginTop: 2 },
    historyScore: { fontSize: typography.fontSize.xl, fontWeight: '800' },
});
