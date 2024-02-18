const Accessory = require("../models/Accessory");

function accessoryViewModel(accessory) {
    return {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        imgUrl: accessory.imgUrl,
        price: accessory.price,
    }
}

async function createAccessory(accessory) {
    await Accessory.create(accessory)
};

async function getAll() {
    return (await Accessory.find({})).map(accessoryViewModel)
}

module.exports = () => (req, res, next) => {
    req.accessory = {
        create : createAccessory,
        getAll,
    };
    next();
}