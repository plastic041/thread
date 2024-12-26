import { Avatar } from "@/components/header/avatar";
import { getCurrentSession } from "@/lib/session";
import Link from "next/link";

export async function Header() {
  const { user } = await getCurrentSession();

  return (
    <header className="flex flex-row items-center justify-between px-4 py-2">
      <Link className="text-4xl" href="/">
        😜🧙
      </Link>
      <Avatar user={user} />
    </header>
  );
}
