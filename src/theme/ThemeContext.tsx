import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, ThemeColors } from './colors';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode;
    theme: ThemeColors;
    toggleTheme: () => void;
    setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    mode: 'dark',
    theme: colors.dark,
    toggleTheme: () => { },
    setThemeMode: () => { },
});

const THEME_KEY = '@antigravity_theme';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>('dark');

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const saved = await AsyncStorage.getItem(THEME_KEY);
            if (saved === 'light' || saved === 'dark') {
                setMode(saved);
            }
        } catch { }
    };

    const toggleTheme = async () => {
        const next = mode === 'dark' ? 'light' : 'dark';
        setMode(next);
        await AsyncStorage.setItem(THEME_KEY, next);
    };

    const setThemeMode = async (m: ThemeMode) => {
        setMode(m);
        await AsyncStorage.setItem(THEME_KEY, m);
    };

    return (
        <ThemeContext.Provider value={{ mode, theme: colors[mode], toggleTheme, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
