import { PrismaClient } from '@prisma/client';
import { CreateMangaDTO } from '../../schemas/CreateMangaDTO';
import { response } from 'express';

const prisma = new PrismaClient();

class CreateMangaService {
  async execute(data: CreateMangaDTO) {
    const mangaAlreadyExists = await prisma.manga.findFirst({
        where: {
            title: data.title_ov,
        },
    });

    if (mangaAlreadyExists) {
        //throw new Error("Manga already exists");
        return response.status(200).json({ error: "Manga already exists" });
    }

    const manga = await prisma.manga.create({
      data: {
        title: data.title_ov,
        image: data.picture_url,
        description: data.synopsis,
        status: data.information.status,
        chapters: data.information.chapters,
      },
    });

    return manga;
  }
}

export { CreateMangaService };
