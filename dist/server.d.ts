import * as express from 'express';
export declare class Server {
    app: express.Application;
    constructor();
    setConfigurations(): void;
    setMongodb(): void;
    configureBodyParser(): void;
    setRoutes(): void;
    error404Handler(): void;
    handleErrors(): void;
}
