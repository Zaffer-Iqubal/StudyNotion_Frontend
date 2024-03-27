const express = require('express')
const router = express.Router()

//Import required Controller and Middleware
const { auth } = require('../middleware/authorization');

const {signup, sendOtpSignup, login, changePassword} = require('../controllers/Auth');

const {resetPasswordToken, resetPassword} = require('../controllers/ResetPassword')

// ***************************************************************************************************

//                                      Authentication routes

//****************************************************************************************************

//Route for User SignUp
router.post('/signup', signup);

//Route for User Verification OTP 
router.post('/sendotp', sendOtpSignup)

//Route for Login
router.post('/login', login)

// Router for changing password
router.put("/changepassword", auth, changePassword);


// ***************************************************************************************************

//                                      Reset-Password routes

//****************************************************************************************************

//Route for Sending Reset Password Link 
router.post('/reset-password-token', resetPasswordToken);

//Route for Reseting the Password
router.post('/reset-password', resetPassword);

module.exports = router;