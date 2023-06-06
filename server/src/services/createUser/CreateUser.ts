import { client } from '../../prisma/client'
import { hash } from 'bcryptjs';
import { z } from 'zod'; // import zod

// define the schema for the request data
const IUserRequestSchema = z.object({
    name: z.string().optional(),
    username: z.string().optional(),
    email: z.string().email(),
    password: z.string().nonempty('Password is undefined or empty'),
});

class CreateUser {
    async execute(requestData: unknown) {
        // validate the request data and extract the typed values
        const { name, username, email, password } = IUserRequestSchema.parse(requestData);

        const userAlreadyExists = await client.user.findFirst({
            where: {
                email 
            }
        });

        if(userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = await client.user.create({
            data: {
                name,
                username,
                email,
                password: passwordHash
            }
        });

        return user;
    }
}

export { CreateUser }
