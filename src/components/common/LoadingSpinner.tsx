// Loading Spinner Component
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface LoadingSpinnerProps {
    message?: string;
    size?: 'small' | 'large';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message, size = 'large' }) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ActivityIndicator size={size} color={theme.primary} />
            {message && (
                <Text style={[styles.message, { color: theme.textSecondary }]}>
                    {message}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.md,
    },
    message: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.medium,
        marginTop: spacing.sm,
    },
});
