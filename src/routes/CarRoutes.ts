import { Application } from 'express';
import { CarController } from '../controller/carController';
import { schemaValidation } from '../midlewares/schemaValidation';
import { SchemaValidator } from '../validation/schemaValidator';
//TODO change to function
export class CarRoutes {
    constructor(
        private readonly app: Application,
        private readonly carController: CarController,
        private readonly validateCar: SchemaValidator,
    ) {}

    configureRoutes() {
        this.app
            .route(`/car`)
            .post(
                schemaValidation(this.validateCar.validateCar.bind(this.validateCar)),
                this.carController.createNewCar.bind(this.carController),
            );

        this.app
            .route(`/car/:serialUUID`)
            .delete(
                schemaValidation(this.validateCar.validateSerialUUID.bind(this.validateCar)),
                this.carController.deletCarBySerialUUID.bind(this.carController),
            );
    }
}
