import { client } from '../../prisma/client'

interface IMangaRequest {
    title: string;
    description: string;
    author: string;
    status: string;
    image: string;
    userMangas: {
        userId: string;
        status: string;
        score: number;
    }[];
    posts: {
        userId: string;
        content: string;
    }[];
}

class CreateManga {
    async execute({title, description, author, status, image, userMangas, posts}: IMangaRequest) {
        const mangaAlreadyExists = await client.manga.findFirst({
            where: {
                title
            }
        });

        if(mangaAlreadyExists) {
            throw new Error("Manga already exists");
        }

        const manga = await client.manga.create({
            data: {
                title,
                description,
                author,
                status,
                image,
                userMangas: {
                    create: userMangas
                },
                posts: {
                    create: posts
                }
            }
        });

        return manga;
    }
}

export { CreateManga };
