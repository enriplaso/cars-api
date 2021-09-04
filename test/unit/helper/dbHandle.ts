import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

/**
 * Connect to the in-memory database.
 */
export const connect = async () => {
    mongod = await MongoMemoryServer.create();
   // console.log(mongod.getUri());
    await mongoose.connect(mongod.getUri());
}

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

/**
 * Remove all the data from db.
 */
export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.drop();
    }
}