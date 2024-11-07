const { Schema } = require("mongoose");
const mongoose = require('mongoose')

const productCat = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }, 
    imageURL: {
        type: String,
        required: true
    }, 
})

const ProductCategory = mongoose.model('ProductCategory',productCat)

module.exports = ProductCategory;