import express, { Application,NextFunction } from "express"
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const expressConfig = (app: Application) => {

    // Development logging
    if (process.env.NODE_ENV == 'development') {
        app.use(morgan('dev'));
    }

    app.use(cors({ origin: "http://localhost:3000" }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
}

export default expressConfig