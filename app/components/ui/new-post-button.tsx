"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function NewPostButton() {
    const { data: session } = useSession();

    if (!session) {
        return null;
    }

    return (
        <div className="flex items-center w-full my-8">
            <div className="flex-grow h-px bg-gray-200"></div>
            <Link href="/" className="flex-shrink-0 mx-4">
                <button 
                    className="w-12 h-12 rounded-full bg-black text-white text-2xl flex items-center justify-center hover:bg-gray-800 transition-colors"
                    aria-label="Create new post"
                >
                    +
                </button>
            </Link>
            <div className="flex-grow h-px bg-gray-200"></div>
        </div>
    );
}