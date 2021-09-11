/**
 *  Clase to instanciat Avj validator and compiles all the schemas
 */

import { Request } from 'express';

export interface ISchemaValidator {
    /**
     * Validates object with the schema
     * @param request
     * @throws CarError if is not valid
     */
    validateCar(request: Request): void;

    /**
     * Validates the SerialUUID contained im the request path
     * @param request
     * @throws CarError if is not valid
     */
    validateSerialUUID(request: Request): void;

    /**
     * Validates the properties of the request path during update
     * @param request
     * @throws CarError if is not valid
     */
    validateUpdateProperties(request: Request): void;
}
