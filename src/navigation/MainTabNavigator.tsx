// Main Tab Navigator — Bottom Tab Bar
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme/ThemeContext';
import { HomeStack } from './HomeStack';
import { LearnStack } from './LearnStack';
import { KZoneStack } from './KZoneStack';
import { ProfileStack } from './ProfileStack';

const Tab = createBottomTabNavigator();

const TabIcon = ({ emoji, label, focused, color }: {
    emoji: string; label: string; focused: boolean; color: string;
}) => (
    <View style={styles.tabItem}>
        <Text style={[styles.tabEmoji, { opacity: focused ? 1 : 0.6 }]}>{emoji}</Text>
        <Text style={[styles.tabLabel, { color, fontWeight: focused ? '600' : '400' }]}>
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
                    backgroundColor: theme.tabBar,
                    borderTopColor: theme.tabBarBorder,
                    borderTopWidth: 1,
                    height: Platform.OS === 'ios' ? 88 : 65,
                    paddingTop: 8,
                    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
                },
                tabBarActiveTintColor: theme.tabBarActive,
                tabBarInactiveTintColor: theme.tabBarInactive,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon emoji="🏠" label="Home" focused={focused} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="LearnTab"
                component={LearnStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon emoji="📚" label="Learn" focused={focused} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="KZoneTab"
                component={KZoneStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon emoji="🎵" label="K-Zone" focused={focused} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon emoji="👤" label="Profile" focused={focused} color={color} />
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
    tabEmoji: {
        fontSize: 22,
    },
    tabLabel: {
        fontSize: 10,
    },
});
