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


/*
class AuthUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authUser = new AuthUser();

    const { token, refreshToken } = await authUser.execute({ email, password });

    // Set tokens as cookies
    response.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    response.cookie('refresh_token', refreshToken, { httpOnly: true, sameSite: 'lax' });

    return response.status(200).send({ success: true });
  }
}
*/

export { AuthUserController }