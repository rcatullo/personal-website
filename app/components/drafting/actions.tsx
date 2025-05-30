'use client';
import { useRouter } from "next/navigation";
import { deletePost, draftPost, publish, save } from 'app/utils/post-actions'
import { useSession } from 'next-auth/react';

type ActionParams = {
    id?: number;
    title?: string;
    content?: string;
    draft: boolean;
}

const DeleteButton = ({ params }: { params: ActionParams }) => {
    const router = useRouter();
    return (
        <button
            type="button"
            title="Delete"
            onClick={async () => {
                if (window.confirm('Are you sure you want to delete this post?')) {
                    await deletePost(params.id!);
                    router.push('/stacks');
                }
            }}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
        </button>
    )
}

const DraftButton = ({params, setId}: { params: ActionParams, setId?: (id: number) => void }) => {
    const router = useRouter();
    return (
        <button 
            type="button"
            title={params.draft ? 'Save Draft' : 'Convert to Draft'}
            onClick={async () => {
                if (!params.draft) {
                    await draftPost(params.id!); 
                    router.push(`/stacks/new-post/${params.id}`)
                } else {
                    const id = await save(params.title!, params.content!, params.id); 
                    setId?.(id!);
                }
            }}
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3v5h8" />
            </svg>
        </button>
    )
}

const PublishButton = ({ params }: { params: ActionParams }) => {
    const router = useRouter();
    if (!params.draft) return null;
    return (
        <button 
            type="button"
            title="Publish"
            onClick={async () => {
                if (window.confirm('Are you sure you want to publish this post?')) {
                    await publish(params.title!, params.content!, params.id); 
                    router.push('/stacks');
                }
            }}
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
        </button>
    )
}

export default function Actions({ params, setId }: { params: ActionParams, setId?: (id: number | undefined) => void }) {
    const { data: session } = useSession();
    if (!session) return null;

    return (
        <div className="flex justify-between w-full mt-6 p-2">
            <div className="flex gap-1">
                <PublishButton params={params} />
                <DraftButton params={params} setId={setId} />
            </div>
            <div className="flex gap-1">
                <DeleteButton params={params} />
            </div>
        </div>
    )
}