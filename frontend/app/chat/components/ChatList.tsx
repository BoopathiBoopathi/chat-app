// 'use client'
// import React from 'react'
// export default function ChatList({ onSelect, compact }: {
//     onSelect: (id:
//         string) => void, compact?: boolean
// }) {
//     const chats = [{ id: 'c1', name: 'General' }, { id: 'c2', name: 'Team' }];
//     return (
//         <div className={compact ? "flex gap-2 p-2 overflow-x-auto" : "p-4"}>
//             {chats.map(c => (
//                 <button key={c.id} onClick={() => onSelect(c.id)} className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 w-full">
//                     <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center">{c.name[0]}</div>
//                     <div className="flex-1 text-left">
//                         <div className="font-medium">{c.name}</div>
//                         <div className="text-xs text-slate-500">Last message preview</div>
//                     </div>
//                 </button>
//             ))}
//         </div>
//     )
// }


'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { FiLogOut } from 'react-icons/fi'; // for a logout icon

export default function ChatList({
    onSelect,
    compact,
}: {
    onSelect: (id: string) => void;
    compact?: boolean;
}) {
    const router = useRouter();

    const chats = [
        { id: 'c1', name: 'General' },
        { id: 'c2', name: 'Team' },
    ];

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out of your account.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, log out',
        });

        if (result.isConfirmed) {
            localStorage.removeItem('token');
            router.push('/login');
        }
    };

    return (
        <div
            className={`flex flex-col justify-between ${compact ? 'p-2' : 'h-full p-4'
                }`}
        >
            {/* Chat list */}
            <div className={compact ? 'flex gap-2 overflow-x-auto' : 'flex-1 space-y-2'}>
                {chats.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => onSelect(c.id)}
                        className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 w-full"
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center">
                            {c.name[0]}
                        </div>
                        {!compact && (
                            <div className="flex-1 text-left">
                                <div className="font-medium">{c.name}</div>
                                <div className="text-xs text-slate-500">Last message preview</div>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Logout Section */}
            {!compact && (
                <div className="flex items-center justify-between border-t pt-3 mt-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center text-white font-semibold">
                            JD
                        </div>
                        <div>
                            <div className="font-medium text-gray-800">John Doe</div>
                            <div className="text-xs text-gray-500">Online</div>
                        </div>
                    </div>

                    {/* Logout icon */}
                    <button
                        onClick={handleLogout}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Logout"
                    >
                        <FiLogOut size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}
