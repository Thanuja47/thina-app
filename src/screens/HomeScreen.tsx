import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  Pressable,
} from 'react-native';
import { Colors, Spacing, Typography, Radius } from '../constants/theme';
import { MOCK_DEALS, Deal } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface HomeScreenProps {
  navigation: any;
}

const CATEGORIES = ['All', 'Dining', 'Cinema', 'Shopping', 'Travel', 'Groceries'];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  const filteredDeals =
    selectedCategory === 'All'
      ? MOCK_DEALS
      : MOCK_DEALS.filter((d) => d.category === selectedCategory);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const renderDealCard = ({ item }: { item: Deal }) => (
    <TouchableOpacity
      style={styles.dealCard}
      onPress={() => navigation.navigate('DealDetail', { deal: item })}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.image }} style={styles.dealImage} resizeMode="cover" />
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{item.discount}</Text>
      </View>
      {item.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>🔥 Popular</Text>
        </View>
      )}
      <View style={styles.dealBody}>
        <Text style={styles.merchantName}>{item.merchant}</Text>
        <Text style={styles.dealTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.dealFooter}>
          <View style={styles.pointsRow}>
            <Text style={styles.pointsValue}>{item.pointsCost}</Text>
            <Text style={styles.pointsLabel}> Pts</Text>
          </View>
          <Text style={styles.expiry}>{item.expiry}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Hello, {user?.email?.split('@')[0] || 'there'} 👋
            </Text>
            <Text style={styles.headerTitle}>Today's Best Deals</Text>
          </View>
          <View style={styles.pointsPill}>
            <Text style={styles.pointsPillText}>⭐ 2,450 Pts</Text>
          </View>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroBannerContent}>
            <Text style={styles.heroLabel}>🎬 Movie Night Special</Text>
            <Text style={styles.heroTitle}>Stream Sinhala Cinema{'\n'}+ Earn Real Rewards</Text>
            <TouchableOpacity style={styles.heroBtn}>
              <Text style={styles.heroBtnText}>Explore Bundles →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Deals' : selectedCategory + ' Deals'}
          </Text>
          <Text style={styles.sectionCount}>{filteredDeals.length} available</Text>
        </View>

        {/* Deals List */}
        <View style={styles.dealsList}>
          {filteredDeals.map((deal) => (
            <TouchableOpacity
              key={deal.id}
              style={styles.dealCard}
              onPress={() => navigation.navigate('DealDetail', { deal })}
              activeOpacity={0.85}
            >
              <Image source={{ uri: deal.image }} style={styles.dealImage} resizeMode="cover" />
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{deal.discount}</Text>
              </View>
              {deal.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>🔥 Popular</Text>
                </View>
              )}
              <View style={styles.dealBody}>
                <Text style={styles.merchantName}>{deal.merchant}</Text>
                <Text style={styles.dealTitle} numberOfLines={2}>
                  {deal.title}
                </Text>
                <View style={styles.dealFooter}>
                  <View style={styles.pointsRow}>
                    <Text style={styles.pointsValue}>{deal.pointsCost}</Text>
                    <Text style={styles.pointsLabel}> Pts</Text>
                  </View>
                  <Text style={styles.expiry}>{deal.expiry}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  greeting: { color: Colors.textSecondary, fontSize: Typography.sm },
  headerTitle: { color: Colors.white, fontSize: Typography.xl, fontWeight: '800' },
  pointsPill: {
    backgroundColor: Colors.card,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pointsPillText: { color: Colors.amber, fontSize: Typography.sm, fontWeight: '700' },
  heroBanner: {
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.base,
    borderRadius: Radius['2xl'],
    backgroundColor: '#1A0A12',
    borderWidth: 1,
    borderColor: '#3D1525',
    padding: Spacing.lg,
    overflow: 'hidden',
  },
  heroBannerContent: {},
  heroLabel: { color: Colors.primary, fontSize: Typography.xs, fontWeight: '700', marginBottom: 6 },
  heroTitle: { color: Colors.white, fontSize: Typography.lg, fontWeight: '800', lineHeight: 26, marginBottom: Spacing.md },
  heroBtn: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
  },
  heroBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.sm },
  categoryScroll: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  categoryText: { color: Colors.textSecondary, fontSize: Typography.sm, fontWeight: '600' },
  categoryTextActive: { color: Colors.white, fontWeight: '700' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.md,
  },
  sectionTitle: { color: Colors.white, fontSize: Typography.md, fontWeight: '700' },
  sectionCount: { color: Colors.textMuted, fontSize: Typography.xs },
  dealsList: { paddingHorizontal: Spacing.base, gap: Spacing.md },
  dealCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius['2xl'],
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dealImage: { width: '100%', height: 160 },
  discountBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  discountText: { color: Colors.white, fontSize: Typography.xs, fontWeight: '800' },
  popularBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  popularText: { color: Colors.white, fontSize: Typography.xs, fontWeight: '700' },
  dealBody: { padding: Spacing.md },
  merchantName: {
    color: Colors.amber,
    fontSize: Typography.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  dealTitle: { color: Colors.white, fontSize: Typography.base, fontWeight: '700', marginBottom: Spacing.sm },
  dealFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pointsRow: { flexDirection: 'row', alignItems: 'baseline' },
  pointsValue: { color: Colors.amber, fontSize: Typography.lg, fontWeight: '900' },
  pointsLabel: { color: Colors.textSecondary, fontSize: Typography.sm },
  expiry: { color: Colors.textMuted, fontSize: Typography.xs },
});
