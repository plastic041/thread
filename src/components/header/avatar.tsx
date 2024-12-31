"use client";

import type { SessionValidationResult } from "@/lib/session";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import UploadcareImage from "@uploadcare/nextjs-loader";

type AvatarProps = {
  user: NonNullable<SessionValidationResult["user"]>;
};
export function Avatar({ user }: AvatarProps) {
  return (
    <DropdownMenu>
      {/* <div className="size-10 rounded-full bg-gray-200"></div> */}
      <img
        src={user.picture}
        width={40}
        height={40}
        className="rounded-full size-10"
        alt="user picture"
      />
    </DropdownMenu>
  );
}
