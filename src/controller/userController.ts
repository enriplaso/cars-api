import { Request, Response } from 'express';
import { Service } from 'typedi';
import { UserService } from '../services/userService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // used to hash passwords
import { IUserDomain } from '../storage/domain/IUserDomain';
import { UserError } from '../error/userError';
import { ErrorCodes } from '../error/errorCodes';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const TOKEN_SECRET = process.env['TOKEN_SECRET'] || 'token-secret';
const ROUNDS = 10;

@Service()
export class UserController {
    constructor(private readonly userService: UserService) {}

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.getByEmail(req.body?.email);

            bcrypt.compare(req.body.password, user.password, (error, match) => {
                if (error) {
                    return this.handleError(error, res);
                }

                if (!match) {
                    return this.handleError(new UserError(ErrorCodes.UserLogin.InvalidPassword, 'Passwords do not match'), res);
                }

                res.status(StatusCodes.OK).json({ token: this.generateToken(user) });
            });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public async signUp(req: Request, res: Response): Promise<void> {
        bcrypt.hash(req.body.password, ROUNDS, async (error, hash) => {
            if (error) {
                return this.handleError(error, res);
            }
            try {
                const newUser: IUserDomain = { email: req.body?.email, password: hash };

                await this.userService.create(newUser);
                res.status(StatusCodes.CREATED).json({ token: this.generateToken(newUser) });
            } catch (error) {
                this.handleError(error, res);
            }
        });
    }

    private handleError(error: Error | any, res: Response): void {
        console.warn(error);
        if (error instanceof UserError) {
            switch (error.code) {
                case ErrorCodes.UserStorage.AlreadyExists:
                    res.status(StatusCodes.CONFLICT).send({ error: error.code });
                    return;
                case ErrorCodes.UserStorage.General:
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.code });
                    return;
                case ErrorCodes.UserStorage.NoFound:
                    res.status(StatusCodes.NOT_FOUND).send({ error: error.code });
                    return;
                case ErrorCodes.UserLogin.InvalidPassword:
                    res.status(StatusCodes.FORBIDDEN).send({ error: error.code });
                    return;
            }
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }

    private generateToken(user: IUserDomain): string {
        return jwt.sign({ data: user }, TOKEN_SECRET, { expiresIn: '72h' });
    }
}
