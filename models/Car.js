const { Schema, model, Types : {ObjectID} } = require('mongoose')

const carSchema = new Schema({
    name : {type: String, required: true},
    description : {type: String, default: ''},
    imgUrl : {type: String, default: 'notFound.jpg'},
    price : {type: Number,  required : true, min: 0},
    accessories: {type: [ObjectID], default : [], ref: "Accessory"}
});

const Car = model('Car', carSchema);

module.exports = Car;