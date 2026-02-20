// Error Screen
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface ErrorScreenProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
    title = 'Oops! Something went wrong 😵',
    message = 'Please try again later.',
    onRetry,
}) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={styles.emoji}>⚠️</Text>
            <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
            <Text style={[styles.message, { color: theme.textSecondary }]}>{message}</Text>
            {onRetry && (
                <TouchableOpacity
                    style={[styles.retryButton, { backgroundColor: theme.primary }]}
                    onPress={onRetry}
                >
                    <Text style={styles.retryText}>🔄 Try Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xxl, gap: spacing.md },
    emoji: { fontSize: 56 },
    title: { fontSize: typography.fontSize.xl, fontWeight: '700', textAlign: 'center' },
    message: { fontSize: typography.fontSize.md, textAlign: 'center', lineHeight: 22 },
    retryButton: { paddingVertical: spacing.md, paddingHorizontal: spacing.xxl, borderRadius: borderRadius.lg, marginTop: spacing.lg },
    retryText: { color: '#FFF', fontSize: typography.fontSize.md, fontWeight: '600' },
});
