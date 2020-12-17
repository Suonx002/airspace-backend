/* eslint-disable prettier/prettier */
const supertest = require('supertest');

const app = require('./app');

describe('GET /', () => {
    it('should response with a message', async () => {
        const res = await supertest(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body.message).toEqual('Welcome to Airspace Rental homepage!');
    });
});
