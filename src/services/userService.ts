import { Service } from 'typedi';
import { ErrorCodes } from '../error/errorCodes';
import { UserError } from '../error/userError';
import { IUserDomain } from '../storage/domain/IUserDomain';
import { IUserModel, UserModel } from '../storage/models/userModel';
import { IUserService } from './IUserService';

@Service()
export class UserService implements IUserService {
    public async create(user: IUserDomain): Promise<void> {
        try {
            const foundUser = (await UserModel.findOne({ email: user.email })) as IUserModel;
            if (foundUser) {
                throw new UserError(ErrorCodes.UserStorage.AlreadyExists, `The user with the email: ${user.email} already exists`);
            }
            const userToStore = new UserModel(user);
            await userToStore.save();
        } catch (error) {
            throw error instanceof UserError ? error : new UserError(ErrorCodes.UserStorage.General, (error as Error).message);
        }
    }

    public async getByEmail(email: string): Promise<IUserDomain> {
        try {
            const foundUser = (await UserModel.findOne({ email }, { _id: 0, __v: 0 })) as IUserDomain;
            if (!foundUser) {
                throw new UserError(ErrorCodes.UserStorage.NoFound, `The user with the email: ${email} does not exists`);
            }
            return foundUser;
        } catch (error) {
            throw error instanceof UserError ? error : new UserError(ErrorCodes.UserStorage.General, (error as Error).message);
        }
    }
}
