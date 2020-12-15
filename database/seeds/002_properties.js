exports.seed = async knex => {

    try {
        //delete data
        await knex('properties').del();

        //create new table
        await knex('properties').insert([
            {
                id: 1,
                title: 'House 1',
                description: 'House 1 description',
                address: '123 house street',
                city: 'minneapolis',
                state: 'MN',
                zipcode: '55379',
                bedrooms: 3,
                bathrooms: 5,
                guests: 10,
                price: 500.15,
                userId: 1,
            }
        ])

    } catch (error) {
        console.log('Something went wrong with properties seeding')
    }
}

