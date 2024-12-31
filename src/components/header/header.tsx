import { Avatar } from "@/components/header/avatar";
import { getCurrentSession } from "@/lib/session";
import { Link } from "next-view-transitions";

export async function Header() {
  const { user } = await getCurrentSession();

  return (
    <header className="flex flex-row items-center justify-between px-4 py-2 shadow sticky top-0 left-0 right-0 bg-white shrink-0">
      <Link className="text-4xl" href="/">
        😜🧙
      </Link>

      {/* <Avatar user={user} /> */}
      {user === null ? (
        <Link className="" href="/login">
          Login
        </Link>
      ) : (
        <Avatar user={user} />
      )}
    </header>
  );
}
