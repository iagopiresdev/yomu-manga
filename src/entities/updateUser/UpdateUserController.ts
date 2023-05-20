// In UpdateUserController.ts
import { Request, Response } from "express";
import { client } from "../../prisma/client";



class UpdateUserController {
    async handle (request: Request, response: Response) {
        const { id } = request.params; //UserId
        const { name, username, email, password } = request.body;  // add or remove fields based on what you want to update

        // Check if user exists before attempting update
        const existingUser = await client.user.findUnique({
            where: { id },
        });

        if (!existingUser) {
            return response.status(404).json({ error: "User not found" });
        }

        const user = await client.user.update({
            where: { id },
            data: { name, username, email, password },  // add or remove fields based on what you want to update
        });

        return response.json(user);
    }
}

export { UpdateUserController }
