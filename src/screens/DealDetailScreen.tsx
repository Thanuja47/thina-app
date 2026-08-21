import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ImageBackground, Dimensions, Alert, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { Deal } from '../data/mockData';
import { Colors, Spacing, Typography, Radius } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function DealDetailScreen({ route, navigation }: any) {
  const deal: Deal = route.params?.deal;
  const insets = useSafeAreaInsets();
  const { userProfile } = useAuth();
  const [redeemed, setRedeemed] = useState(false);

  const pts = userProfile?.points_balance ?? 2450;
  const canRedeem = pts >= deal.pointsCost;

  const handleRedeem = () => {
    if (!canRedeem) {
      Alert.alert(
        'Not Enough Points',
        `You need ${deal.pointsCost - pts} more points to redeem this deal.`,
        [{ text: 'OK' }]
      );
      return;
    }
    Alert.alert(
      '🎉 Deal Redeemed!',
      `You've successfully redeemed "${deal.title}". Show this code at ${deal.merchant}: THINA-${deal.id.toUpperCase()}-2024`,
      [{ text: 'Got it!', onPress: () => setRedeemed(true) }]
    );
  };

  if (!deal) return null;

  return (
    <View style={[styles.container, { paddingTop: 0 }]}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <ImageBackground source={{ uri: deal.image }} style={styles.hero} resizeMode="cover">
          <View style={styles.heroGrad} />
          <TouchableOpacity
            style={[styles.backBtn, { top: insets.top + 12 }]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.white} />
          </TouchableOpacity>

          <View style={styles.heroBottom}>
            <View style={[styles.discountPill, { backgroundColor: deal.discount.includes('BOGO') ? '#10B981' : Colors.primary }]}>
              <Text style={styles.discountText}>{deal.discount}</Text>
            </View>
            <Text style={styles.heroMerchant}>{deal.merchant}</Text>
            <Text style={styles.heroTitle}>{deal.title}</Text>
          </View>
        </ImageBackground>

        <View style={styles.body}>
          {/* Meta Row */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={14} color={Colors.primary} />
              <Text style={styles.metaText} numberOfLines={1}>{deal.location}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color={Colors.textMuted} />
              <Text style={styles.metaText}>{deal.expiry}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="star" size={14} color="#FFB800" />
              <Text style={styles.metaText}>{deal.rating}/5</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About This Deal</Text>
            <Text style={styles.description}>{deal.description}</Text>
          </View>

          {/* Price Comparison */}
          {deal.originalPrice && (
            <View style={styles.priceCard}>
              <View style={styles.priceRow}>
                <View>
                  <Text style={styles.priceLabel}>Original Price</Text>
                  <Text style={styles.originalPrice}>{deal.originalPrice}</Text>
                </View>
                <Ionicons name="arrow-forward" size={18} color={Colors.textMuted} />
                <View>
                  <Text style={[styles.priceLabel, { color: '#10B981' }]}>Deal Price</Text>
                  <Text style={styles.dealPrice}>{deal.dealPrice}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Points Section */}
          <View style={styles.ptsCard}>
            <View style={styles.ptsRow}>
              <View>
                <Text style={styles.ptsLabel}>Points Required</Text>
                <View style={styles.ptsAmount}>
                  <Ionicons name="star" size={20} color="#FFB800" />
                  <Text style={styles.ptsValue}>{deal.pointsCost.toLocaleString()}</Text>
                  <Text style={styles.ptsUnit}>pts</Text>
                </View>
              </View>
              <View style={styles.ptsSeparator} />
              <View>
                <Text style={styles.ptsLabel}>Your Balance</Text>
                <View style={styles.ptsAmount}>
                  <Ionicons name="wallet-outline" size={20} color={canRedeem ? '#10B981' : '#EF4444'} />
                  <Text style={[styles.ptsValue, { color: canRedeem ? '#10B981' : '#EF4444' }]}>
                    {pts.toLocaleString()}
                  </Text>
                  <Text style={styles.ptsUnit}>pts</Text>
                </View>
              </View>
            </View>
            {!canRedeem && (
              <View style={styles.insufficientBanner}>
                <Ionicons name="information-circle-outline" size={14} color="#F59E0B" />
                <Text style={styles.insufficientText}>
                  You need {(deal.pointsCost - pts).toLocaleString()} more points
                </Text>
              </View>
            )}
          </View>

          {/* Redeem Button */}
          <TouchableOpacity
            style={[styles.redeemBtn, redeemed && styles.redeemBtnSuccess, !canRedeem && styles.redeemBtnDisabled]}
            onPress={handleRedeem}
            activeOpacity={0.85}
          >
            <Ionicons
              name={redeemed ? 'checkmark-circle' : canRedeem ? 'pricetag' : 'lock-closed'}
              size={20}
              color={Colors.white}
            />
            <Text style={styles.redeemText}>
              {redeemed ? 'Deal Redeemed ✓' : canRedeem ? 'Redeem This Deal' : 'Not Enough Points'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareBtn} activeOpacity={0.8}
            onPress={() => Alert.alert('Share', 'Share feature coming soon!')}
          >
            <Ionicons name="share-outline" size={18} color={Colors.textSecondary} />
            <Text style={styles.shareText}>Share This Deal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  hero: { width, height: 300 },
  heroGrad: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  backBtn: {
    position: 'absolute', left: 16,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center',
  },
  heroBottom: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: Spacing.base, paddingBottom: 20, gap: 6,
  },
  discountPill: {
    borderRadius: 16, paddingHorizontal: 12, paddingVertical: 5, alignSelf: 'flex-start',
  },
  discountText: { color: Colors.white, fontSize: 12, fontWeight: '900' },
  heroMerchant: { fontSize: 11, color: Colors.primary, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { fontSize: 22, fontWeight: '900', color: Colors.white, lineHeight: 28 },

  body: { padding: Spacing.base, gap: 16 },

  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1, minWidth: 100 },
  metaText: { color: Colors.textSecondary, fontSize: 12, fontWeight: '600', flex: 1 },

  section: { gap: 8 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: Colors.white },
  description: { color: Colors.textSecondary, fontSize: 14, lineHeight: 22, fontWeight: '500' },

  priceCard: {
    backgroundColor: '#151820', borderRadius: Radius.xl,
    padding: 16, borderWidth: 1, borderColor: '#22252F',
  },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  priceLabel: { color: Colors.textMuted, fontSize: 11, fontWeight: '700', marginBottom: 4, textTransform: 'uppercase' },
  originalPrice: { color: Colors.textSecondary, fontSize: 16, fontWeight: '700', textDecorationLine: 'line-through' },
  dealPrice: { color: '#10B981', fontSize: 20, fontWeight: '900' },

  ptsCard: {
    backgroundColor: '#151820', borderRadius: Radius.xl,
    padding: 16, borderWidth: 1, borderColor: '#22252F', gap: 10,
  },
  ptsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  ptsSeparator: { width: 1, height: 40, backgroundColor: '#22252F' },
  ptsLabel: { color: Colors.textMuted, fontSize: 11, fontWeight: '700', marginBottom: 6, textTransform: 'uppercase' },
  ptsAmount: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  ptsValue: { fontSize: 22, fontWeight: '900', color: '#FFB800' },
  ptsUnit: { color: Colors.textSecondary, fontSize: 12, fontWeight: '600' },
  insufficientBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(245,158,11,0.1)', borderRadius: 10,
    padding: 10, borderWidth: 1, borderColor: 'rgba(245,158,11,0.2)',
  },
  insufficientText: { color: '#F59E0B', fontSize: 12, fontWeight: '700' },

  redeemBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: Colors.primary, borderRadius: Radius.xl,
    paddingVertical: 16,
  },
  redeemBtnSuccess: { backgroundColor: '#10B981' },
  redeemBtnDisabled: { backgroundColor: '#333', opacity: 0.7 },
  redeemText: { color: Colors.white, fontSize: 16, fontWeight: '900' },

  shareBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderWidth: 1, borderColor: '#22252F', borderRadius: Radius.xl, paddingVertical: 14,
  },
  shareText: { color: Colors.textSecondary, fontSize: Typography.base, fontWeight: '700' },
});
