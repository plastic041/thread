"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { redirect } from "next/navigation";

type PostMenuProps = {
  postId: number;
};
export function PostMenu({ postId }: PostMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          size="icon"
          variant="outline"
        >
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem
          className="text-red-500"
          onClick={async () => {
            await fetch("/api/delete-post", {
              method: "DELETE",
              body: JSON.stringify({ postId }),
            });

            redirect("/");
          }}
        >
          Delete Post
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator />
          <DropdownMenuItem></DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
