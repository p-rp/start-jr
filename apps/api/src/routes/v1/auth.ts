import { Router } from 'express';
import { authController } from '../../controllers/auth';
import { authMiddleware } from '../../middleware/auth';
import { authRateLimitMiddleware } from '../../middleware/rateLimit';

const router = Router();

router.post('/register', authRateLimitMiddleware, authController.register);
router.post('/login', authRateLimitMiddleware, authController.login);
router.post('/logout', authMiddleware, authController.logout);
router.get('/me', authMiddleware, authController.me);

export default router;
