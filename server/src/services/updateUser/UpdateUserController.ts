import { Request, Response } from "express";
import { client } from "../../prisma/client";
import bcrypt from 'bcrypt';

class UpdateUserController {
    async handle (request: Request, response: Response) {
        const { id } = request.params; //UserId
        const { name, username, email, password } = request.body;

        // Check if user exists before attempting update
        const existingUser = await client.user.findUnique({
            where: { id },
        });

        if (!existingUser) {
            return response.status(404).json({ error: "User not found" });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await client.user.update({
            where: { id },
            data: { name, username, email, password: hashedPassword },
        });

        return response.json(user);
    }
}

export { UpdateUserController }
