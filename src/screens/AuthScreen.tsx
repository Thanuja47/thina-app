import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Colors, Spacing, Typography, Radius } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

type Mode = 'login' | 'signup';

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    if (mode === 'signup' && password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    const { error } =
      mode === 'login'
        ? await signIn(email.trim(), password)
        : await signUp(email.trim(), password);
    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message || 'Something went wrong. Please try again.');
    } else if (mode === 'signup') {
      Alert.alert(
        'Check your email ✉️',
        'We sent you a confirmation link. Please verify your email before logging in.'
      );
      setMode('login');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Logo Area */}
        <View style={styles.logoArea}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>T+</Text>
          </View>
          <Text style={styles.brandName}>Thina Deals</Text>
          <Text style={styles.tagline}>Stream Sinhala Cinema. Unlock Real Savings.</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Tab toggle */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tab, mode === 'login' && styles.tabActive]}
              onPress={() => setMode('login')}
            >
              <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>
                Log In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, mode === 'signup' && styles.tabActive]}
              onPress={() => setMode('signup')}
            >
              <Text style={[styles.tabText, mode === 'signup' && styles.tabTextActive]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Fields */}
          <View style={styles.fields}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="you@email.com"
                placeholderTextColor={Colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Min. 6 characters"
                placeholderTextColor={Colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {mode === 'signup' && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Repeat password"
                  placeholderTextColor={Colors.textMuted}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.submitText}>
                {mode === 'login' ? 'Log In to Thina+' : 'Create My Account'}
              </Text>
            )}
          </TouchableOpacity>

          <Text style={styles.footerNote}>
            By continuing, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.base,
    paddingBottom: Spacing['3xl'],
  },
  logoArea: { alignItems: 'center', marginBottom: Spacing['2xl'] },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: Radius.xl,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  logoText: { fontSize: 28, fontWeight: '900', color: Colors.white },
  brandName: {
    fontSize: Typography['2xl'],
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
  },
  tagline: { fontSize: Typography.sm, color: Colors.textSecondary, textAlign: 'center' },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius['2xl'],
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabRow: { flexDirection: 'row', marginBottom: Spacing.lg, gap: Spacing.sm },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    alignItems: 'center',
    backgroundColor: Colors.surface,
  },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { color: Colors.textSecondary, fontWeight: '600', fontSize: Typography.sm },
  tabTextActive: { color: Colors.white, fontWeight: '700' },
  fields: { gap: Spacing.md, marginBottom: Spacing.lg },
  inputGroup: { gap: 6 },
  label: { color: Colors.textSecondary, fontSize: Typography.xs, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    color: Colors.white,
    fontSize: Typography.base,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  submitText: { color: Colors.white, fontWeight: '800', fontSize: Typography.base },
  footerNote: { color: Colors.textMuted, fontSize: Typography.xs, textAlign: 'center' },
  link: { color: Colors.cyan, fontWeight: '600' },
});
