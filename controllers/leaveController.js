const Leave = require('../models/Leave')
const User = require('../models/User'); // Make sure path is correct


const requestLeave = async (req, res) => {
  try {
    const { employee, type, startDate, endDate, totalDays, details } = req.body;

    // Basic validation (you could also use a library like Joi for this)
    if (!employee || !type || !startDate || !endDate ) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    const leave = new Leave({
      employee,
      type,
      startDate,
      endDate,
      totalDays,
      details
    });

    await leave.save();

    res.status(201).json({ message: 'Leave request submitted', leave });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while submitting the leave request.' });
  }
};



const handleLeave = async (req, res) => {
  try {
    const { leaveId, status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).send({ message: 'Invalid status value.' });
    }

    // 1. Find the leave request
    const leaveRequest = await Leave.findById(leaveId);
    if (!leaveRequest) {
      return res.status(404).send({ message: 'Leave not found.' });
    }

    // 2. Only deduct if Approved and not already approved
    if (status === 'Approved' && leaveRequest.status !== 'Approved') {
      const totalDays = leaveRequest.totalDays;
      const employeeId = leaveRequest.employee;

      // 3. Find the user and update their totalLeaves
      const user = await User.findById(employeeId);
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }

      if (user.totalLeaves < totalDays) {
        return res.status(400).send({ message: 'Not enough leave balance.' });
      }

      user.totalLeaves -= totalDays;
      await user.save();
    }

    // 4. Update the leave status
    leaveRequest.status = status;
    await leaveRequest.save();

    res.send({ message: 'Leave status updated.', leave: leaveRequest });

  } catch (error) {
    console.error('Error updating leave:', error);
    res.status(500).send({ message: 'Failed to update leave status.' });
  }
};





const getLeaves = async (req, res) => {
  try {
    const { userId, role } = req.body;

    let leaves;
    if (role === 'admin') {
      // Admin can see all leaves
      leaves = await Leave.find().populate('employee', 'name email');
    } else {
      // User can see only their leaves
      leaves = await Leave.find({ employee: userId });
    }

    res.send(leaves);
  } catch (error) {
    console.error('Error fetching leaves:', error);
    res.status(500).send({ message: 'Error fetching leave records' });
  }
};


 const cancelLeave = async (req, res) => {
  await Leave.findByIdAndDelete(req.params.id);
  res.send({ message: 'Leave cancelled' });
};


module.exports = {
  requestLeave , getLeaves , handleLeave
};