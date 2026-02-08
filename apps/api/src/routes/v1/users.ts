import { Router } from 'express';
import { userController } from '../../controllers/users';
import { authMiddleware, requireRole } from '../../middleware/auth';

const router = Router();

router.use(authMiddleware);
router.use(requireRole(['admin']));

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
