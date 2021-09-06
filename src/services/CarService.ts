import { Service } from 'typedi';
import { ICarDomain } from '../storage/domain/ICarDomain';
import { CarModel, ICarModel } from '../storage/models/CarModel';
import { ICarService } from './ICarService';
import { CarError } from '../error/CarError';
import { ErrorCodes } from '../error/ErrorCodes';

@Service()
export class CarService implements ICarService {
    async create(car: ICarDomain): Promise<string> {
        try {
            if (car.serialUUID) {
                const foundCar = (await CarModel.findOne({ serialUUID: car.serialUUID })) as ICarModel;
                if (foundCar) {
                    throw new CarError(ErrorCodes.CarStorage.AlreadyExists, `UUID ${car.serialUUID} already exists`);
                }
            }
            const carToStore = new CarModel(car);
            const createdCar: ICarDomain = await carToStore.save();
            return createdCar.serialUUID as string;
        } catch (error) {
            throw error instanceof CarError ? error : new CarError(ErrorCodes.CarStorage.General, (error as Error).message);
        }
    }
    async deleteBySerialUUID(serialUUID: string): Promise<void> {
        try {
            await CarModel.deleteOne({ serialUUID });
        } catch (error) {
            throw new CarError(ErrorCodes.CarStorage.General, (error as Error).message);
        }
    }

    async getCarBySerialUUID(serialUUID: string): Promise<ICarDomain> {
        try {
            const foundCar = (await CarModel.findOne({ serialUUID })) as ICarModel;
            if (!foundCar) {
                throw new CarError(ErrorCodes.CarStorage.NoFound, `Car with UUID: ${serialUUID} was not found`);
            }
            return foundCar;
        } catch (error) {
            throw error instanceof CarError ? error : new CarError(ErrorCodes.CarStorage.General, (error as Error).message);
        }
    }

    async updateSingleProperties(serialUUID: string, properties: { [Key: string]: string }): Promise<ICarDomain> {
        try {
            const updated = (await CarModel.findOneAndUpdate({ serialUUID }, properties, { new: true })) as ICarDomain;
            if (!updated) {
                throw new CarError(ErrorCodes.CarStorage.NoFound, `Could not update, the car with UUID: ${serialUUID} was not found`);
            }
            return updated;
        } catch (error) {
            throw error instanceof CarError ? error : new CarError(ErrorCodes.CarStorage.General, (error as Error).message);
        }
    }

    async getMetadata(): Promise<any> {
        const aggregatorOpts = [
            {
                //Processes multiple aggregation pipelines
                $facet: {
                    color: [
                        {
                            $group: {
                                _id: '$color',
                                count: { $sum: 1 },
                            },
                        },
                    ],
                    brand: [
                        {
                            $group: {
                                _id: '$brand',
                                count: { $sum: 1 },
                            },
                        },
                    ],
                    all: [{ $group: { _id: null, count: { $sum: 1 } } }, { $project: { _id: 0 } }],
                },
            },
        ];
        const res = await CarModel.aggregate(aggregatorOpts).exec();
        console.log(JSON.stringify(res));
    }
}
