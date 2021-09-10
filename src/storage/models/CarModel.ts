import { randomUUID } from 'crypto';
import { Document, Model, model } from 'mongoose';
import { ICarDomain } from '../domain/ICarDomain';
import CarMongoSchema from '../schemas/carSchema';

export interface ICarModel extends ICarDomain, Document {}

CarMongoSchema.pre<ICarModel>('save', function () {
    // `this` is an instance of `ICarModel`
    if (!this.serialUUID) {
        this.serialUUID = randomUUID();
    }
});

/**
 * Mongose Car Model, this would be equivalent to a DAO
 *
 */
export const CarModel: Model<ICarModel> = model('Car', CarMongoSchema);
