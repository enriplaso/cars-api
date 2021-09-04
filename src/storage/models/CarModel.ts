import { Document, Schema, Model, model } from 'mongoose';
import { ICarDomain } from '../domain/ICarDomain';
import CarSchema from '../schemas/carSchema';

export interface ICarModel extends ICarDomain, Document {}

/**
 * Mongose Car Model, this would be equivalent to a DAO
 */
export const CarModel: Model<ICarModel> = model('Car', new Schema(CarSchema));


