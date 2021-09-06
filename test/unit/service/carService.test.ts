import { fail } from 'assert';
import { expect } from 'chai';
import { randomUUID } from 'crypto';
import 'mocha';
import { CarError } from '../../../src/error/CarError';
import { ErrorCodes } from '../../../src/error/ErrorCodes';
import { CarService } from '../../../src/services/CarService';
import { Color, ICarDomain } from '../../../src/storage/domain/ICarDomain';
import * as dbHandler from '../helper/dbHandle';

describe('CarService tests', function () {
    this.timeout(120000);
    beforeEach(async function () {
        await dbHandler.connect();
    });

    afterEach(async function () {
        await dbHandler.closeDatabase();
    });

    it('Should return the generated UUID of the car during Car creation', async function () {
        const carService = new CarService();
        const car: ICarDomain = {
            brand: 'ford',
            color: Color.BLUE,
            model: 'S333',
        };
        const serialUUID: string = await carService.create(car);

        expect(serialUUID).to.be.not.undefined;
        expect(serialUUID.length).to.equal(36);
    });

    it('Should thow an error if uuid already exists', async function () {
        const carService = new CarService();
        const car: ICarDomain = {
            brand: 'ford',
            color: Color.BLUE,
            model: 'S333',
        };
        const serialUUID: string = await carService.create(car);

        car.serialUUID = serialUUID;

        try {
            await carService.create(car);
            fail('should fail');
        } catch (error) {
            expect(error instanceof CarError).to.be.true;
            expect((error as CarError).code).to.be.equal(ErrorCodes.CarStorage.AlreadyExists);
        }
    });

    it('Should throw an error when the UUID has a wrong format', async function () {
        const carService = new CarService();
        const car: ICarDomain = {
            serialUUID: 'wrong format',
            brand: 'ford',
            color: Color.BLUE,
            model: 'S333',
        };
        try {
            await carService.create(car);
            fail('should fail');
        } catch (error) {
            expect(error instanceof CarError).to.be.true;
            expect((error as CarError).code).to.be.equal(ErrorCodes.CarStorage.General);
        }
    });

    it('Should throw an error when the additional properties are added ', async function () {
        const carService = new CarService();
        const car: ICarDomain = {
            serialUUID: 'wrong format',
            brand: 'ford',
            color: Color.BLUE,
            model: 'S333',
        };
        try {
            await carService.create(car);
            fail('should fail');
        } catch (error) {
            expect(error instanceof CarError).to.be.true;
            expect((error as CarError).code).to.be.equal(ErrorCodes.CarStorage.General);
        }
    });

    it('Should Delete a car given the UUID', async function () {
        const carService = new CarService();
        const car: ICarDomain = {
            brand: 'ford',
            color: Color.BLUE,
            model: 'S333',
        };
        const serialUUID: string = await carService.create(car);

        await carService.deleteBySerialUUID(serialUUID);
    });

    it('Should not throw if tries to delete with non existing ID', async function () {
        const carService = new CarService();
        await carService.deleteBySerialUUID('anyUUID');
    });

    it('Should find a car given the UUID', async function () {
        const carService = new CarService();
        const car: ICarDomain = {
            brand: 'ford',
            color: Color.BLUE,
            model: 'S333',
        };
        const serialUUID: string = await carService.create(car);

        const foundCar = await carService.getCarBySerialUUID(serialUUID);

        expect(foundCar).to.be.not.undefined;
        expect(foundCar.brand).to.equal(car.brand);
        expect(foundCar.color).to.equal(car.color);
        expect(foundCar.model).to.equal(car.model);
    });

    it('Should Should throw NoFound error when the car is not found given the UUID', async function () {
        const carService = new CarService();
        const car: ICarDomain = {
            brand: 'ford',
            color: Color.BLUE,
            model: 'S333',
        };
        await carService.create(car);
        const nonExistingSerialUUID = randomUUID();

        try {
            await carService.getCarBySerialUUID(nonExistingSerialUUID);
            fail('should fail');
        } catch (error) {
            expect(error instanceof CarError).to.be.true;
            expect((error as CarError).code).to.be.equal(ErrorCodes.CarStorage.NoFound);
        }
    });

    it('Should update a car given the UUID and single properties', async function () {
        const carService = new CarService();
        const car: ICarDomain = {
            brand: 'ford',
            color: Color.BLUE,
            model: 'S333',
        };
        const createdUUID = await carService.create(car);

        const updated = (await carService.updateSingleProperties(createdUUID, { brand: 'Mercedes', color: Color.BLACK })) as ICarDomain;

        expect(updated.brand).to.equal('Mercedes');
        expect(updated.color).to.equal(Color.BLACK);
        expect(updated.model).to.equal(car.model);
    });

    it('Should throw an error while updating if given UUID does not exists', async function () {
        const carService = new CarService();

        const nonExistingUUID = randomUUID();

        try {
            await carService.updateSingleProperties(nonExistingUUID, { brand: 'Mercedes', color: Color.BLACK });
            fail('should fail');
        } catch (error) {
            console.info(error);
            expect(error instanceof CarError).to.be.true;
            expect((error as CarError).code).to.be.equal(ErrorCodes.CarStorage.NoFound);
        }
    });

    it('Should grt ', async function () {
        const carService = new CarService();
        let car: ICarDomain = {
            brand: 'ford',
            color: Color.BLUE,
            model: 'S333',
        };
        await carService.create(car);
        await carService.create(car);

        car = {
            brand: 'Mercedes',
            color: Color.BLUE,
            model: 'S333',
        };
        await carService.create(car);
        await carService.create(car);

        await carService.create(car);

        await carService.getMetadata();
    });
});
