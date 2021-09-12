export const serialUUIDJsonSchema = {
    type: 'string',
    pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    minLength: 36,
    maxLength: 36,
};

export const singlePropertiesJsonSchema = {
    title: 'Car Schema',
    description: 'update single properties for a car API request',
    type: 'object',
    properties: {
        serialUUID: serialUUIDJsonSchema,
        brand: {
            type: 'string',
        },
        color: {
            type: 'string',
            enum: ['Blue', 'Red', 'Black', 'White', 'Yellow'],
        },
        model: {
            type: 'string',
        },
    },
    additionalProperties: false,
};

export const carJsonSchema = {
    title: 'Car Schema',
    description: 'Validates the A car objec that is passed in a create car API request',
    required: ['brand', 'color', 'model'],
    type: 'object',
    properties: singlePropertiesJsonSchema.properties,
    additionalProperties: false, //additionalProperties prop is not available in Mongose schemas
};

export const emailJsonSchema = {
    type: 'string',
    pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
};

export const userJsonSchema = {
    title: 'User Schema',
    required: ['email', 'password'],
    type: 'object',
    properties: {
        email: emailJsonSchema,
        password: {
            type: 'string',
        },
    },
    additionalProperties: false,
};
