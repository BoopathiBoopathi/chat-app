import { Request, Response } from "express";
import Message from "../models/message.model";
import Chat from "../models/chat.model";
export const getMessages = async (req: any, res: Response) => {
    const chatId = req.params.chatId;
    const messages = await Message.find({ chatId }).sort({
        createdAt:
            1
    }).populate("sender");
    res.json(messages);
};
export const sendMessage = async (req: any, res: Response) => {
    const { chatId, content } = req.body;
    const sender = req.user.id;
    try {
        const message = await Message.create({ chatId, sender, content });
        await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });
        // Note: socket emission is done via socket layer when saved or via
        //controller depending on structure
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
