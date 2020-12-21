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


// describe('POST /api/v1/auth/signup', () => {

//     const payload = {
//         username: 'userSignup',
//         email: 'userSignup@gmail.com',
//         password: 'test1234',
//         firstName: 'userSignup',
//         lastName: 'userSignup'
//     }

//     it('should sign up a user with firstName, lastName, username, email, and password', async (done) => {

//         const res = await supertest(app)
//             .post('/api/v1/auth/signup')
//             .send(payload)
//             .expect('Content-Type', /json/)
//             .expect(201);

//         // these expects below are from jest
//         expect(res.body.data.id).toBeTruthy();
//         expect(res.body.data.firstName).toBe(payload.firstName);
//         expect(res.body.data.lastName).toBe(payload.lastName);
//         expect(res.body.data.username).toBe(payload.username);
//         expect(res.body.data.createdAt).toBeTruthy();
//         expect(res.body.data.updatedAt).toBeTruthy();

//         done();

//     });

//     afterEach(async () => {

//         const { email, username } = payload;

//         // delete the created user for test
//         await User.query().where({ email, username }).del();

//     })
// });

// describe('POST /api/v1/auth/login', () => {

//     // create new user
//     const newUser = {
//         username: 'loginUser',
//         firstName: 'loginUser',
//         lastName: 'loginUser',
//         email: 'loginUser@gmail.com',
//         password: 'test1234'
//     }

//     beforeEach(async () => {

//         const createdUser = await supertest(app).post('/api/v1/auth/signup').send(newUser).expect('Content-Type', /json/).expect(201);

//     });

//     it('should login in current user', async (done) => {
//         const { username, firstName, lastName, email, password } = newUser;


//         const res = await supertest(app)
//             .post('/api/v1/auth/login')
//             .send({ email, password })
//             .set('Accept', 'application/json')
//             .expect(200);


//         expect(res.body.data.username).toBe(username);
//         expect(res.body.data.email).toBe(email);
//         expect(res.body.data.password).toBe(undefined);
//         expect(res.body.data.firstName).toBe(firstName);
//         expect(res.body.data.lastName).toBe(lastName);

//         done();
//     })

//     afterEach(async () => {
//         // delete the user for this test
//         const { username, email } = newUser;

//         await User.query().where({ username, email }).del();
//     })

// })