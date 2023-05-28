import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DeleteUserMangaService {
    async execute(userId: string, mangaId: string) {
        // Find the UserManga
        const userManga = await prisma.userManga.findFirst({
            where: {

                AND: [ //It will only find the UserManga if the userId and mangaId match
                    { userId: userId },
                    { mangaId: mangaId },
                ],
            },
        });

        // If the UserManga exists, delete it
        if (userManga) {
            const deletedUserManga = await prisma.userManga.delete({
                where: { id: userManga.id },
            });
            return deletedUserManga;
        }

        else {
            throw new Error('UserManga does not exist');
        }
    }
}

export { DeleteUserMangaService };
