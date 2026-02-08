// Test database connection
import dotenv from 'dotenv';
dotenv.config();

import { db } from './db/index';
import { sql } from 'drizzle-orm';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('Database URL:', process.env.DATABASE_URL?.replace(/:[^:]*@/, ':***@'));
    
    const result = await db.execute(sql`SELECT NOW() as current_time, current_database() as database`);
    
    console.log('[OK] Database connection successful!');
    console.log('Current time:', result.rows[0].current_time);
    console.log('Database:', result.rows[0].database);
    process.exit(0);
  } catch (error) {
    console.error('[ERROR] Database connection failed:');
    console.error(error);
    process.exit(1);
  }
}

testConnection();
