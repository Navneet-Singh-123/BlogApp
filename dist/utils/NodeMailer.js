"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMailer = void 0;
const nodeMailer = require("nodemailer");
const SendGrid = require("nodemailer-sendgrid-transport");
class NodeMailer {
    static initializeTransport() {
        return nodeMailer.createTransport(SendGrid({
            auth: {
                api_key: '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'
            }
        }));
    }
    static sendEmail(data) {
        return NodeMailer.initializeTransport().sendMail({
            from: 'abc@gmail.com',
            to: data.to,
            subject: data.subject,
            html: data.html
        });
    }
}
exports.NodeMailer = NodeMailer;
