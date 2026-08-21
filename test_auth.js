const { createClient } = require('@supabase/supabase-js');

const url = 'https://vohtjkesxpscfzhftoxs.supabase.co';
const key = 'sb_publishable_Dhxhj2r5G4-y2JWLWXX3eg_Ql6Je_ZJ';

const supabase = createClient(url, key);

async function run() {
  console.log('Testing SignUp...');
  const testEmail = `test_${Date.now()}@thina.lk`;
  const { data, error } = await supabase.auth.signUp({
    email: testEmail,
    password: 'Password123!',
  });

  if (error) {
    console.error('SignUp Error:', error.message, error);
  } else {
    console.log('SignUp Success! User ID:', data.user?.id);
  }

  console.log('Testing SignIn...');
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: 'Password123!',
  });

  if (signInError) {
    console.error('SignIn Error:', signInError.message);
  } else {
    console.log('SignIn Success! Token:', signInData.session?.access_token ? 'OK' : 'No Session (Needs Email Confirmation)');
  }
}

run();
