import nodemailer from 'nodemailer'

type TPayload = {
  toEmail: string
  text: string
  subject: string
  html: string
}
export const sendEmail = async (payload: TPayload) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: process.env.NODE_ENV === 'production', // true for port 465, false for other ports
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASSWORD,
    //   -----come from config.ts
    // node_user: process.env.NODE_MAILER_USER,
    // node_pass: process.env.NODE_MAILER_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: '"basakhuji.com  🏠" <saifulislamshaikot.personal@gmail.com>', // sender address
    to: payload.toEmail, // list of receivers
    subject: payload.subject, // Subject line
    text: payload.text,
    html: payload.html,
  })
}
