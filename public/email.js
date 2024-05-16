const nodemailer = require('nodemailer');
const mail = () => {
  var arr=[5111, 2451, 6589, 1002, 7412];
  const randomIndex = Math.floor(Math.random() * arr.length);
  const item = arr[randomIndex];

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'gaming.itachi1401@gmail.com',
      pass: 'lqbp xohu pktz kvts',
    },
  });

  // Email content
  const mailOptions = {
    from: 'gaming.itachi1401@gmail.com',
    to: 'shraymathur13@gmail.com',
    subject: 'OTP for Verification',
    text: `Your OTP is: ${item}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error.message);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = mail