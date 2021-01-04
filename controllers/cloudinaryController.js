const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_APIKEY,
    api_secret: process.env.CLOUD_SECRET
});

exports.upload = (image, folder) => new Promise((resolve, reject) => {

    /**
     * take 3 agruments
     * - file path
     * - options (optional)
     * - results
     */
    cloudinary.uploader.upload(image, {
        folder,
    }, (err, result) => {
        if (err) return reject(err);
        return resolve({
            url: result.url,
            publicId: result.public_id
        });
    }

    );
});

exports.deleteImage = (publicId) => new Promise((resolve, reject) => {
    cloudinary.api.delete_resources(publicId, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
    });
});