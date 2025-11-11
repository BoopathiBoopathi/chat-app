import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";
export interface AuthRequest extends Request {
    user?: any;
}
export const authMiddleware = (req: AuthRequest, res: Response, next:
    NextFunction) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "No token" });
    const token = auth.split(" ")[1];
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
