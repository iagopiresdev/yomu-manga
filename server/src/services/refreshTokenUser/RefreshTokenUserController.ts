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

/*
class RefreshTokenUserController {
    async handle (request: Request, response: Response) {
        const { refresh_token } = request.body;

        const refreshTokenUser = new RefreshTokenUser();
        const { token, refreshToken } = await refreshTokenUser.execute(refresh_token);

        // Set new tokens as cookies
        response.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
        response.cookie('refresh_token', refreshToken, { httpOnly: true, sameSite: 'lax' });

        return response.status(200).send({ success: true });
    }
}
*/

export { RefreshTokenUserController }