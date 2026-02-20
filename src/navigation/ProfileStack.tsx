// Profile Stack Navigator
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { MyStatsScreen } from '../screens/profile/MyStatsScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';
import { HelpScreen } from '../screens/profile/HelpScreen';

const Stack = createNativeStackNavigator();

export const ProfileStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileMain" component={ProfileScreen} />
        <Stack.Screen name="MyStats" component={MyStatsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
    </Stack.Navigator>
);
