import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { errors } from "celebrate";

// Import env variables
dotenv.config();
const PORT = Number(process.env.PORT);
const HOST = String(process.env.HOST);
const app = express();

app.use(bodyParser.json());

app.use("/v1/api", router);

app.use(errors());

app.use("*", (error: any, req: Request, res: Response, next: NextFunction) => {
    res.json(error);
});

app.listen(PORT, () => {
    console.log(`Listening on http://${HOST}:${PORT}/`);
});
