import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { users, activityLog } from '../db/schema';
import { eq } from 'drizzle-orm';
import { config } from '../config';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

interface RegisterInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface UserResponse {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  isActive: boolean;
  createdAt?: Date;
}

export const authService = {
  async register(input: RegisterInput): Promise<{ user: UserResponse; token: string }> {
    const { email, password, firstName, lastName } = input;

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      throw new AppError(409, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      })
      .returning();

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn } as any
    );

    logger.info('User registered', { userId: newUser.id, email });

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName ?? undefined,
        lastName: newUser.lastName ?? undefined,
        role: newUser.role,
        isActive: newUser.isActive,
      },
      token,
    };
  },

  async login(input: LoginInput): Promise<{ user: UserResponse; token: string }> {
    const { email, password } = input;

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      throw new AppError(401, 'Invalid credentials');
    }

    if (!user.isActive) {
      throw new AppError(401, 'Account is deactivated');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError(401, 'Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn } as any
    );

    logger.info('User logged in', { userId: user.id, email });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName ?? undefined,
        lastName: user.lastName ?? undefined,
        role: user.role,
        isActive: user.isActive,
      },
      token,
    };
  },

  async logout(userId: number): Promise<void> {
    await db.insert(activityLog).values({
      userId,
      action: 'LOGOUT',
      details: 'User logged out',
      ipAddress: '' as any,
    });

    logger.info('User logged out', { userId });
  },

  async getUserById(id: number): Promise<UserResponse> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
    };
  },
};
