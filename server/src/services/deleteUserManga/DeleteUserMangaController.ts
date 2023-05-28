import { Request, Response } from 'express';
import { DeleteUserMangaService } from './DeleteUserMangaService';
import { CreateUserMangaDTO } from '../../schemas/CreateUserMangaDTO';
import { TypeOf } from 'zod';

class DeleteUserMangaController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const { mangaId } = req.body;

        const deleteUserMangaService = new DeleteUserMangaService();

        const userManga = await deleteUserMangaService.execute(id, mangaId);

        return res.json(userManga);
    }
}

export { DeleteUserMangaController };
