import { PrismaClient } from "@prisma/client";
import { CreateMangaDTO } from "../../schemas/CreateMangaDTO";

const prisma = new PrismaClient();

class DeleteMangaService {
    async execute(myanimelist_id: string) {
        const mangaAlreadyExists = await prisma.manga.findFirst({
            where: {
                id: myanimelist_id,
            },
        });

        if (!mangaAlreadyExists) {
            throw new Error("Manga not found");
        }

        const manga = await prisma.manga.delete({
            where: {
                id: myanimelist_id,
            },
        });
        
        return manga;
    }
}

export { DeleteMangaService };
