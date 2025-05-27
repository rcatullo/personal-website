import { PostForm } from '../../components/post-form';

export const metadata = {
  title: 'New Blog Post',
  description: 'Upload a new blog post to the stacks.',
};

export default function Page() {
  return (
    <section>
      <PostForm />
    </section>
  );
}
