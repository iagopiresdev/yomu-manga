import { Request, Response } from 'express';
import { CreateMangaDTO, MangaSchema } from '../../schemas/CreateMangaDTO';
import { UpdateMangaService } from './updateMangaService';

class UpdateMangaController {
    async handle(req: Request, res: Response) {
        const data = req.body as CreateMangaDTO;
        const { id } = req.params;

        try {
            // validate data with Zod
            const validatedData = MangaSchema.parse(data);

            const updateMangaService = new UpdateMangaService();

            const manga = await updateMangaService.execute(validatedData, id);

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

export { UpdateMangaController };
