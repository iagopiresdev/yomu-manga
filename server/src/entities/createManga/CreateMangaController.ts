import { Request, Response } from "express";
import { CreateManga } from "./CreateManga";

class CreateMangaController {
    async handle(request: Request, response: Response) {
        const { title, description, author, status, image, userMangas, posts } = request.body;

        const createMangaService = new CreateManga();

        const manga = await createMangaService.execute({ title, description, author, status, image, userMangas, posts });

        return response.json(manga);
    }
}

export { CreateMangaController };
