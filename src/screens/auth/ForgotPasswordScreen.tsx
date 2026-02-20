// Forgot Password Screen
import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const ForgotPasswordScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleReset = () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }
        // MVP: just show confirmation (Firebase integration later)
        setSent(true);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.inner}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={[styles.back, { color: theme.primary }]}>← Back</Text>
                </TouchableOpacity>

                {sent ? (
                    <View style={styles.sentContainer}>
                        <Text style={styles.sentEmoji}>📧</Text>
                        <Text style={[styles.title, { color: theme.text }]}>Check your email!</Text>
                        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                            We've sent a password reset link to {email}
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.backToLogin, { borderColor: theme.primary }]}
                        >
                            <Text style={[styles.backToLoginText, { color: theme.primary }]}>
                                ← Back to Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <Text style={[styles.title, { color: theme.text }]}>Forgot Password? 🔑</Text>
                        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                            Enter your email and we'll send you a reset link
                        </Text>

                        <View style={[styles.inputBox, { backgroundColor: theme.surfaceElevated, borderColor: theme.border }]}>
                            <Text style={[styles.inputLabel, { color: theme.textMuted }]}>Email</Text>
                            <TextInput
                                style={[styles.input, { color: theme.text }]}
                                placeholder="your@email.com"
                                placeholderTextColor={theme.textMuted}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <TouchableOpacity onPress={handleReset}>
                            <LinearGradient
                                colors={['#6C5CE7', '#A29BFE']}
                                style={styles.submitButton}
                            >
                                <Text style={styles.submitText}>Send Reset Link</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    inner: { flex: 1, padding: spacing.xl, paddingTop: spacing.lg, justifyContent: 'center' },
    back: { fontSize: typography.fontSize.md, fontWeight: '600', marginBottom: spacing.xxl },
    title: { fontSize: typography.fontSize.xxl, fontWeight: '800', marginBottom: spacing.sm },
    subtitle: { fontSize: typography.fontSize.md, marginBottom: spacing.xxl, lineHeight: 22 },
    inputBox: { borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 1, marginBottom: spacing.lg },
    inputLabel: { fontSize: typography.fontSize.xs, fontWeight: '500', marginBottom: 4 },
    input: { fontSize: typography.fontSize.md, fontWeight: '500', padding: 0 },
    submitButton: { paddingVertical: spacing.lg, borderRadius: borderRadius.lg, alignItems: 'center' },
    submitText: { color: '#FFF', fontSize: typography.fontSize.lg, fontWeight: '700' },
    sentContainer: { alignItems: 'center', gap: spacing.md },
    sentEmoji: { fontSize: 64 },
    backToLogin: { borderWidth: 1.5, paddingVertical: spacing.md, paddingHorizontal: spacing.xxl, borderRadius: borderRadius.lg, marginTop: spacing.lg },
    backToLoginText: { fontSize: typography.fontSize.md, fontWeight: '600' },
});
