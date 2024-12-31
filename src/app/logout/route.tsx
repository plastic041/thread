import {
  getCurrentSession,
  invalidateSession,
  deleteSessionTokenCookie,
} from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { session } = await getCurrentSession();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();

  const url = new URL(req.url).origin;

  return NextResponse.redirect(url, {
    headers: {
      // Some browsers accept this directive to clear cookies and other data.
      "Clear-Site-Data": `"*"`,

      // Next.js accepts this directive to clear its own client fetch cache.
      "Cache-Control": "no-store",
    },
  });
}
