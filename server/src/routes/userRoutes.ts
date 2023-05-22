import { Router } from 'express';
const router = Router();

import { authMiddleware } from '../middlewares/ensureAuth';

import { CreateUserController } from '../services/createUser/CreateUserController';
import { AuthUserController } from '../services/authUser/AuthUserController';
import { RefreshTokenUserController } from '../services/refreshTokenUser/RefreshTokenUserController';
import { GetUserAllController } from '../services/getUser/GetUserAllController';
import { GetUserByIdController } from '../services/getUser/GetUserByIdController';
import { GetUserByUsernameController } from '../services/getUser/GetUserByUsernameController';
import { UpdateUserController } from '../services/updateUser/UpdateUserController';
import { DeleteUserController } from '../services/deleteUser/DeleteUserController';

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const refreshTokenUserController = new RefreshTokenUserController();
const getUserAllController = new GetUserAllController();
const getUserByIdController = new GetUserByIdController();
const getUserByUsernameController = new GetUserByUsernameController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

router.post('/', createUserController.handle);
router.post('/login', authUserController.handle);
router.post('/refresh-token', refreshTokenUserController.handle);
router.get('/users', authMiddleware, getUserAllController.handle);
router.get('/users/:id', authMiddleware, getUserByIdController.handle);
router.get('/users/:username', authMiddleware, getUserByUsernameController.handle);
router.put('/users/:id', authMiddleware, updateUserController.handle);
router.delete('/users/:id', authMiddleware, deleteUserController.handle);

export default router;