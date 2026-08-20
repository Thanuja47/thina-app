import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl: string =
  Constants.expoConfig?.extra?.supabaseUrl || 'https://placeholder.supabase.co';
const supabaseAnonKey: string =
  Constants.expoConfig?.extra?.supabaseAnonKey ||
  'sb_publishable_Dhxhj2r5G4-y2JWLWXX3eg_Ql6Je_ZJ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
