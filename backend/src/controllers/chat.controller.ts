import { Request, Response } from "express";
import Chat from "../models/chat.model";
export const getMyChats = async (req: any, res: Response) => {
    const userId = req.user.id;
    const chats = await Chat.find({
        members:
            userId
    }).populate("latestMessage").sort({ updatedAt: -1 });
    res.json(chats);
};
export const createChat = async (req: any, res: Response) => {
    const { memberIds, name, isGroup } = req.body;
    try {
        const chat = await Chat.create({ name, isGroup: !!isGroup, members: memberIds });
        res.status(201).json(chat);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
