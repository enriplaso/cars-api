import { Schema } from 'mongoose';

const UserMongoSchema = {
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
};

export const UserSchema: Schema = new Schema(UserMongoSchema);
