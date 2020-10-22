import * as express from 'express';
import * as mongoose from 'mongoose';

import { getEnvironmentVariables } from './environments/env';
import UserRouter from './routers/UserRouter';


export class Server{
    public app: express.Application = express();
    constructor(){
        this.setConfigurations();
        this.setRoutes();
    }
    setConfigurations(){
        this.setMongodb();
    }
    setMongodb(){
        const databaseURL = getEnvironmentVariables().db_url;
        mongoose.connect(databaseURL, 
        {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>{
            console.log("MongoDB is connected")
        })
    }
    setRoutes(){
        this.app.use('/api/user', UserRouter)
    }
}