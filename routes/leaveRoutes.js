// const express = require('express');
// const router = express.Router();
// const Leave = require('../models/Leave');

// // Create a leave request
// router.post('/api/leaves/create', async (req, res) => {
//     try {
//         const { employeeName, reason } = req.body;
//         const newLeave = new Leave({ employeeName, reason });
//         await newLeave.save();
//         res.status(201).json(newLeave);
//     } catch (error) {
//         res.status(500).json({ error: 'Error creating leave request' });
//     }
// });

// // Get all leave requests
// router.get('/api/leaves', async (req, res) => {
//     try {
//         const leaves = await Leave.find();
//         res.json(leaves);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching leave requests' });
//     }
// });

// // Approve or Reject a leave request
// router.put('/api/leaves/update/:id', async (req, res) => {
//     try {
//         const { status } = req.body; // "Approved" or "Rejected"
//         const updatedLeave = await Leave.findByIdAndUpdate(req.params.id, { status }, { new: true });
//         res.json(updatedLeave);
//     } catch (error) {
//         res.status(500).json({ error: 'Error updating leave request' });
//     }
// });

// module.exports = router;

const express = require('express');

const router = express.Router();

router.post('/request', requestLeave);
router.get('/all', getLeaves);
router.delete('/:id', cancelLeave);

export default router;
