// Common Button Component
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    icon?: string;
    style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title, onPress, variant = 'primary', size = 'medium',
    disabled, loading, icon, style,
}) => {
    const { theme } = useTheme();

    const sizeStyles = {
        small: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, fontSize: typography.fontSize.sm },
        medium: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl, fontSize: typography.fontSize.md },
        large: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xxl, fontSize: typography.fontSize.lg },
    };

    const s = sizeStyles[size];

    if (variant === 'primary') {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || loading}
                activeOpacity={0.8}
                style={[{ opacity: disabled ? 0.5 : 1 }, style]}
            >
                <LinearGradient
                    colors={['#6C5CE7', '#A29BFE']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.base, { paddingVertical: s.paddingVertical, paddingHorizontal: s.paddingHorizontal }]}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                        <Text style={[styles.text, { fontSize: s.fontSize }]}>
                            {icon ? `${icon} ` : ''}{title}
                        </Text>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    const variantStyles = {
        secondary: {
            bg: theme.surfaceElevated,
            text: theme.text,
            border: 'transparent',
        },
        outline: {
            bg: 'transparent',
            text: theme.primary,
            border: theme.primary,
        },
        ghost: {
            bg: 'transparent',
            text: theme.textSecondary,
            border: 'transparent',
        },
        danger: {
            bg: theme.error + '15',
            text: theme.error,
            border: theme.error,
        },
    };

    const vs = variantStyles[variant];

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
            style={[
                styles.base,
                {
                    backgroundColor: vs.bg,
                    borderColor: vs.border,
                    borderWidth: variant === 'outline' || variant === 'danger' ? 1.5 : 0,
                    paddingVertical: s.paddingVertical,
                    paddingHorizontal: s.paddingHorizontal,
                    opacity: disabled ? 0.5 : 1,
                },
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={vs.text} size="small" />
            ) : (
                <Text style={[styles.text, { color: vs.text, fontSize: s.fontSize }]}>
                    {icon ? `${icon} ` : ''}{title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});
