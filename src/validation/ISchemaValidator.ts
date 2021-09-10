/**
 *  Clase to instanciat Avj validator and compiles all the schemas
 */
export interface ISchemaValidator {
    /**
     * Compiles the schemas,
     */
    compile(): void;

    /**
     * Validates object with the schema
     * @param car
     */
    validateCar(car: any): boolean;
}
