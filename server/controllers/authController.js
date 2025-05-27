const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Otp = require('../models/Otp');

exports.signupWithEmail = async (req, res) => {
  try {
    const { firstName, lastName, email, password, address } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword, address });
    await newUser.save();

    res.status(201).json({ message: 'User registered via email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await Otp.findOneAndUpdate(
      { phone },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    // TODO: Integrate SMS gateway here
    console.log(`OTP sent to ${phone}: ${otp}`);

    res.status(200).json({ message: 'OTP sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.signupWithPhone = async (req, res) => {
  try {
    const { firstName, lastName, phone, address, otp } = req.body;

    const otpRecord = await Otp.findOne({ phone });
    if (!otpRecord || otpRecord.otp !== otp || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ message: 'Phone number already registered' });

    const newUser = new User({ firstName, lastName, phone, address });
    await newUser.save();
    await Otp.deleteOne({ phone });

    res.status(201).json({ message: 'User registered via phone' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, phone, password, otp } = req.body;

    if (email && password) {
      const user = await User.findOne({ email });
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      return res.status(200).json({ message: 'Logged in with email' });
    }

    if (phone && otp) {
      const user = await User.findOne({ phone });
      const otpRecord = await Otp.findOne({ phone });
      if (!user || !otpRecord || otpRecord.otp !== otp || otpRecord.expiresAt < new Date()) {
        return res.status(400).json({ message: 'Invalid phone or OTP' });
      }
      await Otp.deleteOne({ phone });
      return res.status(200).json({ message: 'Logged in with phone' });
    }

    res.status(400).json({ message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
