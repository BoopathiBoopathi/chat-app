import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import { signToken } from "../utils/token";
export const register = async (req: Request, res: Response) => {
    const { name, phone, password } = req.body;
    console.log(" body ", req.body)
    try {
        const exists = await User.findOne({ phone });
        if (exists) return res.status(400).json({ message: "Phone exists" });
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, phone, password: hashed });
        const token = signToken({ id: user._id, phone: user.phone });
        res.status(201).json({
            token, user: {
                id: user._id, name: user.name, phone:
                    user.phone
            }
        });
    } catch (err) {
        console.log(" LLLLLLLLLLLLLL ", err)
        res.status(500).json({ message: "Server error", error: err });
    }
};
export const login = async (req: Request, res: Response) => {
    const { phone, password } = req.body;
    try {
        const user = await User.findOne({ phone });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(400).json({ message: "Invalid credentials" });
        const token = signToken({ id: user._id, phone: user.phone });
        res.json({
            token, user: {
                id: user._id, name: user.name, phone:
                    user.phone
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}