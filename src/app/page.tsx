import { Post } from "@/app/post";
import { PostButton } from "@/app/post-button";
import { db } from "@/drizzle/db";
import { postsTable } from "@/drizzle/schema";

export default async function Home() {
  const posts = await db.select().from(postsTable);

  return (
    <div className="container mx-auto">
      <ul className="grid grid-cols-1 p-4 bg-slate-300 gap-y-4 min-h-screen place-items-start">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>

      <div className="fixed right-6 bottom-6">
        <PostButton />
      </div>
    </div>
  );
}
