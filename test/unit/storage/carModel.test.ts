import { expect } from 'chai';
import { randomUUID } from 'crypto';
import 'mocha';
import { Color } from '../../../src/storage/domain/ICarDomain';
import { CarModel } from '../../../src/storage/models/carModel';
import * as dbHandler from '../helper/dbHandle';

describe('CarModel tests', function () {
    this.timeout(120000);
    beforeEach(async function () {
        await dbHandler.connect();
    });

    afterEach(async function () {
        await dbHandler.closeDatabase();
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
