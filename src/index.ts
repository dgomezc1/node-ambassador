import express from 'express';
import cors from 'cors';
import {createConnection} from "typeorm";
import {routes} from "./routes";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import {createClient} from "redis";

dotenv.config();

export const client = createClient({
    url: 'redis://redis:6379'
});

createConnection(
    {
        "type": "mysql",
        "host": process.env.DATABASE_HOST,
        "port": 3306,
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "synchronize": true,
        "logging": false,
        "entities": ["src/entity/*.ts"]
    }).then(async () => {
    await client.connect();

    const app = express();

    app.use(cookieParser());
    app.use(express.json());
    app.use(cors({
        credentials: true,
        origin: ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:5000']
    }));

    routes(app);

    app.listen(8000, () => {
        console.log('listening to port 8000')
    });
});

