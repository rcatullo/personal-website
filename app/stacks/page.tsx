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
        <strong className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-dirty-brown to-platinum via-aztec-gold">pure mathematics blog</strong>
      </div>
      <BlogPosts />
    </section>
  )
}
