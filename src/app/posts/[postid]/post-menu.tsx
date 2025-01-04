"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

type PostMenuProps = {
  postId: number;
};
export function PostMenu({ postId }: PostMenuProps) {
  return (
    <Dialog>
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
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="text-red-500"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Delete Post
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DialogHeader>
          <DialogTitle>Delete post?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this post?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            type="button"
            onClick={async () => {
              await fetch("/api/delete-post", {
                method: "DELETE",
                body: JSON.stringify({ postId }),
              });

              toast("Post deleted.");

              redirect("/");
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
