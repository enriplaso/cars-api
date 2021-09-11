import { Service } from 'typedi';
import { ISchemaValidator } from './ISchemaValidator';
import { AnyValidateFunction } from 'ajv/dist/core';
import { Request } from 'express';
import { CarError } from '../error/carError';
import { ErrorCodes } from '../error/errorCodes';

@Service()
export class SchemaValidator implements ISchemaValidator {
    constructor(
        private readonly isCarValid: AnyValidateFunction,
        private readonly isSerialUUIDValid: AnyValidateFunction,
        private readonly isUpdetPropsValid: AnyValidateFunction,
    ) {}

    public validateCar(request: Request): void {
        if (!this.isCarValid(request.body)) {
            throw new CarError(ErrorCodes.Validation.Schema, 'The given Object is not valid');
        }
    }

    public validateSerialUUID(request: Request): void {
        if (!this.isSerialUUIDValid(request.params?.serialUUID)) {
            throw new CarError(ErrorCodes.Validation.SerialUUID, 'The given serialUUID is not valid');
        }
    }

    public validateUpdateProperties(request: Request): void {
        if (!this.isUpdetPropsValid(request.body)) {
            throw new CarError(ErrorCodes.Validation.Schema, 'The given properties are not valid');
        }
    }
}
