const mogoose = require('mongoose');
const Schema = mogoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET_KEY } = process.env;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

userSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    delete userObject.__v;
    return userObject;
}

userSchema.methods.generateToken = function() {
    const token = jwt.sign(
        { _id: this._id, email: this.email },
        JWT_SECRET_KEY,
        { expiresIn: '1d' }
    );
    return token;
}

module.exports = mogoose.model('User', userSchema);
