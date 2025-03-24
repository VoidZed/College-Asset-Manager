const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  activity_type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  semester: {
    type: String,
    enum: ['Odd', 'Even'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },

}, {
  timestamps: true
});


ActivitySchema.index({ activity_type: 1, date: 1 });
ActivitySchema.index({ year: 1, semester: 1 });

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;