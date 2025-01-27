import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.email_user,
      pass: config.email_pass,
    },
  })

  const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    body {
      font-family: 'Poppins', Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #ddd;
    }
    .header {
      text-align: center;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .header img {
      max-height: 100px;
    }
    .content {
      padding: 30px;
      text-align: center;
      color: #333;
    }
    .content h1 {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 30px;
    }
    .button {
      display: inline-block;
      background-color: #007bff;
      color: white !important;
      text-decoration: none;
      font-size: 16px;
      padding: 10px 20px;
      border-radius: 5px;
    }
    .button:hover {
      background-color: #0056b3;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #666;
      padding: 20px;
      background-color: #f9f9f9;
      border-top: 1px solid #ddd;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <img src="https://i.ibb.co.com/BfnkTXc/logo.png" alt="Wistia Logo">
    </div>

    <!-- Content -->
    <div class="content">
      <h1>Password Reset</h1>
      <p>If you've lost your password or wish to reset it, use the link below to get started.</p>
      <a href="${resetLink}" class="button">Reset Your Password</a>
      <p>If you did not request a password reset, you can safely ignore this email. Only a person with access to your email can reset your account password.</p>
    </div>

    <!-- Footer -->
    <div class="footer">
      &copy; 2025 On The Go. All rights reserved.
    </div>
  </div>
</body>
</html>

  `

  await transporter.sendMail({
    from: 'shaifshajedt@gmail.com',
    to,
    subject: 'Reset Your Password - On The Go',
    text: `Hello! We received a request to reset your password. Click the link to reset it: ${resetLink}`,
    html,
  })
}
