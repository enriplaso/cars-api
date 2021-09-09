import { Request, Response } from 'express';
import { Service } from 'typedi';
import { CarError } from '../error/CarError';
import { ErrorCodes } from '../error/ErrorCodes';
import { CarService } from '../services/CarService';

@Service()
export class CarController {
    constructor(private readonly carService: CarService) {}

    public async createNewCar(req: Request, res: Response) {
        try {
            const CarUUID = await this.carService.create(req.body);
            res.status(201).send({ id: CarUUID });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    private handleError(error: Error | any, res: Response) {
        if (error instanceof CarError) {
            switch (error.code) {
                case ErrorCodes.CarStorage.AlreadyExists:
                    res.status(409).send();
                    break;

                case ErrorCodes.CarStorage.General:
                    res.status(400).send();
                    break;
            }
        }
        console.info(error);
        res.status(500).send();
    }
}
