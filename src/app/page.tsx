import { Post } from "@/app/post";
import { PostButton } from "@/app/post-button";
import { db } from "@/drizzle/db";
import { postsTable, usersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { Link } from "next-view-transitions";

export default async function Home() {
  const posts = await db
    .select({
      postId: postsTable.id,
      content: postsTable.content,
      imageuuid: postsTable.imageuuid,
      createdAt: postsTable.createdAt,
      userId: postsTable.userId,
      username: usersTable.username,
    })
    .from(postsTable)
    .innerJoin(usersTable, eq(postsTable.userId, usersTable.id));

  return (
    <div className="container mx-auto">
      <ul className="grid grid-cols-4 p-2 bg-white gap-2 place-items-start">
        {posts.map((post) => (
          <Link key={post.postId} href={`/posts/${post.postId}`}>
            <Post post={post} />
          </Link>
        ))}
      </ul>

      <div className="fixed right-6 bottom-6">
        <PostButton />
      </div>
    </div>
  );
}
