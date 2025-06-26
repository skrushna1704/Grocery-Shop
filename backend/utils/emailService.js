import nodemailer from 'nodemailer';
import config from '../config/config.js';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: config.EMAIL_HOST,
    port: config.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
    },
  });
};

// Send email
export const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: config.EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Email could not be sent');
  }
};

// Email templates
export const emailTemplates = {
  // Welcome email
  welcome: (userName) => ({
    subject: 'Welcome to Jumale Kirana!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Welcome to Jumale Kirana!</h2>
        <p>Hello ${userName},</p>
        <p>Thank you for registering with Jumale Kirana. We're excited to have you as part of our community!</p>
        <p>You can now:</p>
        <ul>
          <li>Browse our wide selection of groceries</li>
          <li>Place orders for home delivery</li>
          <li>Track your orders in real-time</li>
          <li>Earn rewards on your purchases</li>
        </ul>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Best regards,<br>The Jumale Kirana Team</p>
      </div>
    `,
    text: `Welcome to Jumale Kirana! Hello ${userName}, thank you for registering with us.`
  }),

  // Email verification
  emailVerification: (userName, verificationUrl) => ({
    subject: 'Verify Your Email - Jumale Kirana',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Verify Your Email Address</h2>
        <p>Hello ${userName},</p>
        <p>Please click the button below to verify your email address:</p>
        <a href="${verificationUrl}" style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">Verify Email</a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p>${verificationUrl}</p>
        <p>This link will expire in 10 minutes.</p>
        <p>If you didn't create an account, you can safely ignore this email.</p>
        <p>Best regards,<br>The Jumale Kirana Team</p>
      </div>
    `,
    text: `Verify your email address by clicking this link: ${verificationUrl}`
  }),

  // Password reset
  passwordReset: (userName, resetUrl) => ({
    subject: 'Reset Your Password - Jumale Kirana',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Reset Your Password</h2>
        <p>Hello ${userName},</p>
        <p>You requested to reset your password. Click the button below to create a new password:</p>
        <a href="${resetUrl}" style="background-color: #e74c3c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">Reset Password</a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p>${resetUrl}</p>
        <p>This link will expire in 10 minutes.</p>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
        <p>Best regards,<br>The Jumale Kirana Team</p>
      </div>
    `,
    text: `Reset your password by clicking this link: ${resetUrl}`
  }),

  // Order confirmation
  orderConfirmation: (userName, orderNumber, orderDetails) => ({
    subject: `Order Confirmed - #${orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Order Confirmed!</h2>
        <p>Hello ${userName},</p>
        <p>Your order #${orderNumber} has been confirmed and is being processed.</p>
        <h3>Order Details:</h3>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
          ${orderDetails}
        </div>
        <p>We'll notify you when your order is ready for delivery.</p>
        <p>Thank you for choosing Jumale Kirana!</p>
        <p>Best regards,<br>The Jumale Kirana Team</p>
      </div>
    `,
    text: `Your order #${orderNumber} has been confirmed. Thank you for choosing Jumale Kirana!`
  })
};

// Send welcome email
export const sendWelcomeEmail = async (email, userName) => {
  const template = emailTemplates.welcome(userName);
  return await sendEmail({
    email,
    subject: template.subject,
    html: template.html,
    text: template.text
  });
};

// Send email verification
export const sendEmailVerification = async (email, userName, verificationUrl) => {
  const template = emailTemplates.emailVerification(userName, verificationUrl);
  return await sendEmail({
    email,
    subject: template.subject,
    html: template.html,
    text: template.text
  });
};

// Send password reset email
export const sendPasswordResetEmail = async (email, userName, resetUrl) => {
  const template = emailTemplates.passwordReset(userName, resetUrl);
  return await sendEmail({
    email,
    subject: template.subject,
    html: template.html,
    text: template.text
  });
};

// Send order confirmation email
export const sendOrderConfirmationEmail = async (email, userName, orderNumber, orderDetails) => {
  const template = emailTemplates.orderConfirmation(userName, orderNumber, orderDetails);
  return await sendEmail({
    email,
    subject: template.subject,
    html: template.html,
    text: template.text
  });
}; 