import fs from 'fs/promises'
import Posts from 'app/components/posts'
import { MarkdownRenderer } from './components/editor/markdown-renderer';

export const revalidate = 0;

export default async function Page() {

  let bio = await fs.readFile('app/bio.mdx', 'utf-8');

  return (
    <section>
      <h1 className="mb-2 text-2xl font-semibold tracking-tighter">
        Ryan Catullo
      </h1>
      <h2 className="mb-8 text-xl tracking-tight">
        Mathematics and Computer Science @ Stanford University
      </h2>
      <article className="prose">
        <MarkdownRenderer content={bio} />
      </article>
      <div className="my-8">
        <Posts />
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
