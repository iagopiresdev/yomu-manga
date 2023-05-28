import { Request, Response } from 'express';
import { CreateUserMangaService } from './CreateUserMangaService';
import { CreateUserMangaDTO } from '../../schemas/CreateUserMangaDTO';

class CreateUserMangaController {
  async handle(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const data = req.body as CreateUserMangaDTO;

      const createUserMangaService = new CreateUserMangaService();
      
      const userManga = await createUserMangaService.execute(userId, data);

      return res.status(201).json(userManga);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Unexpected error.' });
      }
    }
  }
}

export { CreateUserMangaController };
