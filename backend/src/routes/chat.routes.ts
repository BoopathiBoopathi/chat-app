import { Router } from "express";
import { getMyChats, createChat } from "../controllers/chat.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();
router.get("/", authMiddleware, getMyChats);
router.post("/", authMiddleware, createChat);
export default router;
