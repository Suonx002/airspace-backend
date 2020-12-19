const yup = require('yup');



exports.signupSchema = yup.object().shape({
    username: yup.string().trim().min(3).required(),
    firstName: yup.string().trim().min(2).required(),
    lastName: yup.string().trim().min(2).required(),
    email: yup.string().trim().email().required(),
    password: yup.string().min(5).max(50).required()
})

exports.loginSchema = yup.object().shape({
    email: yup.string().trim().required(),
    password: yup.string().required()

})