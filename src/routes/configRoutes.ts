import { Application } from 'express';
import { CarController } from '../controller/carController';
import { UserController } from '../controller/userController';
import { validateToken } from '../midlewares/authorization';
import { schemaValidation } from '../midlewares/schemaValidation';
import { SchemaValidator } from '../validation/schemaValidator';

export const configureCarRoutes = (app: Application, carController: CarController, validateCar: SchemaValidator) => {
    app.route(`/car`).post(
        validateToken,
        schemaValidation(validateCar.validateCar.bind(validateCar)),
        carController.createNewCar.bind(carController),
    );

    app.route(`/car/:serialUUID`).delete(
        validateToken,
        schemaValidation(validateCar.validateSerialUUID.bind(validateCar)),
        carController.deletCarBySerialUUID.bind(carController),
    );

    app.route(`/car/:serialUUID`).get(
        validateToken,
        schemaValidation(validateCar.validateSerialUUID.bind(validateCar)),
        carController.getCarBySerialUUID.bind(carController),
    );

    app.route(`/car/:serialUUID`).put(
        validateToken,
        schemaValidation(validateCar.validateSerialUUID.bind(validateCar)),
        schemaValidation(validateCar.validateUpdateProperties.bind(validateCar)),
        carController.updateSingleProperties.bind(carController),
    );

    app.route(`/metadata`).get(validateToken, carController.getMetadata.bind(carController));
};

export const configureUserRoutes = (app: Application, userController: UserController) => {
    app.route(`/signup`).post(userController.signUp.bind(userController));
    app.route(`/login`).post(userController.login.bind(userController));
};
