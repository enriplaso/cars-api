import { expect } from 'chai';
import 'mocha';
import { Color, ICarDomain } from '../../src/storage/domain/ICarDomain';
import { createACar, createRamdomUserEmail, deleteACar, getACar, getMetadata, login, signUp, updateACar } from './requestHelper';

/**
 * Make sure that the server is up and runnuing and connetion to DB establish
 */
describe('E2E tests', function () {
    this.timeout(120000);

    const USER = createRamdomUserEmail(10);
    const PASS = '123456';

    describe('Happy flow', async function () {
        it('Should SingUp, login and test each car endpoint', async function () {
            //SIGN UP
            let token = await signUp(USER, PASS);
            expect(token).to.be.string;

            //LOGIN
            token = await login(USER, PASS);
            expect(token).to.be.string;

            //CREATE A CAR
            const car = { brand: 'Ford', color: Color.RED, model: 'Mustang' } as ICarDomain;
            const carSerialUUID = await createACar(token, car);
            expect(carSerialUUID).to.be.string;
            expect(carSerialUUID.length).to.be.equal(36);

            //GET A CAR
            const returnedCar = await getACar(token, carSerialUUID);
            expect(returnedCar.brand).to.be.equal(car.brand);
            expect(returnedCar.color).to.be.equal(car.color);

            //UPDATE CAR PROPERTIES
            const propsToUpdate = { brand: 'Mercedes' };
            const updatedCar = await updateACar(token, carSerialUUID, propsToUpdate);
            expect(updatedCar.serialUUID).to.be.equal(carSerialUUID);
            expect(updatedCar.brand).to.be.equal(propsToUpdate.brand);

            //GET METADA
            const metadata = await getMetadata(token);
            expect(metadata.numberOfCars).to.be.greaterThan(0);

            //DELETE A CAR
            await deleteACar(token, carSerialUUID);
        });
    });
});
