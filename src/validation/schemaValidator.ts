import { Service } from 'typedi';
import Ajv from 'ajv';
import { ISchemaValidator } from './ISchemaValidator';
import { AnyValidateFunction } from 'ajv/dist/core';
import { CarJsonSchema } from './schemas/requestSchemas';

@Service()
export class SchemaValidator implements ISchemaValidator {
    constructor(private ajv: any, private isCarValid: AnyValidateFunction) {}

    public compile(): void {
        this.ajv = new Ajv({ strict: true });
        this.isCarValid = this.ajv.compile(CarJsonSchema);
    }

    public validateCar(car: any): boolean {
        const isValid = this.isCarValid(car) as boolean;
        return isValid;
    }
}
