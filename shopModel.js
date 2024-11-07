const { Schema } = require("mongoose");
const mongoose = require('mongoose')

const shopData = mongoose.Schema({
    routeName: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }, 
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }, 
})

const ShopData = mongoose.model('shopData',shopData)

module.exports = ShopData;