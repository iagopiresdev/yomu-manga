import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get the authorization header
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401); // Unauthorized
  }

  const token = authorization.split(' ')[1];

  try {
    // Verify and decode the token
    const data = verify(
        token, process.env.JWT_SECRET!);
    const { sub } = data as TokenPayload;

    // Attach user id to the request
    req.userId = sub;

    // Proceed to the next middleware/function
    return next();
  } catch {
    return res.sendStatus(401); // Unauthorized
  }
}
