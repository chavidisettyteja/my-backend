const mongoose = require("mongoose");

const plotsSchema = new mongoose.Schema({
  name:String,
  type: String,
  area: String,
  price: String, 
  location: String,
  imageUrl: String,
});

module.exports = mongoose.model("Plot", plotsSchema);
