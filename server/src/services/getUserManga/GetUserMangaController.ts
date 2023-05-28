import { Request, Response } from 'express';
import { GetUserMangaService } from './GetUserMangaService';

class GetUserMangaController {
  async handle(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const getUserMangaService = new GetUserMangaService();
      
      const userMangas = await getUserMangaService.execute(userId);

      return res.status(200).json(userMangas);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Unexpected error.' });
      }
    }
  }
}

export { GetUserMangaController };
