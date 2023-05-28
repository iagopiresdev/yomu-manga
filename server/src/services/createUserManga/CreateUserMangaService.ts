import { PrismaClient } from '@prisma/client';
import { CreateUserMangaDTO } from '../../schemas/CreateUserMangaDTO';

const prisma = new PrismaClient();

class CreateUserMangaService {
  async execute(userId : string, data: CreateUserMangaDTO) {
    const { mangaId } = data;

    const userMangaAlreadyExists = await prisma.userManga.findFirst({
      where: {
        userId,
        mangaId,
      },
    });

    if (userMangaAlreadyExists) {
      throw new Error('UserManga already exists');
    }

    const userManga = await prisma.userManga.create({
      data: {
        userId,
        mangaId,
        status: 'Reading',
        chaptersRead: 0,
      },
    });

    return userManga;
  }
}

export { CreateUserMangaService };
