const supertest = require("supertest");
const app = require("../app");

const Property = require("../models/Property");
const User = require("../models/User");
const PropertyReview = require('../models/PropertyReview');


describe('Handles GET/POST/PATCH/DELETE /api/v1/propertyReviews', () => {
    let token;
    let token2;
    let propertyId;
    let propertyReviewId;

    const userPayload = {
        username: "propertyReviewUsers",
        email: "propertyReviewUsers@gmail.com",
        password: "test1234",
        firstName: "propertyReviewFirstName",
        lastName: "propertyReviewLastName",
    };

    const userPayload2 = {
        username: "propertyReviewUsers2",
        email: "propertyReviewUsers2@gmail.com",
        password: "test1234",
        firstName: "propertyReviewFirstName2",
        lastName: "propertyReviewLastName2",
    };

    const propertyPayload = {
        title: "propertyReviewUser",
        description: "propertyReviewUser description",
        address: "123 new york",
        state: "New York",
        city: "Brooklyn",
        bedrooms: 10,
        bathrooms: 4,
        guests: 12,
        zipcode: "12345",
        price: "10.2"
    };

    const propertyReviewPayload = {
        title: "propertyReviewUser amazing stay!",
        comment: 'propertyReviewUser description',
        rating: 5
    };

    const propertyReviewUpdatedPayload = {
        title: "propertyReviewUser amazing stay updated!",
        comment: 'propertyReviewUser description updated',
        rating: 3
    };

    beforeAll(async (done) => {

        // create user1 and user2 and property
        const newUser = await supertest(app).post('/api/v1/auth/signup').send(userPayload).expect('Content-Type', /json/).expect(201);
        token = newUser.body.token;

        const newUser2 = await supertest(app).post('/api/v1/auth/signup').send(userPayload2).expect('Content-Type', /json/).expect(201);
        token2 = newUser2.body.token;

        const newProperty = await supertest(app).post('/api/v1/properties').send(propertyPayload)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(201);

        propertyId = newProperty.body.data.id;
        done();

    });


    it('should fail to create a new property review as a property owner', async (done) => {

        // property owner cannot leave a review on their property
        const res = await supertest(app).post(`/api/v1/properties/${propertyId}/propertyReviews`).send(propertyReviewPayload)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(400);


        done();
    });

    it('should create a new property review with user2', async (done) => {

        // property owner cannot leave a review on their property
        const res = await supertest(app).post(`/api/v1/properties/${propertyId}/propertyReviews`).send(propertyReviewPayload)
            .set('Authorization', `Bearer ${token2}`)
            .expect('Content-Type', /json/)
            .expect(201);

        propertyReviewId = res.body.data.id;

        expect(res.body.data.title).toBe(propertyReviewPayload.title);
        expect(res.body.data.comment).toBe(propertyReviewPayload.comment);
        expect(res.body.data.rating).toBe(propertyReviewPayload.rating);

        done();
    });

    it('should get property review by ID', async (done) => {

        const res = await supertest(app).get(`/api/v1/properties/${propertyId}/propertyReviews/${propertyReviewId}`)
            .set('Authorization', `Bearer ${token2}`)
            .expect('Content-Type', /json/)
            .expect(200);



        // rating is enum, which is a text type in postgres.
        expect(res.body.data.title).toBe(propertyReviewPayload.title);
        expect(res.body.data.description).toBe(propertyReviewPayload.description);
        expect(res.body.data.rating).toBe(`${propertyReviewPayload.rating}`);
        done();
    });

    it('should update property review by ID', async (done) => {

        const res = await supertest(app).patch(`/api/v1/properties/${propertyId}/propertyReviews/${propertyReviewId}`)
            .send(propertyReviewUpdatedPayload)
            .set('Authorization', `Bearer ${token2}`)
            .expect('Content-Type', /json/)
            .expect(200);


        // rating is enum, which is a text type in postgres.
        expect(res.body.data.title).toBe(propertyReviewUpdatedPayload.title);
        expect(res.body.data.description).toBe(propertyReviewUpdatedPayload.description);
        expect(res.body.data.rating).toBe(`${propertyReviewUpdatedPayload.rating}`);
        done();
    });

    it('should delete property review by ID', async (done) => {

        await supertest(app).delete(`/api/v1/properties/${propertyId}/propertyReviews/${propertyReviewId}`)
            .set('Authorization', `Bearer ${token2}`)
            .expect('Content-Type', /json/)
            .expect(200);

        done();
    });

    afterAll(async (done) => {
        // delete user which will delete property and property reviews via cascade
        const usersArray = [[userPayload.username, userPayload.email], [userPayload2.username, userPayload2.email]];
        await User.query().whereIn(['username', 'email'], usersArray).del();

        done();
    });






});