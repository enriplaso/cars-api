import 'reflect-metadata';

import express from 'express';
import Container from 'typedi';
import { CarController } from './controller/carController';
import { connectMongoDB } from './storage/connectMongoDB';
import { configureCarRoutes, configureUserRoutes } from './routes/configRoutes';
import { SchemaValidator } from './validation/schemaValidator';
import {
    carJsonSchema,
    serialUUIDJsonSchema,
    singlePropertiesJsonSchema,
    userJsonSchema,
    emailJsonSchema,
} from './validation/schemas/requestSchemas';
import Ajv from 'ajv';
import { UserController } from './controller/userController';

const app = express();
app.use(express.json());

const ajv = new Ajv();
//Intializes schema validation in DI
Container.set(
    SchemaValidator,
    new SchemaValidator(
        ajv.compile(carJsonSchema),
        ajv.compile(serialUUIDJsonSchema),
        ajv.compile(singlePropertiesJsonSchema),
        ajv.compile(userJsonSchema),
        ajv.compile(emailJsonSchema),
    ),
);

//configure routes
configureCarRoutes(app, Container.get(CarController), Container.get(SchemaValidator));
configureUserRoutes(app, Container.get(UserController), Container.get(SchemaValidator));
//Db connection
connectMongoDB(process.env['MONGO_URI'] || 'mongodb://localhost:27017', 'carsdb');

app.listen(3000, () => {
    console.log('Server started');
});
