// HangulCard — Large character display for lessons
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadow } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface HangulCardProps {
    char: string;
    romanization: string;
    pronunciation?: string;
    onPress?: () => void;
    size?: 'small' | 'medium' | 'large';
    selected?: boolean;
}

export const HangulCard: React.FC<HangulCardProps> = ({
    char, romanization, pronunciation, onPress, size = 'medium', selected,
}) => {
    const { theme } = useTheme();

    const sizes = {
        small: { charSize: 36, romSize: 12, card: 70, padding: spacing.sm },
        medium: { charSize: 56, romSize: 14, card: 100, padding: spacing.md },
        large: { charSize: 80, romSize: 18, card: 140, padding: spacing.lg },
    };
    const s = sizes[size];

    const Wrapper = onPress ? TouchableOpacity : View;

    return (
        <Wrapper
            onPress={onPress}
            activeOpacity={0.7}
            style={[
                styles.card,
                {
                    backgroundColor: selected ? theme.primary + '15' : theme.surface,
                    borderColor: selected ? theme.primary : theme.border,
                    width: s.card,
                    height: s.card + 30,
                    padding: s.padding,
                },
                shadow.sm,
            ] as any}
        >
            <Text style={[styles.char, { fontSize: s.charSize, color: selected ? theme.primary : theme.text }]}>
                {char}
            </Text>
            <Text style={[styles.rom, { fontSize: s.romSize, color: theme.textSecondary }]}>
                {romanization}
            </Text>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: borderRadius.lg,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xxs,
    },
    char: {
        fontWeight: '700',
    },
    rom: {
        fontWeight: '500',
    },
});
