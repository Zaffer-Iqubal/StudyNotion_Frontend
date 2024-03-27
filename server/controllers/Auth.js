const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { mailSender } = require('../utils/mailSender');
const {passwordUpdated} = require('../mail/templates/passwordUpdate');
require('dotenv').config();

//Send OTP for SignUp User
exports.sendOtpSignup = async (req, res) => {
    try {
        const {email} = req.body;

        //Check User present or not.
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(401).json({success: false, message: "Email already exists"});
        }

        //Generate random 6 digit number as otp
        let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        //check otp is unique or not
        let result = await OTP.findOne({otp: otp});
        while (result) {
            otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
            result = await OTP.findOne({otp: otp});
        }

        let otpUser = await OTP.create({email, otp})
        return res.status(200).json({
            success: true,
            data: otpUser,
            message: 'OTP send successfully...'
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//SignUp Controller
exports.signup = async (req, res) => {
    try {
      // Destructure fields from the request body
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp,
      } = req.body
      // Check if All Details are there or not
      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword ||
        !otp
      ) {
        return res.status(403).send({
          success: false,
          message: "All Fields are required",
        })
      }
      // Check if password and confirm password match
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Password and Confirm Password do not match. Please try again.",
        })
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists. Please sign in to continue.",
        })
      }
  
      // Find the most recent OTP for the email
      const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
      console.log(response)
      if (response.length === 0) {
        // OTP not found for the email
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid",
        })
      } else if (otp !== response[0].otp) {
        // Invalid OTP
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid",
        })
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)
  
      // Create the user
      let approved = ""
      approved === "Instructor" ? (approved = false) : (approved = true)
  
      // Create the Additional Profile For User
      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
      })
      const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password: hashedPassword,
        accountType: accountType,
        approved: approved,
        additionalDetails: profileDetails._id,
        image: '',
      })
  
      return res.status(200).json({
        success: true,
        user,
        message: "User registered successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "User cannot be registered. Please try again.",
      })
    }
  }
  
//Login Controller
exports.login = async(req, res) => {
    try {
        //Get Data from Req.Body
        const {email, password} = req.body;

        //Validate Data
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: 'Please Enter correct Email & Password...'
            })
        }
        
        //User exist or not
        const user = await User.findOne({email}).populate('additionalDetails');
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'User not registered...'
            })
        }
        
        //Generate Jwt Token and create Payload, After matching the Password
        let payload = {
            email: user.email,
            id: user._id,
            role: user.accountType
        }

        if(await bcrypt.compare(password, user.password)){
            //Create Token
            let token = jwt.sign(payload, process.env.JWT_TOKEN, {
                expiresIn: "2h"
            });

            //Create Cookies and send response
            // user = user.toObject()
            user.token = token
            user.password = undefined

            let option = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true 
            }

            res.cookie('token', token, option).status(201).json({
                success: true,
                token,
                user,
                message: 'User Login Successfully...'
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: 'Password is Incorrect...'
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Login failed please try again...'
        })
    }
}

//Changed Password Controller
exports.changePassword = async (req, res) => {
    try {
      //Get User Data
      const  id = req.user.id;
      const userDetails = await User.findById(id);

      //Get Data from Req.Body
      const {oldPassword, newPassword} = req.body;

      //Validate Input Field
      if(!oldPassword || !newPassword){
        return res.status(401).json({
          success: false,
          message: 'Please Fill All The Fields.'
        })
      }

      const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);
      console.log(isPasswordMatch);
      if (!isPasswordMatch) {
        return res.status(401).json({
          success: false,
          message: "Your Current Password Is Wrong."
        });
      }

      //Update PWD
      const encryptedPassword = await  bcrypt.hash(newPassword, 10);
      const updateUserDetails = await  User.findByIdAndUpdate(id ,{ password : encryptedPassword}, {new: true});

      //Send Email
      try {
        const emailResponse = await mailSender(updateUserDetails.email, "Password for your account has been updated", passwordUpdated(updateUserDetails.email, `${updateUserDetails.firstName} ${updateUserDetails.lastName}`));
        console.log('Email Sent Successfully: -',emailResponse.response);
      } catch (error) {
        console.error("Error occured while sending email", error);
        return res.status(500).json({
          success: false,
          message: "Error occured while sending email",
          error: error.message,
        });
      }

      //Return Response
      return res.status(200).json({
        success: true,
        message: 'Password update successfully.'
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error occured while changing password",
      });
    }
}