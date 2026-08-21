import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Dimensions, ImageBackground, StatusBar, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { Colors, Spacing, Typography, Radius } from '../constants/theme';

const { width } = Dimensions.get('window');

const TIERS = [
  { name: 'Bronze', min: 0, max: 999, color: '#CD7F32', icon: 'ribbon-outline' as const },
  { name: 'Silver', min: 1000, max: 4999, color: '#9CA3AF', icon: 'ribbon' as const },
  { name: 'Gold', min: 5000, max: 14999, color: '#FFB800', icon: 'trophy-outline' as const },
  { name: 'Platinum', min: 15000, max: Infinity, color: '#06B6D4', icon: 'diamond-outline' as const },
];

const QUICK_ACTIONS = [
  { label: 'My Deals', icon: 'pricetag-outline' as const, color: '#FF2A55' },
  { label: 'History', icon: 'receipt-outline' as const, color: '#8B5CF6' },
  { label: 'Referrals', icon: 'people-outline' as const, color: '#10B981' },
  { label: 'Settings', icon: 'settings-outline' as const, color: '#F59E0B' },
];

const RECENT_ACTIVITY = [
  { icon: 'film-outline', desc: 'Watched Gautama', pts: '+120 pts', time: '2 hrs ago', color: '#FF2A55' },
  { icon: 'pricetag-outline', desc: 'Redeemed Pizza Hut Deal', pts: '-400 pts', time: 'Yesterday', color: '#F59E0B' },
  { icon: 'star-outline', desc: 'Bonus: Weekend Watch', pts: '+50 pts', time: '2 days ago', color: '#10B981' },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, userProfile, signOut } = useAuth();

  const pts = userProfile?.points_balance ?? 2450;
  const name = userProfile?.full_name || user?.email?.split('@')[0] || 'User';
  const email = user?.email || '';

  const tier = TIERS.find(t => pts >= t.min && pts <= t.max) || TIERS[0];
  const nextTier = TIERS[TIERS.findIndex(t => t.name === tier.name) + 1];
  const progress = nextTier ? ((pts - tier.min) / (nextTier.min - tier.min)) * 100 : 100;

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: signOut },
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={[styles.tierBadge, { backgroundColor: tier.color + '25', borderColor: tier.color + '60' }]}>
              <Ionicons name={tier.icon} size={12} color={tier.color} />
              <Text style={[styles.tierBadgeText, { color: tier.color }]}>{tier.name}</Text>
            </View>
          </View>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
        </View>

        {/* Points Card */}
        <View style={styles.ptsCard}>
          <View style={styles.ptsCardRow}>
            <View>
              <Text style={styles.ptsLabel}>Total Points</Text>
              <View style={styles.ptsRow}>
                <Ionicons name="star" size={22} color="#FFB800" />
                <Text style={styles.ptsValue}>{pts.toLocaleString()}</Text>
              </View>
            </View>
            <View style={styles.ptsValueRight}>
              <Text style={[styles.tierName, { color: tier.color }]}>{tier.name} Member</Text>
              <Ionicons name={tier.icon} size={32} color={tier.color} />
            </View>
          </View>
          {nextTier && (
            <>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: tier.color }]} />
              </View>
              <Text style={styles.progressLabel}>
                {(nextTier.min - pts).toLocaleString()} pts to <Text style={{ color: tier.color }}>{nextTier.name}</Text>
              </Text>
            </>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickGrid}>
          {QUICK_ACTIONS.map(action => (
            <TouchableOpacity
              key={action.label}
              style={styles.quickBtn}
              activeOpacity={0.8}
              onPress={() => Alert.alert(action.label, 'Coming soon in the next version!')}
            >
              <View style={[styles.quickIcon, { backgroundColor: action.color + '20' }]}>
                <Ionicons name={action.icon} size={22} color={action.color} />
              </View>
              <Text style={styles.quickLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          {RECENT_ACTIVITY.map((item, i) => (
            <View key={i} style={[styles.activityRow, i < RECENT_ACTIVITY.length - 1 && styles.activityBorder]}>
              <View style={[styles.activityIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={18} color={item.color} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityDesc}>{item.desc}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
              <Text style={[styles.activityPts, { color: item.pts.startsWith('+') ? '#10B981' : '#EF4444' }]}>
                {item.pts}
              </Text>
            </View>
          ))}
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Thina Deals v1.0.0 · Made in Sri Lanka 🇱🇰</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  profileHeader: { alignItems: 'center', paddingHorizontal: Spacing.base, marginBottom: 20, gap: 6 },
  avatarWrap: { alignItems: 'center', gap: 8 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: Colors.primary + '30', borderWidth: 2, borderColor: Colors.primary + '60',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 32, fontWeight: '900', color: Colors.primary },
  tierBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderRadius: 14, paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1,
  },
  tierBadgeText: { fontSize: 11, fontWeight: '800' },
  profileName: { fontSize: 22, fontWeight: '900', color: Colors.white, letterSpacing: -0.3 },
  profileEmail: { fontSize: Typography.sm, color: Colors.textMuted, fontWeight: '500' },

  ptsCard: {
    marginHorizontal: Spacing.base, marginBottom: 16,
    backgroundColor: '#151820', borderRadius: Radius['2xl'],
    padding: 20, borderWidth: 1, borderColor: '#22252F',
    gap: 12,
  },
  ptsCardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  ptsLabel: { color: Colors.textSecondary, fontSize: Typography.xs, fontWeight: '700', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  ptsRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ptsValue: { fontSize: 34, fontWeight: '900', color: '#FFB800' },
  ptsValueRight: { alignItems: 'flex-end', gap: 6 },
  tierName: { fontSize: Typography.sm, fontWeight: '800' },
  progressTrack: { height: 6, backgroundColor: '#22252F', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  progressLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '500' },

  quickGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 12,
    paddingHorizontal: Spacing.base, marginBottom: 20,
  },
  quickBtn: {
    width: (width - Spacing.base * 2 - 36) / 4,
    alignItems: 'center', gap: 6,
  },
  quickIcon: {
    width: 52, height: 52, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  quickLabel: { fontSize: 11, color: Colors.textSecondary, fontWeight: '700', textAlign: 'center' },

  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.white, paddingHorizontal: Spacing.base, marginBottom: 12 },

  activityCard: {
    marginHorizontal: Spacing.base, marginBottom: 20,
    backgroundColor: '#151820', borderRadius: Radius['2xl'],
    borderWidth: 1, borderColor: '#22252F', overflow: 'hidden',
  },
  activityRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  activityBorder: { borderBottomWidth: 1, borderBottomColor: '#1E2130' },
  activityIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  activityContent: { flex: 1, gap: 2 },
  activityDesc: { color: Colors.white, fontSize: 13, fontWeight: '700' },
  activityTime: { color: Colors.textMuted, fontSize: 11, fontWeight: '500' },
  activityPts: { fontSize: 13, fontWeight: '900' },

  signOutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginHorizontal: Spacing.base, paddingVertical: 14,
    backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: Radius.xl,
    borderWidth: 1, borderColor: 'rgba(239,68,68,0.25)', marginBottom: 16,
  },
  signOutText: { color: '#EF4444', fontSize: Typography.base, fontWeight: '800' },
  versionText: { textAlign: 'center', color: Colors.textMuted, fontSize: 11, fontWeight: '500' },
});
