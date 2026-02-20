// Gradient Card Component
import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { borderRadius, spacing, shadow } from '../theme/spacing';

interface GradientCardProps {
    children: ReactNode;
    colors?: [string, string, ...string[]];
    style?: ViewStyle;
}

export const GradientCard: React.FC<GradientCardProps> = ({
    children,
    colors = ['#6C5CE7', '#A29BFE'],
    style,
}) => {
    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.container, shadow.md, style]}
        >
            {children}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
    },
});
