const express = require('express');
const router = express.Router();

const authRouter = require('./authRoutes');



router.get('/', (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'Welcome to airspace backend api!'
    });
})


router.use('/auth', authRouter);

module.exports = router;