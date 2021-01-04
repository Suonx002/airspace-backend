module.exports = imageUrl => {
    const publicIdWithPng = `airspace/${imageUrl.split('airspace/')[1]}`;
    const publicIdWithoutPng = publicIdWithPng.split('.')[0];

    return publicIdWithoutPng;
}