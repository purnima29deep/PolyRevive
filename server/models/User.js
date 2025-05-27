const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String }, // only for email signup
  address: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
