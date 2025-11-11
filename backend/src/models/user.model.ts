import { Schema, model } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    avatar: { type: String }
}, { timestamps: true });
export default model("User", userSchema);