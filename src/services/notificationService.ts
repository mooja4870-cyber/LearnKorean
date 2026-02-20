// Push Notification Service — Local Learning Reminders
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REMINDER_KEY = '@kor_study_reminder';

// Configure notification handler
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export interface ReminderSettings {
    enabled: boolean;
    hour: number;     // 0-23
    minute: number;   // 0-59
}

const DEFAULT_REMINDER: ReminderSettings = {
    enabled: true,
    hour: 18,
    minute: 0,
};

/**
 * Request notification permissions
 */
export async function requestNotificationPermission(): Promise<boolean> {
    const { status: existing } = await Notifications.getPermissionsAsync();
    let finalStatus = existing;

    if (existing !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    return finalStatus === 'granted';
}

/**
 * Schedule daily learning reminder
 */
export async function scheduleDailyReminder(settings?: Partial<ReminderSettings>): Promise<void> {
    const reminder = { ...DEFAULT_REMINDER, ...settings };

    // Cancel existing reminders first
    await cancelAllReminders();

    if (!reminder.enabled) return;

    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return;

    // Random motivational messages
    const messages = [
        { title: '📚 Time to study Korean!', body: 'Don\'t break your streak! 🔥 Just 5 minutes today.' },
        { title: '🇰🇷 한국어 시간이에요!', body: 'Keep your streak alive — practice makes perfect!' },
        { title: '✨ Your daily Korean lesson awaits!', body: 'Learn something new today. You got this! 💪' },
        { title: '🎯 Ready for a quick quiz?', body: 'Test your Hangul knowledge in under 2 minutes!' },
        { title: '🔥 Don\'t forget to study!', body: 'Your streak is counting on you! Open the app now.' },
    ];

    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    await Notifications.scheduleNotificationAsync({
        content: {
            title: randomMsg.title,
            body: randomMsg.body,
            sound: true,
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour: reminder.hour,
            minute: reminder.minute,
        },
    });

    // Save settings
    await AsyncStorage.setItem(REMINDER_KEY, JSON.stringify(reminder));
}

/**
 * Cancel all scheduled reminders
 */
export async function cancelAllReminders(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Load saved reminder settings
 */
export async function loadReminderSettings(): Promise<ReminderSettings> {
    try {
        const data = await AsyncStorage.getItem(REMINDER_KEY);
        if (data) return JSON.parse(data);
    } catch (err) {
        console.error('Failed to load reminder settings', err);
    }
    return DEFAULT_REMINDER;
}

/**
 * Update reminder settings
 */
export async function updateReminderSettings(settings: Partial<ReminderSettings>): Promise<void> {
    const current = await loadReminderSettings();
    const updated = { ...current, ...settings };
    await scheduleDailyReminder(updated);
}
