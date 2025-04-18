const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
// const leaveRoutes = require('./routes/leaveRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://hsbhasin03:QLe79OXNu30FrjVv@cluster0.vvui1ab.mongodb.net/leaveApp')
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

app.use('/api/auth', authRoutes);
// app.use('/api/leave', leaveRoutes);

app.listen(5000, () => console.log('🚀 Server running on port 5000'));
