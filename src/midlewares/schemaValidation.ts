import { Request, Response, NextFunction } from 'express';
import { ErrorCodes } from '../error/ErrorCodes';

/**
 *  This midleware validates request body through a json schema given a validate function
 * @param req
 * @param res
 * @param next
 * @param validate This function returns true if the body is valid
 */
export const schemaValidation = (validate: (body: any) => boolean) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (validate(req.body)) {
            next();
        } else {
            res.status(400).send({
                error: ErrorCodes.Validation.Schema,
            });
        }
    };
};
