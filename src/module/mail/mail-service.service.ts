import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
dotenv.config();

interface ISendMail {
  to: string;
  subject: string;
  message: string;
  link? : string
}
@Injectable()
export class MailService {
  async send({ to, subject, message, link }: ISendMail) {
    console.log("object");
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      // host: 'smtp.dreamhost.com',
    //   port: 587,
      auth: {
        user: process.env.GOOGLE_MAIL_APP_EMAIL,
        pass: process.env.GOOGLE_MAIL_APP_PASSWORD,
      },
    });
    

    const htmlString = `<div style="display:flex; justify-content: center; align-items:center; margin-top:20px; flex-direction:column; background-color:#f0f4f8; padding:30px; border-radius:12px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);">
      <div style="display:flex; gap:10px; margin-bottom:15px; align-items:center;">  
      <img src="cid:uniqueImageId" alt="Blog" style="width:50px; height:50px; border-radius:50%; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <h1 style="font-size: 32px; color: #2e8b57; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);">Blog</h1> 
      </div>
      <p style="font-size: 18px; color: #333; text-align:center; margin:10px 0; line-height:1.6;">${message}</p>
      <a href=${link} style="font-size: 20px; color: #1e90ff; align-self:center; text-align:center; margin-top:20px; padding:12px 25px; border:2px solid #1e90ff; border-radius:8px; text-decoration:none; background-color:white; transition: all 0.3s ease;">Click here to Continue</a>
</div>`

    var mailOptions = {
      from: process.env.GOOGLE_MAIL_APP_EMAIL,
      to,
      subject,
      html: htmlString,
       attachments: [{
    filename: 'logo.jpg', //
    path: 'https://res.cloudinary.com/dzo2vsmrm/image/upload/v1753869833/logo_duvpkp.jpg', 
    cid: 'uniqueImageId' 
  }]
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("sended......");
      return true;
    } catch (error) {
      console.error('error sending email ', error);
      return false;
    }
  }
}
