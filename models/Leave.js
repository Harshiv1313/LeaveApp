const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
  type: String,
  startDate: Date,
  endDate: Date,
  totalDays: Number,
  status: { type: String, default: 'Pending' },
  details: String,
  createdAt: { type: Date, default: Date.now }
});


const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
