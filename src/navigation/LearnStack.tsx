// Learn Stack Navigator
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LearnScreen } from '../screens/learn/LearnScreen';
import { LessonScreen } from '../screens/learn/LessonScreen';
import { QuizScreen } from '../screens/learn/QuizScreen';
import { QuizResultScreen } from '../screens/learn/QuizResultScreen';

const Stack = createNativeStackNavigator();

export const LearnStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LearnMain" component={LearnScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="QuizResult" component={QuizResultScreen} />
    </Stack.Navigator>
);
