import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

export default async function PostsPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li key={post._id}>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
