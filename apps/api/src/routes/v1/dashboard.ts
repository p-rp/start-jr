import { Router } from 'express';
import { dashboardController } from '../../controllers/dashboard';
import { authMiddleware } from '../../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.get('/stats', dashboardController.getStats);
router.get('/recent-activity', dashboardController.getRecentActivity);
router.get('/user-growth', dashboardController.getUserGrowth);

export default router;
