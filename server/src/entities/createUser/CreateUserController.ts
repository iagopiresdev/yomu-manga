import { Request, Response } from 'express';
import { CreateUser } from './CreateUser';
import { z } from "zod";

const CreateUserSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, username, email, password } = CreateUserSchema.parse(request.body);

        const createUser = new CreateUser();

        const user = await createUser.execute({
            name,
            username,
            email,
            password
        });

        return response.json(user);
    }
}

export { CreateUserController }