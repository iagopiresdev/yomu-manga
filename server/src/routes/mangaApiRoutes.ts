import { Router } from 'express';
const router = Router();

import { authMiddleware } from '../middlewares/ensureAuth';


import { MangaController } from '../controllers/mangaApiController';

const mangaController = new MangaController();

router.get('/:id', mangaController.getManga);

router.get('/search/:id', mangaController.serchManga);

export default router;