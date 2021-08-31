import { Service } from "typedi";
import Car from "../model/Car";

@Service()
class CarService {

  private readonly cars: Car[] = [
    { name: 'Ford' },
    { name: 'Audi' },
    { name: 'Mercedes' },
  ];
  constructor() { }

  async getAllCars(): Promise<Car[]> {
    return this.cars;
  }
}

export default CarService;