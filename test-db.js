import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('src/environments/environment.ts', 'utf8');
const supabaseUrl = envFile.match(/supabaseUrl: '(.*?)'/)[1];
const supabaseKey = envFile.match(/supabaseKey: '(.*?)'/)[1];

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: cols, error: err } = await supabase.from('master_entries').select('*').limit(1);
  console.log("Master columns:", cols, err);

  const { data: res, error: err2 } = await supabase.from('reservations').select('*').limit(1);
  console.log("Reservations columns:", res, err2);
}
run();
