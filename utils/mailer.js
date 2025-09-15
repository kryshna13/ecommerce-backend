const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendOrderEmail(to, orderDetails) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject: 'Order Confirmation',
    html: `<h2>Thank you for your order!</h2><p>Order Details: ${orderDetails}</p>`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendOrderEmail };
