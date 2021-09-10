import { Schema } from 'mongoose';

const CarMongoSchema = {
    serialUUID: {
        type: 'string',
        unique: true,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        minLength: 36,
        maxLength: 36,
    },
    brand: {
        type: 'string',
        required: true,
    },
    color: {
        type: 'string',
        enum: ['Blue', 'Red', 'Black', 'White', 'Yellow'],
        required: true,
    },
    model: {
        type: 'string',
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
};

const CarSchema: Schema = new Schema(CarMongoSchema);

export default CarSchema;
