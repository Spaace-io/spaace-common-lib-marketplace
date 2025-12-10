import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env from project root
// Try to load from common-lib root first, but don't override if already loaded
const envPath = path.resolve(__dirname, '../.env');
if (!process.env.RABBITMQ_HOST) {
  // Only load if env vars are not already set (e.g., from main.ts)
  dotenv.config({ path: envPath });
}
