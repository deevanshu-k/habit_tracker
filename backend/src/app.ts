import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";
import pinoHttp from "pino-http";
import { errors } from "celebrate";
import bodyParser from "body-parser";
import logger from "./services/logger.service";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import delayMiddleware from "./middleware/delay.middleware";

// Import env variables
dotenv.config();
const PORT = Number(process.env.PORT);
const HOST = String(process.env.HOST);
const DELAY = Number(process.env.DELAY);
const CLIENT_BASE_URL = String(process.env.CLIENT_BASE_URL);
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

// Delay
if (DELAY > 100) {
    app.use(delayMiddleware(DELAY));
}

app.use(
    cors({
        origin: CLIENT_BASE_URL, // React frontend URL
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
