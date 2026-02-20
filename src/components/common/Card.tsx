// Common Card Component
import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadow } from '../../theme/spacing';

interface CardProps {
    children: ReactNode;
    style?: ViewStyle;
    onPress?: () => void;
    elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, style, onPress, elevated = true }) => {
    const { theme } = useTheme();

    const cardStyle = [
        styles.card,
        { backgroundColor: theme.surface },
        elevated && shadow.md,
        style,
    ];

    if (onPress) {
        return (
            <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.7}>
                {children}
            </TouchableOpacity>
        );
    }

    return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
    card: {
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
    },
});
