import { Request, Response } from 'express';
import { Service } from 'typedi';
import { CarError } from '../error/CarError';
import { ErrorCodes } from '../error/ErrorCodes';
import { CarService } from '../services/carService';

@Service()
export class CarController {
    constructor(private readonly carService: CarService) {}

    public async createNewCar(req: Request, res: Response) {
        try {
            const CarUUID = await this.carService.create(req.body);
            res.status(201).send({ serialUUID: CarUUID });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public async deletCarBySerialUUID(req: Request, res: Response) {
        try {
            await this.carService.deleteBySerialUUID(req.params.serialUUID);
            res.status(200).send();
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public async getCarBySerialUUID(req: Request, res: Response) {
        try {
            const foundCar = await this.carService.getBySerialUUID(req.params.serialUUID);
            res.status(200).send(foundCar);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public async updateSingleProperties(req: Request, res: Response) {
        try {
            const udatedCar = await this.carService.updateSingleProperties(req.params.serialUUID, req.body);
            res.status(200).send(udatedCar);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public async getMetadata(_: Request, res: Response) {
        try {
            const metadata = await this.carService.getMetadata();
            res.status(200).send(metadata);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    private handleError(error: Error | any, res: Response) {
        console.warn(error);
        if (error instanceof CarError) {
            switch (error.code) {
                case ErrorCodes.CarStorage.AlreadyExists:
                    res.status(409).send({ error: error.code });
                    break;

                case ErrorCodes.CarStorage.General:
                    res.status(400).send({ error: error.code });
                    break;

                case ErrorCodes.CarStorage.NoFound:
                    res.status(404).send({ error: error.code });
                    break;
            }
        }
        res.status(500).send();
    }
}
