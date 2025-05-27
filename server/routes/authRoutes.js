const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup-email', authController.signupWithEmail);
router.post('/send-otp', authController.sendOtp);
router.post('/signup-phone', authController.signupWithPhone);
router.post('/login', authController.login);

module.exports = router;