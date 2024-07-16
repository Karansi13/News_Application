import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'prabhatrajrai4@gmail.com',
    pass: 'cjtb lama eouu bwtq',
  },
});

export const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: 'prabhatrajrai4@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};
