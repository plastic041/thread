"use client";

import type { SessionValidationResult } from "@/lib/session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type AvatarProps = {
  user: NonNullable<SessionValidationResult["user"]>;
};
export function Avatar({ user }: AvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.picture}
          width={40}
          height={40}
          className="rounded-full size-10"
          alt="user picture"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel asChild>
          <Link href={`/profile/${user.id}`}>{user.username}</Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="text-red-500">
          <a href="/logout">Log out</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
