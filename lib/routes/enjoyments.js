const { Router } = require('express');
const Enjoyment = require('../model/Enjoyment');

module.exports = Router()
  .post('/', (req, res, next) => {
    Enjoyment
      .create(req.body)
      .then(enjoyment => res.send(enjoyment))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Enjoyment
      .findById(req.params.id)
      .populate('carId')
      .then(enjoyment => res.send(enjoyment))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Enjoyment
      .findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
      .then(enjoyment => res.send(enjoyment))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Enjoyment
      .findByIdAndDelete(req.params.id)
      .then(enjoyment => res.send(enjoyment))
      .catch(next);
  });
