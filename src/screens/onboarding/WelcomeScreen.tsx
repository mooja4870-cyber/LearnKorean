// Welcome Screen
import React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const { width, height } = Dimensions.get('window');

export const WelcomeScreen = ({ navigation }: any) => {
    const { theme } = useTheme();

    return (
        <LinearGradient
            colors={['#0F0E1A', '#1A1040', '#2D1B69']}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />

            {/* Stars background effect */}
            <View style={styles.starsContainer}>
                {Array.from({ length: 30 }).map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.star,
                            {
                                left: Math.random() * width,
                                top: Math.random() * height * 0.7,
                                width: Math.random() * 3 + 1,
                                height: Math.random() * 3 + 1,
                                opacity: Math.random() * 0.8 + 0.2,
                            },
                        ]}
                    />
                ))}
            </View>

            {/* Logo Area */}
            <View style={styles.logoArea}>
                <Text style={styles.rocket}>🚀</Text>
                <Text style={styles.appName}>Antigravity</Text>
                <Text style={styles.slogan}>
                    Break the gravity{'\n'}of language barriers!
                </Text>
            </View>

            {/* Features */}
            <View style={styles.features}>
                <View style={styles.featureRow}>
                    <Text style={styles.featureEmoji}>🔤</Text>
                    <Text style={styles.featureText}>Master Hangul from zero</Text>
                </View>
                <View style={styles.featureRow}>
                    <Text style={styles.featureEmoji}>🎵</Text>
                    <Text style={styles.featureText}>Learn through K-Culture</Text>
                </View>
                <View style={styles.featureRow}>
                    <Text style={styles.featureEmoji}>🤖</Text>
                    <Text style={styles.featureText}>AI-powered learning</Text>
                </View>
            </View>

            {/* CTA Button */}
            <View style={styles.bottomArea}>
                <TouchableOpacity
                    style={styles.ctaButton}
                    onPress={() => navigation.navigate('LanguageSelect')}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#6C5CE7', '#A29BFE']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.ctaGradient}
                    >
                        <Text style={styles.ctaText}>Get Started 🚀</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={styles.loginLink}
                >
                    <Text style={styles.loginText}>
                        Already have an account? <Text style={styles.loginBold}>Log In</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 80,
        paddingBottom: 50,
        paddingHorizontal: spacing.xxl,
    },
    starsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    star: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    logoArea: {
        alignItems: 'center',
        marginTop: spacing.huge,
    },
    rocket: {
        fontSize: 64,
        marginBottom: spacing.lg,
    },
    appName: {
        fontSize: typography.fontSize.display,
        fontWeight: typography.fontWeight.extrabold,
        color: '#FFFFFF',
        letterSpacing: 1,
        marginBottom: spacing.sm,
    },
    slogan: {
        fontSize: typography.fontSize.lg,
        color: '#A29BFE',
        textAlign: 'center',
        lineHeight: 26,
        fontWeight: typography.fontWeight.medium,
    },
    features: {
        gap: spacing.lg,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingHorizontal: spacing.xl,
    },
    featureEmoji: {
        fontSize: 24,
    },
    featureText: {
        fontSize: typography.fontSize.md,
        color: '#E0DFFE',
        fontWeight: typography.fontWeight.medium,
    },
    bottomArea: {
        alignItems: 'center',
        gap: spacing.lg,
    },
    ctaButton: {
        width: '100%',
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
    },
    ctaGradient: {
        paddingVertical: spacing.lg,
        alignItems: 'center',
        borderRadius: borderRadius.lg,
    },
    ctaText: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
    },
    loginLink: {
        padding: spacing.sm,
    },
    loginText: {
        color: '#A0A0BC',
        fontSize: typography.fontSize.md,
    },
    loginBold: {
        color: '#A29BFE',
        fontWeight: typography.fontWeight.bold,
    },
});
