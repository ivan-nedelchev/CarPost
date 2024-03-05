const Accessory = require('../../models/schemas/Accessory');
const { accessoryViewModel } = require('../utils/util');
async function listAccessories() {
    return (await Accessory
        .find({}))
        .map(accessoryViewModel);
}
async function createAccessory(newAccessory) {
    await Accessory.create(newAccessory);
}
module.exports = () => (req, res, next) => {
    req.accessory = {
        listAccessories,
        createAccessory
    };
    next();
};