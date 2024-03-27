const { contactUsEmail } = require('../mail/templates/contactFormRes')
const { mailSender } = require('../utils/mailSender');
require('dotenv');

  exports.contactUsController = async (req, res) => {
    const { firstName, lastName, email, countrycode, phoneNo, message } = req.body
    console.log(req.body)
    try {
      const emailRes = await mailSender(
        email,
        "Your Data send successfully",
        contactUsEmail(email, firstName, lastName, message, phoneNo, countrycode)
      )

      const emailResAdmin = await mailSender(process.env.MAIL_USER, 'Someone is contacting via Contact Us Page', contactUsEmail(email, firstName, lastName, message, phoneNo, countrycode))

      console.log("Email Res ", emailRes)
      console.log("Email Res Admin", emailResAdmin)
      
      return res.json({
        success: true,
        message: "Email send successfully",
      })
    } catch (error) {
      console.log("Error", error)
      console.log("Error message :", error.message)
      return res.json({
        success: false,
        message: "Something went wrong...",
      })
    }
  }