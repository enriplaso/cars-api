const CarSchema = {
  brand: {
    type: String,
  },
  color: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  serieNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
};

export default CarSchema;
