import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as dotenv from "dotenv";

dotenv.config();

export default function authMiddleware(req: Request, res: Response, next: NextFunction ) {
    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.status(401).json({
            errorCode: "Token is missing",
        });
    }

    const token = authToken.split(' ')[1];

    try {
        verify(token, process.env.JWT_SECRET!);
        return next();
    }
    catch(err) {
        return res.status(401).json({
            errorCode: "Token invalid",
        });
    }
}

export { authMiddleware }
