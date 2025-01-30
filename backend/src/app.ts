import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";
import pinoHttp from "pino-http";
import { errors } from "celebrate";
import bodyParser from "body-parser";
import logger from "./services/logger.service";
import express, { NextFunction, Request, Response } from "express";

// Import env variables
dotenv.config();
const PORT = Number(process.env.PORT);
const HOST = String(process.env.HOST);
const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(pinoHttp({ logger: logger }));

app.use("/v1/api", router);

app.use(errors());

app.use("*", (error: any, req: Request, res: Response, next: NextFunction) => {
    res.json(error);
});

app.listen(PORT, () => {
    console.log(`Listening on http://${HOST}:${PORT}/`);
});
