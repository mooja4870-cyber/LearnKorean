// Main Tab Navigator — Bottom Tab Bar
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { HomeStack } from './HomeStack';
import { LearnStack } from './LearnStack';
import { KZoneStack } from './KZoneStack';
import { ProfileStack } from './ProfileStack';
import { typography } from '../theme/typography';
import { borderRadius } from '../theme/spacing';

const Tab = createBottomTabNavigator();

const TabIcon = ({ icon, label, focused, color }: {
    icon: keyof typeof Ionicons.glyphMap; label: string; focused: boolean; color: string;
}) => (
    <View style={styles.tabItem}>
        <View style={[styles.iconWrap, focused && styles.iconWrapFocused]}>
            <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={[styles.tabLabel, { color, fontWeight: focused ? '700' : '500' }]}>
            {label}
        </Text>
    </View>
);

export const MainTabNavigator = () => {
    const { theme } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: 'rgba(22,20,38,0.92)',
                    borderTopColor: 'rgba(92,73,233,0.25)',
                    borderTopWidth: 1,
                    height: Platform.OS === 'ios' ? 92 : 74,
                    paddingTop: 8,
                    paddingBottom: Platform.OS === 'ios' ? 26 : 10,
                },
                tabBarActiveTintColor: theme.primary,
                tabBarInactiveTintColor: '#8A88A7',
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon icon="home" label="HOME" focused={focused} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="LearnTab"
                component={LearnStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon icon="book" label="LEARN" focused={focused} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="KZoneTab"
                component={KZoneStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon icon="rocket" label="K-ZONE" focused={focused} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon icon="person" label="PROFILE" focused={focused} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
    },
    iconWrap: {
        width: 34,
        height: 34,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapFocused: {
        backgroundColor: 'rgba(92,73,233,0.2)',
    },
    tabLabel: {
        fontSize: 10,
        letterSpacing: 0.6,
        fontWeight: typography.fontWeight.bold,
    },
});
