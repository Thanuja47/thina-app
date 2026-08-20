import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import { Colors, Spacing, Typography, Radius } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import * as Notifications from 'expo-notifications';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleNotifications = async (value: boolean) => {
    setNotificationsEnabled(value);
    if (value) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        Alert.alert('Notifications Active 🔔', 'You will receive deal alerts & movie release updates.');
      } else {
        Alert.alert('Permission Needed', 'Please enable notifications in your phone settings.');
      }
    }
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://thanuja47.github.io/thina-app/privacy');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      {/* User Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarBox}>
          <Text style={styles.avatarText}>
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.userEmail}>{user?.email || 'user@thina.lk'}</Text>
        <View style={styles.tierBadge}>
          <Text style={styles.tierBadgeText}>🥈 Silver Member</Text>
        </View>
      </View>

      {/* Points & Savings Card */}
      <View style={styles.walletCard}>
        <View style={styles.walletRow}>
          <View>
            <Text style={styles.walletLabel}>Thina Rewards Balance</Text>
            <Text style={styles.walletPoints}>2,450 <Text style={styles.ptsUnit}>Pts</Text></Text>
          </View>
          <View style={styles.savingsBox}>
            <Text style={styles.savingsLabel}>Est. Savings Value</Text>
            <Text style={styles.savingsValue}>LKR 3,675</Text>
          </View>
        </View>
        <View style={styles.walletDivider} />
        <Text style={styles.walletFootnote}>
          ⭐ Stream 15 more mins to unlock Gold Tier (3,000 Pts)!
        </Text>
      </View>

      {/* Settings Menu */}
      <View style={styles.menuSection}>
        <Text style={styles.menuSectionTitle}>Preferences & Account</Text>

        <View style={styles.menuCard}>
          {/* Notifications Toggle */}
          <View style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <Text style={styles.menuIcon}>🔔</Text>
              <View>
                <Text style={styles.menuLabel}>Deal Notifications</Text>
                <Text style={styles.menuSublabel}>Get notified on new Sinhala movie bundles</Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>

          <View style={styles.menuDivider} />

          {/* Privacy Policy Link */}
          <TouchableOpacity style={styles.menuRow} onPress={openPrivacyPolicy}>
            <View style={styles.menuLeft}>
              <Text style={styles.menuIcon}>🔒</Text>
              <View>
                <Text style={styles.menuLabel}>Privacy Policy</Text>
                <Text style={styles.menuSublabel}>Read app data policy & terms</Text>
              </View>
            </View>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          {/* App Version */}
          <View style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <Text style={styles.menuIcon}>📱</Text>
              <View>
                <Text style={styles.menuLabel}>App Version</Text>
                <Text style={styles.menuSublabel}>Store Release Build</Text>
              </View>
            </View>
            <Text style={styles.versionText}>v1.0.0</Text>
          </View>
        </View>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutBtn} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out from App</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.base },
  profileHeader: { alignItems: 'center', marginVertical: Spacing.lg },
  avatarBox: {
    width: 80,
    height: 80,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    borderWidth: 3,
    borderColor: Colors.amber,
  },
  avatarText: { fontSize: 36, fontWeight: '900', color: Colors.white },
  userEmail: { color: Colors.white, fontSize: Typography.md, fontWeight: '700', marginBottom: 6 },
  tierBadge: {
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tierBadgeText: { color: Colors.amber, fontSize: Typography.xs, fontWeight: '800' },
  walletCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius['2xl'],
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xl,
  },
  walletRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  walletLabel: { color: Colors.textMuted, fontSize: Typography.xs, textTransform: 'uppercase' },
  walletPoints: { color: Colors.white, fontSize: Typography['2xl'], fontWeight: '900' },
  ptsUnit: { color: Colors.amber, fontSize: Typography.base },
  savingsBox: { alignItems: 'flex-end' },
  savingsLabel: { color: Colors.textMuted, fontSize: Typography.xs },
  savingsValue: { color: Colors.emerald, fontSize: Typography.lg, fontWeight: '900' },
  walletDivider: { height: 1, backgroundColor: Colors.border, marginVertical: Spacing.md },
  walletFootnote: { color: Colors.textSecondary, fontSize: Typography.xs, fontStyle: 'italic' },
  menuSection: { marginBottom: Spacing.xl },
  menuSectionTitle: { color: Colors.textMuted, fontSize: Typography.xs, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: Spacing.sm },
  menuCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.md },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flex: 1 },
  menuIcon: { fontSize: 20 },
  menuLabel: { color: Colors.white, fontSize: Typography.sm, fontWeight: '700' },
  menuSublabel: { color: Colors.textMuted, fontSize: Typography.xs },
  menuDivider: { height: 1, backgroundColor: Colors.border },
  arrowIcon: { color: Colors.textMuted, fontSize: Typography.md, fontWeight: '700' },
  versionText: { color: Colors.amber, fontSize: Typography.xs, fontWeight: '800' },
  signOutBtn: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  signOutText: { color: Colors.primary, fontWeight: '800', fontSize: Typography.base },
});
