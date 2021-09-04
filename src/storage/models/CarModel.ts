import { Document, Schema, Model, model } from 'mongoose';
import { ICarDomain } from '../domain/ICarDomain';
import CarSchema from '../schemas/carSchema';

/**
 * Mongose Car Model, this would be equivalent to a DAO
 */
export interface ICarModel extends ICarDomain, Document {}

const carSchema = new Schema(CarSchema);

const CarModel: Model<ICarModel> = model('Car', carSchema);

export default CarModel;
