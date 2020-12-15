const bcrypt = require('bcryptjs');


exports.hashPassword = async (password) => {

    return await bcrypt.hash(password, 12);

}

exports.verifyPassword = async (userPassword, databasePassword) => {

    return await bcrypt.compare(userPassword, databasePassword)
}