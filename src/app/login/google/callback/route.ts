import {
  generateSessionToken,
  createSession,
  setSessionTokenCookie,
} from "@/lib/session";
import { google } from "../../google";
import { cookies } from "next/headers";
import { decodeIdToken } from "arctic";
import type { OAuth2Tokens } from "arctic";
import { db } from "@/drizzle/db";
import { usersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const storedState = cookieStore.get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null;

  if (
    code === null ||
    state === null ||
    storedState === null ||
    codeVerifier === null
  ) {
    return new Response(null, {
      status: 400,
    });
  }
  if (state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    // Invalid code or client credentials
    return new Response(null, {
      status: 400,
    });
  }
  const claims = decodeIdToken(tokens.idToken()) as {
    sub: string;
    name: string;
    picture: string;
  };
  const { name, picture, sub } = claims;

  const existingUser = (
    await db.select().from(usersTable).where(eq(usersTable.googleId, sub))
  )[0];

  if (existingUser) {
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser.id);
    await setSessionTokenCookie(sessionToken, session.expiresAt);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  const user = (
    await db
      .insert(usersTable)
      .values({ googleId: sub, username: name, picture })
      .returning()
  )[0];

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
