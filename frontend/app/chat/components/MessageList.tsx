'use client'
import React from 'react'
export default function MessageList({ messages }: { messages: any[] }) {
    return (
        <div className="space-y-3">
            {messages.map((m, idx) => (
                <div key={idx} className="flex">
                    <div className="mr-3">
                        <div className="w-9 h-9 rounded-full bg-gray-300"></div>
                    </div>
                    <div>
                        <div className="bg-white p-3 rounded-lg shadow-sm max-w-[60%]">
                            {m.content}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">{new Date(m.createdAt
                            || Date.now()).toLocaleTimeString()}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}