import 'mocha';
import { fail } from 'assert';
import { expect } from 'chai';
import { ErrorCodes } from '../../../src/error/errorCodes';
import { UserError } from '../../../src/error/userError';
import { UserService } from '../../../src/services/userService';
import { IUserDomain } from '../../../src/storage/domain/IUserDomain';
import * as dbHandler from '../helper/dbHandle';

describe('CarService tests', function () {
    this.timeout(120000);
    beforeEach(async function () {
        await dbHandler.connect();
    });

    afterEach(async function () {
        await dbHandler.closeDatabase();
    });

    it('Should create an User', async function () {
        const userService = new UserService();
        const user: IUserDomain = {
            email: 'jhondoe@email.com',
            password: '1234567',
        };
        await userService.create(user);
        const createdUser = await userService.get(user.email);

        expect(createdUser).to.be.not.undefined;
        expect(createdUser.email).to.equal(user.email);
    });

    it('Should throw an error if user email already exists', async function () {
        const userService = new UserService();
        const user: IUserDomain = {
            email: 'jhondoe@email.com',
            password: '1234567',
        };
        await userService.create(user);

        try {
            await userService.create(user);
            fail('should fail');
        } catch (error) {
            expect(error instanceof UserError).to.be.true;
            expect((error as UserError).code).to.be.equal(ErrorCodes.UserStorage.AlreadyExists);
        }
    });

    it('Should throw an error if user does not exists', async function () {
        const userService = new UserService();

        try {
            await userService.get('some@email.com');
            fail('should fail');
        } catch (error) {
            expect(error instanceof UserError).to.be.true;
            expect((error as UserError).code).to.be.equal(ErrorCodes.UserStorage.NoFound);
        }
    });
});
