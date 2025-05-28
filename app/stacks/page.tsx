import NewPostButton from "app/components/ui/new-post-button"
import Posts from 'app/components/posts'
import { getPosts } from 'app/lib/supabase'
export const metadata = {
  title: 'The Stacks',
  description: 'A series of math blog posts.',
}

export const revalidate = 0;
export default async function Page() {
  const posts = await getPosts();

  if (!posts || posts.length === 0) {
    return <p className="text-neutral-600 dark:text-neutral-400">No posts found.</p>
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-1 tracking-tighter">The Stacks</h1>
      <div className='mb-8'>
        <strong className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-light-platinum via-light-aztec-gold to-light-dirty-brown dark:from-dirty-brown dark:via-aztec-gold dark:to-platinum">pure mathematics blog</strong>
      </div>
      <NewPostButton/>
      <Posts params={posts} />
    </section>
  )
}
