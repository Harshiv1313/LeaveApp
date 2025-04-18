import Leave from '../models/Leave.js';

export const requestLeave = async (req, res) => {
  const leave = new Leave(req.body);
  await leave.save();
  res.send({ message: 'Leave request submitted', leave });
};

export const getLeaves = async (req, res) => {
  const leaves = await Leave.find();
  res.send(leaves);
};

export const cancelLeave = async (req, res) => {
  await Leave.findByIdAndDelete(req.params.id);
  res.send({ message: 'Leave cancelled' });
};
