import { PostItem } from "@/components/postitem";
import { PostButton } from "@/app/post-button";
import { db } from "@/drizzle/db";
import { postsTable } from "@/drizzle/schema";
import Link from "next/link";

export default async function Home() {
  const posts = await db.select().from(postsTable);

  return (
    <div>
      <ul className="grid grid-cols-4 p-2 gap-2 place-items-center">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <PostItem post={post} />
          </Link>
        ))}
      </ul>

      <div className="fixed right-6 bottom-6">
        <PostButton />
      </div>
    </div>
  );
}
