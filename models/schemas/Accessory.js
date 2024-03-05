const { Schema, Types: { ObjectId }, model } = require('mongoose');
const accessorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    }
});
const Accessory = model('Accessory', accessorySchema);
module.exports = Accessory;