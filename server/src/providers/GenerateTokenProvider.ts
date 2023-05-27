import { sign } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

class GenerateTokenProvider {
    async execute(userId: string) {
        const token = sign({}, process.env.JWT_SECRET!, {
            subject: userId,
            expiresIn: "1h"
        });

        return token;
    }
}

export { GenerateTokenProvider }
