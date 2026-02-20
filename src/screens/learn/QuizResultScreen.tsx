// Quiz Result Screen — Separate detailed results view
import React from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadow } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { getQuizGrade } from '../../utils/helpers';

export const QuizResultScreen = ({ navigation, route }: any) => {
    const { theme } = useTheme();
    const {
        score = 0,
        correctCount = 0,
        totalQuestions = 0,
        quizTitle = 'Quiz',
        wrongAnswers = [],
    } = route?.params || {};

    const grade = getQuizGrade(score);
    const passed = score >= 70;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Result Header */}
                <View style={styles.resultHeader}>
                    <Text style={styles.resultEmoji}>{grade.emoji}</Text>
                    <Text style={[styles.resultTitle, { color: theme.text }]}>{grade.text}</Text>
                    <Text style={[styles.quizName, { color: theme.textSecondary }]}>{quizTitle}</Text>
                </View>

                {/* Score Card */}
                <View style={[styles.scoreCard, { backgroundColor: theme.surface }, shadow.md]}>
                    <Text style={[styles.scoreValue, { color: grade.color }]}>{score}%</Text>
                    <Text style={[styles.scoreDetail, { color: theme.textSecondary }]}>
                        {correctCount} / {totalQuestions} correct
                    </Text>
                    <View style={[styles.passTag, { backgroundColor: passed ? '#10B98115' : '#EF444415' }]}>
                        <Text style={{ color: passed ? '#10B981' : '#EF4444', fontWeight: '600', fontSize: 14 }}>
                            {passed ? '✅ Passed' : '❌ Not Passed (70% needed)'}
                        </Text>
                    </View>
                </View>

                {/* XP Earned */}
                <View style={[styles.xpCard, { backgroundColor: theme.surface }, shadow.sm]}>
                    <Text style={styles.xpEmoji}>⭐</Text>
                    <View>
                        <Text style={[styles.xpValue, { color: theme.text }]}>+{correctCount * 10} XP</Text>
                        <Text style={[styles.xpLabel, { color: theme.textMuted }]}>Experience earned</Text>
                    </View>
                </View>

                {/* Wrong Answers Review */}
                {wrongAnswers.length > 0 && (
                    <>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>
                            📋 Review Mistakes ({wrongAnswers.length})
                        </Text>
                        {wrongAnswers.map((item: any, i: number) => (
                            <View key={i} style={[styles.wrongItem, { backgroundColor: theme.surface }, shadow.sm]}>
                                <View style={styles.wrongHeader}>
                                    <Text style={[styles.wrongChar, { color: theme.error }]}>
                                        {item.displayChar || '?'}
                                    </Text>
                                    <View style={styles.wrongAnswerInfo}>
                                        <Text style={[styles.wrongYourAnswer, { color: theme.error }]}>
                                            Your answer: {item.yourAnswer}
                                        </Text>
                                        <Text style={[styles.wrongCorrect, { color: theme.success }]}>
                                            Correct: {item.correctAnswer}
                                        </Text>
                                    </View>
                                </View>
                                {item.explanation && (
                                    <Text style={[styles.wrongExplanation, { color: theme.textSecondary }]}>
                                        {item.explanation}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </>
                )}

                {/* Action Buttons */}
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={[styles.retryButton, { borderColor: theme.primary }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={[styles.retryText, { color: theme.primary }]}>
                            🔄 Try Again
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.popToTop();
                    }}>
                        <LinearGradient colors={['#6C5CE7', '#A29BFE']} style={styles.homeButton}>
                            <Text style={styles.homeText}>🏠 Back to Learn</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: spacing.xl, paddingTop: 60, paddingBottom: 100 },
    resultHeader: { alignItems: 'center', marginBottom: spacing.xl },
    resultEmoji: { fontSize: 72, marginBottom: spacing.sm },
    resultTitle: { fontSize: typography.fontSize.xxl, fontWeight: '800' },
    quizName: { fontSize: typography.fontSize.md, marginTop: spacing.xs },
    scoreCard: { borderRadius: borderRadius.xl, padding: spacing.xxl, alignItems: 'center', marginBottom: spacing.lg, gap: spacing.sm },
    scoreValue: { fontSize: 56, fontWeight: '900' },
    scoreDetail: { fontSize: typography.fontSize.lg },
    passTag: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.full, marginTop: spacing.sm },
    xpCard: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderRadius: borderRadius.lg, gap: spacing.md, marginBottom: spacing.xl },
    xpEmoji: { fontSize: 28 },
    xpValue: { fontSize: typography.fontSize.lg, fontWeight: '700' },
    xpLabel: { fontSize: typography.fontSize.sm },
    sectionTitle: { fontSize: typography.fontSize.lg, fontWeight: '700', marginBottom: spacing.md },
    wrongItem: { padding: spacing.lg, borderRadius: borderRadius.md, marginBottom: spacing.sm, gap: spacing.sm },
    wrongHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    wrongChar: { fontSize: 32, fontWeight: '700' },
    wrongAnswerInfo: { flex: 1, gap: 2 },
    wrongYourAnswer: { fontSize: typography.fontSize.sm, fontWeight: '500' },
    wrongCorrect: { fontSize: typography.fontSize.sm, fontWeight: '600' },
    wrongExplanation: { fontSize: typography.fontSize.sm, lineHeight: 20 },
    actions: { gap: spacing.md, marginTop: spacing.lg },
    retryButton: { paddingVertical: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1.5, alignItems: 'center' },
    retryText: { fontSize: typography.fontSize.md, fontWeight: '600' },
    homeButton: { paddingVertical: spacing.lg, borderRadius: borderRadius.lg, alignItems: 'center' },
    homeText: { color: '#FFF', fontSize: typography.fontSize.lg, fontWeight: '700' },
});
