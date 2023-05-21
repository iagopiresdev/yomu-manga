import { client } from "../../prisma/client";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";

class RefreshTokenUser {
    async execute(refresh_token: string) {
        const refreshToken = await client.refreshToken.findFirst({
            where: {
                id: refresh_token,
            }
        });

        if(!refreshToken) {
            throw new Error("Refresh token invalid");
        }

        // Generate a new access token
        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(refreshToken.userId);
  
        // Generate a new refresh token
        const generateRefreshTokenProvider = new GenerateRefreshToken();
        const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId);

        // Check if the refresh token still exists before deleting it
        const exists = await client.refreshToken.findUnique({
            where: {
                id: refreshToken.id,
            },
        });

        if (exists) {
            // Delete the old refresh token from the database
            await client.refreshToken.delete({
                where: {
                    id: refreshToken.id,
                },
            });
        }

        return { token, refreshToken: newRefreshToken.id };
    }
}

export { RefreshTokenUser }
//3