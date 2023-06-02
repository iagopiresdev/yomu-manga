/*

import { PrismaClient } from "@prisma/client";
import { CreateMangaDTO } from "../schemas/CreateMangaDTO";

const prisma = new PrismaClient();

class MangaService {
  async findMangaById(id: string) {
    const manga = await prisma.manga.findUnique({
      where: { id },
    });
    return manga;
  }

  async createManga(mangaData: CreateMangaDTO) {
    const {
      picture_url,
      alternative_titles,
      information: {
        volumes,
        status,
        published,
        chapters
      },
      title_en,
      synopsis,
      title_ov,
    } = mangaData;

    const manga = await prisma.manga.create({
      data: {
        id: title_ov, // assuming this is unique id, if not you should create a unique id for each manga
        title: title_ov,
        title_en,
        image: picture_url,
        description: synopsis,
        status,
        chapters,
        volumes,
        published
      },
    });

    return manga;
  }
}

export default new MangaService();

*/