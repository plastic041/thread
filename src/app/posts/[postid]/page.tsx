import { db } from "@/drizzle/db";
import { Post } from "./post";
import { postsTable, usersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export default async function Page({
  params,
}: {
  params: Promise<{ postid: string }>;
}) {
  const post = (
    await db
      .select({
        postId: postsTable.id,
        content: postsTable.content,
        imageuuid: postsTable.imageuuid,
        createdAt: postsTable.createdAt,
        userId: postsTable.userId,
        username: usersTable.username,
      })
      .from(postsTable)
      .innerJoin(usersTable, eq(postsTable.userId, usersTable.id))
      .where(eq(postsTable.id, Number((await params).postid)))
  )[0];

  return (
    <div className="p-4">
      <Post post={post} />
    </div>
  );
}
