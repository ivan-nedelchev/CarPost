const Car = require("../models/Car");


function carViewModel(car) {
    return {
        id: car._id,
        name: car.name,
        description: car.description,
        imgUrl: car.imgUrl,
        price: car.price,
        accessories: car.accessories
    }
}

async function getAll(query) {
    const options = {};

    if(query.search) {
        options.name = new RegExp(query.search, 'i');
    }
    if(query.from) {
        options.price = {$gte: Number(query.from)};
    }
    if(query.to) {
        if(!options.price) {
            options.price = {}
        };
        options.price.$lte = Number(query.to);
    }

    const cars = await Car.find(options)
    return cars.map(carViewModel);
}

async function getById(id) {
    const car = await Car.findById(id)
    if (car) {
        return carViewModel(car);
    } else {
        return undefined;
    }

};
async function deleteById(id) {
    await Car.findByIdAndDelete(id)
}

async function createCar(car) {
    const result = new Car(car);
    await result.save();
};


async function updateById(id, car) {
    let existing = await Car.findById(id)
    existing.name = car.name;
    existing.description = car.description;
    existing.imgUrl = car.imgUrl || undefined;
    existing.price = car.price;
    existing.accessories = car.accessories;
    
    await existing.save();
};

async function attachAccessory(carId, accessoryId) {
    let existing = await Car.findById(carId);
    existing.accessories.push(accessoryId);
    existing.save();
}


module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCar,
        deleteById,
        updateById,
        attachAccessory
    };
    next();
}