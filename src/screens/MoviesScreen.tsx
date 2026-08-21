import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Dimensions, ImageBackground, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_MOVIES } from '../data/mockData';
import { Colors, Spacing, Typography, Radius } from '../constants/theme';

const { width } = Dimensions.get('window');
const CARD_W = (width - Spacing.base * 2 - 12) / 2;

const GENRES = ['All', 'Drama', 'Sci-Fi', 'Comedy', 'Romance', 'Action', 'Thriller'];

const BADGE_COLORS: Record<string, string> = {
  'Thina Exclusive': '#FF2A55',
  'Trending #1': '#F59E0B',
  'Family Favorite': '#10B981',
  Blockbuster: '#8B5CF6',
  'Award Winner': '#06B6D4',
  'High Octane': '#EF4444',
};

export default function MoviesScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');

  const filtered = MOCK_MOVIES.filter(m => {
    const matchQ = m.title.toLowerCase().includes(query.toLowerCase()) || (m.titleSinhala || '').includes(query);
    const matchG = genre === 'All' || m.genre.includes(genre);
    return matchQ && matchG;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Thina Cinema 🎬</Text>
          <Text style={styles.subtitle}>Stream Premier Sinhala Movies & Originals</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <Ionicons name="search" size={18} color={Colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search titles (e.g. Gautama, ගෞතම...)"
            placeholderTextColor={Colors.textMuted}
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Genre Filter */}
        <ScrollView
          horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreRow}
          style={{ marginBottom: 20 }}
        >
          {GENRES.map(g => (
            <TouchableOpacity
              key={g}
              style={[styles.genreChip, genre === g && styles.genreActive]}
              onPress={() => setGenre(g)}
              activeOpacity={0.8}
            >
              <Text style={[styles.genreText, genre === g && styles.genreTextActive]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>
            {genre === 'All' ? 'All Movies' : genre}
          </Text>
          <View style={styles.countPill}>
            <Text style={styles.countText}>{filtered.length} titles</Text>
          </View>
        </View>

        {/* Grid */}
        <View style={styles.grid}>
          {filtered.map(movie => (
            <TouchableOpacity
              key={movie.id}
              style={styles.movieCard}
              activeOpacity={0.88}
              onPress={() => {}}
            >
              <ImageBackground
                source={{ uri: movie.poster }}
                style={styles.poster}
                imageStyle={styles.posterImg}
                resizeMode="cover"
              >
                <View style={styles.posterOverlay} />

                {/* Badge */}
                {movie.badge && (
                  <View style={[styles.badge, { backgroundColor: BADGE_COLORS[movie.badge] || Colors.primary }]}>
                    <Text style={styles.badgeText}>{movie.badge}</Text>
                  </View>
                )}

                {/* Rating */}
                <View style={styles.ratingBox}>
                  <Ionicons name="star" size={10} color="#FFB800" />
                  <Text style={styles.ratingText}>{movie.rating}</Text>
                </View>

                {/* Play Overlay */}
                <View style={styles.playBtn}>
                  <Ionicons name="play-circle" size={32} color="rgba(255,255,255,0.9)" />
                </View>
              </ImageBackground>

              <View style={styles.movieInfo}>
                <Text style={styles.movieTitle} numberOfLines={1}>{movie.title}</Text>
                {movie.titleSinhala && (
                  <Text style={styles.movieSinhala} numberOfLines={1}>{movie.titleSinhala}</Text>
                )}
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>{movie.year}</Text>
                  <View style={styles.dot} />
                  <Text style={styles.metaText}>{movie.genre}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="film-outline" size={48} color={Colors.textMuted} />
            <Text style={styles.emptyText}>No movies found</Text>
            <Text style={styles.emptySubText}>Try a different search or genre</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.base, marginBottom: 16, gap: 4 },
  title: { fontSize: 26, fontWeight: '900', color: Colors.white, letterSpacing: -0.5 },
  subtitle: { fontSize: Typography.sm, color: Colors.textSecondary, fontWeight: '500' },

  searchRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#151820', borderRadius: Radius.xl,
    marginHorizontal: Spacing.base, marginBottom: 16,
    paddingHorizontal: 14, paddingVertical: 12,
    borderWidth: 1, borderColor: '#22252F',
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: Colors.white, fontSize: Typography.sm, fontWeight: '500' },

  genreRow: { paddingHorizontal: Spacing.base, gap: 8 },
  genreChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 24,
    backgroundColor: '#1C1F2A', borderWidth: 1, borderColor: '#2A2D3A',
  },
  genreActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  genreText: { color: Colors.textSecondary, fontSize: Typography.sm, fontWeight: '600' },
  genreTextActive: { color: Colors.white, fontWeight: '800' },

  sectionRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.base, marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.white },
  countPill: { backgroundColor: '#1C1F2A', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  countText: { color: Colors.textMuted, fontSize: 11, fontWeight: '600' },

  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: Spacing.base, gap: 12,
  },
  movieCard: {
    width: (width - Spacing.base * 2 - 12) / 2,
    backgroundColor: '#151820', borderRadius: Radius.xl,
    overflow: 'hidden', borderWidth: 1, borderColor: '#22252F',
    elevation: 4, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 8,
  },
  poster: { width: '100%', aspectRatio: 0.7 },
  posterImg: { borderTopLeftRadius: Radius.xl, borderTopRightRadius: Radius.xl },
  posterOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  badge: {
    position: 'absolute', top: 8, left: 8,
    borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4,
  },
  badgeText: { color: Colors.white, fontSize: 9, fontWeight: '800', letterSpacing: 0.3 },
  ratingBox: {
    position: 'absolute', top: 8, right: 8,
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: 'rgba(0,0,0,0.65)', borderRadius: 10,
    paddingHorizontal: 7, paddingVertical: 4,
  },
  ratingText: { color: '#FFB800', fontSize: 10, fontWeight: '800' },
  playBtn: {
    position: 'absolute', bottom: 8, right: 8,
  },
  movieInfo: { padding: 10, gap: 3 },
  movieTitle: { fontSize: 13, fontWeight: '800', color: Colors.white },
  movieSinhala: { fontSize: 11, color: Colors.textSecondary, fontWeight: '500' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  metaText: { color: Colors.textMuted, fontSize: 10, fontWeight: '500' },
  dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: Colors.textMuted },

  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 8 },
  emptyText: { color: Colors.textSecondary, fontSize: Typography.base, fontWeight: '700' },
  emptySubText: { color: Colors.textMuted, fontSize: Typography.sm, fontWeight: '500' },
});
