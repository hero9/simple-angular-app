const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({
	text: String,
  publishedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TasksSchema);