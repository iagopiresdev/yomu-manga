import { Request, Response } from 'express';
import { DeleteMangaService } from './DeleteMangaService';

class DeleteMangaController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const deleteMangaService = new DeleteMangaService();

            const manga = await deleteMangaService.execute(id);

            return res.status(201).json(manga);

        }catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            } else {
                return res.status(500).json({ error: 'Unexpected error.' });
            }
        }
    }
}

export { DeleteMangaController };
