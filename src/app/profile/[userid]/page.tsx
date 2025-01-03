import { Info } from "@/app/profile/[userid]/info";
import { Post } from "@/components/postitem";
import { db } from "@/drizzle/db";
import { postsTable, usersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ userid: string }>;
}) {
  const userId = Number((await params).userid);

  const users = await db
    .select({
      username: usersTable.username,
      picture: usersTable.picture,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId));
  // .innerJoin(usersTable, eq(postsTable.userId, usersTable.id))
  // .where(eq(postsTable.id, Number((await params).postid)))

  if (users.length === 0) {
    throw new Error("User not found");
  }

  const user = users[0];

  const posts = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.userId, userId));

  return (
    <div className="flex flex-col w-full p-4 gap-4">
      <Info
        username={user.username}
        imageCount={posts.length}
        picture={user.picture}
      />
      <ul className="grid grid-cols-4 p-2 bg-white gap-2 place-items-start">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <Post post={post} />
          </Link>
        ))}
      </ul>
    </div>
  );
}
