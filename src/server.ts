import 'reflect-metadata';

import express from 'express';
import Container from 'typedi';
import { CarController } from './controller/carController';
import { connectMongoDB } from './storage/connectMongoDB';
import { configureRoutes } from './routes/CarRoutes';
import { SchemaValidator } from './validation/schemaValidator';
import { carJsonSchema, serialUUIDJsonSchema } from './validation/schemas/requestSchemas';
import Ajv from 'ajv';

const main = async () => {
    const app = express();
    app.use(express.json());

    const ajv = new Ajv();
    //Intializes schema validation in DI
    Container.set(SchemaValidator, new SchemaValidator(ajv.compile(carJsonSchema), ajv.compile(serialUUIDJsonSchema)));

    //configure routes
    configureRoutes(app, Container.get(CarController), Container.get(SchemaValidator));

    connectMongoDB('mongodb://localhost:27017', 'carsdb');

    app.listen(3000, () => {
        console.log('Server started');
    });
};

main().catch((err) => {
    console.error(err);
});
