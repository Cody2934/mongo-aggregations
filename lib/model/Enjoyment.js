const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  carId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required:true
  },
  speed: {
    type: String,
    required: true
  },
  looks: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Enjoyment', schema);
