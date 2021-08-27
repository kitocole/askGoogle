const mongoose = require('mongoose');
const { string } = require('prop-types');
const Schema = mongoose.Schema;

const querySchema = new Schema({
  question: { type: String, required: true },
  language: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  generatedQuery: { type: String, required: false },
  results: { type: Array, default: [], required: false }
});


const Queries = mongoose.model('Query', querySchema);

const historySchema = new Schema({
  question: { type: String, required: true },
  language: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  generatedQuery: { type: String, required: false },
  results: { type: Array,  default: [], required: false }
});

const Histories = mongoose.model('History', historySchema);

module.exports = {
  Queries,
  Histories
};