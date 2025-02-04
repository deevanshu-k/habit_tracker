import { Request, Response, NextFunction } from "express";

const delayMiddleware = (ms: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
        setTimeout(() => {
            next();
        }, ms);
    };
};

export default delayMiddleware;
