// Settings Store — Zustand
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserSettings } from '../services/auth';

const SETTINGS_KEY = '@antigravity_settings';

interface SettingsState {
    notifications: boolean;
    reminderTime: string;
    soundEnabled: boolean;
    autoPlayAudio: boolean;
    darkMode: boolean;

    // Actions
    loadSettings: () => Promise<void>;
    updateSetting: (key: keyof UserSettings, value: boolean | string) => Promise<void>;
    toggleDarkMode: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
    notifications: true,
    reminderTime: '09:00',
    soundEnabled: true,
    autoPlayAudio: true,
    darkMode: true,

    loadSettings: async () => {
        try {
            const data = await AsyncStorage.getItem(SETTINGS_KEY);
            if (data) {
                const settings = JSON.parse(data);
                set(settings);
            }
        } catch { }
    },

    updateSetting: async (key, value) => {
        set({ [key]: value } as any);
        const state = get();
        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({
            notifications: state.notifications,
            reminderTime: state.reminderTime,
            soundEnabled: state.soundEnabled,
            autoPlayAudio: state.autoPlayAudio,
            darkMode: state.darkMode,
        }));
    },

    toggleDarkMode: async () => {
        const next = !get().darkMode;
        set({ darkMode: next });
        const state = get();
        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({
            notifications: state.notifications,
            reminderTime: state.reminderTime,
            soundEnabled: state.soundEnabled,
            autoPlayAudio: state.autoPlayAudio,
            darkMode: next,
        }));
    },
}));
