"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const env_1 = require("./environments/env");
const UserRouter_1 = require("./routers/UserRouter");
const PostRouter_1 = require("./routers/PostRouter");
const CommentRouter_1 = require("./routers/CommentRouter");
const Jobs_1 = require("./jobs/Jobs");
class Server {
    constructor() {
        this.app = express();
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigurations() {
        this.setMongodb();
        this.configureBodyParser();
        Jobs_1.Jobs.runRequiredJobs();
    }
    setMongodb() {
        const databaseURL = env_1.getEnvironmentVariables().db_url;
        mongoose.set('useFindAndModify', false);
        mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
            console.log("MongoDB is connected");
        });
    }
    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    setRoutes() {
        this.app.use('/src/uploads', express.static('src/uploads'));
        this.app.use('/api/user', UserRouter_1.default);
        this.app.use('/api/post', PostRouter_1.default);
        this.app.use('/api/comment', CommentRouter_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: "Not found",
                status_code: 404
            });
        });
    }
    handleErrors() {
        // Special type of middle ware -> where the first parameter is error
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong. Please try again',
                status_code: errorStatus
            });
        });
    }
}
exports.Server = Server;
