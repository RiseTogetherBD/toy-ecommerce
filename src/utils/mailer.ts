import nodemailer from "nodemailer";
import config from "../app/Config";
interface EmailOptions{
    to: string;
    subject: string;
    html: string;
}
export const sendEmail = async({
        to,
        subject,
        html}:  EmailOptions
    ) =>{
try{
    const transporter = nodemailer.createTransport({
  host: config.app_email_host,
  port: Number(config.app_email_port),
  secure: false,
  auth: {
    user: config.app_user,
    pass: config.app_password,
  },
});

    await transporter.sendMail({
        from : config.app_email_from,
        to,
        subject,
        html,
    })

}catch(error: any){
    console.error("Email send error:", error.message)
    throw new Error("Email could not be sent")
}
}