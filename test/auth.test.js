const supertest = require('supertest');

const app = require('../app');

const User = require('../models/User');


describe('Handles Auth Routes', () => {
    const userPayload = {
        username: 'userSignup',
        email: 'userSignup@gmail.com',
        password: 'test1234',
        firstName: 'userSignup',
        lastName: 'userSignup'
    };

    it('should signup new user', async (done) => {
        const res = await supertest(app).post('/api/v1/auth/signup').send(userPayload).expect('Content-Type', /json/).expect(201);

        expect(res.body.data.username).toBe(userPayload.username);
        expect(res.body.data.firstName).toBe(userPayload.firstName);
        expect(res.body.data.lastName).toBe(userPayload.lastName);
        expect(res.body.data.email).toBe(userPayload.email);
        expect(res.body.data.password).toBe(undefined);

        done();
    });

    it('should login user', async (done) => {
        const res = await supertest(app).post('/api/v1/auth/login').send({ email: userPayload.email, password: userPayload.password }).expect('Content-Type', /json/).expect(200);

        expect(res.body.data.username).toBe(userPayload.username);
        expect(res.body.data.firstName).toBe(userPayload.firstName);
        expect(res.body.data.lastName).toBe(userPayload.lastName);
        expect(res.body.data.email).toBe(userPayload.email);
        expect(res.body.data.password).toBe(undefined);
        done();
    });

    afterAll(async () => {

        // deleting user after finish
        await User.query().where({
            username: userPayload.username,
            email: userPayload.email,
        }).del();
    });

});;

