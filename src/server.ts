  
import 'reflect-metadata';

import express from 'express';

import Container from 'typedi';
import CarController from './controller/CarController';
import {connectMongoDB} from './storage/connectMongoDB';

const main = async () => {
  const app = express();

  const carController = Container.get(CarController);

  connectMongoDB('mongodb://localhost:27017', "carsdb");

  app.get('/cars', (req, res) => carController.createNewCar(req, res));

  app.listen(3000, () => {
    console.log('Server started');
  });
}

main().catch(err => {
  console.error(err);
});