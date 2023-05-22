import { Router } from 'express';
const router = Router();

import { authMiddleware } from '../middlewares/ensureAuth';

import { GetMangaController } from '../services/getManga/GetMangaController';
import { CreateMangaController } from '../services/createManga/CreateMangaController';
//import { UpdateMangaController } from '../services/updateManga/UpdateMangaController';
//import { DeleteMangaController } from '../services/deleteManga/DeleteMangaController';

const getMangaController = new GetMangaController();
const createMangaController = new CreateMangaController();
//const updateMangaController = new UpdateMangaController();
//const deleteMangaController = new DeleteMangaController();

router.get('/:id', getMangaController.handle);
router.post('/', createMangaController.handle);
//router.put('/:id', updateMangaController.handle);
//router.delete('/:id', deleteMangaController.handle);

export default router;