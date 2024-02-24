const Accessory = require('../models/Accessory');
const { accessoryViewModel } = require('./util');
async function createAccessory(accessory) {
    await Accessory.create(accessory);
};
async function getAll() {
    return (await Accessory
        .find({}))
        .map(accessoryViewModel);
};
module.exports = () => (req, res, next) => {
    req.accessory = {
        create: createAccessory,
        getAll
    };
    next();
};