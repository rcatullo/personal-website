import { BlogPosts } from 'app/components/posts'
import fs from 'fs'
import { CustomMDX } from './components/mdx'

export default async function Page() {
  let bio = fs.readFileSync('app/bio.mdx', 'utf-8')
  const content = await CustomMDX(bio)

  return (
    <section>
      <h1 className="mb-2 text-2xl font-semibold tracking-tighter">
        Ryan Catullo
      </h1>
      <h2 className="mb-8 text-xl tracking-tight">
        Mathematics and Computer Science @ Stanford University
      </h2>
      <article className="prose">
        {content}
      </article>
      <div className="my-8">
        <BlogPosts />
      </div>
      <h2 className="mb-2 text-xl">
        Contact
      </h2>
      <p className="mb-8 text-left">
        {`Ryan Catullo`} <br />
        {`e: rcatullo@stanford.edu`} <br />
        {`p: 540-604-6019`}
      </p>
    </section>
  )
}
