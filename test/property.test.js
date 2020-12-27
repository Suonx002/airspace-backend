const supertest = require("supertest");
const app = require("../app");

const Property = require("../models/Property");
const User = require("../models/User");


describe('Handles GET/POST/PATCH/DELETE /api/v1/properties routes', () => {
    let token;
    let propertyId;

    const userPayload = {
        username: "propertyUsers",
        email: "propertyUsers@gmail.com",
        password: "test1234",
        firstName: "propertyFirstName",
        lastName: "propertyLastName",
    };

    const propertyPayload = {
        title: "propertyUser",
        description: "propertyUser description",
        address: "123 new york",
        state: "New York",
        city: "Brooklyn",
        bedrooms: 10,
        bathrooms: 4,
        guests: 12,
        zipcode: "12345",
        price: "10.2"
    };

    const propertyUpdatedPayload = {
        title: "propertyUser updated",
        description: "propertyUser updated description",
        address: "123 new york",
        state: "New York",
        city: "Brooklyn",
        bedrooms: 10,
        bathrooms: 4,
        guests: 12,
        zipcode: "12345",
        price: "10.2"
    };


    beforeAll(async () => {
        // create new user
        const newUser = await supertest(app).post('/api/v1/auth/signup').send(userPayload)
            .expect('Content-Type', /json/)
            .expect(201);
        token = newUser.body.token;
    });

    it('should create a new property', async (done) => {
        const res = await supertest(app).post('/api/v1/properties').send(propertyPayload)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(201);
        propertyId = res.body.data.id;


        // this expect method is from jest
        expect(res.body.data.title).toBe(propertyPayload.title);
        expect(res.body.data.description).toBe(propertyPayload.description);
        expect(res.body.data.address).toBe(propertyPayload.address);
        expect(res.body.data.state).toBe(propertyPayload.state);
        expect(res.body.data.city).toBe(propertyPayload.city);
        expect(res.body.data.bedrooms).toBe(propertyPayload.bedrooms);
        expect(res.body.data.bathrooms).toBe(propertyPayload.bathrooms);
        expect(res.body.data.guests).toBe(propertyPayload.guests);
        expect(res.body.data.zipcode).toBe(propertyPayload.zipcode);
        expect(res.body.data.price).toBe(propertyPayload.price);

        done();
    });

    it('should get property by ID', async (done) => {

        const res = await supertest(app).get(`/api/v1/properties/${propertyId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body.data.id).toBe(propertyId);
        expect(res.body.data.title).toBe(propertyPayload.title);
        expect(res.body.data.description).toBe(propertyPayload.description);
        expect(res.body.data.address).toBe(propertyPayload.address);
        expect(res.body.data.state).toBe(propertyPayload.state);
        expect(res.body.data.city).toBe(propertyPayload.city);
        expect(res.body.data.bedrooms).toBe(propertyPayload.bedrooms);
        expect(res.body.data.bathrooms).toBe(propertyPayload.bathrooms);
        expect(res.body.data.guests).toBe(propertyPayload.guests);
        expect(res.body.data.zipcode).toBe(propertyPayload.zipcode);
        expect(res.body.data.price).toBe(propertyPayload.price);

        done();

    });

    it('should get all properties', async (done) => {

        const res = await supertest(app).get(`/api/v1/properties`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body.data.length > 0).toBeTruthy();

        done();

    });

    it('should update property by ID', async (done) => {
        const res = await supertest(app).patch(`/api/v1/properties/${propertyId}`)
            .send(propertyUpdatedPayload)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body.data.title).toBe(propertyUpdatedPayload.title);
        expect(res.body.data.description).toBe(propertyUpdatedPayload.description);
        expect(res.body.data.address).toBe(propertyUpdatedPayload.address);
        expect(res.body.data.state).toBe(propertyUpdatedPayload.state);
        expect(res.body.data.city).toBe(propertyUpdatedPayload.city);
        expect(res.body.data.bedrooms).toBe(propertyUpdatedPayload.bedrooms);
        expect(res.body.data.bathrooms).toBe(propertyUpdatedPayload.bathrooms);
        expect(res.body.data.guests).toBe(propertyUpdatedPayload.guests);
        expect(res.body.data.zipcode).toBe(propertyUpdatedPayload.zipcode);
        expect(res.body.data.price).toBe(propertyUpdatedPayload.price);

        done();
    });

    it('should delete property by ID', async (done) => {
        await supertest(app).delete(`/api/v1/properties/${propertyId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        done();

    });

    afterAll(async () => {
        // delete user will also delete property (onDelete cascade)
        await User.query().where({
            username: userPayload.username,
            email: userPayload.email,
        }).del();
    });

});;
