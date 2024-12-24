import { db } from "@/drizzle/db";
import { postsTable } from "@/drizzle/schema";

export async function POST(req: Request) {
  const { content, uuid } = await req.json();

  await db.insert(postsTable).values({ content, imageuuid: uuid });

  return new Response("", {
    status: 201,
  });
}
