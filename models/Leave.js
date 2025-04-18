import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  employee: String,
  type: String,
  startDate: Date,
  endDate: Date,
  totalDays: Number,
  status: { type: String, default: 'Pending' },
  details: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Leave', leaveSchema);
