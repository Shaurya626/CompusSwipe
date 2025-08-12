import nodemailer from 'nodemailer';

const createTransporter = () => {
  if (process.env.NODE_ENV === 'production') {
    // Production email service (SendGrid, Mailgun, etc.)
    return nodemailer.createTransporter({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  } else {
    // Development - use Ethereal Email for testing
    return nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.EMAIL_USER || 'ethereal.user@ethereal.email',
        pass: process.env.EMAIL_PASS || 'ethereal.pass'
      }
    });
  }
};

const sendEmail = async (options) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.FROM_EMAIL || 'noreply@campusswipe.com',
    to: options.email,
    subject: options.subject,
    html: options.html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

export { sendEmail };