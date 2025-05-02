const express = require('express');
const { requestLeave  , getLeaves , handleLeave} = require('../controllers/leaveController');


const router = express.Router();

router.post('/request', requestLeave);
router.put('/handleLeave', handleLeave);

router.post('/all', getLeaves);
// router.delete('/:id', cancelLeave);

module.exports = router;