// Home Screen — Mission Control Design
import React, { useState, useCallback } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { useUserStore } from '../../store/useUserStore';
import { useAuthStore } from '../../store/useAuthStore';

const STREAK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const MissionItem = ({
    icon,
    title,
    subtitle,
    progress,
    actionLabel,
    onPress,
    actionPress,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    progress?: number;
    actionLabel?: string;
    onPress: () => void;
    actionPress?: () => void;
}) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.missionItem}>
        <View style={styles.missionIconWrap}>
            <Ionicons name={icon} size={22} color="#A29BFE" />
        </View>
        <View style={styles.missionInfo}>
            <Text style={styles.missionTitle}>{title}</Text>
            {typeof progress === 'number' ? (
                <View style={styles.progressRow}>
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${Math.max(0, Math.min(100, progress))}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{Math.round(progress / 33)} / 3</Text>
                </View>
            ) : (
                <Text style={styles.missionSubtitle}>{subtitle}</Text>
            )}
        </View>
        {actionLabel ? (
            <TouchableOpacity
                onPress={actionPress || onPress}
                activeOpacity={0.8}
                style={styles.launchButton}
            >
                <Text style={styles.launchText}>{actionLabel}</Text>
            </TouchableOpacity>
        ) : (
            <Ionicons name="chevron-forward" size={18} color="#6B6B8D" />
        )}
    </TouchableOpacity>
);

const ZoneCard = ({
    image,
    title,
    subtitle,
    onPress,
}: {
    image: string;
    title: string;
    subtitle: string;
    onPress: () => void;
}) => (
    <TouchableOpacity activeOpacity={0.85} style={styles.zoneCard} onPress={onPress}>
        <Image source={{ uri: image }} style={styles.zoneImage} />
        <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.85)']}
            style={styles.zoneOverlay}
        >
            <Text style={styles.zoneTitle}>{title}</Text>
            <Text style={styles.zoneSubtitle}>{subtitle}</Text>
        </LinearGradient>
    </TouchableOpacity>
);

