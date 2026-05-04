import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('src/environments/environment.ts', 'utf8');
const supabaseUrl = envFile.match(/supabaseUrl:\s*'(.*?)'/)[1];
const supabaseKey = envFile.match(/supabaseKey:\s*'(.*?)'/)[1];

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: tix, error: e1 } = await supabase.from('tix_entries').select('*');
  const { data: masters, error: e2 } = await supabase.from('master_entries').select('*');
  console.log('Tix count:', tix?.length, e1);
  console.log('Masters count:', masters?.length, e2);
}
run();
