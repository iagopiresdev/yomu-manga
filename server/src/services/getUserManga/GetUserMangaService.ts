import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class GetUserMangaService {
  async execute(userId : string) {
    const userMangas = await prisma.userManga.findMany({
      where: {
        userId,
      },
      include: {
        manga: true, // Include related manga details
      },
    });

    if (!userMangas) {
      throw new Error('No manga found for this user');
    }

    return userMangas;
  }
}

export { GetUserMangaService };
