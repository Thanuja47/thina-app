import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Colors, Spacing, Typography, Radius } from '../constants/theme';
import { MOCK_MOVIES, Movie } from '../data/mockData';

const GENRES = ['All', 'Drama', 'Sci-Fi', 'Comedy', 'Romance', 'Action'];

export default function MoviesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const filteredMovies = MOCK_MOVIES.filter((m) => {
    const matchesGenre = selectedGenre === 'All' || m.genre.includes(selectedGenre);
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.titleSinhala && m.titleSinhala.includes(searchQuery));
    return matchesGenre && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thina Cinema 🎬</Text>
        <Text style={styles.headerSubtitle}>Stream Premier Sinhala Movies & Originals</Text>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search titles (e.g. Gautama, මිදුණු...)"
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Genre Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.genreScroll}
      >
        {GENRES.map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.genreChip, selectedGenre === g && styles.genreChipActive]}
            onPress={() => setSelectedGenre(g)}
          >
            <Text style={[styles.genreText, selectedGenre === g && styles.genreTextActive]}>
              {g}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Movie Catalog Grid */}
      <ScrollView contentContainerStyle={styles.movieGrid}>
        <View style={styles.gridRow}>
          {filteredMovies.map((movie) => (
            <TouchableOpacity
              key={movie.id}
              style={styles.movieCard}
              onPress={() => setSelectedMovie(movie)}
              activeOpacity={0.85}
            >
              <Image source={{ uri: movie.poster }} style={styles.poster} resizeMode="cover" />
              {movie.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{movie.badge}</Text>
                </View>
              )}
              <View style={styles.movieOverlay}>
                <Text style={styles.ratingText}>⭐ {movie.rating}</Text>
              </View>
              <View style={styles.movieDetails}>
                <Text style={styles.movieTitle} numberOfLines={1}>
                  {movie.title}
                </Text>
                {movie.titleSinhala && (
                  <Text style={styles.sinhalaTitle} numberOfLines={1}>
                    {movie.titleSinhala}
                  </Text>
                )}
                <Text style={styles.genreTextSmall}>
                  {movie.year} • {movie.genre}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Movie Details Modal */}
      <Modal visible={!!selectedMovie} transparent animationType="fade">
        {selectedMovie && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Image source={{ uri: selectedMovie.poster }} style={styles.modalPoster} resizeMode="cover" />

              <View style={styles.modalContent}>
                <View style={styles.modalHeaderRow}>
                  <View>
                    <Text style={styles.modalTitle}>{selectedMovie.title}</Text>
                    {selectedMovie.titleSinhala && (
                      <Text style={styles.modalSinhala}>{selectedMovie.titleSinhala}</Text>
                    )}
                  </View>
                  <View style={styles.modalRating}>
                    <Text style={styles.modalRatingText}>⭐ {selectedMovie.rating}</Text>
                  </View>
                </View>

                <Text style={styles.modalMeta}>
                  {selectedMovie.year} • {selectedMovie.duration} • Dir. {selectedMovie.director}
                </Text>

                <Text style={styles.modalDesc}>{selectedMovie.description}</Text>

                <TouchableOpacity
                  style={styles.streamBtn}
                  onPress={() => {
                    const m = selectedMovie;
                    setSelectedMovie(null);
                    alert(`Now Streaming: "${m.title}". Earn +150 Points on completion!`);
                  }}
                >
                  <Text style={styles.streamBtnText}>▶ Stream Full Movie HD</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.closeModalBtn}
                  onPress={() => setSelectedMovie(null)}
                >
                  <Text style={styles.closeModalText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.base, paddingTop: Spacing.lg, paddingBottom: Spacing.sm },
  headerTitle: { color: Colors.white, fontSize: Typography.xl, fontWeight: '800' },
  headerSubtitle: { color: Colors.textSecondary, fontSize: Typography.xs, marginBottom: Spacing.md },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: {
    flex: 1,
    color: Colors.white,
    fontSize: Typography.sm,
    paddingVertical: Spacing.sm + 2,
  },
  genreScroll: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  genreChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  genreChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  genreText: { color: Colors.textSecondary, fontSize: Typography.xs, fontWeight: '600' },
  genreTextActive: { color: Colors.white, fontWeight: '700' },
  movieGrid: { paddingHorizontal: Spacing.base, paddingTop: Spacing.sm },
  gridRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  movieCard: {
    width: '47.5%',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  poster: { width: '100%', height: 210 },
  badge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  badgeText: { color: Colors.white, fontSize: Typography.xs - 2, fontWeight: '800' },
  movieOverlay: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: 'rgba(9,11,16,0.8)',
    paddingHorizontal: Spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  ratingText: { color: Colors.amber, fontSize: Typography.xs - 1, fontWeight: '800' },
  movieDetails: { padding: Spacing.sm },
  movieTitle: { color: Colors.white, fontSize: Typography.sm, fontWeight: '700' },
  sinhalaTitle: { color: Colors.textSecondary, fontSize: Typography.xs, marginTop: 1 },
  genreTextSmall: { color: Colors.textMuted, fontSize: Typography.xs - 1, marginTop: 2 },
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
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalPoster: { width: '100%', height: 220 },
  modalContent: { padding: Spacing.lg, gap: Spacing.sm },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  modalTitle: { color: Colors.white, fontSize: Typography.lg, fontWeight: '800' },
  modalSinhala: { color: Colors.amber, fontSize: Typography.sm, fontWeight: '600' },
  modalRating: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalRatingText: { color: Colors.amber, fontSize: Typography.xs, fontWeight: '800' },
  modalMeta: { color: Colors.textMuted, fontSize: Typography.xs },
  modalDesc: { color: Colors.textSecondary, fontSize: Typography.sm, lineHeight: 20 },
  streamBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  streamBtnText: { color: Colors.white, fontWeight: '800', fontSize: Typography.base },
  closeModalBtn: { alignItems: 'center', paddingVertical: Spacing.sm },
  closeModalText: { color: Colors.textMuted, fontSize: Typography.sm, fontWeight: '600' },
});
