const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.virtual('enjoyments', {
  ref: 'Enjoyment',
  localField: '_id',
  foreignField: 'carId'
});

module.exports = mongoose.model('Car', schema);
