const supertest = require("supertest");
const app = require("../app");

const Property = require("../models/Property");
const User = require("../models/User");

describe("GET /api/v1/properties", () => {
    let token;
    let propertyId;

    const payload = {
        username: "getPropertyUsers",
        email: "getPropertyUsers@gmail.com",
        password: "test1234",
        firstName: "propertyFirstName",
        lastName: "propertyLastName",
    };

    const propertyPayload = {
        title: "getAllPropertyById",
        description: "getAllPropertyById description",
        address: "123 new york",
        state: "New York",
        city: "Brooklyn",
        bedrooms: 10,
        bathrooms: 4,
        guests: 12,
        zipcode: "12345",
        price: "10.2"
    }

    beforeEach(async () => {
        const newUser = await supertest(app)
            .post("/api/v1/auth/signup")
            .send(payload)
            .expect("Content-Type", /json/)
            .expect(201);
        token = newUser.body.token;

        // insert property data
        const property = await supertest(app).post('/api/v1/properties').send(propertyPayload)
            .set('Authorization', `Bearer ${token}`)
            .expect("Content-Type", /json/).expect(201);

        propertyId = property.id
    });

    it("should get all properties with JSON array more than one", async (done) => {
        const res = await supertest(app)
            .get("/api/v1/properties")
            .set('Authorization', `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200);

        console.log({ res: res.body.data })

        expect(res.body.data.length > 0).toBeTruthy()

        done();
    });

    afterEach(async () => {
        const { username, email } = payload;

        // deleting user will also delete property cause of cascade on delete
        await User.query().where({ username, email }).del();

    });
});


describe('/GET /api/v1/properties/:propertyId', () => {

    let token;
    let propertyId;

    const userPayload = {
        username: "getPropertyById",
        email: "getPropertyById@gmail.com",
        password: "test1234",
        firstName: "propertyFirstName",
        lastName: "propertyLastName",
    };

    const propertyPayload = {
        title: "getPropertyById",
        description: "getPropertyById description",
        address: "123 new york",
        state: "New York",
        city: "Brooklyn",
        bedrooms: 10,
        bathrooms: 4,
        guests: 12,
        zipcode: "12345",
        price: "10.2"
    }


    beforeEach(async () => {

        const newUser = await supertest(app).post('/api/v1/auth/signup').send(userPayload).expect(201);
        token = newUser.body.token;


        const newProperty = await supertest(app).post('/api/v1/properties').send(propertyPayload).set('Authorization', `Bearer ${token}`).expect(201);


        propertyId = newProperty.body.data.id;
    })


    it('should get a property by ID', async () => {
        const property = await supertest(app).get(`/api/v1/properties/${propertyId}`).set('Authorization', `Bearer ${token}`).expect(200);

        expect(property.body.data.id).toBe(propertyId);
        expect(property.body.data.title).toBe(propertyPayload.title);
        expect(property.body.data.description).toBe(propertyPayload.description);
        expect(property.body.data.address).toBe(propertyPayload.address);
        expect(property.body.data.state).toBe(propertyPayload.state);
        expect(property.body.data.city).toBe(propertyPayload.city);
        expect(property.body.data.bedrooms).toBe(propertyPayload.bedrooms);
        expect(property.body.data.bathrooms).toBe(propertyPayload.bathrooms);
        expect(property.body.data.zipcode).toBe(propertyPayload.zipcode);
        expect(property.body.data.guests).toBe(propertyPayload.guests);
        expect(property.body.data.price).toBe(propertyPayload.price);
    })


    afterEach(async () => {
        const { username, email } = userPayload;

        // deleting user will also delete property (cascade on delete)
        await User.query().where({ username, email }).del();
    })
})