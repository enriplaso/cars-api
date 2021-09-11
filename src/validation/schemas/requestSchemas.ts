export const serialUUIDJsonSchema = {
    type: 'string',
    pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    minLength: 36,
    maxLength: 36,
};

export const singlePropertiesJsonSchema = {
    title: 'Car Schema',
    description: 'Validates the A car objec that is passed in create car API request',
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
    description: 'Validates the A car objec that is passed in create car API request',
    required: ['brand', 'color', 'model'],
    type: 'object',
    properties: singlePropertiesJsonSchema.properties,
    additionalProperties: false, //additionalProperties prop is not available in Mongose schemas
};
