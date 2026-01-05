const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  type: String,
  possession: String,
  location: String,
  imageUrl: String,
  brochureUrl: String,
});

module.exports = mongoose.model('Project', projectSchema);
