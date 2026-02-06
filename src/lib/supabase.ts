import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://kysjdpaxucnuibjluwvb.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImIyMDNkNjg3LWE4NzUtNDU0OS04M2UwLTZlOTMyN2Y5ZmFlZSJ9.eyJwcm9qZWN0SWQiOiJreXNqZHBheHVjbnVpYmpsdXd2YiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcwMzU3NDExLCJleHAiOjIwODU3MTc0MTEsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.kcBq2cskSWelZI2l1OBRl_WUbrUIjJG-fcDJdB9LzHY';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };