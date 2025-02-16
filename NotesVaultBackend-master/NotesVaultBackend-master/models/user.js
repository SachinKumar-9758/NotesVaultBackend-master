const mongoose = require('mongoose');
const validator=require('express-validator')
const validatorPackage = require('validator')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        validate: {
            validator: (value) => {
                return value.length >= 2; 
            },
            message: 'Name should be at least 2 characters long',
        },
    },
    email:{
        type:String,
        required: [true, 'Email address is required'],
        validate: {
          validator: validatorPackage.isEmail,
          message: 'Please provide a valid email',
        },
        unique:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    password:{
        type:String,
        required:true,
        validate: {
            validator: (value) => {
                return value.length >= 6; 
            },
            message: 'Password should be at least 6 characters long',
        },
    }
});
module.exports = new mongoose.model('User', userSchema);