import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  googleId: varchar().notNull(),
  username: varchar().notNull(),
});

export const sessionTable = pgTable("session", {
  id: varchar("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const postsTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  content: varchar(),
  imageuuid: varchar().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  userId: integer("user_id")
    .references(() => usersTable.id)
    .notNull(),
});
