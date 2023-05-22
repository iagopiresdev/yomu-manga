import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as dotenv from "dotenv";

dotenv.config();


/*
export default function authMiddleware(req: Request, res: Response, next: NextFunction ) {
    // Get token from cookies
    const authToken = req.cookies.token;

    if(!authToken) {
        return res.status(401).json({
            errorCode: "Token is missing",
        });
    }

    // No need to split, as the token is now directly the cookie value
    const token = authToken;

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
*/


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
