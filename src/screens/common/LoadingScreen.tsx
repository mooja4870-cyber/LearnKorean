// Loading Screen
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const LoadingScreen = () => {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={styles.logo}>🚀</Text>
            <Text style={[styles.appName, { color: theme.text }]}>Antigravity</Text>
            <ActivityIndicator size="large" color={theme.primary} style={styles.spinner} />
            <Text style={[styles.loadingText, { color: theme.textMuted }]}>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: spacing.md },
    logo: { fontSize: 56 },
    appName: { fontSize: typography.fontSize.xxl, fontWeight: '800' },
    spinner: { marginTop: spacing.xl },
    loadingText: { fontSize: typography.fontSize.sm },
});
