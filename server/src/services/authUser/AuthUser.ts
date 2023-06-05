import { client } from "../../prisma/client";
import { compare } from "bcryptjs";
import { GenerateRefreshToken } from "../../providers/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../providers/GenerateTokenProvider";

interface IAuthUserRequest {
  email: string;
  password: string;
}

class AuthUser {
  async execute({ email, password }: IAuthUserRequest) {
    const userAlreadyExists = await client.user.findFirst({
      where: {
        email,
      },
    });

    if (!userAlreadyExists) {
      throw {
        errorCode: "INVALID_EMAIL_PASSWORD",
        errorMessage: "Email/Password incorrect",
      };
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw {
        errorCode: "INVALID_EMAIL_PASSWORD",
        errorMessage: "Email/Password incorrect",
      };
    }

    // Generate token
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExists.id);

    // Generate refresh token
    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id);

    return { token, refreshToken };
  }
}

export { AuthUser };
