// Lesson Card Component — displays a single Hangul character
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, borderRadius, shadow } from '../theme/spacing';
import { typography } from '../theme/typography';
import { HangulCharacter } from '../data/hangulData';

interface LessonCardProps {
    character: HangulCharacter;
    index: number;
    total: number;
}

const { width } = Dimensions.get('window');

export const LessonCard: React.FC<LessonCardProps> = ({ character, index, total }) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.card, { backgroundColor: theme.surface }, shadow.lg]}>
            {/* Counter */}
            <Text style={[styles.counter, { color: theme.textMuted }]}>
                {index + 1} / {total}
            </Text>

            {/* Big Character */}
            <Text style={[styles.hangul, { color: theme.primary }]}>
                {character.char}
            </Text>

            {/* Romanization */}
            <View style={[styles.romBadge, { backgroundColor: theme.primary + '15' }]}>
                <Text style={[styles.romanization, { color: theme.primary }]}>
                    {character.romanization}
                </Text>
            </View>

            {/* Pronunciation */}
            <Text style={[styles.pronunciation, { color: theme.text }]}>
                {character.pronunciation_en}
            </Text>

            {/* Mnemonic */}
            <View style={[styles.mnemonicBox, { backgroundColor: theme.surfaceElevated }]}>
                <Text style={styles.mnemonicEmoji}>💡</Text>
                <Text style={[styles.mnemonic, { color: theme.textSecondary }]}>
                    {character.mnemonicHint_en}
                </Text>
            </View>

            {/* Example */}
            <View style={[styles.exampleBox, { backgroundColor: theme.primary + '08' }]}>
                <Text style={[styles.exampleWord, { color: theme.text }]}>
                    {character.exampleWord}
                </Text>
                <Text style={[styles.exampleMeaning, { color: theme.textSecondary }]}>
                    = {character.exampleMeaning_en}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width - 48,
        borderRadius: borderRadius.xl,
        padding: spacing.xxl,
        alignItems: 'center',
        alignSelf: 'center',
    },
    counter: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
        marginBottom: spacing.md,
    },
    hangul: {
        fontSize: 100,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.lg,
    },
    romBadge: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        marginBottom: spacing.lg,
    },
    romanization: {
        fontSize: typography.fontSize.xxl,
        fontWeight: typography.fontWeight.bold,
    },
    pronunciation: {
        fontSize: typography.fontSize.md,
        textAlign: 'center',
        marginBottom: spacing.lg,
        lineHeight: 22,
    },
    mnemonicBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.md,
        marginBottom: spacing.lg,
        width: '100%',
        gap: spacing.sm,
    },
    mnemonicEmoji: {
        fontSize: 18,
    },
    mnemonic: {
        fontSize: typography.fontSize.sm,
        flex: 1,
        lineHeight: 20,
    },
    exampleBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.md,
        gap: spacing.sm,
    },
    exampleWord: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
    },
    exampleMeaning: {
        fontSize: typography.fontSize.md,
    },
});
