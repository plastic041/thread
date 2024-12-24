import { db } from "@/drizzle/db";
import { postsTable } from "@/drizzle/schema";

export async function POST(req: Request) {
  const { content, uuid, userId } = await req.json();

  await db.insert(postsTable).values({ content, imageuuid: uuid, userId });

  return new Response("Post created", {
    status: 201,
  });
}
