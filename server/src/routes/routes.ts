import { Router } from 'express';
const router = Router();

import { authMiddleware } from '../middlewares/ensureAuth';

import { AuthUserController } from '../services/authUser/AuthUserController';
import { RefreshTokenUserController } from '../services/refreshTokenUser/RefreshTokenUserController';

const authUserController = new AuthUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post('/login', authUserController.handle);
router.post('/refresh-token', refreshTokenUserController.handle);

export default router;