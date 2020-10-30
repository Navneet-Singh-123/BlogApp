import * as JobScheduler from 'node-schedule';

export class Email{
    static runEmailJobs(){
        this.sendEmailJob();
    }
    static sendEmailJob(){
        // JobScheduler.scheduleJob('Send Email Job', '* * * * * *', ()=>{
        //     console.log('Email Job Scheuled');
        // })
    }
}
