import { Google } from "arctic";

const ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://thread-plum.vercel.app"
    : "http://localhost:3000";

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${ORIGIN}/login/google/callback`
);
