import { Application } from 'express';
import { CarController } from '../controller/carController';
import { schemaValidation } from '../midlewares/schemaValidation';
import { SchemaValidator } from '../validation/schemaValidator';

export const configureRoutes = (app: Application, carController: CarController, validateCar: SchemaValidator) => {
    app.route(`/car`).post(schemaValidation(validateCar.validateCar.bind(validateCar)), carController.createNewCar.bind(carController));

    app.route(`/car/:serialUUID`).delete(
        schemaValidation(validateCar.validateSerialUUID.bind(validateCar)),
        carController.deletCarBySerialUUID.bind(carController),
    );
};
