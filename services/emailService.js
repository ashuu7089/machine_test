require("dotenv").config();
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const emailService = async (link, userName, email,yourName,yourPosition,yourCompany) => {

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    return new Promise((resolve, reject) => {
      
      ejs.renderFile(
        path.join(__dirname, "../views/verification_email.ejs"),
        {link:link, userName:userName, email:email, yourName:yourName,yourPosition: yourPosition,yourCompany:yourCompany },
        (err, res) => {
          if (err) {
            console.log(err);
          }
          
          const message = {
            from: process.env.sendMailer, 
            to:email , 
            subject: "Verification Link",
            html: res,
          };
        
          transporter.sendMail(message, (error, info) => {
            if (error) {
              reject(error);
            } else {
              resolve(info.response);
            }
          });
        }
      );
    });
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

module.exports = emailService;
