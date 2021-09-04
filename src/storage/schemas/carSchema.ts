const CarSchema = {
  serialUUID: {
    type: String,
    unique: true,
    pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    minLength: 36,
    maxLength: 36,
  },
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    enum: ['Blue', 'Red', 'Black', 'White', 'Yellow'],
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
};

export default CarSchema;
