/*import { expect } from 'chai';
import { randomUUID } from 'crypto';
import 'mocha';
import { Color } from '../../../src/storage/domain/ICarDomain';
import { CarModel } from '../../../src/storage/models/CarModel';
import { SchemaValidator } from '../../../src/validation/schemaValidator';

describe('Schema validation tests', function () {
    this.timeout(120000);
    const ajv = new Ajv();

    const schemaValidator = new SchemaValidator(ajv);
    beforeEach(async function () {
      
    });

    afterEach(async function () {
      
    });

    it('Should not allow additional properies', async function () {
        const car = {
            serialUUID: randomUUID(),
            brand: 'ford',
            color: Color.BLUE,
            model: 'S333',
            additionalProp: 'anyProp',
        };
        const carModel = new CarModel(car);
        const createdCar = await carModel.save();

        expect(createdCar.get('brand')).to.equal(car.brand);
        expect(createdCar.get('additionalProp')).to.be.undefined;
    });
});
*/
