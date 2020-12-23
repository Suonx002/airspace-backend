
const tableNames = require('../../utils/constants/tableNames');


exports.seed = async knex => {

    try {
        //delete data
        await knex(tableNames.properties).del();

        //create new table
        await knex(tableNames.properties).insert([
            {
                id: 1,
                title: 'Central Park House',
                description: 'Central Park is an urban park in New York City located between the Upper West and Upper East Sides of Manhattan.',
                address: 'Central Park',
                city: 'New York',
                state: 'NY',
                zipcode: '10028',
                bedrooms: 3,
                bathrooms: 5,
                guests: 10,
                price: 500.15,
                userId: 1,
            },
            {
                id: 2,
                title: 'Rockefeller Center House',
                description: 'Rockefeller Center is a large complex consisting of 19 commercial buildings covering 22 acres between 48th Street and 51st Street in Midtown Manhattan, New York City.',
                address: '45 Rockefeller Plaza',
                city: 'New York',
                state: 'NY',
                zipcode: '10111',
                bedrooms: 5,
                bathrooms: 7,
                guests: 12,
                price: 1200,
                userId: 1,
            },
            {
                id: 3,
                title: 'Empire State Building House',
                description: 'The Empire State Building is a 102-story Art Deco skyscraper in Midtown Manhattan in New York City.',
                address: '20 W 34th St',
                city: 'New York',
                state: 'NY',
                zipcode: '10001',
                bedrooms: 5,
                bathrooms: 2,
                guests: 8,
                price: 750,
                userId: 1,
            },
            {
                id: 4,
                title: 'Walt Disney World Parks Hotel',
                description: 'he Walt Disney World Resort, also called Walt Disney World and Disney World, is an entertainment complex in Bay Lake and Lake Buena Vista, Florida, in the United States, near the cities of Orlando and Kissimmee.',
                address: '1375 E Buena Vista',
                city: 'Orlando',
                state: 'FL',
                zipcode: '32830',
                bedrooms: 3,
                bathrooms: 5,
                guests: 10,
                price: 300.00,
                userId: 2,
            },
            {
                id: 5,
                title: 'Universal Orlando Resort',
                description: 'American theme park and entertainment resort complex based in Orlando, Florida.',
                address: '6000 Universal Blvd',
                city: 'Orlando',
                state: 'FL',
                zipcode: '32819',
                bedrooms: 10,
                bathrooms: 8,
                guests: 20,
                price: 1500,
                userId: 2,
            },
            {
                id: 6,
                title: 'SeaWorld Orlando',
                description: 'SeaWorld Orlando is a theme park and marine zoological park, in Orlando, Florida. It is owned and operated by SeaWorld Parks & Entertainment.',
                address: '7007 Sea World Dr',
                city: 'Orlando',
                state: 'FL',
                zipcode: '32821',
                bedrooms: 3,
                bathrooms: 2,
                guests: 5,
                price: 250.50,
                userId: 2,
            },
        ]);

    } catch (error) {
        console.log('Something went wrong with properties seeding');
    }
};

