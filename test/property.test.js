const supertest = require('supertest');
const app = require('../app');


const Property = require('../models/Property');
const User = require('../models/User');
const bcryptMethods = require('../utils/methods/bcryptMethods')




describe('GET /api/v1/properties', () => {

    let token;

    const payload = {
        username: 'propertyUser',
        email: 'propertyUser@gmail.com',
        password: 'test1234',
        firstName: 'propertyFirstName',
        lastName: 'propertyLastName'
    }


    beforeEach(async () => {
        const newUser = await supertest(app)
            .post('/api/v1/auth/signup')
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(201);
        token = newUser.body.token;

        // delete all properties
        await Property.query().del();


    })

    it('should get all properties with JSON array more than one', async (done) => {

        const res = await supertest(app).get('/api/v1/properties').set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/).expect(200);

        expect(res.body.data.length === 0).toBe(true);

        done();
    })

    afterEach(async () => {
        const { username, email } = payload;
        await User.query().where({ username, email }).del();
    })


})