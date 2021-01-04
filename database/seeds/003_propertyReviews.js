
const tableNames = require('../../utils/constants/tableNames');


exports.seed = async knex => {

    try {
        //delete data
        await knex(tableNames.propertyReviews).del();

        //create new table
        await knex(tableNames.propertyReviews).insert([
            {
                title: 'Amazing stay!',
                comment: 'Amazing stay with friends.',
                rating: 5,
                userId: '156fb36e-8973-45f1-8e1f-30bb1cd43318',
                propertyId: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                title: 'Weekend trip',
                comment: 'Great place for a weekend trip.',
                rating: 5,
                userId: '156fb36e-8973-45f1-8e1f-30bb1cd43319',
                propertyId: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                title: 'Clean',
                comment: 'Clean, friendly, full of extra touches, close to a lot bur far enough to be quiet and peaceful.',
                rating: 5,
                userId: '156fb36e-8973-45f1-8e1f-30bb1cd43320',
                propertyId: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                title: 'What a fantastic stay!',
                comment: 'Wonderful local with lots to do and the stay itself is beautiful!',
                rating: 5,
                userId: '156fb36e-8973-45f1-8e1f-30bb1cd43316',
                propertyId: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                title: 'LOVED my stay here!',
                comment: 'It felt like a home away from home.',
                rating: 4,
                userId: '156fb36e-8973-45f1-8e1f-30bb1cd43319',
                propertyId: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                title: 'Such a lovely space and very stylish',
                comment: 'The bed was super comfy and all the touches around the space were great',
                rating: 4,
                userId: '156fb36e-8973-45f1-8e1f-30bb1cd43320',
                propertyId: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
        ]);

    } catch (error) {
        console.log('Something went wrong with properties seeding');
        console.log(error);
    }
};

