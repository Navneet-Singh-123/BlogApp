"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    static runEmailJobs() {
        this.sendEmailJob();
    }
    static sendEmailJob() {
        // JobScheduler.scheduleJob('Send Email Job', '* * * * * *', ()=>{
        //     console.log('Email Job Scheuled');
        // })
    }
}
exports.Email = Email;
