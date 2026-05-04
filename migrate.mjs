import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('src/environments/environment.ts', 'utf8');
const supabaseUrl = envFile.match(/supabaseUrl:\s*'(.*?)'/)[1];
const supabaseKey = envFile.match(/supabaseKey:\s*'(.*?)'/)[1];

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: tix, error: tixErr } = await supabase.from('tix_entries').select('*');
  if (tixErr) {
    console.error('Error fetching tix:', tixErr);
  } else if (tix && tix.length > 0) {
    console.log(`Fetched ${tix.length} tix entries, updating...`);
    const updatedTix = tix.map(t => ({
      ...t,
      first_name: t.last_name,
      last_name: t.first_name
    }));
    
    // Process in batches of 100 to avoid request too large errors
    for (let i = 0; i < updatedTix.length; i += 100) {
      const batch = updatedTix.slice(i, i + 100);
      const { error } = await supabase.from('tix_entries').upsert(batch);
      if (error) console.error('Error upserting tix batch:', error);
    }
    console.log('Finished updating tix_entries');
  }

  const { data: masters, error: mastersErr } = await supabase.from('master_entries').select('*');
  if (mastersErr) {
    console.error('Error fetching masters:', mastersErr);
  } else if (masters && masters.length > 0) {
    console.log(`Fetched ${masters.length} master entries, updating...`);
    const updatedMasters = masters.map(m => ({
      ...m,
      first_name: m.last_name,
      last_name: m.first_name
    }));
    
    const { error } = await supabase.from('master_entries').upsert(updatedMasters);
    if (error) console.error('Error upserting masters:', error);
    else console.log('Finished updating master_entries');
  }
}

run();
