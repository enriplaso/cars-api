import { Document, Schema, Model, model } from 'mongoose';
import CarSchema from '../schemas/carSchema';

// We can reuse this model 
export interface ICar {
  brand: string;
  color: string;
  model: string;
  serieNumber: number;
  engine: string;
}

export interface ICarModel extends ICar, Document {}

const carSchema = new Schema(CarSchema);

const CarModel: Model<ICarModel> = model('Car', carSchema);

export default CarModel;
