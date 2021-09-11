import { Service } from 'typedi';
import { ICarDomain } from '../storage/domain/ICarDomain';
import { CarModel, ICarModel } from '../storage/models/carModel';
import { ICarService } from './ICarService';
import { CarError } from '../error/carError';
import { ErrorCodes } from '../error/errorCodes';
import { ICarMetaData } from '../storage/domain/ICarMetadata';

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

    async getBySerialUUID(serialUUID: string): Promise<ICarDomain> {
        try {
            const foundCar = (await CarModel.findOne({ serialUUID }, { _id: 0, __v: 0 })) as ICarModel;
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
            const updated = (await CarModel.findOneAndUpdate({ serialUUID }, properties, {
                new: true,
                projection: { _id: 0, __v: 0 }, // We don't want to include _id and __v props from document
            })) as ICarDomain;
            if (!updated) {
                throw new CarError(ErrorCodes.CarStorage.NoFound, `Could not update, the car with UUID: ${serialUUID} was not found`);
            }
            return updated;
        } catch (error) {
            throw error instanceof CarError ? error : new CarError(ErrorCodes.CarStorage.General, (error as Error).message);
        }
    }

    async getMetadata(): Promise<ICarMetaData> {
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
        try {
            const rawMetadata = await CarModel.aggregate(aggregatorOpts).exec();
            return this.transformRawMetadata(rawMetadata);
        } catch (error) {
            throw new CarError(ErrorCodes.CarStorage.General, (error as Error).message);
        }
    }

    private transformRawMetadata(rawMetadata: Array<any>): ICarMetaData {
        const metadata: ICarMetaData = {
            numberOfCars: rawMetadata[0].all[0]?.count || 0,
            colors: {},
            brands: {},
        };

        if (metadata.numberOfCars !== 0) {
            rawMetadata[0].color.forEach((element: { _id: string; count: number }) => {
                Object.assign(metadata.colors, { [element._id]: element.count });
            });

            rawMetadata[0].brand.forEach((element: { _id: string; count: number }) => {
                Object.assign(metadata.brands, { [element._id]: element.count });
            });
        }

        return metadata;
    }
}
