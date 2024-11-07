const mongoose = require('mongoose');
 
const itemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true }
});
 
const categorySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  routeName: { type: String, required: true },
  items: { type: [itemSchema], required: true }
});
 
const ShopData = mongoose.model('ShopData', categorySchema);
 
module.exports = ShopData;