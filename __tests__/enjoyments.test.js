const { getEnjoyment, getCar } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('enjoyment routes', () => {
  it('gets a enjoyment by id', async() => {
    const car = await getCar();
    const enjoyment = await getEnjoyment({ carId: car._id });

    return request(app)
      .get(`/api/v1/enjoyments/${enjoyment._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...enjoyment,
          carId: car
        });
      });
  });

  it('deletes a enjoyment by id', async() => {
    const enjoyment = await getEnjoyment();

    return request(app)
      .delete(`/api/v1/enjoyments/${enjoyment._id}`)
      .then(res => {
        expect(res.body).toEqual(enjoyment);
      });
  });

});
