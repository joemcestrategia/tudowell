import { createClient } from '@libsql/client';
import fs from 'fs';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN");
  process.exit(1);
}

const client = createClient({ url, authToken });

async function main() {
  const sql = fs.readFileSync(process.argv[2], 'utf8');
  // Split into statements
  const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);
  
  console.log(`Found ${statements.length} statements. Executing...`);
  
  for (const stmt of statements) {
    try {
      await client.execute(stmt);
      console.log(`[SUCCESS]: ${stmt.substring(0, 50)}...`);
    } catch (e) {
      console.error(`[ERROR]: ${stmt.substring(0, 50)}...`, e.message);
    }
  }
  console.log("Migration complete.");
}

main();
