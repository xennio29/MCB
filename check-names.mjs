import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('src/environments/environment.ts', 'utf8');
const supabaseUrl = envFile.match(/supabaseUrl:\s*'(.*?)'/)[1];
const supabaseKey = envFile.match(/supabaseKey:\s*'(.*?)'/)[1];

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: tix } = await supabase.from('tix_entries').select('first_name, last_name').limit(5);
  console.log('Sample Tix entries:', tix);
}
run();
