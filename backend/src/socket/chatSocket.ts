import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
let io: Server | null = null;
export const initChatSocket = (server: HttpServer) => {
    io = new Server(server, { cors: { origin: "*" } });
    io.on("connection", (socket: Socket) => {
        console.log("socket connected", socket.id);
        socket.on("join-chat", (chatId: string) => {
            socket.join(chatId);
        });
        socket.on("send-message", (data) => {
            // data: { chatId, message }
            if (!io) return;
            io.to(data.chatId).emit("new-message", data.message);
        });
        socket.on("disconnect", () => {
            console.log("socket disconnected", socket.id);
        });
    });
    return io;
};