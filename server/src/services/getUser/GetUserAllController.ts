import { Request, Response } from "express";
import { client } from '../../prisma/client'

class GetUserAllController {
    async handle (request: Request, response: Response) {
        const users = await client.user.findMany();

        return response.json(users);
    }
}

export { GetUserAllController }