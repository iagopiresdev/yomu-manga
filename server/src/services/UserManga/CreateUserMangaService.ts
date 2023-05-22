import { PrismaClient } from '@prisma/client';
import { CreateUserMangaDTO } from './CreateUserMangaDTO';
import * as z from 'zod';

// Create a type from Zod schema
type UserMangaData = z.infer<typeof CreateUserMangaDTO>;

const prisma = new PrismaClient();

class CreateUserMangaService {
  async execute(data: UserMangaData) {
    const { userId, mangaId } = data;

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
      },
    });

    return userManga;
  }
}

export { CreateUserMangaService };
