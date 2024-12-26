import type { SessionValidationResult } from "@/lib/session";
import Link from "next/link";

type AvatarProps = {
  user: SessionValidationResult["user"];
};
export function Avatar({ user }: AvatarProps) {
  if (user === null) {
    <Link className="" href="/login">
      Login
    </Link>;
  }

  return <div className="size-10 rounded-full bg-gray-200"></div>;
}
