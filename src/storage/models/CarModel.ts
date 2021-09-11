import { randomUUID } from 'crypto';
import { Document, Model, model } from 'mongoose';
import { ICarDomain } from '../domain/ICarDomain';
import { CarSchema } from '../schemas/carSchema';

export interface ICarModel extends ICarDomain, Document {}

CarSchema.pre<ICarModel>('save', function () {
    // `this` is an instance of `ICarModel`
    if (!this.serialUUID) {
        this.serialUUID = randomUUID(); // Creates a UUID before a car is created
    }
});

/**
 * Mongose Car Model, this would be equivalent to a DAO
 *
 */
export const CarModel: Model<ICarModel> = model('Car', CarSchema);
