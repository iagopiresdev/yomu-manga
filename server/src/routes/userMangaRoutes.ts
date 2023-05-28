import { Router } from 'express';
const router = Router();

//auth later
import { authMiddleware } from '../middlewares/ensureAuth';

import { CreateUserMangaController } from '../services/createUserManga/CreateUserMangaController';
import { GetUserMangaController } from '../services/getUserManga/GetUserMangaController';
import { UpdateUserMangaController } from '../services/updateUserManga/UpdateUserMangaController';
import { DeleteUserMangaController } from '../services/deleteUserManga/DeleteUserMangaController';

const createUserMangaController = new CreateUserMangaController();
const getUserMangaController = new GetUserMangaController();
const updateUserMangaController = new UpdateUserMangaController();
const deleteUserMangaController = new DeleteUserMangaController();

router.post('/:userId', createUserMangaController.handle);
router.get('/:userId', getUserMangaController.handle);
router.put('/:userId', updateUserMangaController.handle);
router.delete('/:userId', deleteUserMangaController.handle);

export default router;