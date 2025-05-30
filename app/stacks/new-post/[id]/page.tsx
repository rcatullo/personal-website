import { PostForm } from '../../../components/post-form';

export const metadata = {
  title: 'New Post',
  description: 'Upload a new post to the stacks.',
};

export const revalidate = 0;

export default async function Page({ params }) {
  const { id } = await params;
  return <PostForm params={{id}}/>
}
