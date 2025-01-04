import { db } from "@/drizzle/db";
import { Post } from "./post";
import { postsTable, usersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function PostLoader({ postId }: { postId: number }) {
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
      .where(eq(postsTable.id, postId))
  )[0];

  return <Post post={post} />;
}
