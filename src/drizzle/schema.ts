import {
  integer,
  pgTable,
  varchar,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const postsTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  content: varchar(),
  imageuuid: uuid().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
