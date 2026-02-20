// Common Header Component
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface HeaderProps {
    title: string;
    onBack?: () => void;
    rightElement?: React.ReactNode;
    transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, onBack, rightElement, transparent }) => {
    const { theme } = useTheme();

    return (
        <View style={[
            styles.container,
            { backgroundColor: transparent ? 'transparent' : theme.background },
        ]}>
            <View style={styles.left}>
                {onBack && (
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Text style={[styles.backText, { color: theme.primary }]}>← Back</Text>
                    </TouchableOpacity>
                )}
            </View>
            <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
                {title}
            </Text>
            <View style={styles.right}>
                {rightElement}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.md,
        paddingBottom: spacing.md,
        minHeight: 44,
    },
    left: { width: 70, alignItems: 'flex-start' },
    right: { width: 70, alignItems: 'flex-end' },
    backButton: { padding: spacing.xs },
    backText: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
    },
    title: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        textAlign: 'center',
        flex: 1,
    },
});
