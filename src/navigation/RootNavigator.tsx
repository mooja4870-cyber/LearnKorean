// Root Navigator — Handles onboarding vs main app flow
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/useAuthStore';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { LanguageSelectScreen } from '../screens/onboarding/LanguageSelectScreen';
import { LoginScreen } from '../screens/onboarding/LoginScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { MainTabNavigator } from './MainTabNavigator';
import { useTheme } from '../theme/ThemeContext';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
    const { theme } = useTheme();

    const isLoading = useAuthStore(s => s.isLoading);
    const hasOnboarded = useAuthStore(s => s.hasOnboarded);
    const initialize = useAuthStore(s => s.initialize);

    useEffect(() => {
        initialize();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!hasOnboarded ? (
                <>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                    <Stack.Screen name="LanguageSelect" component={LanguageSelectScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                    <Stack.Screen name="Main" component={MainTabNavigator} />
                </>
            ) : (
                <Stack.Screen name="Main" component={MainTabNavigator} />
            )}
        </Stack.Navigator>
    );
};
