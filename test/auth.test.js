const supertest = require('supertest');

const app = require('../app');

const User = require('../models/User');


describe('POST /api/v1/auth/signup', () => {

    beforeEach(async () => {
        await User.query().del();
    })

    it('should sign up a user with firstName, lastName, username, email, and password', async (done) => {

        const payload = {
            username: 'user',
            email: 'user@gmail.com',
            password: 'test1234',
            firstName: 'user',
            lastName: 'one'
        }

        const res = await supertest(app)
            .post('/api/v1/auth/signup')
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(res.body.data.id).toBeTruthy();
        expect(res.body.data.firstName).toBe(payload.firstName);
        expect(res.body.data.lastName).toBe(payload.lastName);
        expect(res.body.data.username).toBe(payload.username);
        expect(res.body.data.createdAt).toBeTruthy();
        expect(res.body.data.updatedAt).toBeTruthy();

        done();

    });
});

describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {

        const newUser = {
            username: 'newUser1',
            firstName: 'amy',
            lastName: 'dinh',
            email: 'amydinh@gmail.com',
            password: 'test1234'
        }

        await User.query().insert(newUser);

    });




})