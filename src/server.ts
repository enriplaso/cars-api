import 'reflect-metadata';

import express from 'express';

import Container from 'typedi';
//import { CarController } from './controller/CarController';
import { connectMongoDB } from './storage/connectMongoDB';
import { CarRoutes } from './routes/CarRoutes';

const main = async () => {
    const app = express();
    app.use(express.json());

    //Container.get(CarController);
    //Container.set('app', app);
    Container.get(CarRoutes).configureRoutes(app);

    connectMongoDB('mongodb://localhost:27017', 'carsdb');

    //app.post('/cars', (req, res) => carController.createNewCar(req, res));

    app.listen(3000, () => {
        console.log('Server started');
    });
};

main().catch((err) => {
    console.error(err);
});
