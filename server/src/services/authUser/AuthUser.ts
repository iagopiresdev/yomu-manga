
import { client } from "../../prisma/client";
import { compare } from "bcryptjs";
import { GenerateRefreshToken } from "../../providers/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../providers/GenerateTokenProvider";


interface IAuthUserRequest {
    email: string;
    password: string;
}

class AuthUser {
    async execute({email, password}: IAuthUserRequest) {
        const userAlreadyExists = await client.user.findFirst({
            where: {
                email
            }
        });

        if(!userAlreadyExists) {
            throw new Error("Email/Password incorrect");
        }

        const passwordMatch = await compare(password, userAlreadyExists.password);

        if(!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }
        
        //gerar token
        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(userAlreadyExists.id);
        
        //gerar refresh token
        const generateRefreshToken = new GenerateRefreshToken();
        const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id);

    return { token, refreshToken }
    }
}

export { AuthUser }