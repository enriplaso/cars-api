import { Property } from '../model/Property';
import { ICarDomain } from '../storage/domain/ICarDomain';

export interface ICarService {
  /**
   * Creates a new Car given a Car object
   * @param car car object
   * @returns The the generated car SerialUUID;
   */
  create(car: ICarDomain): Promise<string>;
  /**
   *  Deletes a car from Bb given is serie number
   * @param serialNumber
   */
  deleteBySerialNumber(serialUUID: string): Promise<void>;

  /**
   * Finds a retunts a Car object given its serial number
   * @param serialNumber
   */
  getCarBySerialNumber(serialUUID: string): Promise<ICarDomain>;

  /**
   * Retuns meta-data information of the all cars in the system. E.g: Number of cars, db size etc..
   */
  getMetadata(): Promise<any>;

  /**
   * Updates a single properies of a Car
   * @param serialNumber
   * @param properties 
   */
  updateSingleProperties(serialUUID: string, properties: Array<Property>): Promise<ICarDomain>;
}
