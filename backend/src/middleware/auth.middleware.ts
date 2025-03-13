import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UNAUTHORIZED_REQUEST } from "../utils/message.util";

interface DecodedToken {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    iat?: number;
    exp?: number;
}

export interface AuthenticatedRequest extends Request {
    user?: DecodedToken;
}

const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    try {
        // Extract token from cookies
        const token = req.cookies?.auth;
        if (!token) {
            res.status(401).json({
                code: 401,
                message: UNAUTHORIZED_REQUEST,
            });
            return;
        }

        // Verify and decode token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as DecodedToken;
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            code: 401,
            message: UNAUTHORIZED_REQUEST,
        });
    }
};

export default authMiddleware;
