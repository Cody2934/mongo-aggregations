const { Router } = require('express');
const Car = require('../model/Car');

module.exports = Router()
  .post('/', (req, res, next) => {
    Car
      .create(req.body)
      .then(car => res.send(car))
      .catch(next);
  })

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  .get('/most-commented', (req, res, next) => {
    Car
      .mostCommented()
      .then(mostCommented => res.send(mostCommented))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Car
      .findById(req.params.id)
      .populate('enjoyments')
      .then(car => res.send(car))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Car
      .find()
      .then(cars => res.send(cars))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Car
      .findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
      .then(car => res.send(car))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Car
      .findByIdAndDelete(req.params.id)
      .then(car => res.send(car))
      .catch(next);
  });
