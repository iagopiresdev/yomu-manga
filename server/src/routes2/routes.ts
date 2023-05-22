import { Router } from 'express';
const router = Router();

import { authMiddleware } from '../middlewares/ensureAuth';


//user routes
import  { CreateUserController }  from '../services/createUser/CreateUserController';
import { AuthUserController } from '../services/authUser/AuthUserController';
import { RefreshTokenUserController } from '../services/refreshTokenUser/RefreshTokenUserController';
import { GetUserAllController }  from '../services/getUser/GetUserAllController';
import  { GetUserByIdController }  from '../services/getUser/GetUserByIdController';
import  { GetUserByUsernameController }  from '../services/getUser/GetUserByUsernameController';
import  { UpdateUserController }  from '../services/updateUser/UpdateUserController';
import  { DeleteUserController }  from '../services/deleteUser/DeleteUserController';

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const refreshTokenUserController = new RefreshTokenUserController();
const getUserAllController = new GetUserAllController();
const getUserByIdController = new GetUserByIdController();
const getUserByUsernameController = new GetUserByUsernameController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

router.post('/users', createUserController.handle);
router.post('/login', authUserController.handle);
router.post('/refresh-token', refreshTokenUserController.handle);
router.get('/users', authMiddleware, getUserAllController.handle);
router.get('/users/:id', authMiddleware, getUserByIdController.handle);
router.get('/users/:username', authMiddleware, getUserByUsernameController.handle);
router.put('/users/:id', authMiddleware, updateUserController.handle);
router.delete('/users/:id', authMiddleware, deleteUserController.handle);


//manga routes
import { MangaController } from '../controllers/mangaApiController';
import { GetMangaController } from '../services/getManga/GetMangaController';
import { CreateMangaController } from '../services/createManga/CreateMangaController';
//import { ListMangaController } from '../services/listManga/ListMangaController';

const mangaController = new MangaController();
const getMangaController = new GetMangaController();
//const listMangaController = new ListMangaController();
const createMangaController = new CreateMangaController();


router.get('/external-api/manga/:id', mangaController.getManga);
router.get('/mangas/:id', getMangaController.handle);
router.post('/mangas', createMangaController.handle);
//router.get('/mangas', mangaController.getAllMangas);


//userManga routes
import { CreateUserMangaController } from '../services/UserManga/CreateUserMangaController';

const createUserMangaController = new CreateUserMangaController();

router.post('/userMangas', createUserMangaController.handle);






/*



//userManga routes
import { CreateUserMangaController } from '../entities/createUserManga/CreateUserMangaController';
import { ListUserMangasController } from '../entities/listUserMangas/ListUserMangasController';

const createUserMangaController = new CreateUserMangaController();
const listUserMangasController = new ListUserMangasController();

router.post('/userMangas', createUserMangaController.handle);
router.get('/userMangas', listUserMangasController.handle);




*/
export { router };

