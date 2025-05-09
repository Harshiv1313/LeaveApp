const express = require('express');
const { signup, login  , userDetails } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/details', userDetails);


module.exports = router;
