const { v4: uuidv4 } = require('uuid');
const bcryptMethods = require('../../utils/methods/bcryptMethods');

const tableNames = require('../../utils/constants/tableNames');


exports.seed = async knex => {
    try {
        // clear all data
        await knex(tableNames.users).del();

        // insert new data
        await knex(tableNames.users).insert([
            {
                id: '156fb36e-8973-45f1-8e1f-30bb1cd43316',
                username: 'amy',
                firstName: 'amy',
                lastName: 'dinh',
                email: 'amy@gmail.com',
                password: await bcryptMethods.hashPassword('test1234'),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: '156fb36e-8973-45f1-8e1f-30bb1cd43317',
                username: 'riley',
                firstName: 'riley',
                lastName: 'stehr',
                email: 'riley@gmail.com',
                password: await bcryptMethods.hashPassword('test1234'),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: '156fb36e-8973-45f1-8e1f-30bb1cd43318',
                username: 'briana',
                firstName: 'briana',
                lastName: 'vander',
                email: 'briana@gmail.com',
                password: await bcryptMethods.hashPassword('test1234'),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: '156fb36e-8973-45f1-8e1f-30bb1cd43319',
                username: 'jack',
                firstName: 'jack',
                lastName: 'sparrow',
                email: 'jack@gmail.com',
                password: await bcryptMethods.hashPassword('test1234'),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: '156fb36e-8973-45f1-8e1f-30bb1cd43320',
                username: 'anderson',
                firstName: 'anderson',
                lastName: 'marz',
                email: 'anderson@gmail.com',
                password: await bcryptMethods.hashPassword('test1234'),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },

        ]);

    } catch (err) {
        console.log('Something went wrong with seeding users');
    }
}; 