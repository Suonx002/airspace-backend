const bcrypt = require('bcryptjs');


exports.hashPassword = async (password) => await bcrypt.hash(password, 12);

exports.verifyPassword = async (userPassword, databasePassword) => await bcrypt.compare(userPassword, databasePassword)