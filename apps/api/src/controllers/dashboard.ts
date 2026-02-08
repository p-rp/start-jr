import { Request, Response } from 'express';
import { dashboardService } from '../services/dashboard';
import { asyncHandler } from '../middleware/errorHandler';

export const dashboardController = {
  getStats: asyncHandler(async (req: Request, res: Response) => {
    const stats = await dashboardService.getStats();
    
    res.json({ stats });
  }),

  getRecentActivity: asyncHandler(async (req: Request, res: Response) => {
    const { limit = '10' } = req.query;
    const activity = await dashboardService.getRecentActivity(parseInt(limit as string));
    
    res.json({ activity });
  }),

  getUserGrowth: asyncHandler(async (req: Request, res: Response) => {
    const { days = '30' } = req.query;
    const growth = await dashboardService.getUserGrowth(parseInt(days as string));
    
    res.json({ growth });
  }),
};
