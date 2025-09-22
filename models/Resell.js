const mongoose = require("mongoose");

const resellSchema = new mongoose.Schema({
  type: String,
  area: String,
  price: String, 
  status: String,
  location: String,
  imageUrl: String,
});

module.exports = mongoose.model("Resell", resellSchema);
