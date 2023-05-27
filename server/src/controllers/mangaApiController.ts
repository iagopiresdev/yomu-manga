import { Request, Response } from 'express';
import {MangaService} from '../providers/MangaService';

class MangaController {
    public async getManga(request: Request, response: Response): Promise<Response> {
        const  manga  = request.params.id;
        const mangaService = new MangaService();
        const mangaData = await mangaService.execute(manga);        
        return response.json(mangaData);

    }

    public async serchManga(request: Request, response: Response): Promise<Response> {
        const  manga  = request.params.id;
        const mangaService = new MangaService();
        const mangaData = await mangaService.execute(manga);
        return response.json(mangaData);
    }


    // Add getTopMangas, getPopularMangas etc.
}

export { MangaController };
