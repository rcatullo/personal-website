import { PostForm } from '../../components/post-form';

export const revalidate = 0;

export const metadata = {
  title: 'New Post',
  description: 'Upload a new post to the stacks.',
};

export default function Page() {
  return (
    <section>
      <PostForm />
    </section>
  );
}
