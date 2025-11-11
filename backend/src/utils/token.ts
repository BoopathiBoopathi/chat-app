import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET || "dev_secret";
export const signToken = (payload: object) => jwt.sign(payload, secret, {
    expiresIn: "7d"
});
export const verifyToken = (token: string) => jwt.verify(token, secret);
