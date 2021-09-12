import { ConnectOptions, connect } from 'mongoose';

/**
 * Creates a MongoDb connection with mongoose
 */
export const connectMongoDB = async (mongoURI: string, dbName?: string, user?: string, pass?: string): Promise<void> => {
    try {
        const options: ConnectOptions = {
            dbName,
            user,
            pass,
        };

        await connect(mongoURI, options);
        console.info('MongoDB Connected...');
    } catch (error) {
        console.error(error);
        // Exit process with failure
        process.exit(1);
    }
};
