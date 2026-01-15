
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lizeboqnsypharlncczb.supabase.co';
const supabaseAnonKey = 'sb_publishable_rSM6PKqxcoJ_JqNjBMNp0g_c2kBbR5-';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
