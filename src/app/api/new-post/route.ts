import { db } from "@/drizzle/db";
import { postsTable } from "@/drizzle/schema";

export async function POST(req: Request) {
  const { content, uuid, userId } = await req.json();

  const post = await db
    .insert(postsTable)
    .values({ content, imageuuid: uuid, userId })
    .returning();

  return Response.json({ id: post[0].id });
}
