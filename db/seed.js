const Car = require('../lib/model/Car');
const Enjoyment = require('../lib/model/Enjoyment');
const chance = require('chance').Chance();

module.exports = async({ carsToCreate = 10, enjoymentsToCreate = 100 } = {}) => {
  const speed = ['fast', 'slow', 'insane'];
  const make = ['tesla', 'lambo', 'subaru'];
  const looks = ['beautiful', 'ugly', 'smexy'];
  const cars = await Car.create([...Array(carsToCreate)].map(() => ({
    make: chance.pickone(make),
    model: chance.word()
  })));

  await Enjoyment.create([...Array(enjoymentsToCreate)].map(() => ({
    carId: chance.pickone(cars)._id,
    speed: chance.pickone(speed),
    looks: chance.pickone(looks)
  })));
};
