const mongoose = require("mongoose");

const plotsSchema = new mongoose.Schema({
  type: String,
  area: String,
  price: String, 
  status: String,
  location: String,
  imageUrl: String,
});

module.exports = mongoose.model("Plot", plotsSchema);
