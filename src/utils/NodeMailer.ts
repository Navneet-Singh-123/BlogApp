import * as nodeMailer from 'nodemailer';
import * as SendGrid from 'nodemailer-sendgrid-transport'

export class NodeMailer{
    private static initializeTransport(){
        return nodeMailer.createTransport(SendGrid({
            auth: {
                api_key: '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'
            }
        }))
    }
    static sendEmail(data: {to: [string], subject: string, html: string}): Promise<any>{
        return NodeMailer.initializeTransport().sendMail({
            from: 'abc@gmail.com', 
            to: data.to, 
            subject: data.subject, 
            html: data.html
        })
    }
}