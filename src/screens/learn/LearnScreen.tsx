// Learn Screen — Learning Roadmap
import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadow } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { learningPath, hangulLessons } from '../../data/hangulData';
import { ComingSoon } from '../../components/ComingSoon';
import { useTranslation } from 'react-i18next';

export const LearnScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [comingSoonVisible, setComingSoonVisible] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState('');

    const handleUnitPress = (unit: any) => {
        if (unit.isLocked) {
            setSelectedFeature(unit.title_en);
            setComingSoonVisible(true);
            return;
        }

        if (unit.lessons.length > 0) {
            const lesson = hangulLessons.find(l => l.lessonId === unit.lessons[0]);
            if (lesson) {
                navigation.navigate('Lesson', { lesson });
            }
        }
    };

    const handleQuizPress = (unit: any) => {
        if (unit.isLocked || !unit.quizId) {
            setSelectedFeature(`${unit.title_en} Quiz`);
            setComingSoonVisible(true);
            return;
        }

        navigation.navigate('Quiz', { quizType: unit.quizId.includes('vowel') ? 'vowel' : 'consonant' });
    };

    const handleLevelPress = (level: any) => {
        if (level.isLocked) {
            setSelectedFeature(level.title_en);
            setComingSoonVisible(true);
        }
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
                        📚 {t('learn.learningPath')}
                    </Text>
                </View>

                {/* Levels */}
                {learningPath.map((level) => (
                    <View key={level.levelId} style={styles.levelSection}>
                        {/* Level Header */}
                        <TouchableOpacity
                            style={[
                                styles.levelHeader,
                                {
                                    backgroundColor: level.isLocked ? theme.surfaceElevated : level.color + '15',
                                    borderColor: level.isLocked ? theme.border : level.color,
                                },
                            ]}
                            onPress={() => handleLevelPress(level)}
                            activeOpacity={level.isLocked ? 0.7 : 1}
                        >
                            <Text style={styles.levelEmoji}>{level.emoji}</Text>
                            <View style={styles.levelInfo}>
                                <Text style={[styles.levelTitle, { color: level.isLocked ? theme.textMuted : theme.text }]}>
                                    {t('learn.level')} {level.levelNumber}: {level.title_en}
                                </Text>
                                {level.isLocked && (
                                    <Text style={[styles.lockedText, { color: theme.textMuted }]}>
                                        🔒 {t('learn.locked')}
                                    </Text>
                                )}
                            </View>
                        </TouchableOpacity>

                        {/* Units (only for level 1) */}
                        {!level.isLocked && level.units.map((unit) => (
                            <View key={unit.unitId} style={styles.unitContainer}>
                                {/* Connector line */}
                                <View style={[styles.connector, { backgroundColor: level.color + '40' }]} />

                                {/* Unit card */}
                                <TouchableOpacity
                                    style={[
                                        styles.unitCard,
                                        {
                                            backgroundColor: unit.isLocked ? theme.surfaceElevated : theme.surface,
                                            borderColor: unit.isLocked ? theme.border : level.color + '60',
                                        },
                                        shadow.sm,
                                    ]}
                                    onPress={() => handleUnitPress(unit)}
                                    activeOpacity={0.7}
                                >
                                    <View style={[
                                        styles.unitEmojiBg,
                                        { backgroundColor: unit.isLocked ? theme.border : level.color + '20' },
                                    ]}>
                                        <Text style={styles.unitEmoji}>
                                            {unit.isLocked ? '🔒' : unit.emoji}
                                        </Text>
                                    </View>
                                    <View style={styles.unitInfo}>
                                        <Text style={[
                                            styles.unitTitle,
                                            { color: unit.isLocked ? theme.textMuted : theme.text },
                                        ]}>
                                            {t('learn.unit')} {unit.unitNumber}: {unit.title_en}
                                        </Text>
                                        <Text style={[styles.unitPhase, { color: theme.textMuted }]}>
                                            {unit.isLocked
                                                ? `Phase ${unit.phase}`
                                                : `${unit.lessons.length} lesson(s)`}
                                        </Text>
                                    </View>
                                    <Text style={{ color: unit.isLocked ? theme.textMuted : level.color, fontSize: 18 }}>
                                        {unit.isLocked ? '🔒' : '→'}
                                    </Text>
                                </TouchableOpacity>

                                {/* Quiz button for unlocked units */}
                                {unit.quizId && (
                                    <TouchableOpacity
                                        style={[
                                            styles.quizButton,
                                            {
                                                backgroundColor: unit.isLocked ? theme.surfaceElevated : theme.primary + '10',
                                                borderColor: unit.isLocked ? theme.border : theme.primary + '40',
                                            },
                                        ]}
                                        onPress={() => handleQuizPress(unit)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.quizEmoji}>📝</Text>
                                        <Text style={[
                                            styles.quizText,
                                            { color: unit.isLocked ? theme.textMuted : theme.primary },
                                        ]}>
                                            {unit.title_en} {t('learn.quiz')}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                    </View>
                ))}

                {/* Bottom padding */}
                <View style={{ height: 100 }} />
            </ScrollView>

            <ComingSoon
                visible={comingSoonVisible}
                onClose={() => setComingSoonVisible(false)}
                featureName={selectedFeature}
                estimatedDate="2025 Q4"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: {
        padding: spacing.xl,
        paddingTop: 60,
        gap: spacing.lg,
    },
    header: {
        marginBottom: spacing.sm,
    },
    headerTitle: {
        fontSize: typography.fontSize.xxl,
        fontWeight: typography.fontWeight.bold,
    },
    levelSection: {
        gap: spacing.xs,
    },
    levelHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
        borderRadius: borderRadius.lg,
        borderWidth: 1.5,
        gap: spacing.md,
        marginBottom: spacing.sm,
    },
    levelEmoji: { fontSize: 24 },
    levelInfo: { flex: 1 },
    levelTitle: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
    },
    lockedText: {
        fontSize: typography.fontSize.sm,
        marginTop: 2,
    },
    unitContainer: {
        marginLeft: spacing.xxl,
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    connector: {
        position: 'absolute',
        left: -12,
        top: 0,
        bottom: 0,
        width: 2,
        borderRadius: 1,
    },
    unitCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        gap: spacing.md,
    },
    unitEmojiBg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unitEmoji: { fontSize: 18 },
    unitInfo: { flex: 1 },
    unitTitle: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
    },
    unitPhase: {
        fontSize: typography.fontSize.xs,
        marginTop: 2,
    },
    quizButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.sm,
        borderWidth: 1,
        gap: spacing.sm,
        marginLeft: spacing.huge,
    },
    quizEmoji: { fontSize: 14 },
    quizText: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
    },
});
