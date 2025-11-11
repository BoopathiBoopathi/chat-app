import { Schema, model } from "mongoose";
const chatSchema = new Schema({
    name: String,
    isGroup: { type: Boolean, default: false },
    members: [{ type: Schema.Types.ObjectId, ref: "User", index: true }],
    latestMessage: { type: Schema.Types.ObjectId, ref: "Message" }
}, { timestamps: true });
export default model("Chat", chatSchema);
