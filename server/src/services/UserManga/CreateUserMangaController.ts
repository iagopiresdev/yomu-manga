import { Request, Response } from 'express';
import { CreateUserMangaService } from './CreateUserMangaService';
import { CreateUserMangaDTO } from './CreateUserMangaDTO';

class CreateUserMangaController {
  async handle(req: Request, res: Response) {
    try {
      const data = CreateUserMangaDTO.parse(req.body);

      const createUserMangaService = new CreateUserMangaService();
      
      const userManga = await createUserMangaService.execute(data);

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
