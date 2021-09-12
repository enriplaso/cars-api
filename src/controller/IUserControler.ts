import { Request, Response } from 'express';

export interface IUserController {
    /**
     * User login: Checks if the user exists and validates the password,
     * Will add the JWT to the response if user and password are valid
     * @param req
     * @param res
     */
    login(req: Request, res: Response): Promise<void>;

    /**
     * Creates a new user encrypting the password
     * Will add the JWT to the respons if user and password are valid
     * @param req
     * @param res
     */
    signUp(req: Request, res: Response): Promise<void>;
}
