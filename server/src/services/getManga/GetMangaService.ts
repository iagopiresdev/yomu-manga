import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class GetMangaService {
    async execute(id: string){
        const manga = await prisma.manga.findFirst({
            where: {
                id: id,
            },
        });

        return manga;
    }
}

export { GetMangaService };