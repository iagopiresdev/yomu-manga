// In GetUserByIdController.ts
import { Request, Response } from "express";
import { client } from '../../prisma/client'

class GetUserByUsernameController {
    async handle (request: Request, response: Response) {
        const { username } = request.params;

        const user = await client.user.findUnique({
            where: { username },
        });

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        return response.json(user);
    }
}

export { GetUserByUsernameController }
