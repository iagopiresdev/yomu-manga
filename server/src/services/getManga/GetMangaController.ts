import { Request, Response } from 'express';
import { CreateMangaDTO, MangaSchema } from '../../schemas/CreateMangaDTO';
import { GetMangaService } from './GetMangaService';

class GetMangaController {
    async handle(req: Request, res: Response){
        const { id } = req.params;

        const getMangaService = new GetMangaService();

        const manga = await getMangaService.execute(id);

        return res.json(manga);
    }
}

export { GetMangaController };