import { randomUUID } from 'crypto';
import { Document, Schema, Model, model } from 'mongoose';
import { ICarDomain } from '../domain/ICarDomain';
import CarSchema from '../schemas/carSchema';

export interface ICarModel extends ICarDomain, Document {}

const schema: Schema = new Schema(CarSchema);

schema.pre<ICarModel>('save', function () {
    // `this` is an instance of `ICarModel`
    if (!this.serialUUID) {
        this.serialUUID = randomUUID();
    }
});

/**
 * Mongose Car Model, this would be equivalent to a DAO
 *
 */
export const CarModel: Model<ICarModel> = model('Car', new Schema(schema));
