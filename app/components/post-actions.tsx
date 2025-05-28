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
    if (!params.id) return null;
    return (
        <button 
            type="button" 
            onClick={async () => {
                if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
                    await deletePost(params.id!); 
                    router.push('/stacks');
                }
            }}
            className="px-4 py-2 min-w-24 bg-red-600 text-white rounded hover:opacity-80 transition-opacity flex items-center justify-center"
        >
            Delete
        </button>
    )
}

const DraftButton = ({params, setId}: { params: ActionParams, setId?: (id: number) => void }) => {
    const router = useRouter();
    return (
        <button 
            type="button" 
            onClick={async () => {
                if (!params.draft) {
                    await draftPost(params.id!); 
                    router.push(`/stacks/new-post/${params.id}`)
                } else {
                    const id = await save(params.title!, params.content!, params.id); 
                    setId?.(id!);
                }
            }}
            className="px-4 py-2 min-w-24 bg-gray-200 text-black dark:bg-black dark:text-white rounded hover:opacity-80 transition-opacity flex items-center justify-center"
        >
            <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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
            onClick={async () => {
                if (window.confirm('Are you sure you want to publish this post?')) {
                    await publish(params.title!, params.content!, params.id); 
                    router.push('/stacks');
                }
            }}
            className="px-4 py-2 min-w-24 bg-black text-white dark:bg-white dark:text-black rounded hover:opacity-80 transition-opacity flex items-center justify-center"
        >
            Publish
        </button>
    )
}

export default function Actions({ params, setId }: { params: ActionParams, setId?: (id: number | undefined) => void }) {
    const { data: session } = useSession();
    if (!session) return null;

    return (
        <div className="flex justify-between w-full mt-6">
            <div className="flex gap-2">
                <PublishButton params={params} />
                <DraftButton params={params} setId={setId} />
            </div>
            <div className="flex gap-2">
                <DeleteButton params={params} />
            </div>
        </div>
    )
}