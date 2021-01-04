const multer = require('multer');
const AppError = require('../utils/methods/AppError');


const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        const originalName = file.originalname.slice(0, file.originalname.lastIndexOf('.'));

        cb(null, `${originalName}-${Date.now()}.${ext}`);
    }
});


// store in memory
// const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Please upload image file only', 400), false);
    }
};


const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: '2000000' }
});


module.exports = upload;