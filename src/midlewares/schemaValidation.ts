import { Request, Response, NextFunction } from 'express';
import { CarError } from '../error/carError';
import { ErrorCodes } from '../error/errorCodes';
import { StatusCodes } from 'http-status-codes';
import { UserError } from '../error/userError';

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
            let errorCode = ErrorCodes.CarValidation.General;
            if (error instanceof CarError || error instanceof UserError) {
                errorCode = error.code;
            }
            res.status(StatusCodes.BAD_REQUEST).send({ error: errorCode });
        }
    };
};
