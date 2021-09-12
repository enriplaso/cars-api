import { Service } from 'typedi';
import { ISchemaValidator } from './ISchemaValidator';
import { AnyValidateFunction } from 'ajv/dist/core';
import { Request } from 'express';
import { CarError } from '../error/carError';
import { ErrorCodes } from '../error/errorCodes';
import { UserError } from '../error/userError';

@Service()
export class SchemaValidator implements ISchemaValidator {
    constructor(
        private readonly isCarValid: AnyValidateFunction,
        private readonly isSerialUUIDValid: AnyValidateFunction,
        private readonly isUpdatePropsValid: AnyValidateFunction,
        private readonly isUserValid: AnyValidateFunction,
        private readonly isEmailValid: AnyValidateFunction,
    ) {}

    public validateCar(request: Request): void {
        if (!this.isCarValid(request.body)) {
            throw new CarError(ErrorCodes.CarValidation.Schema, 'The given Car Object is not valid');
        }
    }

    public validateSerialUUID(request: Request): void {
        if (!this.isSerialUUIDValid(request.params?.serialUUID)) {
            throw new CarError(ErrorCodes.CarValidation.SerialUUID, 'The given serialUUID is not valid');
        }
    }

    public validateUpdateProperties(request: Request): void {
        if (!this.isUpdatePropsValid(request.body)) {
            throw new CarError(ErrorCodes.CarValidation.Schema, 'The given properties are not valid');
        }
    }

    public validateUserCredentials(request: Request): void {
        // First we check if the email has the correct format
        if (!this.isEmailValid(request.body?.email)) {
            throw new UserError(ErrorCodes.UserValidation.Email, 'The given email format is not valid');
        }

        // If email is correct we check if the User credential object is correct
        if (!this.isUserValid(request.body)) {
            throw new UserError(ErrorCodes.UserValidation.Schema, 'The given user properties are not valid');
        }
    }
}
