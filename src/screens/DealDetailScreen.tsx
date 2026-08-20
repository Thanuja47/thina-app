import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { Colors, Spacing, Typography, Radius } from '../constants/theme';
import { Deal } from '../data/mockData';

interface DealDetailScreenProps {
  route: { params: { deal: Deal } };
  navigation: any;
}

export default function DealDetailScreen({ route, navigation }: DealDetailScreenProps) {
  const { deal } = route.params;
  const [claimed, setClaimed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  const handleClaim = () => {
    const generatedCode = `THINA-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    setCouponCode(generatedCode);
    setClaimed(true);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Banner Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: deal.image }} style={styles.image} resizeMode="cover" />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{deal.discount}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.merchant}>{deal.merchant}</Text>
          <Text style={styles.title}>{deal.title}</Text>

          <View style={styles.pointsBadgeRow}>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsValue}>{deal.pointsCost}</Text>
              <Text style={styles.pointsLabel}> Points Required</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>⭐ {deal.rating}</Text>
            </View>
          </View>

          {/* Pricing Row */}
          {(deal.originalPrice || deal.dealPrice) && (
            <View style={styles.priceRow}>
              <Text style={styles.dealPrice}>{deal.dealPrice}</Text>
              <Text style={styles.originalPrice}>{deal.originalPrice}</Text>
            </View>
          )}

          <View style={styles.divider} />

          {/* Info Details */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📍</Text>
              <View>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{deal.location}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>⏳</Text>
              <View>
                <Text style={styles.infoLabel}>Validity</Text>
                <Text style={styles.infoValue}>{deal.expiry}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <View style={styles.descSection}>
            <Text style={styles.sectionTitle}>Deal Details</Text>
            <Text style={styles.description}>{deal.description}</Text>
          </View>

          {/* Terms */}
          <View style={styles.descSection}>
            <Text style={styles.sectionTitle}>How to Redeem</Text>
            <Text style={styles.termsText}>
              1. Tap "Claim Coupon" below to generate your unique promo code.{'\n'}
              2. Show the code at any {deal.merchant} outlet or enter at online checkout.{'\n'}
              3. Enjoy your discount!
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomCostLabel}>Points Cost</Text>
          <Text style={styles.bottomCostValue}>{deal.pointsCost} Pts</Text>
        </View>
        <TouchableOpacity
          style={[styles.claimBtn, claimed && styles.claimedBtn]}
          onPress={handleClaim}
        >
          <Text style={styles.claimBtnText}>
            {claimed ? 'View Claimed Code' : 'Claim Coupon 🎉'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>🎁</Text>
            <Text style={styles.modalTitle}>Coupon Claimed!</Text>
            <Text style={styles.modalSubtitle}>
              Present this code at {deal.merchant}
            </Text>

            <View style={styles.codeBox}>
              <Text style={styles.codeLabel}>YOUR EXCLUSIVE CODE</Text>
              <Text style={styles.codeValue}>{couponCode}</Text>
            </View>

            <Text style={styles.modalNote}>
              Code saved to your active claimed coupons. Valid for 30 days.
            </Text>

            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Done & Explore More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 100 },
  imageContainer: { width: '100%', height: 260, position: 'relative' },
  image: { width: '100%', height: '100%' },
  backBtn: {
    position: 'absolute',
    top: 48,
    left: Spacing.base,
    backgroundColor: 'rgba(9,11,16,0.75)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.sm },
  discountBadge: {
    position: 'absolute',
    bottom: Spacing.base,
    right: Spacing.base,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  discountText: { color: Colors.white, fontWeight: '900', fontSize: Typography.sm },
  content: { padding: Spacing.lg },
  merchant: {
    color: Colors.amber,
    fontSize: Typography.xs,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: { color: Colors.white, fontSize: Typography.xl, fontWeight: '800', marginBottom: Spacing.md },
  pointsBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.md },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pointsValue: { color: Colors.amber, fontSize: Typography.md, fontWeight: '900' },
  pointsLabel: { color: Colors.textSecondary, fontSize: Typography.xs, fontWeight: '600' },
  ratingBadge: {
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ratingText: { color: Colors.white, fontSize: Typography.xs, fontWeight: '700' },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: Spacing.sm, marginBottom: Spacing.md },
  dealPrice: { color: Colors.white, fontSize: Typography.xl, fontWeight: '900' },
  originalPrice: { color: Colors.textMuted, fontSize: Typography.base, textDecorationLine: 'line-through' },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: Spacing.md },
  infoSection: { gap: Spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  infoIcon: { fontSize: 20 },
  infoLabel: { color: Colors.textMuted, fontSize: Typography.xs },
  infoValue: { color: Colors.white, fontSize: Typography.sm, fontWeight: '600' },
  descSection: { gap: 6 },
  sectionTitle: { color: Colors.white, fontSize: Typography.base, fontWeight: '700', marginBottom: 4 },
  description: { color: Colors.textSecondary, fontSize: Typography.sm, lineHeight: 22 },
  termsText: { color: Colors.textSecondary, fontSize: Typography.sm, lineHeight: 22 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomCostLabel: { color: Colors.textMuted, fontSize: Typography.xs },
  bottomCostValue: { color: Colors.amber, fontSize: Typography.lg, fontWeight: '900' },
  claimBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
  },
  claimedBtn: { backgroundColor: Colors.emerald },
  claimBtnText: { color: Colors.white, fontWeight: '800', fontSize: Typography.base },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalCard: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: Radius['2xl'],
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  modalEmoji: { fontSize: 48, marginBottom: Spacing.sm },
  modalTitle: { color: Colors.white, fontSize: Typography.xl, fontWeight: '900', marginBottom: 4 },
  modalSubtitle: { color: Colors.textSecondary, fontSize: Typography.sm, textAlign: 'center', marginBottom: Spacing.lg },
  codeBox: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  codeLabel: { color: Colors.textMuted, fontSize: Typography.xs, letterSpacing: 1, marginBottom: 4 },
  codeValue: { color: Colors.amber, fontSize: Typography.xl, fontWeight: '900', letterSpacing: 2 },
  modalNote: { color: Colors.textMuted, fontSize: Typography.xs, textAlign: 'center', marginBottom: Spacing.lg },
  modalCloseBtn: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  modalCloseText: { color: Colors.white, fontWeight: '800', fontSize: Typography.base },
});
