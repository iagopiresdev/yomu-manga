import { Request, Response } from "express";
import { UpdateUserMangaService } from "./UpdateUserMangaService";
import { CreateUserMangaDTO } from '../../schemas/CreateUserMangaDTO';

class UpdateUserMangaController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body as CreateUserMangaDTO;

        const updateUserMangaService = new UpdateUserMangaService();

        const userManga = await updateUserMangaService.execute(id, data);

        return res.json(userManga);
    }
}


export { UpdateUserMangaController };
