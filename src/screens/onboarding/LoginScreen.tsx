// Login Screen
import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView,
    Platform, ScrollView, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { useAuthStore } from '../../store/useAuthStore';
import { useGoogleAuth } from '../../services/googleAuth';
import { useTranslation } from 'react-i18next';

export const LoginScreen = ({ navigation, route }: any) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const selectedLanguage = route?.params?.selectedLanguage || 'en';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Auth store actions
    const loginWithEmail = useAuthStore(s => s.loginWithEmail);
    const loginAsGuest = useAuthStore(s => s.loginAsGuest);
    const loginWithGoogle = useAuthStore(s => s.loginWithGoogle);
    const isLoading = useAuthStore(s => s.isLoading);

    // Google auth hook
    const { response, promptAsync } = useGoogleAuth();

    // Handle Google auth response
    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            if (id_token) {
                loginWithGoogle(id_token, selectedLanguage).catch((err: any) => {
                    Alert.alert(t('common.error'), err.message);
                });
            }
        }
    }, [response]);

    const handleEmailAuth = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert(t('common.error'), 'Please fill in all fields');
            return;
        }

        try {
            await loginWithEmail(email, password, selectedLanguage);
            // Navigation handled by RootNavigator state change
        } catch (error: any) {
            Alert.alert(t('common.error'), error.message);
        }
    };

    const handleGuestMode = async () => {
        try {
            await loginAsGuest(selectedLanguage);
        } catch (error: any) {
            Alert.alert(t('common.error'), error.message);
        }
    };

    const handleGoogleAuth = async () => {
        try {
            await promptAsync();
        } catch (error: any) {
            Alert.alert(t('common.error'), 'Google Sign-In failed');
        }
    };

    return (
        <LinearGradient
            colors={['#0F0E1A', '#1A1040', '#2D1B69']}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.emoji}>🚀</Text>
                        <Text style={styles.title}>
                            {t('auth.login')}
                        </Text>
                        <Text style={styles.subtitle}>Antigravity</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <TextInput
                            style={[styles.input, { backgroundColor: '#1A1930', color: '#F1F1F6', borderColor: '#2D2B4A' }]}
                            placeholder={t('auth.email')}
                            placeholderTextColor="#6B6B8D"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <TextInput
                            style={[styles.input, { backgroundColor: '#1A1930', color: '#F1F1F6', borderColor: '#2D2B4A' }]}
                            placeholder={t('auth.password')}
                            placeholderTextColor="#6B6B8D"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <TouchableOpacity style={styles.primaryButton} onPress={handleEmailAuth} disabled={isLoading}>
                            <LinearGradient
                                colors={['#6C5CE7', '#A29BFE']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.primaryGradient}
                            >
                                <Text style={styles.primaryText}>
                                    {isLoading ? 'Loading...' : t('auth.login')}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={[styles.dividerLine, { backgroundColor: '#2D2B4A' }]} />
                        <Text style={styles.dividerText}>{t('auth.orContinueWith')}</Text>
                        <View style={[styles.dividerLine, { backgroundColor: '#2D2B4A' }]} />
                    </View>

                    {/* Social / Guest buttons */}
                    <View style={styles.socialButtons}>
                        <TouchableOpacity
                            style={[styles.socialButton, { backgroundColor: '#1A1930', borderColor: '#2D2B4A' }]}
                            onPress={handleGoogleAuth}
                            disabled={isLoading}
                        >
                            <Text style={styles.socialEmoji}>🔵</Text>
                            <Text style={[styles.socialText, { color: '#F1F1F6' }]}>{t('auth.google')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.guestButton, { borderColor: '#6C5CE7' }]}
                            onPress={handleGuestMode}
                            disabled={isLoading}
                        >
                            <Text style={styles.guestEmoji}>👤</Text>
                            <Text style={[styles.guestText, { color: '#A29BFE' }]}>{t('auth.guestMode')}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Navigate to Sign Up */}
                    <TouchableOpacity
                        style={styles.toggleAuth}
                        onPress={() => navigation.navigate('SignUp', { language: selectedLanguage })}
                    >
                        <Text style={styles.toggleText}>
                            {t('auth.dontHaveAccount')}{' '}
                            <Text style={styles.toggleBold}>
                                {t('auth.signUpHere')}
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    flex: { flex: 1 },
    scrollContent: {
        paddingHorizontal: spacing.xxl,
        paddingTop: 80,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.xxxl,
    },
    emoji: { fontSize: 48, marginBottom: spacing.md },
    title: {
        fontSize: typography.fontSize.xxxl,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: typography.fontSize.lg,
        color: '#A0A0BC',
    },
    form: {
        gap: spacing.md,
        marginBottom: spacing.xxl,
    },
    input: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        fontSize: typography.fontSize.md,
    },
    primaryButton: {
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        marginTop: spacing.sm,
    },
    primaryGradient: {
        paddingVertical: spacing.lg,
        alignItems: 'center',
        borderRadius: borderRadius.lg,
    },
    primaryText: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xxl,
        gap: spacing.md,
    },
    dividerLine: { flex: 1, height: 1 },
    dividerText: {
        color: '#6B6B8D',
        fontSize: typography.fontSize.sm,
    },
    socialButtons: {
        gap: spacing.md,
        marginBottom: spacing.xxl,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.md,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        gap: spacing.sm,
    },
    socialEmoji: { fontSize: 20 },
    socialText: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.medium,
    },
    guestButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.md,
        borderRadius: borderRadius.md,
        borderWidth: 1.5,
        gap: spacing.sm,
    },
    guestEmoji: { fontSize: 20 },
    guestText: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
    },
    toggleAuth: {
        alignItems: 'center',
        padding: spacing.sm,
    },
    toggleText: {
        color: '#A0A0BC',
        fontSize: typography.fontSize.md,
    },
    toggleBold: {
        color: '#A29BFE',
        fontWeight: typography.fontWeight.bold,
    },
});
