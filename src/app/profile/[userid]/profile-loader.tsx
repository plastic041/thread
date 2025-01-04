import { Info } from "@/app/profile/[userid]/info";
import { PostItem } from "@/components/postitem";
import { db } from "@/drizzle/db";
import { postsTable, usersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export async function ProfileLoader({ userId }: { userId: number }) {
  const users = await db
    .select({
      username: usersTable.username,
      picture: usersTable.picture,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  if (users.length === 0) {
    throw new Error("User not found");
  }

  const user = users[0];

  const posts = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.userId, userId));

  return (
    <div className="flex flex-col p-2 gap-2">
      <Info
        username={user.username}
        imageCount={posts.length}
        picture={user.picture}
      />
      <ul className="grid grid-cols-4 gap-2 place-items-center">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <PostItem post={post} />
          </Link>
        ))}
      </ul>
    </div>
  );
}
