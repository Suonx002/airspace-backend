exports.seed = async knex => {
    try {
        // clear all data
        await knex('users').del();

        // insert new data
        await knex('users').insert([
            {
                id: 1,
                username: 'suonx002',
                firstName: 'vuthy',
                lastName: 'suon',
                email: 'hello@vuthysuon.com',
                password: 'test1234'
            }
        ])

    } catch (err) {
        console.log('Something went wrong with seeding users')
    }
} 