import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Dimensions, ImageBackground, Platform, StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { MOCK_DEALS } from '../data/mockData';
import { Colors, Spacing, Typography, Radius } from '../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - Spacing.base * 2;

const CATEGORIES = ['All', 'Dining', 'Cinema', 'Shopping', 'Travel', 'Groceries'];

const BADGE_COLOR: Record<string, string> = {
  'BOGO FREE': '#10B981',
  default: Colors.primary,
};

const badgeColor = (discount: string) =>
  discount.includes('BOGO') ? BADGE_COLOR['BOGO FREE'] : discount.includes('OFF') ? Colors.primary : '#8B5CF6';

export default function HomeScreen({ navigation }: any) {
  const { user, userProfile } = useAuth();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? MOCK_DEALS
    : MOCK_DEALS.filter(d => d.category === activeCategory);

  const firstName = userProfile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there';
  const pts = userProfile?.points_balance ?? 2450;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {firstName} 👋</Text>
            <Text style={styles.heroTitle}>Today's Best Deals</Text>
          </View>
          <View style={styles.ptsChip}>
            <Ionicons name="star" size={14} color="#FFB800" />
            <Text style={styles.ptsText}>{pts.toLocaleString()} Pts</Text>
          </View>
        </View>

        {/* ── Hero Banner ── */}
        <View style={styles.heroBanner}>
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <Ionicons name="film" size={12} color="#FFB800" />
              <Text style={styles.heroBadgeText}>Movie Night Special</Text>
            </View>
            <Text style={styles.heroHeadline}>Stream Sinhala Cinema{'\n'}+ Earn Real Rewards</Text>
            <Text style={styles.heroSub}>Watch. Earn. Redeem local deals.</Text>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => navigation.navigate('MoviesTab')}
              activeOpacity={0.85}
            >
              <Text style={styles.heroBtnText}>Explore Bundles</Text>
              <Ionicons name="arrow-forward" size={14} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.heroDecor}>
            <Text style={styles.heroDecorText}>🎬</Text>
          </View>
        </View>

        {/* ── Categories ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScroll}
          style={{ marginBottom: Spacing.base }}
        >
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.catChip, activeCategory === cat && styles.catChipActive]}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.8}
            >
              <Text style={[styles.catText, activeCategory === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Deals Header ── */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>
            {activeCategory === 'All' ? 'All Deals' : activeCategory + ' Deals'}
          </Text>
          <View style={styles.availablePill}>
            <Text style={styles.availableText}>{filtered.length} available</Text>
          </View>
        </View>

        {/* ── Deal Cards ── */}
        {filtered.map(deal => (
          <TouchableOpacity
            key={deal.id}
            style={styles.dealCard}
            onPress={() => navigation.navigate('DealDetail', { deal })}
            activeOpacity={0.9}
          >
            <ImageBackground
              source={{ uri: deal.image }}
              style={styles.dealImage}
              imageStyle={styles.dealImageStyle}
              resizeMode="cover"
            >
              <View style={styles.dealImageOverlay} />
              {deal.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>🔥 Popular</Text>
                </View>
              )}
              <View style={[styles.discountBadge, { backgroundColor: badgeColor(deal.discount) }]}>
                <Text style={styles.discountText}>{deal.discount}</Text>
              </View>
            </ImageBackground>

            <View style={styles.dealBody}>
              <View style={styles.dealBodyTop}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.merchantName}>{deal.merchant.toUpperCase()}</Text>
                  <Text style={styles.dealTitle} numberOfLines={2}>{deal.title}</Text>
                </View>
                <View style={styles.ratingBox}>
                  <Ionicons name="star" size={11} color="#FFB800" />
                  <Text style={styles.ratingText}>{deal.rating}</Text>
                </View>
              </View>

              <View style={styles.dealFooter}>
                <View style={styles.ptsRow}>
                  <Ionicons name="star" size={14} color="#FFB800" />
                  <Text style={styles.ptsCost}>{deal.pointsCost}</Text>
                  <Text style={styles.ptsLabel}>Pts</Text>
                  {deal.dealPrice && (
                    <Text style={styles.dealPrice}> · {deal.dealPrice}</Text>
                  )}
                </View>
                <View style={styles.expiryRow}>
                  <Ionicons name="time-outline" size={12} color={Colors.textMuted} />
                  <Text style={styles.expiryText}>{deal.expiry}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingHorizontal: Spacing.base, marginBottom: 16,
  },
  greeting: { fontSize: Typography.sm, color: Colors.textSecondary, fontWeight: '600', marginBottom: 2 },
  heroTitle: { fontSize: 26, fontWeight: '800', color: Colors.white, letterSpacing: -0.5 },
  ptsChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,184,0,0.12)', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: 'rgba(255,184,0,0.25)',
  },
  ptsText: { color: '#FFB800', fontSize: Typography.sm, fontWeight: '800' },

  heroBanner: {
    marginHorizontal: Spacing.base, marginBottom: 20,
    backgroundColor: '#1A0A1E', borderRadius: Radius['2xl'],
    padding: 20, flexDirection: 'row', alignItems: 'center',
    overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,42,85,0.25)',
  },
  heroContent: { flex: 1, gap: 8 },
  heroBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,184,0,0.12)', borderRadius: 12,
    paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start',
    borderWidth: 1, borderColor: 'rgba(255,184,0,0.2)',
  },
  heroBadgeText: { color: '#FFB800', fontSize: 11, fontWeight: '700' },
  heroHeadline: { fontSize: 18, fontWeight: '800', color: Colors.white, lineHeight: 24 },
  heroSub: { fontSize: Typography.xs, color: Colors.textSecondary, fontWeight: '500' },
  heroBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.primary, borderRadius: Radius.xl,
    paddingHorizontal: 16, paddingVertical: 10, alignSelf: 'flex-start',
    marginTop: 4,
  },
  heroBtnText: { color: Colors.white, fontSize: Typography.sm, fontWeight: '800' },
  heroDecor: { width: 70, alignItems: 'center', justifyContent: 'center' },
  heroDecorText: { fontSize: 52 },

  catScroll: { paddingHorizontal: Spacing.base, gap: 8 },
  catChip: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 24, backgroundColor: '#1C1F2A',
    borderWidth: 1, borderColor: '#2A2D3A',
  },
  catChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catText: { color: Colors.textSecondary, fontSize: Typography.sm, fontWeight: '600' },
  catTextActive: { color: Colors.white, fontWeight: '800' },

  sectionRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.base, marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.white },
  availablePill: {
    backgroundColor: '#1C1F2A', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4,
  },
  availableText: { color: Colors.textMuted, fontSize: 11, fontWeight: '600' },

  dealCard: {
    marginHorizontal: Spacing.base, marginBottom: 16,
    backgroundColor: '#151820', borderRadius: Radius['2xl'],
    overflow: 'hidden', borderWidth: 1, borderColor: '#22252F',
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 8,
  },
  dealImage: { width: '100%', height: 200 },
  dealImageStyle: { borderTopLeftRadius: Radius['2xl'], borderTopRightRadius: Radius['2xl'] },
  dealImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderTopLeftRadius: Radius['2xl'],
    borderTopRightRadius: Radius['2xl'],
  },
  popularBadge: {
    position: 'absolute', top: 12, left: 12,
    backgroundColor: 'rgba(0,0,0,0.75)', borderRadius: 16,
    paddingHorizontal: 12, paddingVertical: 5,
    backdropFilter: 'blur(10px)',
  },
  popularText: { color: Colors.white, fontSize: 12, fontWeight: '800' },
  discountBadge: {
    position: 'absolute', top: 12, right: 12,
    borderRadius: 16, paddingHorizontal: 12, paddingVertical: 5,
  },
  discountText: { color: Colors.white, fontSize: 12, fontWeight: '900' },

  dealBody: { padding: 16, gap: 10 },
  dealBodyTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  merchantName: { fontSize: 10, color: Colors.primary, fontWeight: '800', letterSpacing: 1, marginBottom: 2 },
  dealTitle: { fontSize: 15, fontWeight: '800', color: Colors.white, lineHeight: 21 },
  ratingBox: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: 'rgba(255,184,0,0.1)', borderRadius: 10,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  ratingText: { color: '#FFB800', fontSize: 11, fontWeight: '800' },

  dealFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ptsRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ptsCost: { color: '#FFB800', fontSize: 16, fontWeight: '900' },
  ptsLabel: { color: Colors.textSecondary, fontSize: 12, fontWeight: '600' },
  dealPrice: { color: Colors.textMuted, fontSize: 12, fontWeight: '500' },
  expiryRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  expiryText: { color: Colors.textMuted, fontSize: 11, fontWeight: '500' },
});
