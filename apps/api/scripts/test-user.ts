// Test user registration
import dotenv from 'dotenv';
dotenv.config();

import { db } from './db/index';
import bcrypt from 'bcryptjs';
import { users } from './db/schema';

async function createTestUser() {
  try {
    console.log('Creating test user...');
    
    const hashedPassword = await bcrypt.hash('test123', 10);
    
    const [newUser] = await db
      .insert(users)
      .values({
        email: 'test@example.com',
        password: hashedPassword,
        firstName: 'Test',
        lastName: 'User',
        role: 'admin',
      })
      .returning();
    
    console.log('[OK] Test user created successfully!');
    console.log('User:', {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
    });
  } catch (error) {
    console.error('[ERROR] Failed to create test user:');
    console.error(error);
  }
}

createTestUser();
