
const tableNames = require('../../utils/constants/tableNames');


exports.seed = async knex => {

    try {
        //delete data
        await knex(tableNames.properties).del();

        //create new table
        await knex(tableNames.properties).insert([
            {
                title: 'Central Park House',
                slug: 'central-park-house',
                description: 'Central Park is an urban park in New York City located between the Upper West and Upper East Sides of Manhattan.',
                address: 'Central Park',
                city: 'New York',
                state: 'NY',
                zipcode: '10028',
                bedrooms: 3,
                bathrooms: 5,
                guests: 10,
                price: 500.15,
                userId: '156fb36e-8973-45f1-8e1f-30bb1cd43316',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                title: 'Rockefeller Center House',
                slug: 'rockefeller-center-house',
                description: 'Rockefeller Center is a large complex consisting of 19 commercial buildings covering 22 acres between 48th Street and 51st Street in Midtown Manhattan, New York City.',
                address: '45 Rockefeller Plaza',
                city: 'New York',
                state: 'NY',
                zipcode: '10111',
                bedrooms: 5,
                bathrooms: 7,
                guests: 12,
                price: 1200,
                userId: '156fb36e-8973-45f1-8e1f-30bb1cd43316',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                title: 'Empire State Building House',
                slug: 'empire-state-building-house',
                description: 'The Empire State Building is a 102-story Art Deco skyscraper in Midtown Manhattan in New York City.',
                address: '20 W 34th St',
                city: 'New York',
                state: 'NY',
                zipcode: '10001',
                bedrooms: 5,
                bathrooms: 2,
                guests: 8,
                price: 750,
                userId: '156fb36e-8973-45f1-8e1f-30bb1cd43316',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                title: 'Walt Disney World Parks Hotel',
                slug: 'walt-disney-world-parks-hotel',
                description: 'he Walt Disney World Resort, also called Walt Disney World and Disney World, is an entertainment complex in Bay Lake and Lake Buena Vista, Florida, in the United States, near the cities of Orlando and Kissimmee.',
                address: '1375 E Buena Vista',
                city: 'Orlando',
                state: 'FL',
                zipcode: '32830',
                bedrooms: 3,
                bathrooms: 5,
                guests: 10,
                price: 300.00,
                userId: '156fb36e-8973-45f1-8e1f-30bb1cd43317',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                title: 'Universal Orlando Resort',
                slug: 'universal-orlando-resort',
                description: 'American theme park and entertainment resort complex based in Orlando, Florida.',
                address: '6000 Universal Blvd',
                city: 'Orlando',
                state: 'FL',
                zipcode: '32819',
                bedrooms: 10,
                bathrooms: 8,
                guests: 20,
                price: 1500,
                userId: '156fb36e-8973-45f1-8e1f-30bb1cd43317',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                title: 'SeaWorld Orlando',
                slug: 'seaworld-orlando',
                description: 'SeaWorld Orlando is a theme park and marine zoological park, in Orlando, Florida. It is owned and operated by SeaWorld Parks & Entertainment.',
                address: '7007 Sea World Dr',
                city: 'Orlando',
                state: 'FL',
                zipcode: '32821',
                bedrooms: 3,
                bathrooms: 2,
                guests: 5,
                price: 250.50,
                userId: '156fb36e-8973-45f1-8e1f-30bb1cd43317',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                title: 'Fremont Street Experience Hotel',
                slug: 'fremont-street-experience-hotel',
                description: 'The Fremont Street Experience is a pedestrian mall and attraction in downtown Las Vegas, Nevada.',
                address: 'Fremont St',
                city: 'Las Vegas',
                state: 'NV',
                zipcode: '89101',
                bedrooms: 4,
                bathrooms: 3,
                guests: 7,
                price: 350,
                userId: '156fb36e-8973-45f1-8e1f-30bb1cd43318',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                title: 'Paris Hotel and the Eiffel Tower',
                slug: 'paris-hotel-and-the-eiffel-tower',
                description: 'Paris Las Vegas is one of the most easily recognized resorts in the city. Out front is a scale model of the Eiffel Tower, and down the way is a recreation of the Paris Opera House.',
                address: '3655 S Las Vegas Blvd',
                city: 'Las Vegas',
                state: 'NV',
                zipcode: '89101',
                bedrooms: 8,
                bathrooms: 6,
                guests: 15,
                price: 650.00,
                userId: '156fb36e-8973-45f1-8e1f-30bb1cd43318',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                title: `Caesar's Palace`,
                slug: 'caesars-palace',
                description: `Currently Caesar's Palace is a massive complex in the middle of the Strip, complete with every imaginable entertainment option.`,
                address: '3570 S Las Vegas Blvd',
                city: 'Las Vegas',
                state: 'NV',
                zipcode: '89101',
                bedrooms: 10,
                bathrooms: 8,
                guests: 25,
                price: 950,
                userId: '156fb36e-8973-45f1-8e1f-30bb1cd43318',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
        ]);

    } catch (error) {
        console.log('Something went wrong with properties seeding');
        console.log(error);
    }
};

