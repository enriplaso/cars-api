import { Request, Response } from 'express';
import { Service } from 'typedi';
import { CarError } from '../error/carError';
import { ErrorCodes } from '../error/errorCodes';
import { CarService } from '../services/carService';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

@Service()
export class CarController {
    constructor(private readonly carService: CarService) {}

    public async createNewCar(req: Request, res: Response): Promise<void> {
        try {
            const CarUUID = await this.carService.create(req.body);
            res.status(StatusCodes.CREATED).send({ serialUUID: CarUUID });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public async deletCarBySerialUUID(req: Request, res: Response): Promise<void> {
        try {
            await this.carService.deleteBySerialUUID(req.params.serialUUID);
            res.status(StatusCodes.OK).send();
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public async getCarBySerialUUID(req: Request, res: Response): Promise<void> {
        try {
            const foundCar = await this.carService.getBySerialUUID(req.params.serialUUID);
            res.status(StatusCodes.OK).send(foundCar);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public async updateSingleProperties(req: Request, res: Response): Promise<void> {
        try {
            const udatedCar = await this.carService.updateSingleProperties(req.params.serialUUID, req.body);
            res.status(StatusCodes.OK).send(udatedCar);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public async getMetadata(_: Request, res: Response): Promise<void> {
        try {
            const metadata = await this.carService.getMetadata();
            res.status(StatusCodes.OK).send(metadata);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    private handleError(error: Error | any, res: Response): void {
        console.warn(error);
        if (error instanceof CarError) {
            switch (error.code) {
                case ErrorCodes.CarStorage.AlreadyExists:
                    res.status(StatusCodes.CONFLICT).send({ error: error.code });
                    return;

                case ErrorCodes.CarStorage.General:
                    res.status(StatusCodes.BAD_REQUEST).send({ error: error.code });
                    return;

                case ErrorCodes.CarStorage.NoFound:
                    res.status(StatusCodes.NOT_FOUND).send({ error: error.code });
                    return;
            }
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
}
