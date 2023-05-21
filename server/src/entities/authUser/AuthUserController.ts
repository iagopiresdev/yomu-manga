import { Request, Response } from "express";
import { AuthUser } from "./AuthUser";


class AuthUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authUser = new AuthUser();

    const token = await authUser.execute({ email, password });

    return response.json(token);
  }
}

export { AuthUserController }