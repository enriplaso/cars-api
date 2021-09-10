export const serialUUIDJsonSchema = {
    required: ['serialUUID'],
    type: 'object',
    serialUUID: {
        type: 'string',
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        minLength: 36,
        maxLength: 36,
    },
};

export const CarJsonSchema = {
    title: 'Car Schema',
    description: 'Validates the A car objec that is passed in create car API request',
    required: ['brand', 'color', 'model'],
    type: 'object',
    properties: {
        serialUUID: serialUUIDJsonSchema.serialUUID,
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
    additionalProperties: false, //additionalProperties prop is not available in Mongose schemas
};
