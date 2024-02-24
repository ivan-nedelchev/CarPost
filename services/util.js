const bcrypt = require('bcrypt');



function accessoryViewModel(accessory) {
    return {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        imgUrl: accessory.imgUrl,
        price: accessory.price,
    }
}

function carViewModel(car) {
    const model =  {
        id: car._id,
        name: car.name,
        description: car.description,
        imgUrl: car.imgUrl,
        price: car.price,
        accessories: car.accessories
    }

    if(model.accessories.length > 0 && model.accessories[0]._id){
        model.accessories = model.accessories.map(accessoryViewModel);
    }

    return model
}

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

async function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
}

function isLoggedIn() {
    return function(req, res, next) {
        if(req.session.user) {
            next()
        } else {
            res.redirect('/login')
        }
    }
}

module.exports = {
    accessoryViewModel,
    carViewModel,
    hashPassword,
    comparePassword,
    isLoggedIn
}