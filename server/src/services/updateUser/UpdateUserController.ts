import { Request, Response } from "express";
import { client } from "../../prisma/client";
import { z } from 'zod';
import bcrypt from 'bcrypt';

const IUserRequestSchema = z.object({
    name: z.string().min(2).optional(),
    username: z.string().min(2).optional(),
    email: z.string().email().min(5).optional(),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(20, 'A senha deve ter no máximo 20 caracteres').optional(),
    avatar: z.string().url().optional(),
    banner: z.string().url().optional(),
});


class UpdateUserController {
    async handle (request: Request, response: Response) {
        const { id } = request.params;
        const { name, username, email, password, avatar, banner } = request.body;

        // Validation with Zod
        const validationResult = IUserRequestSchema.safeParse({ name, username, email, password, avatar, banner });
        if (!validationResult.success) {
            return response.status(400).send({ errors: validationResult.error.issues });
        }

        // Check if user exists before attempting update
        const existingUser = await client.user.findUnique({
            where: { id },
        });

        if (!existingUser) {
            return response.status(404).json({ error: "User not found" });
        }

        // Prepare the data for update
        const updateData: {name?: string, username?: string, email?: string, password?: string, avatar?: string, banner?: string} = {};

        if (name !== undefined) {
            updateData.name = name;
        }
        if (username !== undefined) {
            updateData.username = username;
        }
        if (email !== undefined) {
            updateData.email = email;
        }
        if (password !== undefined) {
            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }
        if (avatar !== undefined) {
            updateData.avatar = avatar;
        }
        if (banner !== undefined) {
            updateData.banner = banner;
        }

        const user = await client.user.update({
            where: { id },
            data: updateData,
        });

        return response.json(user);
    }
}

export { UpdateUserController }

