import { postsTable } from "./schema";
import { db } from "./db";
import { faker } from "@faker-js/faker";

async function seed() {
  faker.seed(1);

  await db.delete(postsTable);

  const post: (typeof postsTable.$inferInsert)[] = Array(20)
    .fill(0)
    .map(() => ({
      content: faker.lorem.paragraph(),
      imageuuid: faker.string.uuid(),
    }));

  await db.insert(postsTable).values(post);
}

seed();
