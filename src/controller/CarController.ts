import { Request, Response } from 'express';
import { Service } from 'typedi';
import { CarService } from '../services/CarService';
import { Color, ICarDomain } from '../storage/domain/ICarDomain';

@Service()
class CarController {
    constructor(private readonly carService: CarService) {}

    async createNewCar(_req: Request, res: Response) {
        let result;
        try {
            const car: ICarDomain = {
                brand: 'Ford',
                color: Color.BLACK,
                model: 'S350',
            };
            result = await this.carService.create(car);
        } catch (error) {
            console.error(error);
        }

        return res.json(result);
    }
}

export default CarController;
