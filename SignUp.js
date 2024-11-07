const { Schema } = require("mongoose");
const mongoose = require('mongoose')

const SignUP = mongoose.Schema({
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    }, 
})

const signUP = mongoose.model('SignUP',SignUP)

module.exports = signUP;