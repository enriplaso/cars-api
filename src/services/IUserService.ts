import { IUserDomain } from '../storage/domain/IUserDomain';

export interface IUserService {
    /**
     * Creates an user with email and password
     * @param user
     */
    create(user: IUserDomain): Promise<void>;
    /**
     * Gets an user given his email
     * @param email
     */
    getByEmail(email: string): Promise<IUserDomain>;
}
