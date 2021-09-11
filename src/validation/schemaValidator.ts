import { Service } from 'typedi';
import { ISchemaValidator } from './ISchemaValidator';
import { AnyValidateFunction } from 'ajv/dist/core';
import { Request } from 'express';
import { CarError } from '../error/CarError';
import { ErrorCodes } from '../error/ErrorCodes';

@Service()
export class SchemaValidator implements ISchemaValidator {
    constructor(private readonly isCarValid: AnyValidateFunction, private readonly isSerialUUIDValid: AnyValidateFunction) {}

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
}
