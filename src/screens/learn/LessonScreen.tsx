// Lesson Screen — Hangul character learning cards
import React, { useState, useCallback } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { LessonCard } from '../../components/LessonCard';
import { HangulLesson } from '../../data/hangulData';
import { useLearningStore } from '../../store/useLearningStore';
import { useTranslation } from 'react-i18next';

export const LessonScreen = ({ navigation, route }: any) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const lesson: HangulLesson = route.params.lesson;
    const [currentIndex, setCurrentIndex] = useState(0);

    const total = lesson.characters.length;
    const character = lesson.characters[currentIndex];

    const finishLesson = useLearningStore(s => s.finishLesson);

    const goNext = async () => {
        if (currentIndex < total - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Lesson complete using Zustand
            await finishLesson(lesson.lessonId);
            Alert.alert(
                '🎉 Lesson Complete!',
                `You've learned all ${total} characters in "${lesson.title_en}"!`,
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        }
    };

    const goPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={[styles.backButton, { color: theme.primary }]}>← Back</Text>
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.text }]}>
                    {lesson.title_en}
                </Text>
                <View style={{ width: 60 }} />
            </View>

            {/* Progress dots */}
            <View style={styles.dotsRow}>
                {lesson.characters.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            {
                                backgroundColor: i === currentIndex
                                    ? theme.primary
                                    : i < currentIndex
                                        ? theme.success
                                        : theme.border,
                            },
                        ]}
                    />
                ))}
            </View>

            {/* Card */}
            <View style={styles.cardContainer}>
                <LessonCard
                    character={character}
                    index={currentIndex}
                    total={total}
                />
            </View>

            {/* Navigation buttons */}
            <View style={styles.navRow}>
                <TouchableOpacity
                    style={[
                        styles.navButton,
                        { backgroundColor: currentIndex > 0 ? theme.surface : theme.surfaceElevated },
                    ]}
                    onPress={goPrev}
                    disabled={currentIndex === 0}
                >
                    <Text style={[
                        styles.navText,
                        { color: currentIndex > 0 ? theme.text : theme.textMuted },
                    ]}>
                        ← {t('learn.prevChar')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.navButton, { backgroundColor: theme.primary }]}
                    onPress={goNext}
                >
                    <Text style={[styles.navText, { color: '#FFFFFF' }]}>
                        {currentIndex < total - 1
                            ? `${t('learn.nextChar')} →`
                            : '✅ Complete'}
                    </Text>
                </TouchableOpacity>
            </View>
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
        paddingBottom: spacing.md,
    },
    backButton: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
        width: 60,
    },
    title: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        textAlign: 'center',
    },
    dotsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.xs,
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.lg,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: spacing.xl,
    },
    navRow: {
        flexDirection: 'row',
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.xxl,
        gap: spacing.md,
    },
    navButton: {
        flex: 1,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.md,
        alignItems: 'center',
    },
    navText: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
    },
});
