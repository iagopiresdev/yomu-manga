import { Request, Response } from "express";
import { client } from '../../prisma/client'

class GetUserByIdController {
    async handle (request: Request, response: Response) {
        const { id } = request.params;

        const user = await client.user.findUnique({
            where: { id },
            include: { mangas: true },
        });

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        return response.json(user);
    }
}

export { GetUserByIdController }
