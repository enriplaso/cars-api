import express from 'express';
import { Service } from 'typedi';
import { CarController } from '../controller/CarController';

@Service()
export class CarRoutes {
    constructor(private readonly carController: CarController) {}

    configureRoutes(app: express.Application) {
        app.route(`/cars`).post(this.carController.createNewCar.bind(this.carController));
    }
}
