import { Application } from 'express';
import { CarController } from '../controller/CarController';
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
            .route(`/cars`)
            .post(
                schemaValidation(this.validateCar.validateCar.bind(this.validateCar)),
                this.carController.createNewCar.bind(this.carController),
            );
    }
}
