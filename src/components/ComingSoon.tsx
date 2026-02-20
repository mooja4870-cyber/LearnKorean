// Coming Soon Modal Component
import React, { useState } from 'react';
import {
    View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useAuthStore } from '../store/useAuthStore';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { COLLECTIONS } from '../utils/constants';

interface ComingSoonProps {
    visible: boolean;
    onClose: () => void;
    featureName?: string;
    estimatedDate?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
    visible, onClose, featureName, estimatedDate,
}) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [notified, setNotified] = useState(false);
    const user = useAuthStore(s => s.user);

    const handleNotify = async () => {
        setNotified(true);
        if (user && !user.isGuest && featureName) {
            try {
                // Save user interest to Firestore
                const interestRef = doc(db, COLLECTIONS.COMING_SOON, `${user.uid}_${featureName.replace(/\s+/g, '_')}`);
                await setDoc(interestRef, {
                    uid: user.uid,
                    featureName,
                    timestamp: new Date().toISOString()
                }, { merge: true });
            } catch (err) {
                console.error('Failed to log feature interest', err);
            }
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
                <View style={[styles.container, { backgroundColor: theme.surface }]}>
                    <Text style={styles.lockIcon}>🔒</Text>

                    <Text style={[styles.title, { color: theme.text }]}>
                        {t('common.comingSoon')}
                    </Text>

                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                        {t('common.comingSoonDesc')}
                    </Text>

                    {featureName && (
                        <Text style={[styles.featureName, { color: theme.primary }]}>
                            {featureName}
                        </Text>
                    )}

                    <TouchableOpacity
                        style={[
                            styles.notifyButton,
                            { backgroundColor: notified ? theme.success : theme.primary },
                        ]}
                        onPress={handleNotify}
                        disabled={notified}
                    >
                        <Text style={styles.notifyText}>
                            {notified ? t('common.notified') : `🔔 ${t('common.notifyMe')}`}
                        </Text>
                    </TouchableOpacity>

                    {estimatedDate && (
                        <Text style={[styles.date, { color: theme.textMuted }]}>
                            Expected: {estimatedDate}
                        </Text>
                    )}

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={[styles.closeText, { color: theme.textSecondary }]}>
                            {t('common.ok')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xxl,
    },
    container: {
        width: '100%',
        maxWidth: 340,
        borderRadius: borderRadius.xl,
        padding: spacing.xxxl,
        alignItems: 'center',
    },
    lockIcon: {
        fontSize: 48,
        marginBottom: spacing.lg,
    },
    title: {
        fontSize: typography.fontSize.xxl,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.sm,
    },
    subtitle: {
        fontSize: typography.fontSize.md,
        textAlign: 'center',
        marginBottom: spacing.lg,
        lineHeight: 22,
    },
    featureName: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.semibold,
        marginBottom: spacing.xl,
    },
    notifyButton: {
        width: '100%',
        paddingVertical: spacing.md,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    notifyText: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
    },
    date: {
        fontSize: typography.fontSize.sm,
        marginBottom: spacing.lg,
    },
    closeButton: {
        paddingVertical: spacing.sm,
    },
    closeText: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.medium,
    },
});
