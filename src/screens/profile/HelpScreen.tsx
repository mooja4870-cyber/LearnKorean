// Help Screen
import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadow } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { useTranslation } from 'react-i18next';

export const HelpScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const faqItems = t('help.faqItems', { returnObjects: true }) as { q: string; a: string }[];

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={[styles.back, { color: theme.primary }]}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: theme.text }]}>
                        ❓ {t('help.title')}
                    </Text>
                </View>

                {/* FAQ */}
                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
                    {t('help.faq')}
                </Text>

                {Array.isArray(faqItems) && faqItems.map((item, i) => (
                    <TouchableOpacity
                        key={i}
                        style={[styles.faqItem, { backgroundColor: theme.surface }, shadow.sm]}
                        onPress={() => setExpandedIndex(expandedIndex === i ? null : i)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.faqHeader}>
                            <Text style={[styles.faqQuestion, { color: theme.text }]}>
                                {item.q}
                            </Text>
                            <Text style={[styles.faqArrow, { color: theme.textMuted }]}>
                                {expandedIndex === i ? '▼' : '▶'}
                            </Text>
                        </View>
                        {expandedIndex === i && (
                            <Text style={[styles.faqAnswer, { color: theme.textSecondary }]}>
                                {item.a}
                            </Text>
                        )}
                    </TouchableOpacity>
                ))}

                {/* Contact */}
                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
                    {t('help.contactSupport')}
                </Text>
                <View style={[styles.contactCard, { backgroundColor: theme.surface }, shadow.sm]}>
                    <Text style={styles.contactEmoji}>📧</Text>
                    <Text style={[styles.contactText, { color: theme.text }]}>
                        support@antigravity.app
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: {
        padding: spacing.xl,
        paddingTop: 60,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        marginBottom: spacing.xxl,
    },
    back: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
    },
    title: {
        fontSize: typography.fontSize.xxl,
        fontWeight: typography.fontWeight.bold,
    },
    sectionTitle: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: spacing.md,
        paddingLeft: spacing.xs,
    },
    faqItem: {
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.sm,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
        flex: 1,
        marginRight: spacing.md,
    },
    faqArrow: { fontSize: 12 },
    faqAnswer: {
        fontSize: typography.fontSize.sm,
        lineHeight: 22,
        marginTop: spacing.md,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
        borderRadius: borderRadius.lg,
        gap: spacing.md,
    },
    contactEmoji: { fontSize: 24 },
    contactText: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.medium,
    },
});
