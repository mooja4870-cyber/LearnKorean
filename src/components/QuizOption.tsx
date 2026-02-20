// Quiz Option Button Component
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';

interface QuizOptionProps {
    label: string;
    onPress: () => void;
    state: 'default' | 'selected' | 'correct' | 'incorrect';
    disabled?: boolean;
}

export const QuizOption: React.FC<QuizOptionProps> = ({
    label, onPress, state, disabled,
}) => {
    const { theme } = useTheme();

    const getStyle = () => {
        switch (state) {
            case 'correct':
                return { backgroundColor: theme.success + '20', borderColor: theme.success };
            case 'incorrect':
                return { backgroundColor: theme.error + '20', borderColor: theme.error };
            case 'selected':
                return { backgroundColor: theme.primary + '20', borderColor: theme.primary };
            default:
                return { backgroundColor: theme.surface, borderColor: theme.border };
        }
    };

    const getTextColor = () => {
        switch (state) {
            case 'correct': return theme.success;
            case 'incorrect': return theme.error;
            case 'selected': return theme.primary;
            default: return theme.text;
        }
    };

    const getEmoji = () => {
        switch (state) {
            case 'correct': return ' ✅';
            case 'incorrect': return ' ❌';
            default: return '';
        }
    };

    return (
        <TouchableOpacity
            style={[styles.container, getStyle()]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
        >
            <Text style={[styles.label, { color: getTextColor() }]}>
                {label}{getEmoji()}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xl,
        borderRadius: borderRadius.md,
        borderWidth: 2,
        marginBottom: spacing.sm,
        alignItems: 'center',
    },
    label: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.semibold,
    },
});
