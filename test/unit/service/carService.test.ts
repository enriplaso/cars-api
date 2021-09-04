import { fail } from 'assert';
import { expect } from 'chai';
import 'mocha';
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

  it('Should return the generated UUID of the car during Car creation', async () => {
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

  it('Should thow an error if uuid already exists', async () => {
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
      expect(error).to.be.not.undefined;
    }
  });

  it.only('Should throw an error when the UUID has a wrong format', async () => {
    const carService = new CarService();
    const car: ICarDomain = {
      serialUUID: "wrong format",
      brand: 'ford',
      color: Color.BLUE,
      model: 'S333',
    };
    try {
        await carService.create(car);
        fail('should fail');
      } catch (error) {
        console.log(error);
        expect(error).to.not.undefined;
      }
  });

  it('Should Delete a car given the UUID', async () => {
    const carService = new CarService();
    const car: ICarDomain = {
      brand: 'ford',
      color: Color.BLUE,
      model: 'S333',
    };
    const serialUUID: string = await carService.create(car);

    await carService.deleteBySerialNumber(serialUUID);
  });


  it('Should not throw if tries to delete with non existing ID', async () => {
    const carService = new CarService();
    await carService.deleteBySerialNumber("anyUUID"); 
  });


});
