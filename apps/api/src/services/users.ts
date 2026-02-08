import bcrypt from 'bcryptjs';
import { db } from '../db';
import { users, activityLog } from '../db/schema';
import { eq, like, desc, asc, sql } from 'drizzle-orm';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

interface PaginationParams {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: string;
  order?: string;
}

interface CreateUserInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

interface UpdateUserInput {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  isActive?: boolean;
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

export const userService = {
  async getAll(params: PaginationParams): Promise<{
    users: UserResponse[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const { page = '1', limit = '10', search = '', sortBy = 'createdAt', order = 'desc' } = params;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    let query = db.select().from(users) as any;

    if (search) {
      query = query.where(
        sql`${users.email} ILIKE ${`%${search}%`} OR ${users.firstName} ILIKE ${`%${search}%`} OR ${users.lastName} ILIKE ${`%${search}%`}`
      );
    }

    if (order === 'asc') {
      query = query.orderBy(asc(users.createdAt));
    } else {
      query = query.orderBy(desc(users.createdAt));
    }

    const allUsers = await query.limit(parseInt(limit)).offset(offset);

    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(
        search
          ? sql`${users.email} ILIKE ${`%${search}%`} OR ${users.firstName} ILIKE ${`%${search}%`} OR ${users.lastName} ILIKE ${`%${search}%`}`
          : sql`1=1`
      );

    const total = countResult[0].count;

    return {
      users: allUsers.map((user: any) => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName ?? undefined,
        lastName: user.lastName ?? undefined,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    };
  },

  async getById(id: number): Promise<UserResponse> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: (user.firstName as any) ?? undefined,
      lastName: (user.lastName as any) ?? undefined,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
    };
  },

  async create(input: CreateUserInput, adminId: number, ipAddress?: string): Promise<UserResponse> {
    const { email, password, firstName, lastName, role } = input;

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
        role: role || 'user',
      })
      .returning();

    await db.insert(activityLog).values({
      userId: adminId,
      action: 'CREATE_USER',
      details: `Created user: ${email}`,
      ipAddress: ipAddress || (undefined as any),
    });

    logger.info('User created', { userId: newUser.id, email, adminId });

    return {
      id: newUser.id,
      email: newUser.email,
      firstName: (newUser.firstName as any) ?? undefined,
      lastName: (newUser.lastName as any) ?? undefined,
      role: newUser.role,
      isActive: newUser.isActive,
    };
  },

  async update(id: number, input: UpdateUserInput, adminId: number, ipAddress?: string): Promise<UserResponse> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    const updateData: Partial<typeof users.$inferInsert> = {
      updatedAt: new Date(),
    };

    if (input.email) updateData.email = input.email;
    if (input.firstName !== undefined) updateData.firstName = input.firstName;
    if (input.lastName !== undefined) updateData.lastName = input.lastName;
    if (input.role) updateData.role = input.role;
    if (input.isActive !== undefined) updateData.isActive = input.isActive;

    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();

    await db.insert(activityLog).values({
      userId: adminId,
      action: 'UPDATE_USER',
      details: `Updated user: ${id}`,
      ipAddress: ipAddress || '' as any,
    });

    logger.info('User updated', { userId: id, adminId });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName ?? undefined,
      lastName: updatedUser.lastName ?? undefined,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
    };
  },

  async delete(id: number, adminId: number, ipAddress?: string): Promise<void> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    await db.delete(users).where(eq(users.id, id));

    await db.insert(activityLog).values({
      userId: adminId,
      action: 'DELETE_USER',
      details: `Deleted user: ${id}`,
      ipAddress: ipAddress || '' as any,
    });

    logger.info('User deleted', { userId: id, adminId });
  },
};
