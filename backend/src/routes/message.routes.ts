import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/message.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();
router.get("/:chatId", authMiddleware, getMessages);
router.post("/", authMiddleware, sendMessage);
export default router;
