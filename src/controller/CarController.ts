import { Request, Response } from "express";
import { Service } from "typedi";
import CarService from "../services/CarService";

@Service()
class CarController {
  constructor(private readonly carService: CarService) { }

  async getAllCars(_req: Request, res: Response) {
    let result;
    try{
         result = await this.carService.getAllCars();

    } catch(error){
        console.error(error);
    }

    return res.json(result);
  }
}

export default CarController;