import { PrismaClient } from "@prisma/client";
import { CreateMangaDTO } from "../../schemas/CreateMangaDTO";

const prisma = new PrismaClient();

class UpdateMangaService {
    async execute(data: CreateMangaDTO, myanimelist_id: string) {
        const mangaAlreadyExists = await prisma.manga.findFirst({
            where: {
                id: myanimelist_id,
            },
        });

        if (!mangaAlreadyExists) {
            throw new Error("Manga not found");
        }

        const manga = await prisma.manga.update({
            where: {
                id: myanimelist_id,
            },
            data: {
                title: data.title_ov ?? "No title",
                title_en: data.title_en ?? "",  
                image: data.picture_url ?? "No image",
                description: data.synopsis ?? "No description",
                status: data.information?.status ?? "No status",
                chapters: data.information?.chapters ?? "0",
                volumes: data.information?.volumes ?? "0", 
            },
        });
        
        return manga;
    }
}

export { UpdateMangaService };