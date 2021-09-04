const CarSchema = {
  serieNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    enum: ["Blue", "Red", "Black", "White", "Yellow"],
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
