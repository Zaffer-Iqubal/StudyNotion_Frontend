const User = require('../models/User');
const bcrypt = require('bcrypt');
const {mailSender} = require('../utils/mailSender');
const { passwordResetTemplate } = require('../mail/templates/passwordResetEmail');
const crypto = require('crypto');

// resetPasswordToken
exports.resetPasswordToken = async(req, res) => {
    try {
        //Get Email from Req.body
        const {email} = req.body;

        //Check user present or not using validation
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Your Email is not registered in the Database...'
            })
        }

        //Generate Token
        const token = crypto.randomBytes(20).toString("hex");

        //Update User by adding Token & Expires time.
        const updatedDetails = await User.findOneAndUpdate({email: email}, 
                                                            {token: token, 
                                                            resetPasswordExpires: Date.now()+5*60*1000},
                                                            {new: true})
        
        //Create Url
        const url = `http://localhost:3000/reset-password/${token}`;

        //Send Mail containing Url
        await mailSender(email, 'Password Reset Link', passwordResetTemplate(url));                                                                    
        
        //Return Response
        return res.status(200).json({
            success: true,
            date: updatedDetails,
            message: 'Email sent successfully, Please check email & password...'
        })                                                        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while sending Reset-Password link..'
        })    
    }
}

//resetPassword
exports.resetPassword = async(req, res) => {
    try {
        //Fetch Data from Req.Body
        const {token, password, confirmPassword} = req.body;
        
        //Validation of Input Field & Data
        if(!password || !confirmPassword){
            return res.json({
                success: false,
                message: 'Please fill all the Field..'
            })
        }
        
        if(password !== confirmPassword){
            return res.json({
                success: false,
                message: "Passwords doesn't match"
            });
        }

        //Get UserDetails form Db using Token
        const user = await User.findOne({token: token});

        //If not entry found - Invalid Token or Expires
        if(!user){
            res.json({
                success: false,
                message: 'Invalid Token Id...'
            })
        }

        if(user.resetPasswordExpires < Date.now()){
            return res.json({
                success: false,
                message: 'Session Expires, Please Retry...',
            })
        }

        //Hash the Password
        const hashPassword = await bcrypt.hash(password, 10);
        
        // Password Update
        const updateDetails = await User.findOneAndUpdate({token: token}, 
                                                          {password: hashPassword},
                                                          {new: true})
        
        // return Password
        return res.status(201).json({
            success: true,
            date: updateDetails,
            message: 'Password Updated Successfully.'
        })     
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, While Updating your Password...'
        })
    }
}