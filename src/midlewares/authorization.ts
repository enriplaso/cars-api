import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env['TOKEN_SECRET'] || 'token-secret';


export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) res.status(StatusCodes.UNAUTHORIZED).json({error: "please provide valid token"})
    else {
        jwt.verify(token, TOKEN_SECRET, (err, value) => {
            console.info(value);
            if (err) res.status(500).json({error: 'failed to authenticate token'})
            //req.user = value.data
            next()
        })
    }
}