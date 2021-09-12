import { Document, Model, model } from 'mongoose';
import { IUserDomain } from '../domain/IUserDomain';
import { UserSchema } from '../schemas/userSchema';

export interface IUserModel extends IUserDomain, Document {}

/**
 * Mongose USER Model, this would be equivalent to an User DAO
 */
export const UserModel: Model<IUserModel> = model('User', UserSchema);
