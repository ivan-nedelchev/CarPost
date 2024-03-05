const Car = require('../../models/schemas/Car');
const { carViewModel } = require('../utils/util');
async function getCar(carId) {
    const carToGet = await Car
        .findById(carId)
        .where({ isDeleted: false })
        .populate('accessories');
    if (carToGet) {
        return carViewModel(carToGet);
    } else {
        return undefined;
    }
}
async function listCars(query) {
    const sortBy = { isDeleted: false };
    if (query.search) {
        sortBy.name = new RegExp(query.search, 'i');
    }
    if (query.from) {
        sortBy.price = { $gte: Number(query.from) };
    }
    if (query.to) {
        if (!sortBy.price) {
            sortBy.price = {};
        }
        sortBy.price.$lte = Number(query.to);
    }
    const carsToList = await Car.find(sortBy);
    return carsToList.map(carViewModel);
}
async function createCar(car) {
    const catToCreate = new Car(car);
    await catToCreate.save();
}
async function editCar(editedCar, carId, ownerId) {
    const carToEdit = await Car
        .findById(carId)
        .where({ isDeleted: false });
    if (carToEdit.owner != ownerId) {
        return false;
    }
    carToEdit.name = editedCar.name;
    carToEdit.description = editedCar.description;
    carToEdit.imageUrl = editedCar.imageUrl;
    carToEdit.price = editedCar.price;
    carToEdit.accessories = editedCar.accessories;
    await carToEdit.save();
    return true;
}
async function deleteCar(carId, ownerId) {
    const carToDelete = await Car
        .findById(carId)
        .where({ isDeleted: false });
    if (carToDelete.owner != ownerId) {
        return false;
    }
    await Car.findByIdAndUpdate(carId, { isDeleted: true });
    return true;
}
async function attachAccessory(carId, accessoryId, requesterId) {
    const carToAttachAccessory = await Car.findById(carId);
    if (carToAttachAccessory.owner != requesterId) {
        return false;
    }
    carToAttachAccessory.accessories.push(accessoryId);
    carToAttachAccessory.save();
}
module.exports = () => (req, res, next) => {
    req.car = {
        getCar,
        listCars,
        createCar,
        editCar,
        deleteCar,
        attachAccessory
    };
    next();
};