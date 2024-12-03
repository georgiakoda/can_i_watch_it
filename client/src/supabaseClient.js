// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';


// Your Supabase URL and anonymous API key
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
