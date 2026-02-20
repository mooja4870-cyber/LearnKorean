// Language Select Screen
import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { SUPPORTED_LANGUAGES } from '../../i18n';
import i18n from '../../i18n';

export const LanguageSelectScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const [selected, setSelected] = useState('en');

    const handleNext = () => {
        i18n.changeLanguage(selected);
        navigation.navigate('Login', { selectedLanguage: selected });
    };

    return (
        <LinearGradient
            colors={['#0F0E1A', '#1A1040', '#2D1B69']}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <Text style={styles.emoji}>🌍</Text>
                <Text style={styles.title}>What's your native language?</Text>
                <Text style={styles.subtitle}>
                    We'll customize your learning experience
                </Text>
            </View>

            <ScrollView
                style={styles.list}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            >
                {SUPPORTED_LANGUAGES.map((lang) => (
                    <TouchableOpacity
                        key={lang.code}
                        style={[
                            styles.langItem,
                            {
                                backgroundColor: selected === lang.code
                                    ? '#6C5CE7' + '30'
                                    : '#1A1930',
                                borderColor: selected === lang.code
                                    ? '#6C5CE7'
                                    : '#2D2B4A',
                            },
                        ]}
                        onPress={() => setSelected(lang.code)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.flag}>{lang.flag}</Text>
                        <Text style={[
                            styles.langName,
                            { color: selected === lang.code ? '#A29BFE' : '#F1F1F6' },
                        ]}>
                            {lang.name}
                        </Text>
                        {selected === lang.code && (
                            <Text style={styles.check}>✓</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.bottomArea}>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNext}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#6C5CE7', '#A29BFE']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.nextGradient}
                    >
                        <Text style={styles.nextText}>Continue →</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
    },
    header: {
        alignItems: 'center',
        paddingHorizontal: spacing.xxl,
        marginBottom: spacing.xl,
    },
    emoji: {
        fontSize: 48,
        marginBottom: spacing.md,
    },
    title: {
        fontSize: typography.fontSize.xxl,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    subtitle: {
        fontSize: typography.fontSize.md,
        color: '#A0A0BC',
        textAlign: 'center',
    },
    list: {
        flex: 1,
        paddingHorizontal: spacing.xxl,
    },
    listContent: {
        gap: spacing.sm,
        paddingBottom: spacing.xxl,
    },
    langItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.md,
        borderWidth: 1.5,
        gap: spacing.md,
    },
    flag: {
        fontSize: 28,
    },
    langName: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.medium,
        flex: 1,
    },
    check: {
        fontSize: 20,
        color: '#6C5CE7',
        fontWeight: typography.fontWeight.bold,
    },
    bottomArea: {
        padding: spacing.xxl,
        paddingBottom: spacing.massive,
    },
    nextButton: {
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
    },
    nextGradient: {
        paddingVertical: spacing.lg,
        alignItems: 'center',
        borderRadius: borderRadius.lg,
    },
    nextText: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
    },
});
