import { slugify } from "app/components/mdx";
import { getPostById, getPostBySlug } from "./get-utils";

export type Post = {
    id: number;
    title: string;
    slug: string;
    published: boolean;
    published_at: string;
    created_at: string;
    updated_at: string;
}

  /**
   * This function takes a partial Post object and returns a full Post object.
   * 
   * If the partial Post object has an id, it fetches the corresponding Post
   * from the database and fills in the partial Post object with the fetched
   * data. If the partial Post object does not have an id, it creates a new
   * Post object with all default values.
   * 
   * @param partial - a partial Post object
   * @returns a full Post object
   */
export async function fullPost({ partial }: { partial: Partial<Post> }): Promise<Post> {
    let post: Post | null;

    let id: number;
    let updated_at: string = (partial.updated_at === undefined) ? new Date().toISOString() : partial.updated_at;

    if (partial.id !== undefined) {
        id = partial.id;
        post = await getPostById(id);
    } else {
        id = -1;
        post = {id, title: "", slug: "", published: false, published_at: updated_at, created_at: updated_at, updated_at};
    }

    let title: string = (partial.title === undefined) ? post.title : partial.title;
    let slug: string = (partial.title === undefined) ? post.slug : slugify(partial.title);
    let published: boolean = (partial.published === undefined) ? post.published : partial.published;
    let created_at: string = (partial.created_at === undefined) ? post.created_at : partial.created_at;
    let published_at: string = (partial.published && !post.published) ? updated_at : post.published_at;

    return {id, title, slug, published, created_at, updated_at, published_at};
}