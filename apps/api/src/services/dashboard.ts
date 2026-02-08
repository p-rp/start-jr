import { db } from '../db';
import { users, activityLog } from '../db/schema';
import { desc, sql, gte } from 'drizzle-orm';
import { subDays } from 'date-fns';
import { logger } from '../utils/logger';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  totalAdmins: number;
}

interface ActivityItem {
  id: number;
  action: string;
  details: string | null;
  ipAddress: string | null;
  createdAt: Date;
  user: {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
  } | null;
}

interface GrowthData {
  date: string;
  count: number;
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    try {
      const totalUsers = await db.select({ count: sql<number>`count(*)` }).from(users);

      const activeUsers = await db
        .select({ count: sql<number>`count(*)` })
        .from(users)
        .where(sql`${users.isActive} = true`);

      const thirtyDaysAgo = subDays(new Date(), 30);
      const newUsersThisMonth = await db
        .select({ count: sql<number>`count(*)` })
        .from(users)
        .where(gte(users.createdAt, thirtyDaysAgo));

      const totalAdmins = await db
        .select({ count: sql<number>`count(*)` })
        .from(users)
        .where(sql`${users.role} = 'admin'`);

      const stats = {
        totalUsers: totalUsers[0].count,
        activeUsers: activeUsers[0].count,
        newUsersThisMonth: newUsersThisMonth[0].count,
        totalAdmins: totalAdmins[0].count,
      };

      logger.debug('Dashboard stats retrieved', stats);

      return stats;
    } catch (error) {
      logger.error('Error getting dashboard stats', error);
      throw error;
    }
  },

  async getRecentActivity(limit: number = 10): Promise<ActivityItem[]> {
    try {
      const activity = await db
        .select({
          id: activityLog.id,
          action: activityLog.action,
          details: activityLog.details,
          ipAddress: activityLog.ipAddress,
          createdAt: activityLog.createdAt,
          user: {
            id: users.id,
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
          },
        })
        .from(activityLog)
        .leftJoin(users, sql`${activityLog.userId} = ${users.id}`)
        .orderBy(desc(activityLog.createdAt))
        .limit(limit);

      logger.debug('Recent activity retrieved', { count: activity.length });

      return activity;
    } catch (error) {
      logger.error('Error getting recent activity', error);
      throw error;
    }
  },

  async getUserGrowth(days: number = 30): Promise<GrowthData[]> {
    try {
      const startDate = subDays(new Date(), days);

      const result = await db.execute(sql`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as count
        FROM users
        WHERE created_at >= ${startDate}
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `);

      const growth = result.rows.map((row: any) => ({
        date: row.date,
        count: parseInt(row.count),
      }));

      logger.debug('User growth data retrieved', { days, dataPoints: growth.length });

      return growth;
    } catch (error) {
      logger.error('Error getting user growth', error);
      throw error;
    }
  },
};
