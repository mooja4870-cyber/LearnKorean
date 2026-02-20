// Settings Screen
import React, { useState, useCallback } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadow } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { clearOnboarding } from '../../services/auth';
import { useAuthStore } from '../../store/useAuthStore';
import { useTranslation } from 'react-i18next';

export const SettingsScreen = ({ navigation }: any) => {
    const { theme, mode, toggleTheme } = useTheme();
    const { t } = useTranslation();

    const user = useAuthStore(s => s.user);
    const logout = useAuthStore(s => s.signOut);
    const updateProfile = useAuthStore(s => s.updateProfile);

    const updateSetting = async (key: string, value: boolean) => {
        if (!user) return;
        const newSettings = { ...user.settings, [key]: value };
        await updateProfile({ settings: newSettings });
    };

    const handleLogout = () => {
        Alert.alert(
            t('auth.logout'),
            'Are you sure you want to log out?',
            [
                { text: t('common.cancel'), style: 'cancel' },
                {
                    text: t('auth.logout'),
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        await clearOnboarding();
                    },
                },
            ]
        );
    };

    const renderSettingRow = (
        label: string,
        value: boolean,
        onToggle: (val: boolean) => void,
        emoji?: string,
    ) => (
        <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>
                {emoji ? `${emoji} ` : ''}{label}
            </Text>
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: theme.border, true: theme.primary + '80' }}
                thumbColor={value ? theme.primary : theme.textMuted}
            />
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={[styles.back, { color: theme.primary }]}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: theme.text }]}>
                        ⚙️ {t('settings.title')}
                    </Text>
                </View>

                {/* Notifications */}
                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
                    {t('settings.notifications')}
                </Text>
                <View style={[styles.card, { backgroundColor: theme.surface }, shadow.sm]}>
                    {renderSettingRow(
                        t('settings.learningReminder'),
                        user?.settings.notifications ?? true,
                        (v) => updateSetting('notifications', v),
                        '🔔',
                    )}
                </View>

                {/* Sound */}
                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
                    {t('settings.sound')}
                </Text>
                <View style={[styles.card, { backgroundColor: theme.surface }, shadow.sm]}>
                    {renderSettingRow(
                        t('settings.soundEffects'),
                        user?.settings.soundEnabled ?? true,
                        (v) => updateSetting('soundEnabled', v),
                        '🔊',
                    )}
                    <View style={[styles.divider, { backgroundColor: theme.divider }]} />
                    {renderSettingRow(
                        t('settings.autoPlayAudio'),
                        user?.settings.autoPlayAudio ?? true,
                        (v) => updateSetting('autoPlayAudio', v),
                        '▶️',
                    )}
                </View>

                {/* Appearance */}
                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
                    Appearance
                </Text>
                <View style={[styles.card, { backgroundColor: theme.surface }, shadow.sm]}>
                    {renderSettingRow(
                        t('settings.darkMode'),
                        mode === 'dark',
                        toggleTheme,
                        '🌙',
                    )}
                </View>

                {/* Account */}
                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
                    {t('settings.account')}
                </Text>
                <View style={[styles.card, { backgroundColor: theme.surface }, shadow.sm]}>
                    <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                        <Text style={[styles.menuLabel, { color: theme.error }]}>
                            🚪 {t('auth.logout')}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* About */}
                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
                    About
                </Text>
                <View style={[styles.card, { backgroundColor: theme.surface }, shadow.sm]}>
                    {[
                        { label: `📄 ${t('settings.terms')}` },
                        { label: `🔒 ${t('settings.privacy')}` },
                        { label: `📧 ${t('settings.contactUs')}` },
                    ].map((item, i) => (
                        <React.Fragment key={i}>
                            {i > 0 && <View style={[styles.divider, { backgroundColor: theme.divider }]} />}
                            <TouchableOpacity style={styles.menuItem}>
                                <Text style={[styles.menuLabel, { color: theme.text }]}>{item.label}</Text>
                                <Text style={[styles.menuArrow, { color: theme.textMuted }]}>→</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                    ))}
                </View>

                {/* Version */}
                <Text style={[styles.version, { color: theme.textMuted }]}>
                    {t('settings.appVersion')}: {t('settings.version')}
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: {
        padding: spacing.xl,
        paddingTop: 60,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        marginBottom: spacing.xxl,
    },
    back: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
    },
    title: {
        fontSize: typography.fontSize.xxl,
        fontWeight: typography.fontWeight.bold,
    },
    sectionTitle: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: spacing.xl,
        marginBottom: spacing.sm,
        paddingLeft: spacing.xs,
    },
    card: {
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.lg,
    },
    settingLabel: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.medium,
        flex: 1,
    },
    divider: { height: 1, marginHorizontal: spacing.lg },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.lg,
    },
    menuLabel: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.medium,
    },
    menuArrow: { fontSize: typography.fontSize.md },
    version: {
        textAlign: 'center',
        fontSize: typography.fontSize.sm,
        marginTop: spacing.xxl,
    },
});
