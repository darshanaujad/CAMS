const nodemailer = require("nodemailer");

// TODO: SETUP NODEMAILER TRANSPORTER
// STEP 1: Create a transporter object with email provider credentials (Gmail, Outlook, etc.)
// STEP 2: Configure SMTP settings (host, port, secure flag, authentication)
// STEP 3: Set up email and password from environment variables for security
// STEP 4: Test the transporter connection to verify credentials are correct

const transporter = nodemailer.createTransport({
  // TODO: Add your email provider configuration here
  // service: "gmail",
  // host: process.env.EMAIL_HOST,
  // port: process.env.EMAIL_PORT,
  // secure: process.env.EMAIL_SECURE,
  // auth: {
  //   user: process.env.EMAIL_USER,
  //   pass: process.env.EMAIL_PASSWORD,
  // },
});

// TODO: CREATE A SEND EMAIL FUNCTION
// STEP 1: Accept parameters (recipient email, subject, HTML content)
// STEP 2: Validate the recipient email format
// STEP 3: Create mail options object (from, to, subject, html)
// STEP 4: Send email using transporter.sendMail()
// STEP 5: Handle success response and log email sent
// STEP 6: Handle error response and log email failure
// STEP 7: Return the result of email send operation

const sendEmail = async (email, subject, htmlContent) => {
  try {
    // TODO: Implement email sending logic here
  } catch (error) {
    // TODO: Handle email sending errors
  }
};

module.exports = { sendEmail };
