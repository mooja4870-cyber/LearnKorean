// Sign Up Screen
import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { useAuthStore } from '../../store/useAuthStore';
import { useTranslation } from 'react-i18next';

export const SignUpScreen = ({ navigation, route }: any) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const language = route?.params?.language || 'en';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const signUpWithEmail = useAuthStore(s => s.signUpWithEmail);

    const handleSignUp = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            await signUpWithEmail(email, password, language);
            navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
        } catch (err: any) {
            Alert.alert('Error', err.message || 'Sign up failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inner}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={[styles.back, { color: theme.primary }]}>← Back</Text>
                </TouchableOpacity>

                <Text style={[styles.title, { color: theme.text }]}>Create Account ✨</Text>
                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                    Start your Korean journey today
                </Text>

                <View style={styles.form}>
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

                    <View style={[styles.inputBox, { backgroundColor: theme.surfaceElevated, borderColor: theme.border }]}>
                        <Text style={[styles.inputLabel, { color: theme.textMuted }]}>Password</Text>
                        <TextInput
                            style={[styles.input, { color: theme.text }]}
                            placeholder="Min 6 characters"
                            placeholderTextColor={theme.textMuted}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <View style={[styles.inputBox, { backgroundColor: theme.surfaceElevated, borderColor: theme.border }]}>
                        <Text style={[styles.inputLabel, { color: theme.textMuted }]}>Confirm Password</Text>
                        <TextInput
                            style={[styles.input, { color: theme.text }]}
                            placeholder="Confirm password"
                            placeholderTextColor={theme.textMuted}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleSignUp}
                        disabled={loading}
                        style={{ opacity: loading ? 0.6 : 1 }}
                    >
                        <LinearGradient
                            colors={['#6C5CE7', '#A29BFE']}
                            style={styles.submitButton}
                        >
                            <Text style={styles.submitText}>
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.switchAuth}>
                    <Text style={[styles.switchText, { color: theme.textSecondary }]}>
                        Already have an account?{' '}
                        <Text style={{ color: theme.primary, fontWeight: '600' }}>Log In</Text>
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    inner: { flex: 1, padding: spacing.xl, paddingTop: spacing.lg, justifyContent: 'center' },
    back: { fontSize: typography.fontSize.md, fontWeight: '600', marginBottom: spacing.xl },
    title: { fontSize: typography.fontSize.xxl, fontWeight: '800', marginBottom: spacing.xs },
    subtitle: { fontSize: typography.fontSize.md, marginBottom: spacing.xxxl },
    form: { gap: spacing.md },
    inputBox: { borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 1 },
    inputLabel: { fontSize: typography.fontSize.xs, fontWeight: '500', marginBottom: 4 },
    input: { fontSize: typography.fontSize.md, fontWeight: '500', padding: 0 },
    submitButton: { paddingVertical: spacing.lg, borderRadius: borderRadius.lg, alignItems: 'center', marginTop: spacing.sm },
    submitText: { color: '#FFF', fontSize: typography.fontSize.lg, fontWeight: '700' },
    switchAuth: { alignItems: 'center', marginTop: spacing.xxl },
    switchText: { fontSize: typography.fontSize.md },
});
