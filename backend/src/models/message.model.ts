import { Schema, model } from "mongoose";
const messageSchema = new Schema({
    chatId: { type: Schema.Types.ObjectId, ref: "Chat", index: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", index: true },
    content: { type: String },
    messageType: { type: String, default: "text" }
}, { timestamps: true });
export default model("Message", messageSchema);