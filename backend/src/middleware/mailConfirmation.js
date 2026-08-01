import nodemailer from "nodemailer"
import { emailTemplate } from "../utilities/emailTemplate.js";

  const transporter = nodemailer.createTransport({
  
  service: "gmail",
  auth: {
    user: "ibrahimsaif465@gmail.com",
    pass: "hqzc acir yevn bwwj",
  },
  tls:{ rejectUnauthorized:false }
});

export async function mailConfirmation(mail, code){
  const info = await transporter.sendMail({
    from: '"Ibrahim" <ibrahimsaif465@gmail.com>',
    to: mail,
    subject: "Verify your account",
    text: `Your verification code is: ${code}`,
    html: emailTemplate(code),
  });
  console.log("Message sent: %s", info.messageId);
}
