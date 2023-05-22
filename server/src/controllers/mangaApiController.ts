import { Request, Response } from 'express';
import MangaService from '../provider/MangaService';

class MangaController {
    public async getManga(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const manga = await MangaService.getManga(id);
        return response.json(manga);
    }

    // Add other methods here like searchManga, getTopMangas, getPopularMangas etc.
}

export { MangaController };
