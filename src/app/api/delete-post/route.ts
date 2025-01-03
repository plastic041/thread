import { db } from "@/drizzle/db";
import { postsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request) {
  const { postId } = await req.json();

  await db.delete(postsTable).where(eq(postsTable.id, postId)).returning();

  return new Response("Post deleted", {
    status: 201,
  });
}
