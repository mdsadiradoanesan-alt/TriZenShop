import { createClient } from '@supabase/supabase-js';

// Access environment variables using Vite's import.meta.env
// Using optional chaining to prevent crash if import.meta.env is undefined
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://lizeboqnsypharlncczb.supabase.co';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_rSM6PKqxcoJ_JqNjBMNp0g_c2kBbR5-';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);