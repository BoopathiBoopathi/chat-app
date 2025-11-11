'use client'
import React, { useEffect, useState } from 'react'
import ChatList from './components/ChatList'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'
import { io } from 'socket.io-client'
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000', { autoConnect: false });
export default function ChatPage() {
    const [activeChat, setActiveChat] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    useEffect(() => {
        socket.connect();
        socket.on('new-message', (msg) => {
            setMessages(prev => [...prev, msg]);
        });
        return () => { socket.disconnect(); }
    }, [])
    const handleSend = (text: string) => {
        if (!activeChat) return;
        const payload = {
            chatId: activeChat, message: {
                content: text, createdAt:
                    new Date().toISOString()
            }
        };
        socket.emit('send-message', payload);
        setMessages(prev => [...prev, payload.message]);
    }
    return (
        <div className="h-screen flex">
            {/* Sidebar - Chat list */}
            <div className="w-80 hidden md:block border-r bg-white">
                <ChatList onSelect={(id) => setActiveChat(id)} />
            </div>
            {/* Mobile: collapsed list at top */}
            <div className="md:hidden w-full border-b">
                <ChatList compact onSelect={(id) => setActiveChat(id)} />
            </div>
            {/* Main area */}
            <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-auto bg-slate-100 p-4">
                    <MessageList messages={messages} />
                </div>
                <div className="p-4 bg-white">
                    <MessageInput onSend={handleSend} />
                </div>
            </div>
        </div>
    )
}
