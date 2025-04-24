import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'The Stacks',
  description: 'A series of math blog posts.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-1 tracking-tighter">The Stacks</h1>
      <div className='mb-8'>
        <strong className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-light-platinum via-light-aztec-gold to-light-dirty-brown dark:from-dirty-brown dark:via-aztec-gold dark:to-platinum">pure mathematics blog</strong>
      </div>
      <BlogPosts />
    </section>
  )
}
