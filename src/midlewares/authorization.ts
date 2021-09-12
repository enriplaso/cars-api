import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { ErrorCodes } from '../error/errorCodes';

const TOKEN_SECRET = process.env['TOKEN_SECRET'] || 'token-secret';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).send({ error: ErrorCodes.Authentication.NoToken });
        return;
    }

    jwt.verify(token, TOKEN_SECRET, (error) => {
        if (error) {
            res.status(StatusCodes.UNAUTHORIZED).send({ error: ErrorCodes.Authentication.TokenInvalid });
            return;
        }
        next();
    });
};
