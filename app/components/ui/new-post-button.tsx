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
            <Link href="/stacks/new-post" className="flex-shrink-0 mx-4">
                <button
                    aria-label="Create new post"
                >
                    +
                </button>
            </Link>
            <div className="flex-grow h-px bg-gray-200"></div>
        </div>
    );
}