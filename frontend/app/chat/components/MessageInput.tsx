'use client'
import React, { useState } from 'react'

export default function MessageInput({ onSend }: {
    onSend: (text:
        string) => void
}) {
    const [value, setValue] = useState('');
    const send = () => {
        if (!value.trim()) return;
        onSend(value.trim());
        setValue('');
    }
    return (
        <div className="flex gap-2">
            <input data-testid="message-input" value={value}
                onChange={(e) => setValue(e.target.value)} placeholder="Type a message"
                className="flex-1 p-3 rounded-lg border" />
            <button data-testid="send-button" onClick={send} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Send</button>
        </div>
    )
}