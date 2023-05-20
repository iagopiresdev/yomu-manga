import { Request, Response } from "express";
import { client } from "../../prisma/client";

class DeleteUserController {
    async handle (request: Request, response: Response) {
        const { id } = request.params;

        // Check if the user exists
        const userExists = await client.user.findUnique({ where: { id } });

        if (!userExists) {
            return response.status(404).json({ error: "User not found" });
        }

        await client.user.delete({
            where: { id },
        });

        return response.status(204).json();
    }
}

export { DeleteUserController }
