import { PostForm } from '../../../components/post-form';

export const metadata = {
  title: 'New Post',
  description: 'Upload a new post to the stacks.',
};

export const revalidate = 0;

export default function Page({ params }) {
  return <PostForm params={{id: params.id}}/>
}
