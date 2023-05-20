import { Router } from 'express';
const router = Router();

import { authMiddleware } from '../middlewares/ensureAuth';


//user routes
import  { CreateUserController }  from '../entities/createUser/CreateUserController';
import { AuthUserController } from '../entities/authUser/AuthUserController';
import { RefreshTokenUserController } from '../entities/refreshTokenUser/RefreshTokenUserController';
import { GetUserAllController }  from '../entities/getUser/GetUserAllController';
import  { GetUserByIdController }  from '../entities/getUser/GetUserByIdController';
import  { GetUserByUsernameController }  from '../entities/getUser/GetUserByUsernameController';
import  { UpdateUserController }  from '../entities/updateUser/UpdateUserController';
import  { DeleteUserController }  from '../entities/deleteUser/DeleteUserController';


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
import { CreateMangaController } from '../entities/createManga/CreateMangaController';
//import { ListMangasController } from '../entities/listMangas/ListMangasController';

const createMangaController = new CreateMangaController();
//const listMangasController = new ListMangasController();

router.post('/mangas', createMangaController.handle);
//router.get('/mangas', listMangasController.handle);
router.get('/mangas', authMiddleware, (req, res) => {
    return res.json([
        { id: '1', title : 'Eleceed', description : 'lorem', author : 'algum coreano', status: 'aring' },
        { id: '2', title : 'Solo Leveling', description : 'lorem', author : 'algum coreano', status: 'aring' },
        { id: '3', title : 'The Beginning After The End', description : 'lorem', author : 'algum coreano', status: 'aring' },    
    ])
})


/*


//post routes
import { CreatePostController } from '../entities/createPost/CreatePostController';
import { ListPostsController } from '../entities/listPosts/ListPostsController';

const createPostController = new CreatePostController();
const listPostsController = new ListPostsController();

router.post('/posts', createPostController.handle);
router.get('/posts', listPostsController.handle);

//userManga routes
import { CreateUserMangaController } from '../entities/createUserManga/CreateUserMangaController';
import { ListUserMangasController } from '../entities/listUserMangas/ListUserMangasController';

const createUserMangaController = new CreateUserMangaController();
const listUserMangasController = new ListUserMangasController();

router.post('/userMangas', createUserMangaController.handle);
router.get('/userMangas', listUserMangasController.handle);




*/
export { router };

