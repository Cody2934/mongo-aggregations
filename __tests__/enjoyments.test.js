const { getEnjoyment, getCar } = require('../lib/db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('enjoyment routes', () => {
  it('creates an enjoyment', async() => {
    const car = await getCar();

    return request(app)
      .post('/api/v1/enjoyment')
      .send({
        carId: car._id,
        make: 'test',
        model: 'test 1234'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          carId: car._id,
          make: 'test',
          model: 'test 1234',
          __v: 0
        });
      });
  });

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

  it('updates a enjoyment by id', async() => {
    const enjoyment = await getEnjoyment();

    return request(app)
      .patch(`/api/v1/enjoyments/${enjoyment._id}`)
      .send({ text: 'bad!' })
      .then(res => {
        expect(res.body).toEqual({
          ...enjoyment,
          looks: 'bad!'
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
