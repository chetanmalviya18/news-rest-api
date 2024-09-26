import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (toMail, subject, body) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.FROM_EMAIL, // sender address
    to: toMail, // list of receivers
    subject: subject, // Subject line
    html: body, // html body
  });
};