export const HomeScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const [refreshing, setRefreshing] = useState(false);

    const { displayName, currentStreak, levelProgress, lessonsCompleted, totalStudyDays, quizAccuracy, refresh } = useUserStore();
    const authRefresh = useAuthStore(s => s.refreshUser);

    useFocusEffect(
        useCallback(() => {
            useUserStore.getState().loadUserData();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await authRefresh();
        refresh();
        setRefreshing(false);
    };

    const safeName = displayName && displayName.length > 0 ? displayName : 'Explorer';
    const streakFilledCount = Math.min(Math.max(currentStreak, 0), 7);
    const levelXP = 2450 + lessonsCompleted * 75;
    const nextLevelXP = 5000;
    const lessonMissionProgress = Math.min((lessonsCompleted / 3) * 100, 100);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.bgAuraTop} />
            <View style={styles.bgAuraBottom} />

            <View style={styles.topBar}>
                <View style={styles.brandLeft}>
                    <Image
                        source={{ uri: 'https://picsum.photos/seed/antigravity_user/100/100' }}
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={styles.brandTitle}>ANTIGRAVITY</Text>
                        <Text style={styles.brandSub}>Mission Control</Text>
                    </View>
                </View>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
                        <Ionicons name="notifications-outline" size={20} color="#E8E8FF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('ProfileTab', { screen: 'Settings' })}
                    >
                        <Ionicons name="settings-outline" size={20} color="#E8E8FF" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#A29BFE" />}
            >
                <View style={styles.heroWrap}>
                    <Text style={styles.heroTitle}>
                        Hello, <Text style={styles.heroAccent}>{safeName}!</Text>
                    </Text>
                    <Text style={styles.heroSubtitle}>Ready for today&apos;s atmospheric drift?</Text>
                </View>

                <View style={styles.progressCard}>
                    <View style={styles.progressRingOuter}>
                        <View style={styles.progressRingMiddle}>
                            <View style={styles.progressRingInner}>
                                <Text style={styles.progressValue}>{Math.round(levelProgress)}%</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.rankPill}>
                        <Text style={styles.rankPillText}>RANK: NOVICE</Text>
                    </View>
                    <Text style={styles.levelTitle}>Level 1: Novice Explorer</Text>
                    <Text style={styles.levelSubtitle}>
                        {levelXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP until Star Pilot
                    </Text>

                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={styles.boostButton}
                        onPress={() => navigation.navigate('LearnTab')}
                    >
                        <Text style={styles.boostText}>Boost XP</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionWrap}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleRow}>
                            <MaterialCommunityIcons name="trophy" size={20} color="#FF8A3D" />
                            <Text style={styles.sectionTitle}>Daily Streak</Text>
                        </View>
                        <Text style={styles.sectionRight}>{currentStreak} Days</Text>
                    </View>

                    <View style={styles.streakCard}>
                        {STREAK_DAYS.map((d, i) => {
                            const filled = i < streakFilledCount;
                            const isToday = i === Math.min(streakFilledCount, 6);
                            return (
                                <View style={styles.streakDay} key={`${d}-${i}`}>
                                    <Text style={[styles.streakDayLabel, isToday && styles.streakDayLabelToday]}>{d}</Text>
                                    <View style={[styles.streakDot, filled ? styles.streakDotFilled : styles.streakDotEmpty]}>
                                        {filled ? (
                                            <Ionicons name="star" size={14} color="#FFF" />
                                        ) : (
                                            <MaterialCommunityIcons name="rocket-outline" size={14} color="#A29BFE" />
                                        )}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.sectionWrap}>
                    <View style={styles.sectionTitleRow}>
                        <Ionicons name="flash" size={20} color="#A29BFE" />
                        <Text style={styles.sectionTitle}>Daily Missions</Text>
                    </View>

                    <View style={styles.missionList}>
                        <MissionItem
                            icon="language"
                            title="Learn 3 Vowels"
                            progress={lessonMissionProgress}
                            onPress={() => navigation.navigate('LearnTab')}
                        />
                        <MissionItem
                            icon="help-circle-outline"
                            title="Complete 1 Quiz"
                            subtitle="Status: Pending Verification"
                            actionLabel="LAUNCH"
                            onPress={() => navigation.navigate('LearnTab', { screen: 'Quiz', params: { quizType: 'daily' } })}
                        />
                        <MissionItem
                            icon="rocket-outline"
                            title="Vocabulary Warp"
                            subtitle="Timed challenge: Match 10 words"
                            onPress={() => navigation.navigate('LearnTab')}
                        />
                    </View>
                </View>

                <View style={styles.sectionWrap}>
                    <View style={styles.kzoneHeader}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="globe-outline" size={20} color="#A29BFE" />
                            <Text style={styles.sectionTitle}>K-Zone Explorer</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('KZoneTab')}>
                            <Text style={styles.viewAll}>VIEW ALL</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.zoneGrid}>
                        <ZoneCard
                            image="https://picsum.photos/seed/seoul-night/400/225"
                            title="Seoul Nightlife"
                            subtitle="Cultural Immersion"
                            onPress={() => navigation.navigate('KZoneTab')}
                        />
                        <ZoneCard
                            image="https://picsum.photos/seed/kfood-space/400/225"
                            title="Foodie Mission"
                            subtitle="5 New Vocabs"
                            onPress={() => navigation.navigate('KZoneTab')}
                        />
                    </View>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{lessonsCompleted}</Text>
                        <Text style={styles.statLabel}>Lessons</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{totalStudyDays}</Text>
                        <Text style={styles.statLabel}>Days</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{quizAccuracy}%</Text>
                        <Text style={styles.statLabel}>Accuracy</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A14',
    },
    bgAuraTop: {
        position: 'absolute',
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: 'rgba(92,73,233,0.12)',
        top: -110,
        left: -70,
    },
    bgAuraBottom: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(92,73,233,0.08)',
        bottom: -140,
        right: -90,
    },
    topBar: {
        paddingTop: 58,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.md,
        backgroundColor: 'rgba(22,20,38,0.82)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(92,73,233,0.2)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    brandLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(162,155,254,0.5)',
    },
    brandTitle: {
        color: '#A29BFE',
        fontSize: 11,
        fontWeight: typography.fontWeight.bold,
        letterSpacing: 1.3,
    },
    brandSub: {
        color: '#A0A0BC',
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.medium,
        marginTop: 1,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(162,155,254,0.1)',
    },
    scrollContent: {
        padding: spacing.lg,
        paddingBottom: 120,
        gap: spacing.xl,
    },
    heroWrap: {
        marginTop: spacing.xs,
    },
    heroTitle: {
        color: '#F3F2FF',
        fontSize: 30,
        lineHeight: 36,
        fontWeight: typography.fontWeight.extrabold,
    },
    heroAccent: {
        color: '#A29BFE',
    },
    heroSubtitle: {
        marginTop: spacing.xs,
        color: '#A0A0BC',
        fontSize: typography.fontSize.md,
    },
    progressCard: {
        borderRadius: borderRadius.xxl,
        padding: spacing.xl,
        backgroundColor: '#161426',
        borderWidth: 1,
        borderColor: 'rgba(92,73,233,0.3)',
        alignItems: 'center',
    },
    progressRingOuter: {
        width: 126,
        height: 126,
        borderRadius: 63,
        backgroundColor: '#252342',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 8,
        borderColor: 'rgba(162,155,254,0.24)',
    },
    progressRingMiddle: {
        width: 92,
        height: 92,
        borderRadius: 46,
        borderWidth: 7,
        borderColor: '#5C49E9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressRingInner: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressValue: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.xxl,
        fontWeight: typography.fontWeight.bold,
    },
    rankPill: {
        marginTop: spacing.lg,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        backgroundColor: 'rgba(92,73,233,0.24)',
    },
    rankPillText: {
        color: '#A29BFE',
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.bold,
        letterSpacing: 1,
    },
    levelTitle: {
        marginTop: spacing.sm,
        color: '#F3F2FF',
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
    },
    levelSubtitle: {
        marginTop: spacing.xs,
        color: '#A0A0BC',
        fontSize: typography.fontSize.sm,
    },
    boostButton: {
        marginTop: spacing.lg,
        width: '100%',
        borderRadius: borderRadius.md,
        paddingVertical: spacing.md,
        alignItems: 'center',
        backgroundColor: '#5C49E9',
    },
    boostText: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.bold,
    },
    sectionWrap: {
        gap: spacing.sm,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    sectionTitle: {
        color: '#EDEBFF',
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
    },
    sectionRight: {
        color: '#FF8A3D',
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.bold,
    },
    streakCard: {
        borderRadius: borderRadius.xl,
        backgroundColor: '#161426',
        borderWidth: 1,
        borderColor: 'rgba(92,73,233,0.3)',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    streakDay: {
        alignItems: 'center',
        gap: spacing.xs,
    },
    streakDayLabel: {
        fontSize: 10,
        color: '#6B6B8D',
        fontWeight: typography.fontWeight.bold,
    },
    streakDayLabelToday: {
        color: '#DCD8FF',
    },
    streakDot: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    streakDotFilled: {
        backgroundColor: '#5C49E9',
    },
    streakDotEmpty: {
        borderWidth: 1.5,
        borderColor: 'rgba(162,155,254,0.5)',
        borderStyle: 'dashed',
    },
    missionList: {
        gap: spacing.sm,
    },
    missionItem: {
        borderRadius: borderRadius.xl,
        backgroundColor: '#161426',
        padding: spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(92,73,233,0.15)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    missionIconWrap: {
        width: 46,
        height: 46,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(92,73,233,0.15)',
    },
    missionInfo: {
        flex: 1,
    },
    missionTitle: {
        color: '#F3F2FF',
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.bold,
    },
    missionSubtitle: {
        marginTop: 2,
        color: '#8A88A7',
        fontSize: typography.fontSize.xs,
    },
    progressRow: {
        marginTop: spacing.xs,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    progressTrack: {
        flex: 1,
        height: 6,
        borderRadius: borderRadius.full,
        backgroundColor: '#2A283F',
        overflow: 'hidden',
    },
    progressFill: {
        height: 6,
        borderRadius: borderRadius.full,
        backgroundColor: '#5C49E9',
    },
    progressText: {
        color: '#8A88A7',
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.medium,
    },
    launchButton: {
        borderRadius: borderRadius.sm,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        backgroundColor: 'rgba(92,73,233,0.22)',
    },
    launchText: {
        color: '#A29BFE',
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.bold,
    },
    kzoneHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    viewAll: {
        color: '#A29BFE',
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.bold,
        letterSpacing: 0.6,
    },
    zoneGrid: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    zoneCard: {
        flex: 1,
        height: 108,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
    },
    zoneImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    zoneOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: spacing.sm,
    },
    zoneTitle: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.bold,
    },
    zoneSubtitle: {
        marginTop: 1,
        color: '#C9C6E3',
        fontSize: 10,
    },
    statsRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    statCard: {
        flex: 1,
        borderRadius: borderRadius.md,
        backgroundColor: '#161426',
        borderWidth: 1,
        borderColor: 'rgba(92,73,233,0.2)',
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    statValue: {
        color: '#F3F2FF',
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
    },
    statLabel: {
        marginTop: 2,
        color: '#8A88A7',
        fontSize: typography.fontSize.xs,
    },
});
