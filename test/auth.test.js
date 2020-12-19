const supertest = require('supertest');

const app = require('../app');

const User = require('../models/User');
const bcryptMethods = require('../utils/methods/bcryptMethods')


describe('POST /api/v1/auth/signup', () => {


    // beforeEach & afterEach are from jest
    beforeEach(async () => {

        // delete users from database
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

        // these expects below are from jest
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

    // create new user
    const newUser = {
        username: 'newUser1',
        firstName: 'amy',
        lastName: 'dinh',
        email: 'amydinh@gmail.com',
        password: 'test1234'
    }

    beforeEach(async () => {
        await User.query().insert(newUser);

    });

    it('should login in current user', async (done) => {
        const { username, firstName, lastName, email, password } = newUser;


        const res = await supertest(app)
            .post('/api/v1/auth/login')
            .send({ email, password })
            .set('Accept', 'application/json')
            .expect(200);




        expect(res.body.data.username).toBe(username);
        expect(res.body.data.email).toBe(email);
        expect(res.body.data.password).toBe(undefined);
        expect(res.body.data.firstName).toBe(firstName);
        expect(res.body.data.lastName).toBe(lastName);

        done();
    })

    afterEach(async () => {
        await User.query().delete();
    })




})