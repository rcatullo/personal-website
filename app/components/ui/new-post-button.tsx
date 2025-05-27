"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function NewPostButton() {
    const { data: session } = useSession();

    if (!session) {
        // DEBUG: remove when done debugging.
        // return null;
    }

    return (
        <div className="flex items-center w-full my-8">
            <div className="flex-grow h-px bg-gray-200"></div>
            <Link href="/stacks/new-post" className="flex-shrink-0 mx-4">
                <button 
                    className="w-8 h-8 rounded-full bg-gray-600 dark:bg-gray-300 text-white dark:text-black text-xl flex items-center justify-center hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors leading-none"
                    aria-label="Create new post"
                >
                    <span className="relative top-[-1px]">+</span>
                </button>
            </Link>
            <div className="flex-grow h-px bg-gray-200"></div>
        </div>
    );
}