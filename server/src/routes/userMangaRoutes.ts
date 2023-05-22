import { Router } from 'express';
const router = Router();

import { authMiddleware } from '../middlewares/ensureAuth';

import { CreateUserMangaController } from '../services/UserManga/CreateUserMangaController';
import { GetUserMangaController } from '../services/UserManga/GetUserMangaController';
//import { UpdateUserMangaController } from '../services/UserManga/UpdateUserMangaController';
//import { DeleteUserMangaController } from '../services/UserManga/DeleteUserMangaController';

const createUserMangaController = new CreateUserMangaController();
const getUserMangaController = new GetUserMangaController();
//const updateUserMangaController = new UpdateUserMangaController();
//const deleteUserMangaController = new DeleteUserMangaController();

router.post('/', createUserMangaController.handle);
router.get('/:userId', getUserMangaController.handle);
//router.put('/userMangas/:id', updateUserMangaController.handle);
//router.delete('/userMangas/:id', deleteUserMangaController.handle);

export default router;