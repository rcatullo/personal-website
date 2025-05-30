import fs from 'fs/promises'
import Posts from 'app/components/posts'
import { getPosts } from 'app/utils/supabase/get-utils';
import { CustomMDX } from 'app/components/mdx';

export const revalidate = 0;

export default async function Page() {

  const bioPath = `${process.cwd()}/app/bio.mdx`;
  let bio = await fs.readFile(bioPath, 'utf-8');
  let renderedBio;
  let posts;
  try {
    renderedBio = await CustomMDX(bio);
  } catch (err) {
    console.error(err);
    renderedBio = '';
  }
  try {
    posts = await getPosts();
  } catch (err) {
    console.error(err);
    posts = [];
  }


    return (
    <section>
      <h1 className="mb-2 text-2xl font-semibold tracking-tighter">
        Ryan Catullo
      </h1>
      <h2 className="mb-8 text-xl tracking-tight">
        Mathematics and Computer Science @ Stanford University
      </h2>
      <article className="prose">
        { renderedBio }
      </article>
      <div className="my-8">
        <Posts params={posts}/>
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
