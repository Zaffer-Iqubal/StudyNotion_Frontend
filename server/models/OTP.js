const mongoose = require('mongoose');
const { mailSender } = require('../utils/mailSender');
const emailTemplate = require('../mail/templates/emailVerificationTemplate')

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  
  otp: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5*60
  }
})

const sendVerificationEmail = async (email, otp) => {
    try {
        const mailResponse = await mailSender(email, 'Verification Email from StudyNotion ✅', emailTemplate(otp));
        console.log('Email send Successfully: ', mailResponse.response);
    } catch (error) {
        console.log('Error while sending Email: ', error);
        throw error;
    }
}

// Define a post-save hook to send email after the document has been saved
otpSchema.pre('save', async function(next) {
  console.log('New document saved to database.');
  
  //Only Send an Email when a new document is created.
  if(this.isNew){
    await sendVerificationEmail(this.email, this.otp);
  }
    next();
})

module.exports = mongoose.model('OTP', otpSchema);