const bcrypt = require('bcrypt');
function carViewModel(car) {
    const carModel = {
        id: car._id,
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price,
        owner: car.owner,
        accessories: car.accessories
    };
    if (carModel.accessories.length > 0 && carModel.accessories[0]._id) {
        carModel.accessories = carModel.accessories.map(accessoryViewModel);
    }
    return carModel;
}
function accessoryViewModel(accessory) {
    const accessoryModel = {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        imageUrl: accessory.imageUrl,
        price: accessory.price,
        owner: accessory.owner
    };
    return accessoryModel;
}
async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}
async function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}
function isLoggedIn() {
    return function (req, res, next) {
        const user = req.session.user;
        if (user) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}
function mapError(error) {
    if (Array.isArray(error)) {
        return error;
    } else if (error.name === 'MongoServerError') {
        if (error.code == 11000) {
            return [{ msg: 'Username already exists' }];
        } else {
            return [{ msg: 'Request error' }];
        }
    } else if (error.name === 'ValidationError') {
        return Object
            .values(error.errors)
            .map(err => ({ msg: err.message }));
    } else if (typeof error.message === 'string') {
        return [{ msg: error.message }];
    } else {
        return [{ msg: 'Request error' }];
    }
}
module.exports = {
    carViewModel,
    accessoryViewModel,
    hashPassword,
    comparePassword,
    isLoggedIn,
    mapError
};