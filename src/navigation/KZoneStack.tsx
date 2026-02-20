// K-Zone Stack Navigator
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KZoneScreen } from '../screens/kzone/KZoneScreen';

const Stack = createNativeStackNavigator();

export const KZoneStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="KZoneMain" component={KZoneScreen} />
    </Stack.Navigator>
);
