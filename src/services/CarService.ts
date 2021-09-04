import { randomUUID } from 'crypto';
import { Service } from 'typedi';
import { ICarDomain } from '../storage/domain/ICarDomain';
import { CarModel, ICarModel } from '../storage/models/CarModel';
import { ICarService } from './ICarService';
import { Property } from '../model/Property';


@Service()
export class CarService implements ICarService {
  async create(car: ICarDomain): Promise<string> {
    try {
      if (car.serialUUID) {
        const foundCar = await CarModel.findOne({serialUUID: car.serialUUID}) as ICarModel;
        if(foundCar) {
          throw new Error(`UUID ${car.serialUUID} already exists`);
        }
      } else {
        car.serialUUID = randomUUID();
      }
      const carToStore = new CarModel(car);
      const createdCar: ICarDomain = await carToStore.save();
      return  createdCar.serialUUID as string;
    } catch (error) {
      throw new Error(`Something wrong happened while creating a car: ${error.message}`);
    }
  }
  async deleteBySerialNumber(serialUUID: string): Promise<void> {
    try{
      await CarModel.deleteOne({serialUUID});
    }catch(error) {
      throw new Error(`Something wrong happened while deleting a car: ${error.messager}`);
    }
  }

  async getCarBySerialNumber(serialNumber: string): Promise<ICarDomain> {
    console.info(serialNumber);
    throw new Error('Method not implemented.');
  }
  async getMetadata(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async updateSingleProperties(serialNumber: string, properties: Array<Property>): Promise<ICarDomain> {
    console.info(serialNumber);
    console.info(properties);
    throw new Error('Method not implemented.');
  }
}
