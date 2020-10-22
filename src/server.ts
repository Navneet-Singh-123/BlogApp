import bodyParser = require('body-parser');
import * as express from 'express';
import * as mongoose from 'mongoose';

import { getEnvironmentVariables } from './environments/env';
import UserRouter from './routers/UserRouter';


export class Server{
    public app: express.Application = express();
    constructor(){
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigurations(){
        this.setMongodb();
        this.configureBodyParser();
    }
    setMongodb(){
        const databaseURL = getEnvironmentVariables().db_url;
        mongoose.connect(databaseURL, 
        {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>{
            console.log("MongoDB is connected")
        })
    }
    configureBodyParser(){
        this.app.use(bodyParser.urlencoded({extended: true}))
    }
    setRoutes(){
        this.app.use('/api/user', UserRouter)
    }
    error404Handler(){
        this.app.use((req, res)=>{
            res.status(404).json({
                message: "Not found", 
                status_code: 404
            })
        })
    }
    handleErrors(){
        // Special type of middle ware -> where the first parameter is error
        this.app.use((error, req, res, next)=>{
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong. Please try again', 
                status_code: errorStatus
            })
        })
    }
}