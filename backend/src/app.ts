import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";
import pinoHttp from "pino-http";
import { errors } from "celebrate";
import bodyParser from "body-parser";
import logger from "./services/logger.service";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";

// Import env variables
dotenv.config();
const PORT = Number(process.env.PORT);
const HOST = String(process.env.HOST);
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://127.0.0.1:5173", // React frontend URL
        credentials: true, // ALLOW COOKIES
    })
);

app.use(pinoHttp({ logger: logger }));

app.use("/v1/api", router);

app.use(errors());

app.use("*", (error: any, req: Request, res: Response, next: NextFunction) => {
    res.json(error);
});

app.listen(PORT, () => {
    console.log(`Listening on http://${HOST}:${PORT}/`);
});
