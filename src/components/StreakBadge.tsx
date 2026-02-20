// Streak Badge Component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, borderRadius, shadow } from '../theme/spacing';
import { typography } from '../theme/typography';

interface StreakBadgeProps {
    count: number;
    size?: 'small' | 'large';
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({ count, size = 'large' }) => {
    const { theme } = useTheme();
    const isSmall = size === 'small';

    return (
        <View style={[
            styles.container,
            isSmall ? styles.containerSmall : styles.containerLarge,
            { backgroundColor: theme.surface },
            shadow.md,
        ]}>
            <Text style={isSmall ? styles.emojiSmall : styles.emojiLarge}>🔥</Text>
            <Text style={[
                isSmall ? styles.countSmall : styles.countLarge,
                { color: theme.streak },
            ]}>
                {count}
            </Text>
            {!isSmall && (
                <Text style={[styles.label, { color: theme.textSecondary }]}>
                    day streak
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.xl,
    },
    containerSmall: {
        flexDirection: 'row',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        gap: spacing.xs,
    },
    containerLarge: {
        paddingHorizontal: spacing.xxl,
        paddingVertical: spacing.lg,
        gap: spacing.xs,
    },
    emojiSmall: {
        fontSize: 16,
    },
    emojiLarge: {
        fontSize: 36,
    },
    countSmall: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.bold,
    },
    countLarge: {
        fontSize: typography.fontSize.xxxl,
        fontWeight: typography.fontWeight.extrabold,
    },
    label: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
    },
});
