const { Schema, model } = require('mongoose');
const { hashPassword, comparePassword } = require('../../services/utils/util');
const userSchema = new Schema({
    username: {
        type: String,
        minlength: 3,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    }
});
userSchema.index(
    { username: 1 },
    {
        unique: true,
        collation: {
            locale: 'en',
            strength: 2
        }
    }
);
userSchema.pre('save', async function (next) {
    if (this.isModified('hashedPassword')) {
        this.hashedPassword = await hashPassword(this.hashedPassword);
    }
    next();
});
userSchema.methods.comparePassword = async function (password) {
    return await comparePassword(password, this.hashedPassword);
};
const User = model('User', userSchema);
module.exports = User;