import { Request, Response, NextFunction } from 'express';
import { CarError } from '../error/CarError';
import { ErrorCodes } from '../error/ErrorCodes';
import { StatusCodes } from 'http-status-codes';

/**
 *  This midleware validates request body/params through a json schema given a validator function
 * @param req
 * @param res
 * @param next
 * @param validate This function returns true if the body is valid
 */
export const schemaValidation = (validate: (req: Request) => void) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            validate(req);
            next();
        } catch (error) {
            let errorCode = ErrorCodes.Validation.General;
            if (error instanceof CarError) {
                errorCode = error.code;
            }
            res.status(StatusCodes.BAD_REQUEST).send({ error: errorCode });
        }
    };
};
