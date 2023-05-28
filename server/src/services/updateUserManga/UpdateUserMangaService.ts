import { PrismaClient } from '@prisma/client';
import { CreateUserMangaDTO } from '../../schemas/CreateUserMangaDTO';

const prisma = new PrismaClient();

//update the chaptersRead and status of a manga for a user
class UpdateUserMangaService {
    async execute(userId: string, data: CreateUserMangaDTO) {
        const { mangaId, chaptersRead, status } = data;
    
        // Find the UserManga entry
        const userManga = await prisma.userManga.findFirst({
            where: {
                AND: [
                    { userId: userId },
                    { mangaId: mangaId },
                ],
            },
        });

        // If the UserManga entry exists, update it
        if (userManga) {
            const updatedUserManga = await prisma.userManga.update({
                where: { id: userManga.id },
                data: {
                    chaptersRead: chaptersRead,
                    status: status,
                },
            });
            return updatedUserManga;
        }

        else {
            throw new Error('UserManga does not exist');
        }
    }
}

export { UpdateUserMangaService };