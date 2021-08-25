const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const querySchema = new Schema({
  question: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  generatedQuery: { type: String, required: false },
  results: { type: Array, required: false }
});

module.exports = mongoose.model('Query', querySchema);

