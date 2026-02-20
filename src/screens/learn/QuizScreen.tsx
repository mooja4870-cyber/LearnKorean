// Quiz Screen
import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadow } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { QuizOption } from '../../components/QuizOption';
import {
    Quiz, QuizQuestion,
    generateVowelQuiz, generateConsonantQuiz, generateMixedQuiz,
} from '../../data/hangulData';
import { useLearningStore } from '../../store/useLearningStore';
import { useTranslation } from 'react-i18next';

export const QuizScreen = ({ navigation, route }: any) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const quizType = route?.params?.quizType || 'daily';

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        let q: Quiz;
        if (quizType === 'vowel') q = generateVowelQuiz();
        else if (quizType === 'consonant') q = generateConsonantQuiz();
        else q = generateMixedQuiz();
        setQuiz(q);
    }, [quizType]);

    if (!quiz) return null;

    const question = quiz.questions[currentIndex];
    const totalQuestions = quiz.questions.length;

    const handleAnswer = (answer: string) => {
        if (isAnswered) return;
        setSelectedAnswer(answer);
        setIsAnswered(true);
        if (answer === question.correctAnswer) {
            setCorrectCount(prev => prev + 1);
        }
    };

    const finishQuiz = useLearningStore(s => s.finishQuiz);

    const handleNext = async () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            // Quiz complete — save results using Zustand
            const finalScore = Math.round((correctCount / totalQuestions) * 100);
            await finishQuiz({
                quizId: quiz.quizId,
                score: finalScore,
                passed: finalScore >= 60,
                xpEarned: correctCount * 10,
            });
            setShowResults(true);
        }
    };

    const getOptionState = (option: string) => {
        if (!isAnswered) return 'default';
        if (option === question.correctAnswer) return 'correct';
        if (option === selectedAnswer && option !== question.correctAnswer) return 'incorrect';
        return 'default';
    };

    const finalScore = Math.round((correctCount / totalQuestions) * 100);

    // Results Screen
    if (showResults) {
        const getMessage = () => {
            if (finalScore === 100) return { emoji: '🌟', msg: t('quiz.perfect') };
            if (finalScore >= 80) return { emoji: '🎉', msg: t('quiz.great') };
            if (finalScore >= 60) return { emoji: '👍', msg: t('quiz.good') };
            return { emoji: '💪', msg: t('quiz.tryAgain') };
        };
        const result = getMessage();

        return (
            <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
                <View style={styles.resultContainer}>
                    <Text style={styles.resultEmoji}>{result.emoji}</Text>
                    <Text style={[styles.resultTitle, { color: theme.text }]}>
                        {t('quiz.results')}
                    </Text>
                    <Text style={[styles.resultMsg, { color: theme.textSecondary }]}>
                        {result.msg}
                    </Text>

                    <View style={[styles.scoreCard, { backgroundColor: theme.surface }, shadow.md]}>
                        <Text style={[styles.scoreLabel, { color: theme.textSecondary }]}>
                            {t('quiz.score')}
                        </Text>
                        <Text style={[styles.scoreValue, { color: theme.primary }]}>
                            {finalScore}%
                        </Text>
                        <Text style={[styles.scoreDetail, { color: theme.textMuted }]}>
                            {correctCount} / {totalQuestions} correct
                        </Text>
                    </View>

                    <View style={styles.resultButtons}>
                        <TouchableOpacity
                            style={[styles.retakeButton, { borderColor: theme.primary }]}
                            onPress={() => {
                                const q = quizType === 'vowel' ? generateVowelQuiz()
                                    : quizType === 'consonant' ? generateConsonantQuiz()
                                        : generateMixedQuiz();
                                setQuiz(q);
                                setCurrentIndex(0);
                                setSelectedAnswer(null);
                                setIsAnswered(false);
                                setCorrectCount(0);
                                setShowResults(false);
                            }}
                        >
                            <Text style={[styles.retakeText, { color: theme.primary }]}>
                                🔄 {t('quiz.retake')}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.doneButton}
                            onPress={() => navigation.goBack()}
                        >
                            <LinearGradient
                                colors={['#6C5CE7', '#A29BFE']}
                                style={styles.doneGradient}
                            >
                                <Text style={styles.doneText}>{t('quiz.finish')}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    // Quiz Screen
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={[styles.backButton, { color: theme.primary }]}>← Back</Text>
                </TouchableOpacity>
                <Text style={[styles.questionCount, { color: theme.textSecondary }]}>
                    {t('quiz.question')} {currentIndex + 1} {t('quiz.of')} {totalQuestions}
                </Text>
                <View style={{ width: 60 }} />
            </View>

            {/* Progress bar */}
            <View style={[styles.progressTrack, { backgroundColor: theme.surfaceElevated }]}>
                <View style={[
                    styles.progressFill,
                    {
                        backgroundColor: theme.primary,
                        width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
                    },
                ]} />
            </View>

            {/* Question */}
            <View style={styles.questionArea}>
                <Text style={[styles.questionLabel, { color: theme.textSecondary }]}>
                    {t('quiz.whatSound')}
                </Text>
                <Text style={[styles.questionChar, { color: theme.primary }]}>
                    {question.displayChar}
                </Text>
            </View>

            {/* Options */}
            <View style={styles.optionsArea}>
                {question.options.map((opt, i) => (
                    <QuizOption
                        key={i}
                        label={opt}
                        state={getOptionState(opt)}
                        onPress={() => handleAnswer(opt)}
                        disabled={isAnswered}
                    />
                ))}
            </View>

            {/* Explanation + Next */}
            {isAnswered && (
                <View style={styles.bottomArea}>
                    <View style={[
                        styles.explanationBox,
                        {
                            backgroundColor: selectedAnswer === question.correctAnswer
                                ? theme.success + '15'
                                : theme.error + '15',
                        },
                    ]}>
                        <Text style={[styles.explanationText, { color: theme.text }]}>
                            {selectedAnswer === question.correctAnswer
                                ? t('quiz.correct')
                                : t('quiz.incorrect')}
                        </Text>
                        <Text style={[styles.explanationDetail, { color: theme.textSecondary }]}>
                            {question.explanation_en}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                        <LinearGradient
                            colors={['#6C5CE7', '#A29BFE']}
                            style={styles.nextGradient}
                        >
                            <Text style={styles.nextText}>
                                {currentIndex < totalQuestions - 1 ? `${t('common.next')} →` : t('quiz.results')}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.md,
        paddingBottom: spacing.sm,
    },
    backButton: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
        width: 60,
    },
    questionCount: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.medium,
    },
    progressTrack: {
        height: 4,
        marginHorizontal: spacing.xl,
        borderRadius: 2,
        marginBottom: spacing.xxl,
    },
    progressFill: {
        height: 4,
        borderRadius: 2,
    },
    questionArea: {
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.xxxl,
    },
    questionLabel: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.medium,
        marginBottom: spacing.lg,
    },
    questionChar: {
        fontSize: 96,
        fontWeight: typography.fontWeight.bold,
    },
    optionsArea: {
        paddingHorizontal: spacing.xl,
        gap: spacing.sm,
    },
    bottomArea: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.lg,
        gap: spacing.md,
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: spacing.xxl,
    },
    explanationBox: {
        padding: spacing.lg,
        borderRadius: borderRadius.md,
    },
    explanationText: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.xs,
    },
    explanationDetail: {
        fontSize: typography.fontSize.sm,
        lineHeight: 20,
    },
    nextButton: {
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
    },
    nextGradient: {
        paddingVertical: spacing.lg,
        alignItems: 'center',
        borderRadius: borderRadius.lg,
    },
    nextText: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
    },
    // Results
    resultContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xxl,
        gap: spacing.md,
    },
    resultEmoji: { fontSize: 64 },
    resultTitle: {
        fontSize: typography.fontSize.xxl,
        fontWeight: typography.fontWeight.bold,
    },
    resultMsg: {
        fontSize: typography.fontSize.lg,
        marginBottom: spacing.lg,
    },
    scoreCard: {
        width: '100%',
        alignItems: 'center',
        padding: spacing.xxl,
        borderRadius: borderRadius.xl,
        gap: spacing.sm,
        marginBottom: spacing.xl,
    },
    scoreLabel: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.medium,
    },
    scoreValue: {
        fontSize: typography.fontSize.hero,
        fontWeight: typography.fontWeight.extrabold,
    },
    scoreDetail: {
        fontSize: typography.fontSize.md,
    },
    resultButtons: {
        width: '100%',
        gap: spacing.md,
    },
    retakeButton: {
        paddingVertical: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1.5,
        alignItems: 'center',
    },
    retakeText: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
    },
    doneButton: {
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
    },
    doneGradient: {
        paddingVertical: spacing.lg,
        alignItems: 'center',
        borderRadius: borderRadius.lg,
    },
    doneText: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
    },
});
