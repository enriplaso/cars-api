import { Application } from 'express';
import { CarController } from '../controller/carController';
import { UserController } from '../controller/userController';
import { validateToken } from '../middleware/authorization';
import { schemaValidation } from '../middleware/schemaValidation';
import { SchemaValidator } from '../validation/schemaValidator';

export const configureCarRoutes = (app: Application, carController: CarController, validator: SchemaValidator): void => {
    app.route(`/car`).post(
        validateToken,
        schemaValidation(validator.validateCar.bind(validator)),
        carController.createNewCar.bind(carController),
    );

    app.route(`/car/:serialUUID`).delete(
        validateToken,
        schemaValidation(validator.validateSerialUUID.bind(validator)),
        carController.deletCarBySerialUUID.bind(carController),
    );

    app.route(`/car/:serialUUID`).get(
        validateToken,
        schemaValidation(validator.validateSerialUUID.bind(validator)),
        carController.getCarBySerialUUID.bind(carController),
    );

    app.route(`/car/:serialUUID`).put(
        validateToken,
        schemaValidation(validator.validateSerialUUID.bind(validator)),
        schemaValidation(validator.validateUpdateProperties.bind(validator)),
        carController.updateSingleProperties.bind(carController),
    );

    app.route(`/metadata`).get(validateToken, carController.getMetadata.bind(carController));
};

export const configureUserRoutes = (app: Application, userController: UserController, validator: SchemaValidator): void => {
    app.route(`/signup`).post(
        schemaValidation(validator.validateUserCredentials.bind(validator)),
        userController.signUp.bind(userController),
    );
    app.route(`/login`).post(
        schemaValidation(validator.validateUserCredentials.bind(validator)),
        userController.login.bind(userController),
    );
};
