const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already exists. Please login or use another email.' });
    }

    // Hash password and save new user
    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User({ name, email, role, password: hashedPass });
    await user.save();

    res.send({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).send({ message: 'Something went wrong. Please try again.' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send({ message: 'User not found' });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, 'SECRET_KEY');
  res.send({ token , user: user , message : 'User Login successfully!' });
};

const userDetails = async (req, res) => {
  
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const userData = await User.findById(userId).select('-password'); // exclude password

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  signup,
  login , userDetails
};
