import { client } from "../prisma/client";
import dayjs from "dayjs";

class GenerateRefreshToken {
    async execute(userId: string) {
        const expiresIn = dayjs().add(15, "day").unix();

        const existingRefreshToken = await client.refreshToken.findUnique({
            where: { userId },
          });
          
          if (existingRefreshToken) {
            await client.refreshToken.delete({ where: { id: existingRefreshToken.id } });
          }
        
        const generateRefreshToken = await client.refreshToken.create({
            data: {
                userId,
                expiresIn
            }
        })

        return generateRefreshToken;
    }
}
export { GenerateRefreshToken }