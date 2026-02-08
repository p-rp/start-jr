import { Request, Response } from 'express';
import { userService } from '../services/users';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

export const userController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const { page, limit, search, sortBy, order } = req.query;
    
    const result = await userService.getAll({
      page: typeof page === 'string' ? page : undefined,
      limit: typeof limit === 'string' ? limit : undefined,
      search: typeof search === 'string' ? search : undefined,
      sortBy: typeof sortBy === 'string' ? sortBy : undefined,
      order: typeof order === 'string' ? order : undefined,
    });

    res.json(result);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.getById(parseInt(Array.isArray(id) ? id[0] : id));
    
    res.json(user);
  }),

  create: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { email, password, firstName, lastName, role } = req.body;
    
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const user = await userService.create(
      { email, password, firstName, lastName, role },
      req.user!.id,
      req.ip || ''
    );

    res.status(201).json({
      message: 'User created successfully',
      user,
    });
  }),

  update: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { email, firstName, lastName, role, isActive } = req.body;
    
    const user = await userService.update(
      parseInt(Array.isArray(id) ? id[0] : id),
      { email, firstName, lastName, role, isActive },
      req.user!.id,
      req.ip || ''
    );

    res.json({
      message: 'User updated successfully',
      user,
    });
  }),

  delete: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    
    await userService.delete(parseInt(Array.isArray(id) ? id[0] : id), req.user!.id, req.ip || '');

    res.json({ message: 'User deleted successfully' });
  }),
};
