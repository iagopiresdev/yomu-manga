import { PrismaClient } from '@prisma/client';
import { CreateMangaDTO } from '../../schemas/CreateMangaDTO';

const prisma = new PrismaClient();

class CreateMangaService {
  async execute(data: CreateMangaDTO, myanimelist_id: string) {
    const mangaAlreadyExists = await prisma.manga.findFirst({
        where: {
            id: myanimelist_id,
        },
    });

    if (mangaAlreadyExists) {
        throw new Error("Manga already exists");
    }

    const manga = await prisma.manga.create({
      data: {
        id : myanimelist_id,
        title: data.title_ov,
        title_en: data.title_en,  
        image: data.picture_url,
        description: data.synopsis,
        status: data.information.status,
        chapters: data.information.chapters,
        volumes: data.information.volumes, 
      },
    });

    return manga;
  }
}

export { CreateMangaService };
