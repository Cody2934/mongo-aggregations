const { getCar, getCars, getEnjoyments } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('car routes', () => {
  it('creates a car', () => {
    return request(app)
      .post('/api/v1/cars')
      .send({
        make: 'test',
        model: 'test 1234'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          make: 'test',
          model: 'test 1234',
          __v: 0
        });
      });
  });

  it('creates a car with random text', () => {
    return request(app)
      .post('/api/v1/cars')
      .send({
        handle: 'test',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          make: 'test',
          model: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets a car by id', async() => {
    const car = await getCar();
    const enjoyments = await getEnjoyments({ carId: car._id });

    return request(app)
      .get(`/api/v1/cars/${car._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...car,
          enjoyments // because we populate in route
        });
      });
  });

  it('gets all cars', async() => {
    const cars = await getCars();

    return request(app)
      .get('/api/v1/cars')
      .then(res => {
        expect(res.body).toEqual(cars);
      });
  });

  it('updates a car by id', async() => {
    const car = await getCar();

    return request(app)
      .patch(`/api/v1/cars/${car._id}`)
      .send({ model: '1234 test' })
      .then(res => {
        expect(res.body).toEqual({
          ...car,
          model: '1234 test'
        });
      });
  });

  it('deletes a car by id', async() => {
    const car = await getCar();
    
    return request(app)
      .delete(`/api/v1/cars/${car._id}`)
      .then(res => {
        expect(res.body).toEqual(car);
      });
  });
});
