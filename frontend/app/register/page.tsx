'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, password, name }),
            });

            if (res.ok) {
                alert('Registered successfully! Please login.');
                router.push('/login');
            } else {
                const error = await res.json();
                alert(error.message || 'Registration failed');
            }
        } catch (err) {
            console.error('Register error:', err);
            alert('Something went wrong.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen p-4 bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
                <h1 className="text-2xl font-semibold mb-4 text-center text-blue-700">Create Account</h1>


                <label className="block mb-2">Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your name"
                />
                <label className="block mb-2">Phone</label>
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    placeholder="Phone number"
                />

                <label className="block mb-2">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    placeholder="Password"
                />

                <button
                    onClick={handleRegister}
                    className="w-full py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                >
                    Register
                </button>

                <p className="text-sm text-center mt-4">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
