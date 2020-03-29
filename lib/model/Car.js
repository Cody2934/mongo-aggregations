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

});

schema.virtual('enjoyments', {
  ref: 'Enjoyment',
  localField: '_id',
  foreignField: 'carId'
});

module.exports = mongoose.model('Car', schema);

