import { Request, Response } from 'express';
import { authService } from '../services/auth';
import { config } from '../config';
import { AuthRequest } from '../middleware/auth';
import { db } from '../db';
import { activityLog } from '../db/schema';
import { asyncHandler } from '../middleware/errorHandler';

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const { user, token } = await authService.register({ email, password, firstName, lastName });

    res.cookie('token', token, config.cookie);

    res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const { user, token } = await authService.login({ email, password });

    res.cookie('token', token, config.cookie);

    await db.insert(activityLog).values({
      userId: user.id,
      action: 'LOGIN',
      details: 'User logged in',
      ipAddress: req.ip,
    });

    res.json({
      message: 'Login successful',
      user,
    });
  }),

  logout: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (req.user) {
      await authService.logout(req.user.id);
    }

    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
  }),

  me: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const user = await authService.getUserById(req.user.id);

    res.json(user);
  }),
};
