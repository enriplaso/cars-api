import 'reflect-metadata';

import express from 'express';

import Container from 'typedi';import { CarController } from './controller/CarController';
import { connectMongoDB } from './storage/connectMongoDB';
import { CarRoutes } from './routes/CarRoutes';
import { SchemaValidator } from './validation/schemaValidator';

const main = async () => {
    const app = express();
    app.use(express.json());

    //Intializes schema validation function
    Container.get(SchemaValidator).compile();
    //configure routes
    new CarRoutes(app, Container.get(CarController), Container.get(SchemaValidator)).configureRoutes();

    connectMongoDB('mongodb://localhost:27017', 'carsdb');

    app.listen(3000, () => {
        console.log('Server started');
    });
};

main().catch((err) => {
    console.error(err);
});
