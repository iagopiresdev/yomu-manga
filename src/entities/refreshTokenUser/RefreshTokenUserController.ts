import { Request, Response } from "express";
import { RefreshTokenUser } from "./RefreshTokenUser";

class RefreshTokenUserController {
    async handle (request: Request, response: Response) {
        const { refresh_token } = request.body;

        const refreshTokenUser = new RefreshTokenUser();
        const { token, refreshToken } = await refreshTokenUser.execute(refresh_token);

        return response.json({ token, refreshToken });
    }
}

export { RefreshTokenUserController }
