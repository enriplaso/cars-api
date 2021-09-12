import { expect } from 'chai';
import { randomUUID } from 'crypto';
import 'mocha';
import { Color } from '../../../src/storage/domain/ICarDomain';
import { SchemaValidator } from '../../../src/validation/schemaValidator';
import {
    carJsonSchema,
    serialUUIDJsonSchema,
    singlePropertiesJsonSchema,
    userJsonSchema,
    emailJsonSchema,
} from '../../../src/validation/schemas/requestSchemas';
import Ajv from 'ajv';
import { Request } from 'express';
import { fail } from 'assert';
import { CarError } from '../../../src/error/carError';
import { ErrorCodes } from '../../../src/error/errorCodes';

describe('Schema validation tests', function () {
    this.timeout(120000);
    const ajv = new Ajv();

    const schemaValidator = new SchemaValidator(
        ajv.compile(carJsonSchema),
        ajv.compile(serialUUIDJsonSchema),
        ajv.compile(singlePropertiesJsonSchema),
        ajv.compile(userJsonSchema),
        ajv.compile(emailJsonSchema),
    );

    it('Should not throw when a car object is valid', async function () {
        const car = {
            brand: 'ford',
            color: Color.BLUE,
            model: 'S333',
        };
        const req = {
            body: car,
        };

        schemaValidator.validateCar(req as Request);
    });

    it('Should allow cars with SerialUUID prop ', async function () {
        const car = {
            serialUUID: randomUUID(),
            brand: 'ford',
            color: Color.BLUE,
            model: 'S333',
        };
        const req = {
            body: car,
        };

        schemaValidator.validateCar(req as Request);
    });

    it('Should not allow additional properies', async function () {
        const car = {
            brand: 'ford',
            color: Color.BLUE,
            model: 'S333',
            additionalProp: 'anyProp',
        };
        const req = {
            body: car,
        };
        try {
            schemaValidator.validateCar(req as Request);
            fail('should fail');
        } catch (error) {
            expect(error instanceof CarError).to.be.true;
            expect((error as CarError).code).to.be.equal(ErrorCodes.CarValidation.Schema);
        }
    });

    it('Should not allow a color that is not in the Enum definition', async function () {
        const car = {
            brand: 'ford',
            color: 'Purple',
            model: 'S333',
        };
        const req = {
            body: car,
        };
        try {
            schemaValidator.validateCar(req as Request);
            fail('should fail');
        } catch (error) {
            expect(error instanceof CarError).to.be.true;
            expect((error as CarError).code).to.be.equal(ErrorCodes.CarValidation.Schema);
        }
    });

    it('Should throw if required property is not included', async function () {
        const car = {
            brand: 'ford',
            color: 'Purple',
        };
        const req = {
            body: car,
        };
        try {
            schemaValidator.validateCar(req as Request);
            fail('should fail');
        } catch (error) {
            expect(error instanceof CarError).to.be.true;
            expect((error as CarError).code).to.be.equal(ErrorCodes.CarValidation.Schema);
        }
    });

    it('Should NOT throw if serialUUID is valid', async function () {
        const req = {
            params: { serialUUID: randomUUID() },
        };
        schemaValidator.validateSerialUUID(req as any);
    });

    it('Should throw if required property is not included', async function () {
        const req = {
            params: { serialUUID: 'segwehgzwepoj' },
        };
        try {
            schemaValidator.validateSerialUUID(req as any);
            fail('should fail');
        } catch (error) {
            expect(error instanceof CarError).to.be.true;
            expect((error as CarError).code).to.be.equal(ErrorCodes.CarValidation.SerialUUID);
        }
    });

    it('Should validate a single propetry', async function () {
        const car = {
            brand: 'ford',
        };
        const req = {
            body: car,
        };
        schemaValidator.validateUpdateProperties(req as Request);
    });

    it('Should throw if a single property is wrong', async function () {
        const car = {
            notAllowedProp: 'ford',
        };
        const req = {
            body: car,
        };
        try {
            schemaValidator.validateUpdateProperties(req as any);
            fail('should fail');
        } catch (error) {
            expect(error instanceof CarError).to.be.true;
            expect((error as CarError).code).to.be.equal(ErrorCodes.CarValidation.Schema);
        }
    });
});
