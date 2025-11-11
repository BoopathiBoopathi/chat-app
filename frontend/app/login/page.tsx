"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function LoginPage() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
  

    const handleSubmit = async (e: React.FormEvent) => {
         e.preventDefault(); 
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, password }),
            });
            router.push('/chat');
            console.log("fffff ", res)
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('token', data.token);
                router.push('/chat'); // better than window.location.href
            } else {
                const error = await res.json();
                // alert(error.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            // alert('Something went wrong.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500">

            <div className="bg-white shadow-2xl rounded-2xl flex w-[900px] max-w-full overflow-hidden">

                {/* Left Section */}
                <div className="w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white p-10">
                    <h2 className="text-4xl font-bold mb-4">Welcome Page</h2>
                    <p className="text-lg opacity-90">Sign in to your account</p>
                    <div className="absolute bottom-5 text-sm opacity-80">
                        www.yoursite.com
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-1/2 p-10 flex flex-col justify-center">
                    <h3 className="text-gray-800 text-xl font-semibold mb-2">Hello!</h3>
                    <p className="text-purple-600 font-medium mb-8">Good Morning</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-600 text-sm mb-1">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your phone"
                                className="w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2 text-gray-700"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 text-sm mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2 text-gray-700"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-purple-600" />
                                Remember me
                            </label>
                            <a href="#" className="text-purple-600 hover:underline">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-md hover:opacity-90 transition"
                        >
                            Login
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <a
                            href="/register"
                            className="text-purple-600 font-medium hover:underline"
                        >
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
