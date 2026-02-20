// Progress Bar Component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';

interface ProgressBarProps {
    progress: number; // 0-100
    label?: string;
    height?: number;
    showPercentage?: boolean;
    color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress, label, height = 10, showPercentage = true, color,
}) => {
    const { theme } = useTheme();
    const barColor = color || theme.primary;
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <View style={styles.container}>
            {(label || showPercentage) && (
                <View style={styles.labelRow}>
                    {label && (
                        <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
                    )}
                    {showPercentage && (
                        <Text style={[styles.percentage, { color: barColor }]}>
                            {Math.round(clampedProgress)}%
                        </Text>
                    )}
                </View>
            )}
            <View style={[styles.track, { height, backgroundColor: theme.surfaceElevated }]}>
                <View
                    style={[
                        styles.fill,
                        {
                            height,
                            width: `${clampedProgress}%`,
                            backgroundColor: barColor,
                        },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    label: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
    },
    percentage: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.bold,
    },
    track: {
        width: '100%',
        borderRadius: borderRadius.full,
        overflow: 'hidden',
    },
    fill: {
        borderRadius: borderRadius.full,
    },
});
